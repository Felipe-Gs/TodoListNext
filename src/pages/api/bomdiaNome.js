const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default function bomdiaNome(req, res) {
  client.connect();
  try {
    if (req.method === "POST") {
      const { nome } = req.body;
      if (nome.length > 0) {
        return res.status(200).send({
          message: `Bom dia ${nome}`,
        });
      } else {
        return res.status(404).send({
          message: "esta faltando nome na requisicao",
        });
      }
    } else {
      return res.status(404).send({
        message: "Está faltando dados na requisicao",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
