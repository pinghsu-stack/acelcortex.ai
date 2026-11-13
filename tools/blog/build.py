#!/usr/bin/env python3
"""Build the Acel Cortex blog from blog/posts/*.md. No dependencies.

  python3 tools/blog/build.py            build every post, the /blog index, sitemap and llms.txt
  python3 tools/blog/build.py SLUG       build one post only (plus index, sitemap, llms.txt)

status: draft      -> tools/blog/preview/SLUG.html (noindex, DRAFT bar, not listed, not deployed)
status: approved   -> same as draft until tools/blog/publish_due.py flips it on its publish_on date
status: published  -> blog/SLUG.html, listed on /blog, in sitemap.xml and llms.txt
"""
import datetime, html, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
POSTS = ROOT / "blog" / "posts"
OUT = ROOT / "blog"
PREVIEW = ROOT / "tools" / "blog" / "preview"
TEMPLATE = (ROOT / "tools" / "blog" / "template.html").read_text()
SITE = "https://www.acelcortex.ai"
VIDEOS = json.loads((ROOT / "tools" / "blog" / "videos.json").read_text())
CHANNEL = "https://www.youtube.com/@acelcortex"
REQUIRED = ["title", "slug", "description", "summary", "video_id", "video_title",
            "video_upload_date", "cluster", "status", "date"]


# ---------- parsing ----------
def parse_post(path):
    text = path.read_text()
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        sys.exit(f"{path.name}: missing --- frontmatter ---")
    meta = {}
    for line in m.group(1).splitlines():
        if line.strip() and not line.startswith("#"):
            k, _, v = line.partition(":")
            meta[k.strip()] = v.strip().strip('"')
    missing = [k for k in REQUIRED if not meta.get(k)]
    if missing:
        sys.exit(f"{path.name}: missing {', '.join(missing)}")
    if meta["status"] not in ("draft", "approved", "published"):
        sys.exit(f"{path.name}: status must be draft, approved or published")
    if meta["status"] == "approved" and not re.match(r"^\d{4}-\d{2}-\d{2}$", meta.get("publish_on", "")):
        sys.exit(f"{path.name}: approved posts need publish_on: YYYY-MM-DD")
    body, faq = split_faq(m.group(2))
    meta["body_md"], meta["faq"] = body, faq
    meta["url"] = f"{SITE}/blog/{meta['slug']}"
    return meta


def split_faq(md):
    parts = re.split(r"^## FAQ\s*$", md, flags=re.M)
    if len(parts) == 1:
        return md, []
    faq, q, ans = [], None, []
    for line in parts[1].splitlines():
        if line.startswith("### "):
            if q:
                faq.append((q, " ".join(ans).strip()))
            q, ans = line[4:].strip(), []
        elif line.strip() and q:
            ans.append(line.strip())
    if q:
        faq.append((q, " ".join(ans).strip()))
    return parts[0], faq


# ---------- markdown subset: ## ### paragraphs - lists 1. lists > quotes **b** *i* [t](u) ----------
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?!\w)", r"<em>\1</em>", s)
    return s


def md_to_html(md):
    out, para, lst, ltype = [], [], [], None

    def flush():
        nonlocal para, lst, ltype
        if para:
            out.append(f"<p>{inline(' '.join(para))}</p>")
            para = []
        if lst:
            out.append(f"<{ltype}>" + "".join(f"<li>{inline(i)}</li>" for i in lst) + f"</{ltype}>")
            lst, ltype = [], None

    for raw in md.splitlines():
        line = raw.rstrip()
        if not line.strip():
            flush(); continue
        m = re.match(r"^!\[([^\]]*)\]\(([^)\s]+)\)\s*$", line)
        if m:
            flush()
            alt = html.escape(m.group(1), quote=True)
            out.append(f'<figure><img src="{m.group(2)}" alt="{alt}" loading="lazy"><figcaption>{alt}</figcaption></figure>')
            continue
        if line.startswith("### "):
            flush(); out.append(f"<h3>{inline(line[4:])}</h3>")
        elif line.startswith("## "):
            flush(); out.append(f"<h2>{inline(line[3:])}</h2>")
        elif line.startswith("> "):
            flush(); out.append(f"<blockquote>{inline(line[2:])}</blockquote>")
        elif re.match(r"^[-*] ", line):
            if para or ltype == "ol": flush()
            ltype = "ul"; lst.append(line[2:])
        elif re.match(r"^\d+\. ", line):
            if para or ltype == "ul": flush()
            ltype = "ol"; lst.append(re.sub(r"^\d+\. ", "", line))
        elif lst and raw.startswith("  "):
            lst[-1] += " " + line.strip()
        else:
            if lst: flush()
            para.append(line.strip())
    flush()
    return "\n    ".join(out)


# ---------- rendering ----------
def fmt_date(d):
    return datetime.date.fromisoformat(d).strftime("%b %-d, %Y")


def schema(p):
    graph = [
        {"@type": "BlogPosting", "headline": p["title"], "description": p["description"],
         "url": p["url"], "mainEntityOfPage": p["url"], "datePublished": p["date"],
         "dateModified": p.get("updated") or p["date"],
         "image": f"https://i.ytimg.com/vi/{p['video_id']}/hqdefault.jpg",
         "author": {"@type": "Person", "name": "Ping Hsu", "jobTitle": "Founder and CEO",
                    "url": "https://www.linkedin.com/in/pinghsu/",
                    "worksFor": {"@type": "Organization", "name": "Acel Cortex Solutions"}},
         "publisher": {"@type": "Organization", "name": "Acel Cortex Solutions", "url": SITE,
                       "logo": {"@type": "ImageObject", "url": f"{SITE}/assets/logo.png"}},
         "video": {"@id": "#video"}},
        {"@type": "VideoObject", "@id": "#video", "name": p["video_title"],
         "description": p["summary"], "uploadDate": p["video_upload_date"],
         "thumbnailUrl": f"https://i.ytimg.com/vi/{p['video_id']}/hqdefault.jpg",
         "embedUrl": f"https://www.youtube.com/embed/{p['video_id']}",
         "contentUrl": f"https://www.youtube.com/watch?v={p['video_id']}"},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Blog", "item": f"{SITE}/blog"},
            {"@type": "ListItem", "position": 2, "name": p["title"], "item": p["url"]}]},
    ]
    if p["faq"]:
        graph.append({"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", "", inline(a))}}
            for q, a in p["faq"]]})
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)


def videos_html(exclude=None, cluster=None, limit=10):
    """Horizontal row of channel videos that open on YouTube. Same-topic videos first, then the rest by views."""
    e = lambda s: html.escape(s, quote=True)
    vids = [v for v in VIDEOS if v["id"] != exclude]
    vids.sort(key=lambda v: (v["cluster"] != cluster, -v["views"]))
    cards = "\n".join(
        f'      <a class="vcard" href="https://www.youtube.com/watch?v={v["id"]}" target="_blank" rel="noopener">'
        f'<div class="th"><img src="https://i.ytimg.com/vi/{v["id"]}/mqdefault.jpg" alt="" loading="lazy"><span>YouTube</span></div>'
        f'<b>{e(v["title"])}</b></a>' for v in vids[:limit])
    return ('  <section class="vids" aria-label="More videos">\n'
            '    <div class="vids-head"><div><h2>More videos from the channel</h2>'
            f'<a href="{CHANNEL}?sub_confirmation=1" target="_blank" rel="noopener">Subscribe on YouTube →</a></div>'
            '<div class="vids-nav"><button type="button" data-dir="-1" aria-label="Previous videos">←</button>'
            '<button type="button" data-dir="1" aria-label="More videos">→</button></div></div>\n'
            f'    <div class="vrow">\n{cards}\n    </div>\n  </section>')


def render(p, published):
    e = lambda s: html.escape(s, quote=True)
    draft = p["status"] != "published"
    faq_html = ""
    if p["faq"]:
        faq_html = '  <section class="faq"><h2>FAQ</h2>\n' + "\n".join(
            f"    <details><summary>{e(q)}</summary><p>{inline(a)}</p></details>" for q, a in p["faq"]
        ) + "\n  </section>"
    rel = [x for x in published if x["slug"] != p["slug"] and x["cluster"] == p["cluster"]][:3]
    rel_html = ""
    if rel:
        rel_html = '  <section class="related"><div class="lbl">Related</div>\n' + "\n".join(
            f'    <a href="/blog/{x["slug"]}">{e(x["title"])}</a>' for x in rel) + "\n  </section>"
    date_line = f"Published {fmt_date(p['date'])}"
    if p.get("updated") and p["updated"] != p["date"]:
        date_line += f" · Updated {fmt_date(p['updated'])}"
    note = p.get("cta_note", "")
    subs = {
        "ROBOTS": '<meta name="robots" content="noindex, nofollow">\n' if draft else "",
        "DRAFT_BAR": '<div class="draft-bar">Draft for review, not published</div>\n' if draft else "",
        "TITLE": e(p["title"]), "DESCRIPTION": e(p["description"]), "URL": p["url"],
        "THUMB": f"https://i.ytimg.com/vi/{p['video_id']}/hqdefault.jpg",
        "SCHEMA": schema(p), "CLUSTER": e(p["cluster"]), "DATE_LINE": date_line,
        "SUMMARY": inline(p["summary"]), "VIDEO_ID": e(p["video_id"]), "VIDEO_TITLE": e(p["video_title"]),
        "BODY": "    " + md_to_html(p["body_md"]), "FAQ": faq_html, "RELATED": rel_html,
        "VIDEOS": videos_html(p["video_id"], p["cluster"]),
        "CTA_HEADLINE": e(p.get("cta_headline", "Want this running in your company?")),
        "CTA_TEXT": inline(p.get("cta_text", "We set it up on top of the property management software you already use. Your team approves everything before it goes out.")),
        "CTA_NOTE": f"<small>{inline(note)}</small>" if note else "",
    }
    out = TEMPLATE
    for k, v in subs.items():
        out = out.replace("{{" + k + "}}", v)
    left = re.findall(r"\{\{[A-Z_]+\}\}", out)
    if left:
        sys.exit(f"{p['slug']}: unfilled template fields {left}")
    return out


def render_index(published):
    e = lambda s: html.escape(s, quote=True)
    items = "\n".join(
        f'  <a class="g" href="/blog/{p["slug"]}"><img class="gt" src="https://i.ytimg.com/vi/{p["video_id"]}/mqdefault.jpg" alt="" loading="lazy"><div><span class="c">{e(p["cluster"])} · {fmt_date(p["date"])}</span>'
        f'<b>{e(p["title"])}</b><small>{e(p["description"])}</small></div><i>→</i></a>'
        for p in published) or '  <p class="foot">First posts coming soon.</p>'
    page = TEMPLATE
    # Reuse the post template's head and chrome, swap the article for a list.
    head, rest = page.split("<main>", 1)
    _, tail = rest.split("</main>", 1)
    head = head.replace("{{ROBOTS}}", "").replace("{{DRAFT_BAR}}", "")
    head = head.replace("{{TITLE}}", "Property Management AI Blog")
    head = head.replace("{{DESCRIPTION}}", "Practical guides from an operator running an 800-unit property management company on AI: maintenance, leasing, accounting and growth.")
    head = head.replace("{{URL}}", f"{SITE}/blog").replace("{{THUMB}}", f"{SITE}/assets/og.png?v=3")
    head = head.replace("{{SCHEMA}}", json.dumps({"@context": "https://schema.org", "@type": "Blog",
                        "name": "Acel Cortex Blog", "url": f"{SITE}/blog",
                        "blogPost": [{"@type": "BlogPosting", "headline": p["title"], "url": p["url"],
                                      "datePublished": p["date"]} for p in published]}))
    head = head.replace('<meta property="og:type" content="article">', '<meta property="og:type" content="website">')
    css = ("<style>.list{border-top:1px solid var(--rule);margin-top:28px}a.g{display:flex;align-items:center;gap:16px;"
           "padding:20px 4px;border-bottom:1px solid var(--rule);text-decoration:none}a.g:hover{background:var(--paper-2)}"
           ".g div{flex:1}.g .c{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}"
           ".g b{display:block;font-size:20px;font-weight:500;letter-spacing:-.015em;margin:4px 0}.g small{font-size:15px;color:var(--muted);line-height:1.45;display:block}"
           ".gt{flex:none;width:200px;aspect-ratio:16/9;object-fit:cover;border-radius:8px;background:var(--ink)}"
           "@media(max-width:600px){a.g{flex-direction:column;align-items:flex-start}.gt{width:100%}.g i{display:none}}"
           ".g i{font-style:normal;color:var(--green);font-size:20px}.lede{font-size:19px;color:var(--ink-soft);max-width:600px}</style>\n</head>")
    head = head.replace("</head>", css, 1)
    body = ("<main>\n<article>\n  <h1>Property management, run on AI</h1>\n"
            "  <p class=\"lede\">Guides and videos from a working operator. Every post comes from a real workflow in our own 800-unit property management company.</p>\n"
            f"  <div class=\"list\">\n{items}\n  </div>\n{videos_html(limit=12)}\n</article>\n</main>")
    return head + body + tail


def update_sitemap(published):
    path = ROOT / "sitemap.xml"
    s = path.read_text()
    s = re.sub(r"\s*<!-- blog:start -->.*?<!-- blog:end -->", "", s, flags=re.S)
    if not published:
        path.write_text(s); return
    urls = [f"  <url><loc>{SITE}/blog</loc></url>"] + [
        f"  <url><loc>{p['url']}</loc><lastmod>{p.get('updated') or p['date']}</lastmod></url>" for p in published]
    block = "\n  <!-- blog:start -->\n" + "\n".join(urls) + "\n  <!-- blog:end -->"
    s = s.rstrip().removesuffix("</urlset>").rstrip() + block + "\n</urlset>\n"
    path.write_text(s)


def update_llms(published):
    path = ROOT / "llms.txt"
    s = path.read_text()
    s = re.sub(r"\n## Blog\n.*?(?=\n## |\Z)", "", s, flags=re.S).rstrip() + "\n"
    if published:
        s += "\n## Blog\n" + "\n".join(f"- {p['title']}: {p['url']}" for p in published) + "\n"
    path.write_text(s)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    posts = [parse_post(f) for f in sorted(POSTS.glob("*.md"))]
    slugs = [p["slug"] for p in posts]
    if len(slugs) != len(set(slugs)):
        sys.exit("duplicate slugs in blog/posts")
    published = sorted([p for p in posts if p["status"] == "published"], key=lambda p: p["date"], reverse=True)
    PREVIEW.mkdir(parents=True, exist_ok=True)
    for p in posts:
        if only and p["slug"] != only:
            continue
        if p["status"] != "published":
            (PREVIEW / f"{p['slug']}.html").write_text(render(p, published))
            stale = OUT / f"{p['slug']}.html"
            if stale.exists():
                stale.unlink()
            extra = f" (publishes {p['publish_on']})" if p["status"] == "approved" else ""
            print(f"{p['status']:<10} tools/blog/preview/{p['slug']}.html{extra}")
        else:
            (OUT / f"{p['slug']}.html").write_text(render(p, published))
            print(f"published  blog/{p['slug']}.html")
    if published:
        (ROOT / "blog.html").write_text(render_index(published))
    update_sitemap(published)
    update_llms(published)
    print(f"index, sitemap and llms.txt updated ({len(published)} published)")


if __name__ == "__main__":
    main()
