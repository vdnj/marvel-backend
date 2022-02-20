const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(formidable());
app.use(cors());

// Permet l'accès aux variables d'environnement
require("dotenv").config();

// GET All characters
app.get("/characters/all", async (req, res) => {
  try {
    const limit = req.query.limit;
    const skip = req.query.skip;
    const name = req.query.name ? `&name=${encodeURI(req.query.name)}` : "";

    const characters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}${name}`
    );
    console.log(characters.data);
    res.json(characters.data);
  } catch (error) {
    res.json(error.message);
  }
});

// GET a character by his id
app.get("/character/:id", async (req, res) => {
  const id = req.params.id;
  const comics = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.API_KEY}`
  );
  res.json(comics.data);
});

// GET All comics
app.get("/comics", async (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip;
  // console.log("req.query.title => ", req.query.title);
  const title = req.query.title ? `&title=${encodeURI(req.query.title)}` : "";
  const comics = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}${title}`
  );
  res.json(comics.data);
});

// GET A comic by his id
app.get("/comics/:id", async (req, res) => {
  const id = req.params.id;
  const comics = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.API_KEY}`
  );
  res.json(comics.data);
});

app.use(function (err, req, res, next) {
  res.json({ error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});

// const server = app.listen(process.env.PORT, () => {
//   console.log("Server started");
// });
// server.timeout = Number(process.env.SERVER_TIMEOUT) || 1000000;
