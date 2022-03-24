//Iniciando a conexão com o servidor
const express = require("express");
const app = express();

const cors = require("cors");

//conectando com o MYSQL
const mysql =require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudgames"
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    const { situation } = req.body;

    let sql = "INSERT INTO games ( name, cost, category, situation ) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, cost, category, situation], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.post("/search", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    const { situation } = req.body;

    let sql = "SELECT * FROM games WHERE name = ? AND cost = ? AND category = ? AND situation = ?";

    db.query(sql, [name, cost, category, situation], (err, result) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

app.get("/getCards", (req, res) => {
    let sql = "SELECT * from games";

    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    const { situation } = req.body;

    let sql = "UPDATE games SET name = ?, cost = ?, category = ?, situation = ? WHERE id = ?";

    db.query(sql, [name, cost, category, situation, id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let sql = "DELETE FROM games WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001")
})