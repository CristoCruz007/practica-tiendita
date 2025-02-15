import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ApiCliente = "http://localhost:5268/api/Clientes";

const EditarCliente = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [cargar,setcargar] = useState();

    const [cliente,setClientes]= useState({
        nombre: "",
        apellido: "",
        email: "",
        direccion: "",
        telefono: "",
        ciudad: "",
        estado: "",
        codigoPostal: "",
        pais: "",

    });

    useEffect(()=> {
        getClintes();
    },[id])
    
    const getClintes = async () => {
        try{
            const respuestas = await axios.get(`${ApiCliente}/${id}`);
            setClientes(respuestas.data);
        }catch(error){
            console.error("Upps ubo un error con los daots",error);
        }finally{
            setcargar(false);
        }
    }
    const handleChange = (e) => {
        setClientes({...cliente,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        await axios.put(`${ApiCliente}/${id}`,cliente);
        alert("Se Actualizo correctamente");
        navigate("/Cliente")
    }
    if (cargar) return <p className="text-center">Cargando...</p>;
    if (!cliente) return <p className="text-center text-danger">No se encontró el producto</p>;

    
    return(

        <div className="container mt-3">
            
            <div className="card shadow-lg mt-2 p-3">
                <h1 className="text-center">Editar Cliente</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" name="nombre"value={cliente.nombre} required onChange={handleChange}  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input type="text" className="form-control" name="apellido" value={cliente.apellido} onChange={handleChange}  required  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={cliente.email} onChange={handleChange}  required  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            name="telefono"
                            value={cliente.telefono}
                            maxLength="10"
                            required
                            onChange={handleChange} 
                            
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <textarea className="form-control" name="direccion" rows="3" value={cliente.direccion} onChange={handleChange} ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ciudad</label>
                        <input type="text" className="form-control" name="ciudad" value={cliente.ciudad} required onChange={handleChange}  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Estado</label>
                        <input type="text" className="form-control" name="estado" value={cliente.estado} required  onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Código Postal</label>
                        <input
                            type="text"
                            className="form-control"
                            name="codigoPostal"
                            maxLength="5"
                            value={cliente.codigoPostal}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">País</label>
                        <input type="text" className="form-control" name="pais" value={cliente.pais} required onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Agregar Cliente
                    </button>
                </form>              
            </div>
            
        </div>
    )
}
export default EditarCliente;