import { Switch } from "@mui/material";
import React, { useState } from "react";
import style from "../styles/todoCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
const TodoCard = ({
  titulo,
  tarefa,
  completo,
  handleCompleto,
  handleDelete,
  data,
}) => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      <div
        className={style.divContainer}
        style={{
          width: "60vw",
          marginTop: "50px",
          display: "flex",
          backgroundColor: completo ? "grey" : "white",
          borderRadius: "10px",
          padding: "10px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="divTask">
          <p>{titulo}</p>
          <p>{tarefa}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>{data}</p>
          <Switch checked={completo} onChange={handleCompleto} />
          <DeleteIcon color="secundary" onClick={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default TodoCard;
