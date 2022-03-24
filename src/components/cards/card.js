import React, { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialog";

export default function Card(props){
    const [open, setOpen] = useState(false);

    const handleClickCard = () => {
        setOpen(true);
    };

    return(
        <>
            <FormDialog
                open={open}
                setOpen={setOpen}
                name={props.name}
                category={props.category}
                cost={props.cost}
                situation={props.situation}
                listCard={props.listCard}
                setListCard={props.setListCard}
                id={props.id}
            />
            <div className="card-container" onClick={() => handleClickCard()}>
                <h1 className="title">{props.name}</h1>
                <p className="id">ID: {props.id}</p>
                <p className="category">Gênero: {props.category}</p>
                <p className="cost">R$ {props.cost}</p>
                <p className="situation">{props.situation}</p>
            </div>
        </>
    )
}