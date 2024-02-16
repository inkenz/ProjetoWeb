let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
var savedMangasId = JSON.parse(localStorage.getItem('saved-mangas-id')) || [];
var nav_list = JSON.parse(sessionStorage.getItem('nav_list'));

var index = nav_list.findIndex(manga => manga.id === id);

console.log(index);

generatePage(nav_list[index]);

function generatePage(manga) {
	document.getElementById('h1-title').innerText = manga.title;

	document.getElementById('authors').innerText = manga.author;
	document.getElementById('cover-img').src = manga.cover;
	console
	document.getElementsByClassName('genre-list')[0].innerHTML = manga.genreDivs.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
	document.getElementById('date-span').innerText = manga.created;
	document.getElementById('progress-span').src = manga.status;
	document.getElementById('synopsis-p').innerText = manga.description;

	button = document.getElementById("bookmark");
	if (savedMangasId.includes(manga.id)) {
		button.className = "bookmark-img float-btn";
	} else {
		button.className = "bookmark-outline-img float-btn";
	}
	button.value = manga.id;
}

function bookmarklist() {
	var button = document.getElementById("bookmark");
	mangaId = button.value;
	var index = savedMangasId.indexOf(mangaId);

	if (button.classList.contains('bookmark-outline-img')) {
		button.classList.remove('bookmark-outline-img');
		button.classList.add('bookmark-img');
		console.log('a');
		if (index === -1) {
			savedMangasId.push(mangaId);
		}
	} else if (button.classList.contains('bookmark-img')) {
		button.classList.remove('bookmark-img');
		button.classList.add('bookmark-outline-img');
		console.log('b');
		if (index !== -1) {
			savedMangasId.splice(index, 1);
		}
	}

	localStorage.setItem('saved-mangas-id', JSON.stringify(savedMangasId));
}

function go_right() {
	index = index + 1;
	if (index < nav_list.length) {
		generatePage(nav_list[index]);
	}
	else {
		index = index - 1;
	}
	console.log(nav_list.length);
	console.log(index);
}
function go_left() {
	index = index - 1;
	if (index >= 0) {
		generatePage(nav_list[index]);
	}
	else {
		index = index + 1;
	}
	console.log(index);
}
