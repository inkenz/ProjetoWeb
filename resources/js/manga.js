var imagem1 = 'url("resources/icons/bookmark-outline.svg")';
var imagem2 = 'url("resources/icons/bookmark.svg")';
function bookmarklist() {
	var botao = document.getElementById('bookmark');

	if (botao.style.backgroundImage == imagem1) {
		botao.style.backgroundImage = imagem2;

	} else {
		botao.style.backgroundImage = imagem1;
	}
}