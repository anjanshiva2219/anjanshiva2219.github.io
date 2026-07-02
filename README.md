# anjanshiva2219.github.io

Personal portfolio for **Anjan Kunduru** -- offensive security & AI red-team engineer.
Static HTML/CSS/JS, no framework, no build step, no trackers. Served via GitHub Pages.

## Structure
```
index.html            # single-page site (content is inline for SEO / no-JS)
assets/css/style.css  # dark, security-professional theme
assets/js/main.js     # nav + renders the HTB writeups index from data/
assets/img/           # favicon (+ og.png -- see TODO)
data/writeups.json    # SOURCE OF TRUTH for the Hack The Box index
sitemap.xml robots.txt
```

## Adding a Hack The Box writeup
Edit **`data/writeups.json`** -- one object per machine. `status` drives rendering:

- `"retired"` → card is **public**; set `"url"` to the published writeup.
- `"active"` or `"unknown"` → card shows **Solved * 🔒 locked** only (name, OS,
  difficulty, date). **Never** add solution detail to this file -- it is public.

```json
{ "name": "Example", "kind": "machine", "os": "Linux",
  "difficulty": "Easy", "date": "2026", "status": "retired",
  "url": "https://github.com/anjanshiva2219/htb-writeups/blob/main/machines/example.md" }
```

Set the HTB profile link once in `meta.htb_profile_url`.

## Compliance
Only **retired** HTB content is ever published. Active machines are shown as
proof-of-solve stubs with zero spoilers, per Hack The Box rules. Full active
writeups live in a separate private location and are never committed here.

## TODO before launch
- [ ] Add `assets/Anjan-Kunduru-Resume.pdf` (PII-scrubbed -- see site owner).
- [ ] Add `assets/img/og.png` (1200×630 social preview).
- [ ] Set real `meta.htb_profile_url` in `data/writeups.json`.
