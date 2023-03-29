const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default function atualizarCompleto(req, res) {
  try {
    client.connect();
    if (req.method === "POST") {
      const { completo, id } = req.body;
      const query = "UPDATE todo_list SET completo = $1 WHERE id = $2";
      const values = [completo, id];

      client.query(query, values, (err, result) => {
        if (err) {
          return res.status(500).send({
            message: "erro interno no servidor",
          });
        } else {
          return res.status(200).send({
            message: "dado atualizado com sucesso!",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
