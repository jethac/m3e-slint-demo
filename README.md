# Material 3 Expressive for Slint

A landing page for the Slint Material Expressive spike.
It explains the implementation, shows actual application screenshots and motion, and records the remaining work.
The source is separate from [the Slint fork](https://github.com/jethac/slint/tree/preview/material-fieldnotes).

## Preview

Use Node.js 22 or later:

```sh
node scripts/build.mjs
python -m http.server 8788 --directory dist
```

Open `http://localhost:8788`.
The page uses plain HTML, CSS, and JavaScript with no package dependencies.

## Deployment

GitHub Actions deploys `dist/` to the `m3e-slint-demo` Cloudflare Pages project when `main` changes.
The production page is served at https://m3e-slint-demo.jethachan.net/.
Repository secrets provide `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
Credentials do not belong in source files.

## Assets and evidence

Screenshots come from the Fieldnotes headless render checks in the Slint fork.
Motion clips use actual application renders sampled with a controlled clock at 60 Hz.
They demonstrate behavior; they are not recordings of GPU performance.
Asset provenance and reproduction commands are recorded in `assets/README.md`.

## Upstream links

No upstream submissions are made by this repository.
When authorized upstream work begins, add real links to `upstream-prs.json`:

```json
[
  {
    "title": "Describe the actual change",
    "url": "https://github.com/slint-ui/slint/pull/12345",
    "status": "Open"
  }
]
```

Use an existing PR number; the example above is only a schema example.
The build checks the host, path, title, and allowed status values.
Keep the recorded inventory and implementation notes current as the port progresses.
