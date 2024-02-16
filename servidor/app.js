import express from 'express'
import cors from 'cors'
import axios from 'axios'
const baseUrl = 'https://api.mangadex.org';

const port = process.env.PORT || 3000;

const corsOptions = {
	origin: "*",
	credentails: true,
	optionSuccessStatus: 200,
	port: port,
}

const app = express();


app.use(cors(corsOptions))
app.use(express.json())


app.get("/tag", async (req, res) => {
	try {
		const tags = await axios(`${baseUrl}/manga/tag`);
		res.status(200).json(tags.data);

	} catch (err) {
		res.status(500).json({
			status: 500,
			error: "Internal error."
		})
		console.log(err)
	}
})

app.get("/manga", async (req, res) => {
	try {
		const inGenre = req.query.includedTags;
		const exGenre = req.query.excludedTags;
		const resp = await axios({
			method: 'GET',
			url: `${baseUrl}/manga?includes[]=author&includes[]=cover_art`,
			params: {
				'includedTags': inGenre,
				'excludedTags': exGenre,
				'limit': 50
			}
		});
		res.status(200).json(resp.data);

	} catch (err) {
		res.status(500).json({
			status: 500,
			error: "Internal error."
		})
		console.log(err)
	}
})

app.get("/mangaAuthor", async (req, res) => {
	try {
		const mangaId = req.query.mangaId;

		const resp = await axios(`${baseUrl}/manga/${mangaId}?includes[]=author`);
		res.status(200).json(resp.data);

	} catch (err) {
		res.status(500).json({
			status: 500,
			error: "Internal error."
		})
		console.log(err)
	}
})

app.get("/mangaCoverName", async (req, res) => {
	try {
		const mangaId = req.query.mangaId;

		const resp = await axios(`${baseUrl}/manga/${mangaId}?includes[]=cover_art`);
		res.status(200).json(resp.data);

	} catch (err) {
		res.status(500).json({
			status: 500,
			error: "Internal error."
		})
		console.log(err)
	}
})


app.get("/mangaID", async (req, res) => {
	try {
		const mangaId = req.query.id;

		const resp = await axios(`${baseUrl}/manga/${mangaId}?includes[]=author&includes[]=cover_art`);
		res.status(200).json(resp.data);

	} catch (err) {
		res.status(500).json({
			status: 500,
			error: "Internal error."
		})
		console.log(err)
	}
})

app.listen(port, () => {
	console.log(
		"Express server listening on port %d in %s mode",
		port,
		app.settings.env
	)
})

