import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(""); 
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [id, setId] = useState("");

  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleados] = useState([]);

  useEffect(() => {
    getEmpleados();
  }, []);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      anios: anios,
      cargo: cargo
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado  <strong>" + nombre + "</strong> fue registrado con exito!</i>",
        icon: 'sucess',
        timer: 2000
      })
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Agregar!",
        footer: error.message  
      });
    });

  };

  const update = () => {
    Axios.put("http://localhost:3001/Update", {
      id,
      nombre,
      edad,
      pais,
      anios,
      cargo
    })
    .then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion  Exitosa!!!</strong>",
        html: "<i>El empleado  <strong>" + nombre + "</strong> fue Actualizado  con exito!</i>",
        icon: 'sucess',
        timer: 2000
      })
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró actualizar!",
        footer: error.message  
      });
    });
  };

  const deleteEmple = (val) => {
    Swal.fire({
      title: "Confirmar eliminacion",
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "sí, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/Eliminar/${val.id}`)
          .then(() => {
            getEmpleados();
            limpiarCampos();
  
            Swal.fire({
              title: "Eliminado",
              html: "<i> "+val.nombre+" fue eliminado.</i>",
              icon: "sucess",
              timer: 3000
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logró Eliminar!",
              footer: error.message  
            });
          });
      }
    });
  };
  
  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setEditar(false);
  }



  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  return (
    <div className="container small-container">
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE ESTUDUANTES
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={nombre}
              placeholder="Ingrese Nombre"
              aria-label="Nombre"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">Edad:</span>
            <input
              type="number"
              value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Edad"
              aria-label="Edad"
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">País:</span>
            <input
              type="text"
              value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese País"
              aria-label="País"
              aria-describedby="basic-addon3"
            />
          </div>
          
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">Materias:</span>
            <input
              type="text"
              value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Las materias"
              aria-label="Cargo"
              aria-describedby="basic-addon4"
            />
          </div>
          
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon5">Nota:</span>
            <input
              type="number"
              value={anios}
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Nota"
              aria-label="Nota"
              aria-describedby="basic-addon5"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar ? 
            <div>
            <button className="btn btn-warning m-2" onClick={update}>
              Actualizar
            </button> <button className="btn btn-info m-2" onClick={limpiarCampos}>
              Cancelar
            </button>
            </div>
           : 
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          }
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Notas</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Acciones">
                    <button
                      type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button type="button" 
                    onClick={()=>{
                      deleteEmple(val);
                    }}
                    className="btn btn-danger">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
