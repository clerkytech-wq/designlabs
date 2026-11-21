Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\clerk\.gemini\antigravity\scratch\designlabs\public\images\portfolio-mockup-ref.jpg"
$destPath = "C:\Users\clerk\.gemini\antigravity\scratch\designlabs\public\images\cta-motion-visual.jpg"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Host "Source dimensions: $($src.Width) x $($src.Height)"

# In 925 x 1024, the CTA image on the right:
# Left ~ 480, Top ~ 560, Width ~ 430, Height ~ 420
$rect = New-Object System.Drawing.Rectangle(480, 560, 430, 420)
$cropped = $src.Clone($rect, $src.PixelFormat)
$cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropped.Dispose()
$src.Dispose()
Write-Host "Successfully saved cta-motion-visual.jpg"
