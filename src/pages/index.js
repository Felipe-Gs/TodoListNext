import api from "@/axios/api";
import { useEffect, useState } from "react";
import TodoCard from "@/components/TodoCard";
import Head from "next/head";
import style from "../styles/Home.module.css";
import Alert from "@mui/material/Alert";
import { Button, Snackbar } from "@mui/material";

export default function Home() {
   const [open, setOpen] = useState(false);
   const [showError, setShowError] = useState(false);
   const [showIndicador, setShowIndicador] = useState(false);
   const vertical = "top";
   const horizontal = "right";

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }

      setShowAlert(false);
      setShowError(false);
      setShowIndicador(false);
   };
   const [showAlert, setShowAlert] = useState(false);
   const [titulo, setTitulo] = useState("");
   const [tarefa, setTarefa] = useState("");

   const [dados, setDados] = useState([]);
   const tarefaCompletas = dados ? dados.filter((item) => item.completo) : [];
   const tarefasIncompletas = dados
      ? dados.filter((item) => !item.completo)
      : [];
   const handleDados = async () => {
      try {
         const response = await api.get("/api/buscarDados");
         setDados(response.data.dados);
      } catch (error) {
         console.log(error);
      }
   };

   const handleCompleto = async (id) => {
      setShowIndicador(true);
      try {
         const itemIndex = dados.findIndex((item) => item.id === id);
         const item = dados[itemIndex];
         const novoValorCompleto = !item.completo;

         const response = await api.post(`/api/atualizarCompleto`, {
            completo: novoValorCompleto,
            id: id,
         });

         setDados((dadosAntigos) => {
            const novosDados = [...dadosAntigos];
            novosDados[itemIndex] = { ...item, completo: novoValorCompleto };
            return novosDados;
         });
      } catch (error) {
         console.log(error);
      }
   };

   const handleDelete = async (id) => {
      setShowAlert(true);
      setOpen(true);
      try {
         const response = await api.delete(`/api/deletarTask`, {
            data: { id: id },
         });
         console.log(response.data.message);
         setDados((dadosAntigos) =>
            dadosAntigos.filter((item) => item.id !== id)
         );
      } catch (error) {
         console.log(error);
      }
   };

   const addTask = async () => {
      if (titulo === "" || tarefa === "") {
         return setShowError(true);
      }
      try {
         const response = await api.post("/api/addTask", {
            titulo: titulo,
            tarefa: tarefa,
         });
         console.log(response.data.message);
         setTarefa("");
         setTitulo("");
      } catch (error) {
         console.log(error);
      }
   };

   function formatarData(data) {
      const d = new Date(data);
      const dia = ("0" + d.getDate()).slice(-2);
      const mes = ("0" + (d.getMonth() + 1)).slice(-2);
      const ano = d.getFullYear();
      const hora = ("0" + d.getHours()).slice(-2);
      const minuto = ("0" + d.getMinutes()).slice(-2);
      return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
   }

   useEffect(() => {
      handleDados();
   }, []);

   return (
      <>
         <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossorigin
            />
            <link
               href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap"
               rel="stylesheet"
            />
            <meta
               name="viewport"
               content="initial-scale=1, width=device-width"
            />
         </Head>
         <div
            className={style.divContainer}
            style={{
               backgroundColor: "#A18AFF",
               width: "100vw",
               height: "100vh",
               padding: "10px",
               display: "flex",
            }}
         >
            <div className={style.divLateral}>
               <p style={{ fontSize: "25px" }}>Todo List</p>
               <p style={{ fontSize: "25px" }}>Felipe G Silva</p>
               <div
                  style={{
                     width: "200px",
                     height: "2px",
                     backgroundColor: "#A18AFF",
                     marginTop: "20px",
                  }}
               ></div>
            </div>
            <div
               style={{
                  padding: "80px",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "center",
               }}
            >
               <p style={{ fontSize: "25px" }}>Tarefas diarias</p>

               <div
                  className={style.divInputs}
                  style={{
                     width: "60vw",
                     marginTop: "60px",
                     display: "flex",
                     justifyContent: "space-between",
                  }}
               >
                  <input
                     style={{
                        width: "100%",
                        height: "40px",
                        borderRadius: "10px",
                        border: "none",
                        padding: "10px",
                     }}
                     placeholder="Titulo para tarefa"
                     value={titulo}
                     onChange={(e) => setTitulo(e.target.value)}
                  />
                  <input
                     className={style.input}
                     style={{
                        width: "100%",
                        height: "40px",
                        borderRadius: "10px",
                        border: "none",
                        padding: "10px",
                        marginLeft: "10px",
                     }}
                     placeholder="Descrição da tarefa"
                     value={tarefa}
                     onChange={(e) => setTarefa(e.target.value)}
                  />
                  <button
                     className={style.button}
                     style={{
                        width: "100%",
                        marginLeft: "20px",
                        borderRadius: "10px",
                        border: "none",
                     }}
                     onClick={() => addTask()}
                  >
                     Enviar
                  </button>
               </div>
               <div
                  className="divComponenteTodo"
                  style={{ overflow: "auto", height: "90%" }}
               >
                  {dados &&
                     dados.map((item, index) => {
                        return (
                           <TodoCard
                              key={index}
                              titulo={item.titulo}
                              tarefa={item.tarefa}
                              completo={item.completo}
                              data={formatarData(item.criado)}
                              handleCompleto={() => handleCompleto(item.id)}
                              handleDelete={() => {
                                 handleDelete(item.id);
                              }}
                           />
                        );
                     })}
               </div>
            </div>
         </div>
         {showAlert && (
            <>
               <Snackbar
                  autoHideDuration={2000}
                  open={showAlert}
                  onClose={handleClose}
               >
                  <Alert
                     onClose={handleClose}
                     severity="success"
                     sx={{ width: "100%" }}
                  >
                     Deletado com sucesso
                  </Alert>
               </Snackbar>
            </>
         )}
         {showError && (
            <>
               <Snackbar autoHideDuration={2000} open={showError}>
                  <Alert
                     variant="filled"
                     severity="error"
                     onClose={handleClose}
                  >
                     Complete os campos para poder proseguir!
                  </Alert>
               </Snackbar>
            </>
         )}
         {showIndicador && (
            <>
               <Snackbar
                  autoHideDuration={2000}
                  anchorOrigin={{ vertical, horizontal }}
                  open={showIndicador}
                  key={vertical + horizontal}
               >
                  <Alert
                     autoHideDuration={2000}
                     severity="success"
                     onClose={handleClose}
                  >
                     Tarefa editada com sucesso
                  </Alert>
               </Snackbar>
            </>
         )}
      </>
   );
}
