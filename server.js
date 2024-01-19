const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'src/css/index.css')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/',)
app.listen(3000, () => {
	console.log('Servidor rodando na porta 3000');
});
