import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:admin@tinder-clone.dr2z4.mongodb.net/tinderdb?retryWrites=true&w=majority`;

app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get("/", (request, response) => response.status(200).send("hello world!"));

app.post("/tinder/cards", (request, response) => {
  const dbCard = request.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      return response.status(500).send(err);
    } else {
      response.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (request, response) => {
  Cards.find((err, data) => {
    if (err) {
      return response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`listening on localhost: ${port}`));
