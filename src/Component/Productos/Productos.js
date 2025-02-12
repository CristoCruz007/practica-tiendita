import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Api = "http://localhost:5268/api/Productoes";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        setLoad(true);
        try {
            const respuesta = await axios.get(Api);
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error al cargar los datos", error);
        } finally {
            setLoad(false);
        }
    };

    const desactivarProducto = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que quieres desactivar este producto?");
        if (!confirmacion) return;

        try {
            await axios.put(`${Api}/desactivar/${id}`);
            setProductos(productos.filter(producto => producto.productoId !== id)); // Actualizar la lista
        } catch (error) {
            console.error("Error al desactivar el producto", error);
        }
    };

    if (load) {
        return (
            <div>
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="container mt-2 p-2">
            <h1 className="text-center">Productos</h1>
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
                    {productos.map((producto) => (
                        <tr key={producto.productoId}>
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
                                <button className="btn btn-danger" onClick={() => desactivarProducto(producto.productoId)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Productos;
