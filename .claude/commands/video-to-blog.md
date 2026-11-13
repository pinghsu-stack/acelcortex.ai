---
description: Draft a blog post from an Acel Cortex YouTube video for Ping to review
argument-hint: <youtube url>
---

Turn the YouTube video $ARGUMENTS into a draft blog post. Follow the writing rules in CLAUDE.md.

1. Find the video's row in the tracker sheet (CLAUDE.md has the link). Use its target question and cluster. If the video is not in the sheet, ask Ping for the target question.
2. Get the transcript: open the video in Chrome, expand the description, click "Show transcript", and read the transcript panel with get_page_text. Also note the upload date from the video details. If Ping's original script for this video is in the per-video Google Drive folder, use it alongside the transcript.
3. Write `blog/posts/<slug>.md` with `status: draft` and `date:` set to today. Required frontmatter: title, slug, description (under 160 characters), summary, video_id, video_title, video_upload_date (YYYY-MM-DD), cluster, status, date. Optional: cta_headline, cta_text, cta_note.
4. Run `python3 tools/blog/build.py <slug>` and fix any errors.
5. Check: no em dashes, no "PM", no invented numbers, every Acel Cortex claim matches llms.txt.
6. Send Ping the preview file `tools/blog/preview/<slug>.html` and list anything he needs to check (placeholders, claims you inferred, overlap with other posts).
7. Set the tracker row's "Blog status" to "In review" and "Transcript pulled" to "Yes".

Do not commit or push. Publishing happens only through /publish-blog after Ping approves.
