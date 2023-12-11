document.getElementById('next-button').addEventListener('click',function() {
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
	const baseUrl = 'https://api.mangadex.org';
	const tags = await axios(`${baseUrl}/manga/tag`);
	const includedTagIDs = tags.data.data
    	.filter(tag => include.includes(tag.attributes.name.en))
    	.map(tag => tag.id);
	
	const excludedTagIDs = tags.data.data
		.filter(tag => excludedTagNames.includes(tag.attributes.name.en))
		.map(tag => tag.id);
	

	const resp = await axios({
		method: 'GET',
		url: `${baseUrl}/manga`,
				params: {
				'includedTags': includedTagIDs,
				'excludedTags': excludedTagIDs
			}
	});
		
	console.log(resp.data.data.map(manga => manga.id));
	
	mangalist.innerHTML = "";
	for (var i = 0; i < 20; i++) {
		let div = document.createElement('div');
		div.className = 'saved-manga';
		div.innerHTML = `
		<a href="http://127.0.0.1:5500/manga.html">
		<div class="content">
		    <img class="cover" src="/resources/icons/cover_exemplo.jpg" />
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
			list.push("Adventure");
			break;
		case 'action':
			list.push("Action");
			break;
		case 'comedy':
			list.push("Comedy");
			break;
		case 'drama':
			list.push("Drama");
			break;
		case 'sports':
			list.push("Sports");
			break;
		case 'fantasy':
			list.push("Fantasy");
			break;
		case 'mecha':
			list.push("Mecha");
			break;
		case 'horror':
			list.push("Horror");
			break;
		case 'romance':
			list.push("Romance");
			break;
		case 'slice-of-life':
			list.push("Slice of Life");
			break;
	}
}
