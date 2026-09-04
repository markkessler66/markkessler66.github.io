# markkessler66.github.io

My personal site and portfolio — the cool things I've coded. :D

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page: intro, skills, experience, featured projects, about, contact |
| `resume.html` | Résumé, styled for both screen and print, with a PDF download button |
| `phynetpy-showcase.html` | Deep technical showcase for PhyNetPy: architecture, measured benchmarks, methodology |
| `demo.html` | Interactive SwitchParentage / SRPP walkthrough on a Scenario D toy network |

Stylesheets and scripts are paired by name (`styles.css` / `script.js`,
`resume-styles.css`, `showcase-styles.css` / `showcase-script.js`,
`mp-allop-demo.css` / `mp-allop-demo.js`).

## Résumé PDF

`Mark_Kessler_Resume.pdf` is generated from `resume.html`, so the web and PDF versions never drift.
After editing `resume.html` or `resume-styles.css`, regenerate it:

```powershell
.\build-resume.ps1
```

The script renders via headless Edge (or Chrome) and warns if the result isn't 2 pages, which is
the usual sign that a page-break rule in `resume-styles.css` needs attention.

## Photos

Phones shoot HEIC, which browsers can't display. `tools/convert-photo.ps1` converts a photo to
web-ready JPEGs at two widths so the page can serve the right one via `srcset`. It decodes HEIC
through Windows' built-in WIC codecs, so there's nothing to install.

```powershell
.\tools\convert-photo.ps1 -Source "path\to\IMG_5406.heic" -BaseName "mark-and-rachel" -Crop "850,850,2400,1600"
```

`-Crop` takes `x,y,width,height` against the original pixel grid and is optional. The command above
is the one that produced the current About photo.

## Benchmarks

Every performance number quoted on the site is measured, not estimated. The harness and its raw
JSON output live in [`benchmarks/`](benchmarks/) so the claims can be audited or re-run — see
[`benchmarks/README.md`](benchmarks/README.md) for the methodology and environment.

Reported results include the cases where PhyNetPy *loses* to its baselines. If you update the
figures on the site, re-run the harness first and keep the two in sync.
