function tagForm() {
	var formulario = document.getElementById('formulario');
	let include = getGenreList(true);
	let exclude = getGenreList(false);
	console.log(include);
	console.log(exclude);
	sessionStorage.setItem('includeList', JSON.stringify(include));
	sessionStorage.setItem('includeList', JSON.stringify(exclude));
	formulario.innerHTML = '';
	formulario.appendChild(createNewOptions())


}

function createNewOptions() {
	let formfieldset = document.createElement('fieldset');
	formfieldset.classList.add('forms-field');

	// Adicionando demografia
	let h2 = document.createElement('h2')
	h2.setAttribute('id', 'titulo');
	h2.innerHTML = 'Demografia';
	formfieldset.appendChild(h2);
	let selectDemo = document.createElement('select');
	selectDemo.setAttribute('id', 'demography');
	selectDemo.setAttribute('name', 'demography');

	let demoValue = ['none', 'josei', 'shoujo', 'shounen', 'seinen'];
	let demoText = ['Qualquer', 'Shoujo', 'Josei', 'Shounen', 'Seinen'];
	let i = 0;

	for (let i = 0; i < demoText.length; i++) {
		let option = document.createElement('option');
		option.setAttribute('value', demoValue[i]);
		option.innerHTML = demoText[i];
		selectDemo.appendChild(option);
	}

	formfieldset.appendChild(selectDemo);

	// Adicionando o estado

	h2 = document.createElement('h2');
	h2.setAttribute('id', 'titulo');
	h2.innerHTML = 'Estado';

	formfieldset.appendChild(h2);

	let status = ['ongoin', 'completed', 'cancelled', 'hiatus'];
	let status_ptbr = ['Em lançamento', 'Completo', 'Cancelado', 'Em hiato'];
	for (i = 0; i < status.length; i++) {
		let checkbox = document.createElement('input');
		let label = document.createElement('label');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('id', status[i] + '-cb');
		checkbox.setAttribute('value', status[i]);
		if ((status[i] === 'ongoin' || status[i] === 'completed')) {
			checkbox.setAttribute('checked', 'true');
		}
		label.classList.add('label');
		label.setAttribute('for', status[i] + '-cb');
		label.innerHTML = status_ptbr[i];
		formfieldset.appendChild(checkbox);
		formfieldset.appendChild(label);
		formfieldset.appendChild(document.createElement('br'));
	}





	return formfieldset;
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