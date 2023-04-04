import api from "@/axios/api";
import React, { useEffect, useState } from "react";

const TerceiraTela = () => {
   const [resposta, setResposta] = useState("");

   const handleDados = async () => {
      try {
         const response = await api.post("/api/bomdiaNome", {
            nome: "Felipe silva",
         });
         setResposta(response.data.message);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleDados();
   }, []);
   return (
      <>
         <div>
            TerceiraTela
            {resposta && <p>{resposta}</p>}
         </div>
      </>
   );
};

export default TerceiraTela;
