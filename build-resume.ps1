<#
    Renders resume.html to Mark_Kessler_Resume.pdf using headless Edge.

    Run this after editing resume.html or resume-styles.css so the downloadable
    PDF stays in sync with the web version.

    Usage:  .\build-resume.ps1
#>

$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
$html = Join-Path $root 'resume.html'
$pdf  = Join-Path $root 'Mark_Kessler_Resume.pdf'

if (-not (Test-Path $html)) {
    throw "Cannot find resume.html at $html"
}

# Locate a Chromium-based browser to print with.
$candidates = @(
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browser) {
    throw "No Edge or Chrome install found. Checked:`n  $($candidates -join "`n  ")"
}

Write-Host "Browser : $browser"
Write-Host "Source  : $html"
Write-Host "Output  : $pdf"

$uri = 'file:///' + ($html -replace '\\', '/')

# Edge reports success on stderr, which would otherwise trip ErrorActionPreference.
# Judge the outcome by whether the PDF appeared instead.
try {
    $ErrorActionPreference = 'Continue'
    & $browser --headless=new --disable-gpu --no-pdf-header-footer `
        --print-to-pdf="$pdf" $uri 2>&1 | Out-Null
} finally {
    $ErrorActionPreference = 'Stop'
}

Start-Sleep -Seconds 2

if (-not (Test-Path $pdf)) {
    throw "PDF was not produced. Try running the browser command manually to see errors."
}

# Report size and page count so a layout regression is obvious.
# ISO-8859-1 maps every byte to one char, so the regex can scan the raw PDF
# safely. (Encoding]::Latin1 is PowerShell 7+ only.)
$bytes = [System.IO.File]::ReadAllBytes($pdf)
$text  = [System.Text.Encoding]::GetEncoding(28591).GetString($bytes)
$pages = [regex]::Match($text, '/Count\s+(\d+)').Groups[1].Value

Write-Host ""
Write-Host ("Wrote {0} ({1:N0} bytes, {2} pages)" -f (Split-Path $pdf -Leaf), $bytes.Length, $pages)

if ($pages -ne '2') {
    Write-Warning "Expected a 2-page resume but got $pages. Check resume-styles.css page-break rules."
}
