# markkessler66.github.io

My personal site and portfolio — the cool things I've coded. :D

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page: intro, featured projects, PhyNetPy 0.6.0 highlights, contact |
| `resume.html` | Résumé, styled for both screen and print, with a PDF download button |
| `phynetpy-showcase.html` | Deep technical showcase for PhyNetPy: architecture, measured benchmarks, methodology |

Stylesheets and scripts are paired by name (`styles.css` / `script.js`,
`resume-styles.css`, `showcase-styles.css` / `showcase-script.js`).

## Résumé PDF

`Mark_Kessler_Resume.pdf` is generated from `resume.html`, so the web and PDF versions never drift.
After editing `resume.html` or `resume-styles.css`, regenerate it:

```powershell
.\build-resume.ps1
```

The script renders via headless Edge (or Chrome) and warns if the result isn't 2 pages, which is
the usual sign that a page-break rule in `resume-styles.css` needs attention.

## Benchmarks

Every performance number quoted on the site is measured, not estimated. The harness and its raw
JSON output live in [`benchmarks/`](benchmarks/) so the claims can be audited or re-run — see
[`benchmarks/README.md`](benchmarks/README.md) for the methodology and environment.

Reported results include the cases where PhyNetPy *loses* to its baselines. If you update the
figures on the site, re-run the harness first and keep the two in sync.
