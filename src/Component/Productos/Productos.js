import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Api = "http://localhost:5268/api/Productoes"

const Productos = () =>{

    const [Productos,setProductos] = useState([]);
    const [load,setload] = useState(false);
    useEffect(()=> {
        getProductos();
    }, []);

    const getProductos = async()=> {
        try{
            const respusta = await axios.get(Api);
            setProductos(respusta.data);
        }catch(error){
            console.error("Upps errro en cargar los datos");
        }
        finally{
            setload(false);
        }
        
    }
    if(load){
        <div>
            <p>
                Cargando...
            </p>
        </div>
    }
    return(
        <div className="container mt-2 p-2">
            <h1 className="text-center ">Productos</h1>
            <div>
                <Link to="/ProductosAgregar" className="btn btn-success mb-4 mt-2">
                    Agregar
                </Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {Productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.productoId}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <Link to={`/EditarProductos/${producto.productoId}`} className="btn btn-primary">
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <Link className="btn  btn-danger">
                                    Eliminar
                                </Link>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    )

}
export default Productos;