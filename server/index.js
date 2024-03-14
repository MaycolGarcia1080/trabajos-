const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud"
});

app.post("/create", (req, res) => {
  const { nombre, edad, pais, cargo, anios } = req.body;

  db.query(
    'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)',
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar empleado");
      } else {
        console.log("Empleado registrado con éxito:", result);
        res.send(result);
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query('SELECT * FROM empleados', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener empleados");
    } else {
      res.send(result);
    }
  });
});


app.put("/Update", (req, res) => {
  const { id, nombre, edad, pais, cargo, anios } = req.body;

  db.query(
    'UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',
    [nombre, edad, pais, cargo, anios, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar empleado");
      } else {
        console.log("Empleado Actualizado con éxito:", result);
        res.send(result);
      }
    }
  );
});

app.delete("/Eliminar/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM empleados WHERE id = ?',
    id,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al ELIMINAR empleado");
      } else {
        console.log("Empleado ELIMINADO con éxito:", result);
        res.send(result);
      }
    }
  );
});



app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
