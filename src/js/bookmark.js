function save_bookmark(buttonId) {
	var button = document.getElementById(buttonId);
	var mangaId = button.value;

	var savedMangasId = JSON.parse(localStorage.getItem('saved-mangas-id')) || [];

	var index = savedMangasId.indexOf(mangaId);

	if (button.classList.contains('bookmark-outline-img')) {
		button.classList.remove('bookmark-outline-img');
		button.classList.add('bookmark-img');

		if (index === -1) {
			savedMangasId.push(mangaId);
		}
	} else if (button.classList.contains('bookmark-img')) {
		button.classList.remove('bookmark-img');
		button.classList.add('bookmark-outline-img');

		if (index !== -1) {
			savedMangasId.splice(index, 1);
		}
	}

	// Salva a lista atualizada no localStorage
	localStorage.setItem('saved-mangas-id', JSON.stringify(savedMangasId));
}
