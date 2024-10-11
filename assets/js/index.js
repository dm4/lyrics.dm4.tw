function getAlbumMarkdown(album) {
  // Skip front matter of markdown file
  const mdText = document.getElementById('lyric_' + album).innerHTML.split('---')[2];
  return mdText;
}

function showLyric(album) {
  marked.use(markedGfmHeadingId.gfmHeadingId());
  const markedOpt = { breaks: true };
  const mdText = getAlbumMarkdown(album);
  document.getElementById('lyric').innerHTML = marked.parse(mdText, markedOpt);
  updateDropdown();
}

function updateDropdown() {
  // Set current album name
  const albumName = document.getElementById('lyric').querySelectorAll('h1')[0].innerText;
  document.getElementById('currentAlbum').innerText = albumName;

  // Clear current album dropdown
  const dropdownMenu = document.getElementById('currentAlbumDropdown');
  dropdownMenu.innerHTML = '';

  document.getElementById('lyric').querySelectorAll('h2').forEach((element) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'dropdown-item';
    a.href = `#${element.id}`;
    a.textContent = element.innerText;
    li.appendChild(a);
    dropdownMenu.appendChild(li);
  });
}

$(document).ready(function () {
  // Default album
  let album = 'sssss_live';
  showLyric(album);
  $('#navbarSupportedContent ul.dropdown-menu > li > a').each(function () {
    $(this).click(function () {
      event.preventDefault();
      const album = $(this).attr('album');
      showLyric(album);
      $('.navbar-collapse').collapse('hide')
    });
  });
});