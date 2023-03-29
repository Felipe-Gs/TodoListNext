const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default function buscarDados(req, res) {
  try {
    client.connect();
    if (req.method === "GET") {
      const query = `SELECT * FROM todo_list`;
      client.query(query, (err, results) => {
        if (err) {
          return res.status(500).send({
            message: "erro interno no servidor",
          });
        } else {
          return res.status(200).send({
            dados: results.rows,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
