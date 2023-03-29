const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default function buscarTarefaPorId(req, res) {
  client.connect();
  try {
    if (req.method === "POST") {
      const { id } = req.body;
      const query = `SELECT * FROM todo_list WHERE id = ${id}`;
      client.query(query, (err, result) => {
        return res.status(200).send({
          dados: result.rows,
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
}
