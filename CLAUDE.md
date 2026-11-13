# acelcortex.ai

Static HTML site on Vercel. Pushing to `main` deploys to https://www.acelcortex.ai (cleanUrls: `blog/x.html` serves at `/blog/x`).

## Blog: YouTube video to blog post

Source of truth is `blog/posts/<slug>.md`. Never hand-edit `blog/*.html`, `blog.html`, or the blog blocks in `sitemap.xml` and `llms.txt`; run the build instead.

```
python3 tools/blog/build.py          # build everything
python3 tools/blog/build.py SLUG     # build one post
```

- `status: draft` builds to `tools/blog/preview/<slug>.html` (noindex, draft bar, not deployed, not committed).
- `status: approved` plus `publish_on: YYYY-MM-DD` means Ping approved it; it stays a preview until that date. `python3 tools/blog/publish_due.py` flips due posts to published and rebuilds (`--week` only reports what is scheduled this week). A scheduled task runs it Tuesday and Thursday mornings and pushes to main.
- `status: published` builds to `blog/<slug>.html` and adds it to `/blog`, `sitemap.xml` and `llms.txt`.

Every post and the /blog page end with a scrolling "More videos from the channel" row that links out to YouTube. It reads `tools/blog/videos.json` (same-topic videos first, then by views). When a new video goes up, add it there and rebuild.

Commands: `/video-to-blog <youtube url>` drafts a post for review. `/publish-blog <slug>` publishes an approved draft.

Tracker: Google Sheet "Acel Cortex YouTube-to-Blog Plan"
https://docs.google.com/spreadsheets/d/1mxPEME8Pj_ryNTsSS12KvjPhDEQxmUxuCDsL93L5HZI/edit
(tab "Video Inventory": priority, target question, blog status, blog URL, publish date).

## Writing rules for posts

- Audience: anyone running property management operations (owners, operators, brokers, landlords), US and Canada, any software. Generalize beyond Buildium or Claude when the video is tool-specific.
- Voice: Ping, first person, plain confident operator. No guru cliches, no hype, no jargon.
- Never abbreviate "property management" to "PM". No em dashes anywhere.
- Playbook, not wiring diagram: explain what each step does and the outcome. No code, no step-by-step build instructions. One line of honest complexity is fine ("this is where most of our build time went").
- Never invent numbers, quotes or customer names. Use only what the video, transcript or Ping says. If a claim needs a number you don't have, write [PLACEHOLDER: what to fill] and flag it.
- AEO structure: `summary` is a 2 to 4 sentence direct answer to the target question. Question-style or plain H2s, short paragraphs, lists where they help, a `## FAQ` section with 3 to 4 `### Question` items written the way people ask AI tools. Each FAQ must answer a follow-up question the body does not already answer (cost, safety, which software, how long, who it is for). Never repeat the body; if there are no real follow-ups, use fewer. 900 to 1,500 words.
- Title answers or poses the target question from the tracker. Slug is short, lowercase, hyphenated.
- Facts about Acel Cortex must match `llms.txt` and `faq.html` (platforms supported, about two weeks setup, human approval on everything).
