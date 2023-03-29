const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect();

export default function deletarTask(req, res) {
  try {
    if (req.method === "DELETE") {
      const { id } = req.body;

      const query = `DELETE FROM todo_list WHERE id = ${id}`;

      client.query(query, (err, results) => {
        if (err) {
          return res.status(400).send({
            message: "erro inesperado",
          });
        } else {
          return res.status(200).send({
            message: "tarefa deletada com sucesso",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
