const screens = {
  day: {
    src: 'assets/desktop-light.png',
    alt: 'Fieldnotes in light colors, showing a navigation rail, completion filters, and a list of editable tasks.',
    caption: 'A navigation rail on a wide window, with task filters and an editor one click away.'
  },
  appearance: {
    src: 'assets/settings-dark.png',
    alt: 'Fieldnotes appearance settings in dark colors, with switches for dark colors and reduced motion.',
    caption: 'Appearance settings expose dark colors and reduced motion as independent choices.'
  }
};

document.querySelectorAll('[data-screen]').forEach(button => {
  button.addEventListener('click', () => {
    const screen = screens[button.dataset.screen];
    const image = document.getElementById('desktop-screen');
    image.src = screen.src;
    image.alt = screen.alt;
    document.getElementById('desktop-caption').textContent = screen.caption;
    document.getElementById('full-image').href = screen.src;
    document.querySelectorAll('[data-screen]').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
    });
  });
});

document.getElementById('play-comparison').addEventListener('click', async () => {
  const videos = [...document.querySelectorAll('video')];
  const status = document.getElementById('playback-status');
  videos.forEach(video => { video.currentTime = 0; });
  const results = await Promise.allSettled(videos.map(video => video.play()));
  status.textContent = results.some(result => result.status === 'rejected')
    ? 'Use the playback controls below each clip to start the comparison.'
    : '';
});

fetch('upstream-prs.json')
  .then(response => {
    if (!response.ok) throw new Error('Cannot load upstream links');
    return response.json();
  })
  .then(items => {
    const list = document.getElementById('upstream-links');
    for (const item of items) {
      if (!/^https:\/\/github\.com\/slint-ui\/slint\/pull\/\d+$/.test(item.url)) continue;
      const row = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.title;
      row.append(link, document.createTextNode(` — ${item.status}`));
      list.append(row);
    }
    if (list.children.length) {
      list.hidden = false;
      document.getElementById('upstream-empty').hidden = true;
    }
  })
  .catch(() => {});
