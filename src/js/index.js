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
	const tags = await axios(`${baseUrl}/manga_list`);

	let include_str = "_" + include.join("_") + "_";
	let exclude_str = "_" + exclude.join("_") + "_";

	const resp = await axios({
		method: 'GET',
		url: `${baseUrl}/manga_list`,
		params: {
			'inGenre': include_str,
			'exGenre': exclude_str
		}
	});

	console.log(resp);

	mangalist.innerHTML = "";
	for (var i = 0; i < 20; i++) {
		let div = document.createElement('div');
		div.className = 'saved-manga';
		div.innerHTML = `
		<a href="http://127.0.0.1:5500/manga.html">
		<div class="content">
		    <img class="cover" src="/src/icons/cover_exemplo.jpg" />
		    <div class="info">
			<h2 class="title">Título do mangá</h2>
			<h2 class="author">autor do mangá</h2>
			<div class="genre-list">
			    <div class="genre">Ação</div>
			    <div class="genre">Romance</div>
			</div>
		    </div>
		</div>
		</a>
		<button class="bookmark-img btn-bookmark" onclick="bookmarklist()">
	    `;
		mangalist.appendChild(div);
	}
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
			//list.push("Adventure");
			list.push('4');
			break;
		case 'action':
			//list.push("Action");
			list.push('2');
			break;
		case 'comedy':
			//list.push("Comedy");
			list.push("6");
			break;
		case 'drama':
			//list.push("Drama");
			list.push("10");
			break;
		case 'sports':
			// list.push("Sports");
			list.push("37");
			break;
		case 'fantasy':
			// list.push("Fantasy");
			list.push("12");
			break;
		case 'mecha':
			// list.push("Mecha");
			list.push("21");
			break;
		case 'horror':
			// list.push("Horror");
			list.push("16");
			break;
		case 'romance':
			// list.push("Romance");
			list.push("27");
			break;
		case 'slice-of-life':
			// list.push("Slice of Life");
			list.push("35")
			break;
	}
}
