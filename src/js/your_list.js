const baseUrl = 'http://localhost:3000';

window.onload = function () {
	var savedMangasId = JSON.parse(localStorage.getItem('saved-mangas-id'));

	if (savedMangasId && savedMangasId.length > 0) {
		generate_list(savedMangasId);
	}
}

async function generate_list(ids) {
	let mangalist = document.getElementsByClassName('manga-list')[0];
	let nav_list = [];
	for (let i = 0; i < ids.length; i++) {
		const resp = await axios({
			method: 'GET',
			url: `${baseUrl}/mangaID`,
			params: {
				'id': ids[i]
			}
		});
		let div = document.createElement('div');
		let title = resp.data.data.attributes.title.en
		let author = resp.data.data.relationships[0].attributes.name;

		let relationship = resp.data.data.relationships.find(rel => rel.attributes && rel.attributes.fileName);
		let filename = relationship.attributes.fileName;
		let cover = `https://uploads.mangadex.org/covers/${ids[i]}/${filename}.256.jpg`


		genreDivs = getGenreDivs(resp.data.data.attributes.tags);
		div.className = 'saved-manga';
		div.innerHTML = `
			  <a href="http://127.0.0.1:5500/manga.html?id=${ids[i]}">
			  <div class="content">
			      <img class="cover" src="${cover}" />
			      <div class="info">
			      <h2 class="title">${title}</h2>
			      <h2 class="author">${author}</h2>
			      <div class="genre-list">
			      ${genreDivs}
			      </div>
			      </div>
			  </div>
			  </a>
			  <button id="btn-${i}" class="btn-trash" onclick="delete_from_list(this.id)" value=${ids[i]}><img class="trashcan"></img></button>
			  `;
		mangalist.appendChild(div);

		let sinopse = resp.data.data.attributes.description.en;
		let date = new Date(resp.data.data.attributes.createdAt);
		let day = String(date.getDate()).padStart(2, '0');
		let mounth = String(date.getMonth() + 1).padStart(2, '0');
		let year = date.getFullYear();

		let dateFormat = `${day}/${mounth}/${year}`;;
		let status = '';
		switch (resp.data.data.attributes.status) {
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
		let manga_dict = {
			'genreDivs': genreDivs,
			'author': author,
			'cover': cover,
			'title': resp.data.data.attributes.title.en,
			'id': ids[i],
			'created': dateFormat,
			'description': sinopse,
			'status': status
		};

		nav_list.push(manga_dict);
	}
	if (ids.length != 0) {
		sessionStorage.setItem('nav_list', JSON.stringify(nav_list));
	}
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

function delete_from_list(id) {
	var button = document.getElementById(id);
	var mangaId = button.value;

	let savedMangasId = JSON.parse(localStorage.getItem('saved-mangas-id'));
	let index = savedMangasId.indexOf(mangaId);

	savedMangasId.splice(index, 1);

	localStorage.setItem('saved-mangas-id', JSON.stringify(savedMangasId));

	let mangaElement = document.getElementById(id).parentNode;
	mangaElement.parentNode.removeChild(mangaElement);
}
