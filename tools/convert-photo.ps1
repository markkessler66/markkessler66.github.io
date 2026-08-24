<#
    Converts a HEIC (or any WIC-readable) photo into web-ready JPEGs.

    Windows decodes HEIC natively through WIC, so this needs no ImageMagick,
    ffmpeg, or Python dependencies.

    Emits two widths so the page can hand the browser an appropriate file via
    srcset instead of shipping a 4000px original to phones.

    Usage:
      .\tools\convert-photo.ps1 -Source "C:\path\IMG_5406.heic" -BaseName "mark-and-rachel"
#>

param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$BaseName,
    [int[]]$Widths = @(800, 1600),
    [int]$Quality = 82,

    # Optional crop against the source pixel grid, as "x,y,width,height".
    [string]$Crop
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore, WindowsBase

if (-not (Test-Path $Source)) { throw "Source image not found: $Source" }

$outDir = Split-Path $PSScriptRoot -Parent   # repo root
$stream = [System.IO.File]::OpenRead($Source)

try {
    $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
        $stream,
        [System.Windows.Media.Imaging.BitmapCreateOptions]::None,
        [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
    )
    $frame = $decoder.Frames[0]
    Write-Host ("Source : {0} ({1} x {2})" -f (Split-Path $Source -Leaf), $frame.PixelWidth, $frame.PixelHeight)

    if ($Crop) {
        $c = $Crop -split ',' | ForEach-Object { [int]$_.Trim() }
        if ($c.Count -ne 4) { throw "-Crop must be 'x,y,width,height'" }
        $rect = New-Object System.Windows.Int32Rect($c[0], $c[1], $c[2], $c[3])
        $frame = New-Object System.Windows.Media.Imaging.CroppedBitmap($frame, $rect)
        Write-Host ("Crop   : {0} x {1} at ({2}, {3})" -f $c[2], $c[3], $c[0], $c[1])
    }

    foreach ($w in $Widths) {
        $scale = $w / $frame.PixelWidth
        if ($scale -gt 1) { $scale = 1 }

        $transform = New-Object System.Windows.Media.ScaleTransform($scale, $scale)
        $scaled = New-Object System.Windows.Media.Imaging.TransformedBitmap($frame, $transform)

        $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
        $encoder.QualityLevel = $Quality
        $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($scaled))

        $path = Join-Path $outDir ("{0}-{1}w.jpg" -f $BaseName, $w)
        $fs = [System.IO.File]::Create($path)
        try { $encoder.Save($fs) } finally { $fs.Close() }

        $kb = [math]::Round((Get-Item $path).Length / 1KB)
        Write-Host ("  wrote {0,-34} {1,5} x {2,-5} {3,5} KB" -f (Split-Path $path -Leaf), $scaled.PixelWidth, $scaled.PixelHeight, $kb)
    }
} finally {
    $stream.Close()
}
