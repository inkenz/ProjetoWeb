const baseUrl = 'http://localhost:3000';

document.getElementById('next-button').addEventListener('click', function () {
	let include = getGenreList(true);
	let exclude = getGenreList(false);
	console.log(include);
	console.log(exclude);
	sessionStorage.setItem('includeList', JSON.stringify(include));
	sessionStorage.setItem('excludeList', JSON.stringify(exclude));


	generateList();
}
);

async function generateList() {
	let mangalist = document.getElementsByClassName('manga-list')[0];
	let include = JSON.parse(sessionStorage.getItem('includeList'));
	let exclude = JSON.parse(sessionStorage.getItem('excludeList'));
	let savedMangasId = JSON.parse(localStorage.getItem('saved-mangas-id')) || [];
	const tags = await axios(`${baseUrl}/tag`);
	console.log(tags);
	let includedTagIDs = tags.data.data
		.filter(tag => include.includes(tag.attributes.name.en))
		.map(tag => tag.id);

	let excludedTagIDs = tags.data.data
		.filter(tag => exclude.includes(tag.attributes.name.en))
		.map(tag => tag.id);

	const resp = await axios({
		method: 'GET',
		url: `${baseUrl}/manga`,
		params: {
			'includedTags': includedTagIDs,
			'excludedTags': excludedTagIDs
		}
	});
	//console.log(resp.data);

	// genres = "";
	// for (let i = 0; i < include.length; i++) {
	// 	genres += '<div class="genre">' + getGenre(include[i]) + '</div>'
	// }

	mangalist.innerHTML = "";
	mangas = resp.data.data;
	console.log(mangas);
	let nav_list = [];
	for (let i = 0; i < mangas.length; i++) {
		let div = document.createElement('div');

		author = mangas[i].relationships[0].attributes.name;
		let relationship = mangas[i].relationships.find(rel => rel.attributes && rel.attributes.fileName);
		cover = getCover(mangas[i].id, relationship.attributes.fileName);
		console.log(author);

		genreDivs = getGenreDivs(mangas[i].attributes.tags);
		let saved = 'bookmark-outline-img';
		if (savedMangasId.includes(mangas[i].id)) {
			saved = 'bookmark-img';
		}
		div.className = 'saved-manga';
		div.innerHTML = `
			  <a href="http://127.0.0.1:5500/manga.html?id=${mangas[i].id}">
			  <div class="content">
			      <img class="cover" src="${cover}" />
			      <div class="info">
			      <h2 class="title">${mangas[i].attributes.title.en}</h2>
			      <h2 class="author">${author}</h2>
			      <div class="genre-list">
			      ${genreDivs}
			      </div>
			      </div>
			  </div>
			  </a>
			  <button id="btn-${i}" class="${saved} btn-bookmark" onclick="save_bookmark(this.id)" value=${mangas[i].id}>
			  `;
		mangalist.appendChild(div);

		let sinopse = mangas[i].attributes.description.en;
		let date = new Date(mangas[i].attributes.createdAt);
		let day = String(date.getDate()).padStart(2, '0');
		let mounth = String(date.getMonth() + 1).padStart(2, '0');
		let year = date.getFullYear();
		let status = '';
		switch (mangas[i].attributes.status) {
			case 'ongoing':
				status = 'Em lançamento';
				break;
			case 'completed':
				status = 'Completo';
				break;
			case 'hiatus':
				status = 'Em hiato';
				break;
			case 'cancelled':
				status = 'Cancelado';
				break;
			default:
				status = 'Status desconhecido';
		}

		let dateFormat = `${day}/${mounth}/${year}`;
		console.log(dateFormat);
		let manga_dict = {
			'genreDivs': genreDivs,
			'author': author,
			'cover': cover,
			'title': mangas[i].attributes.title.en,
			'id': mangas[i].id,
			'created': dateFormat,
			'description': sinopse,
			'status': status
		};

		nav_list.push(manga_dict);
	}

	if (mangas.length == 0) {
		mangalist.innerHTML = "<span>Sem resultados</span>";
	}
	else {
		sessionStorage.setItem('nav_list', JSON.stringify(nav_list));
	}
}



function getCover(id, filename) {
	let cover = `https://uploads.mangadex.org/covers/${id}/${filename}.256.jpg`
	return cover;
}

function getGenreDivs(tags) {
	let genresNames = tags.map(item => item.attributes.name.en);
	console.log(genresNames);
	let genresDiv = genresNames
		.map(genre => {
			let genreContent = getGenre(genre);
			if (genreContent !== undefined) {
				return `<div class="genre">${genreContent}</div>`;
			}
		})
		.join('');

	return genresDiv;
}

function getGenreList(boolean) {
	let list = [];
	if (boolean) {
		genres = document.getElementsByClassName("three-switch-on");
	}
	else {
		genres = document.getElementsByClassName("three-switch-off");
	}

	Array.prototype.forEach.call(genres, function (element) {
		insertList(element, list);
	});
	return list;
}

function insertList(element, list) {
	if (!element.checked) return;

	switch (element.name) {
		case 'adventure':
			list.push("Adventure");
			// list.push('4');
			break;
		case 'action':
			list.push("Action");
			// list.push('2');
			break;
		case 'comedy':
			list.push("Comedy");
			// list.push("6");
			break;
		case 'drama':
			list.push("Drama");
			// list.push("10");
			break;
		case 'sports':
			list.push("Sports");
			// list.push("37");
			break;
		case 'fantasy':
			list.push("Fantasy");
			// list.push("12");
			break;
		case 'mecha':
			list.push("Mecha");
			// list.push("21");
			break;
		case 'horror':
			list.push("Horror");
			// list.push("16");
			break;
		case 'romance':
			list.push("Romance");
			// list.push("27");
			break;
		case 'slice-of-life':
			list.push("Slice of Life");
			// list.push("35")
			break;
	}
}

function getGenre(number) {
	switch (number) {
		case 'Adventure':
			return 'Aventura';
		case 'Action':
			return 'Ação';
		case 'Comedy':
			return 'Comédia';
		case 'Drama':
			return 'Drama';
		case 'Sports':
			return 'Esporte';
		case 'Fantasy':
			return 'Fantasia';
		case 'Mecha':
			return 'Mecha';
		case 'Horror':
			return 'Terror';
		case 'Romance':
			return 'Romance';
		case 'Slice of Life':
			return 'Vida cotidiana';
	}
}
