#!/usr/bin/env python3
"""Publish approved posts whose publish_on date has arrived (Toronto time), then rebuild.

  python3 tools/blog/publish_due.py           publish what is due today
  python3 tools/blog/publish_due.py --week    only report what is scheduled Mon-Sun this week (changes nothing)

Prints one line per post. Exit code 0 always; "NOTHING_DUE" / "NOTHING_SCHEDULED" when there is nothing.
"""
import datetime, re, subprocess, sys
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[2]
POSTS = ROOT / "blog" / "posts"
today = datetime.datetime.now(ZoneInfo("America/Toronto")).date()


def field(text, key):
    m = re.search(rf"^{key}:\s*(.+)$", text, re.M)
    return m.group(1).strip().strip('"') if m else ""


approved = []
for f in sorted(POSTS.glob("*.md")):
    t = f.read_text()
    head = t.split("\n---\n", 1)[0]
    if field(head, "status") == "approved":
        approved.append((f, t, field(head, "publish_on"), field(head, "title"), field(head, "slug")))

if "--week" in sys.argv:
    start = today - datetime.timedelta(days=today.weekday())
    end = start + datetime.timedelta(days=6)
    week = [a for a in approved if start.isoformat() <= a[2] <= end.isoformat()]
    for _, _, d, title, slug in week:
        print(f"SCHEDULED {d} {slug} | {title}")
    print(f"QUEUE {len(approved)} approved post(s) total")
    if not week:
        print("NOTHING_SCHEDULED")
    sys.exit(0)

due = [a for a in approved if a[2] and a[2] <= today.isoformat()]
if not due:
    print("NOTHING_DUE")
    sys.exit(0)
for f, t, d, title, slug in due:
    head, rest = t.split("\n---\n", 1)
    head = re.sub(r"^status:.*$", "status: published", head, flags=re.M)
    head = re.sub(r"^date:.*$", f"date: {today.isoformat()}", head, flags=re.M)
    f.write_text(head + "\n---\n" + rest)
    print(f"PUBLISHED {slug} | {title} | https://www.acelcortex.ai/blog/{slug}")
subprocess.run([sys.executable, str(ROOT / "tools" / "blog" / "build.py")], check=True)
