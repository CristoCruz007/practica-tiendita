import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cliente = () => {
    const Api = "http://localhost:5268/api/Clientes";

    const [Cliente, setCliente] = useState([]);

    useEffect(() => {
        getCliente();
    }, []);

    const getCliente = async () => {
        try {
            const respuesta = await axios.get(Api);
            setCliente(respuesta.data);
        } catch (error) {
            console.error("Upps hubo un error al obtener datos");
        }
    };

    const desativarCliente = async(id) => {
        const confirmancion = window.confirm("¿Estas seguro que desea aliminar este Cliente?");
        if(!confirmancion) return;
        try{
            await axios.put(`${Api}/desativar/${id}`);

            setCliente(Cliente.filter(cliente=> cliente.clienteId !== id));

        }catch(error){
            console.error("Upps error en desativar Cliente",error);
        }


    }

    return (
        <div className="container mt-2 p-2"> {/* Contenedor centrado con margen y padding */}
            <h1 className="text-center mb-4">Clientes</h1>
            <div>
                <Link to="/AgregarCliente">
                    <button className="btn btn-success mb-3">Agregar</button>
                </Link>
            </div>
            <table className="table table-bordered table-striped"> {/* Agrega bordes y franjas */}
                <thead className="thead-dark">
                    <tr>
                        <th>Cliente Id</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Estado</th>
                        <th>Código Postal</th>
                        <th>País</th>
                        <th>Editar</th>
                        <th>Eliminar</th>

                    </tr>
                </thead>
                <tbody>
                    {Cliente.map((cliente) => (
                        <tr key={cliente.clienteId}>
                            <td>{cliente.clienteId}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.ciudad}</td>
                            <td>{cliente.estado}</td>
                            <td>{cliente.codigoPostal}</td>
                            <td>{cliente.pais}</td>
                            <td>
                                <Link to={`/EditarCliente/${cliente.clienteId}`}>
                                    <button className="btn btn-primary mt-2">Editar</button>
                                </Link>
                            </td>
                            <td>
                                
                                <button className="btn btn-danger mt-2" onClick={()=> desativarCliente(cliente.clienteId)}>Editar</button>
                                
                            </td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Cliente;
