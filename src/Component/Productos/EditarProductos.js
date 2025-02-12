import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApiProductos = "http://localhost:5268/api/Productoes";
const ApiCategorias = "http://localhost:5268/api/Categorias";

const EditarProductos = () => {
    const { id } = useParams(); // Captura el ID desde la URL
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducto();
        getCategorias();
    }, [id]);

    const getProducto = async () => {
        try {
            const respuesta = await axios.get(`${ApiProductos}/${id}`);
            setProducto(respuesta.data);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCategorias = async () => {
        try {
            const respuesta = await axios.get(ApiCategorias);
            setCategorias(respuesta.data);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${ApiProductos}/${id}`, producto);
            alert("Producto actualizado correctamente");
            navigate("/productos"); // Redirige a la lista de productos
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    if (loading) return <p className="text-center">Cargando...</p>;
    if (!producto) return <p className="text-center text-danger">No se encontró el producto</p>;

    return (
        <div className="container">
            <div className="card shadow-lg p-4">
                <h1 className="text-center">Editar Producto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            required
                            name="nombre"
                            value={producto.nombre}
                            onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            required
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input
                            className="form-control"
                            type="number"
                            required
                            name="precio"
                            value={producto.precio}
                            onChange={(e) => setProducto({ ...producto, precio: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                            className="form-control"
                            type="number"
                            required
                            name="stock"
                            value={producto.stock}
                            onChange={(e) => setProducto({ ...producto, stock: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Imagen (URL)</label>
                        <input
                            className="form-control"
                            type="text"
                            required
                            name="imagen"
                            value={producto.imagen}
                            onChange={(e) => setProducto({ ...producto, imagen: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <select
                            className="form-select"
                            name="categoriaId"
                            value={producto.categoriaId || ""}
                            onChange={(e) => setProducto({ ...producto, categoriaId: Number(e.target.value) })}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditarProductos;
