const { Client } = require("pg");

require("dotenv").config();

const client = new Client({
   host: process.env.HOST,
   port: process.env.PORT,
   user: process.env.USER,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
});

export default function addTask(req, res) {
   try {
      client.connect();
      if (req.method === "POST") {
         const { titulo, tarefa } = req.body;

         const query = `INSERT INTO todo_list (titulo, tarefa) 
          VALUES ($1, $2)`;
         const values = [titulo, tarefa];
         client.query(query, values, (err, results) => {
            if (err) {
               return res.status(404).send({
                  message: "erro no servidor",
               });
            } else {
               return res.status(200).send({
                  message: "tarefa adicionada com sucesso!",
               });
            }
         });
      }
   } catch (error) {
      console.log(error);
   }
}
