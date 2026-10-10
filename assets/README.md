# Fieldnotes renders

The five PNG screenshots are actual Slint application renders from the reviewed spike at commit `daea12c991f6a0664f1f4eab04b2efda78a62a88`.
They were produced by the Fieldnotes tests with `FIELDNOTES_SCREENSHOTS` set to an output directory.

The two MP4 clips show the same application with reduced motion off and on.
The [motion exporter](https://github.com/jethac/slint/blob/e5dd2ae4273326d6163cadf15b034e7fa22f41e3/ui-libraries/material/examples/fieldnotes/src/main.rs) records the task flow and checks the saved title.
The Slint testing backend renders each frame using software rendering and a controlled clock.
Frames are sampled at 60 Hz over 16 seconds.
The editor opens at 1.5 seconds, typing begins at 3 seconds, and the task is saved at 8 seconds.
The saved task reopens at 10.5 seconds and the editor is dismissed at 13.5 seconds.
Both clips use the same actions and timing, with pauses to read each state.
These are behavior demonstrations, not GPU performance measurements.

Reproduce the clips from the preview branch in the Slint fork:

```powershell
$env:FIELDNOTES_MOTION = 'target/material-preview/motion'
cargo test --config 'profile.dev.package.i-slint-renderer-software.opt-level=3' --config 'profile.dev.package.image.opt-level=3' --config 'profile.dev.package.png.opt-level=3' --manifest-path ui-libraries/material/Cargo.toml -p material-fieldnotes export_landing_page_motion -- --ignored
ffmpeg -framerate 60 -i target/material-preview/motion/expressive/frame-%03d.png -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart task-flow-expressive.mp4
ffmpeg -framerate 60 -i target/material-preview/motion/reduced/frame-%03d.png -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart task-flow-reduced.mp4
```

Source: [Fieldnotes](https://github.com/jethac/slint/tree/preview/material-fieldnotes/ui-libraries/material/examples/fieldnotes).
The application source is MIT-licensed; its Material icons carry Apache-2.0 annotations in the fork's REUSE configuration.
The site does not distribute font files or replace the fork's license notices.
