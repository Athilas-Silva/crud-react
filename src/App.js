import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from "axios";
import Card from './components/cards/card';

function App() {
  // Pegando os valores dos inputs
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState([]);
  console.log(listGames);

  const handleChangeValues = (value) =>{
    setValues(prevValues =>({
      ...prevValues,
      [value.target.name] : value.target.value,
    }));
  };

  const handleClickButton = () =>{
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
      situation: values.situation
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        cost: values.cost,
        category: values.category,
        situation: values.situation
      }).then((response) => {
        setListGames([
          ...listGames,
          {
            id: response.data[0].id,
            name: values.name,
            cost: values.cost,
            category: values.category,
            situation: values.situation
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((res) => {
      setListGames(res.data)
    });
  }, []);

  return (
    <main className="container">
      <h1 className="title-container">Faça sua lista de jogos</h1>
      <div className="register">
        <h1>Lista</h1>

        <input type="text" name="name" placeholder="Nome" className="register-input" onChange={handleChangeValues} />
        <input type="text" name="cost" placeholder="Preço" className="register-input" onChange={handleChangeValues} />
        <input type="text" name="category" placeholder="Categoria" className="register-input" onChange={handleChangeValues} />
        <input type="text" name="situation" placeholder="Comprar ou Vender" className="register-input" onChange={handleChangeValues} />

        <button onClick={() => handleClickButton()}><span>Cadastrar</span></button>
      </div>

      <div className="content">
      { typeof listGames !== "undefined" && listGames.map((value) => {
        return (
          <Card
          key={value.id}
          listCard={listGames}
          setListCard={setListGames}
          id={value.id}
          name={value.name}
          cost={value.cost}
          category={value.category}
          situation={value.situation}
          />
          )
        })
      }
      </div>
    </main>
  );
}

export default App;
