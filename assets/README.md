# Fieldnotes renders

The five PNG screenshots are actual Slint application renders from the reviewed spike at commit `daea12c991f6a0664f1f4eab04b2efda78a62a88`.
They were produced by the Fieldnotes tests with `FIELDNOTES_SCREENSHOTS` set to an output directory.

The two MP4 clips show the same application with reduced motion off and on.
The Slint testing backend renders each frame using software rendering and a controlled clock.
Frames are sampled at 60 Hz over two seconds, including opening the editor, entering a task, and saving it.
These are behavior demonstrations, not GPU performance measurements.

Reproduce the clips from the preview branch in the Slint fork:

```powershell
$env:FIELDNOTES_MOTION = 'target/material-preview/motion'
cargo test --manifest-path ui-libraries/material/Cargo.toml -p material-fieldnotes export_landing_page_motion -- --ignored
ffmpeg -framerate 60 -i target/material-preview/motion/expressive/frame-%03d.png -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart dialog-expressive.mp4
ffmpeg -framerate 60 -i target/material-preview/motion/reduced/frame-%03d.png -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart dialog-reduced.mp4
```

Source: [Fieldnotes](https://github.com/jethac/slint/tree/preview/material-fieldnotes/ui-libraries/material/examples/fieldnotes).
The application source is MIT-licensed; its Material icons carry Apache-2.0 annotations in the fork's REUSE configuration.
The site does not distribute font files or replace the fork's license notices.
