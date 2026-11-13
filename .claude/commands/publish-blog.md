---
description: Publish an approved blog post to acelcortex.ai/blog
argument-hint: <slug>
---

Publish `blog/posts/$ARGUMENTS.md`. Only run this after Ping has approved the draft in this conversation.

1. Apply any final edits Ping asked for to the .md file.
2. Set `status: published` and `date:` to today (keep the original `date` and add `updated:` if the post was already live).
3. Run `python3 tools/blog/build.py` (full build, so related links, /blog, sitemap.xml and llms.txt all refresh).
4. If this is the first published post, add a "Blog" link to the desktop and mobile nav in index.html, maintenance.html, pricing.html and faq.html, next to FAQ.
5. Commit only the post's .md, the generated blog/*.html, blog.html, sitemap.xml, llms.txt (and nav edits) with message "Blog: <title>", then push to main. Vercel deploys automatically.
6. Wait about a minute, open https://www.acelcortex.ai/blog/<slug> and confirm it loads with the video and FAQ.
7. Update the tracker row: Blog status "Published", Blog URL, Publish date.
8. Tell Ping the live URL.
