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

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

app.post("/create", (req, res) => {
  const { nombre, edad, pais, cargo, anios } = req.body;

  if (!nombre || !edad || !pais || !cargo || !anios) {
    return res.status(400).send("Por favor ingrese todos los datos antes de registrar.");
  }

  db.query(
    'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)',
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.error('Error al registrar empleado:', err);
        return res.status(500).send("Error al registrar empleado");
      }
      console.log("Empleado registrado con éxito:", result);
      res.send(result);
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query('SELECT * FROM empleados', (err, result) => {
    if (err) {
      console.error('Error al obtener empleados:', err);
      return res.status(500).send("Error al obtener empleados");
    }
    res.send(result);
  });
});


app.put("/Update", (req, res) => {
  const { id, nombre, edad, pais, cargo, anios } = req.body;

  db.query(
    'UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',
    [nombre, edad, pais, cargo, anios, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar empleado:', err);
        return res.status(500).send("Error al actualizar empleado");
      }
      console.log("Empleado actualizado con éxito:", result);
      res.send(result);
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
        console.error('Error al eliminar empleado:', err);
        return res.status(500).send("Error al eliminar empleado");
      }
      console.log("Empleado eliminado con éxito:", result);
      res.send(result);
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});  