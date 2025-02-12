import axios from "axios";
import { useEffect, useState } from "react";
const ApiProductos = "http://localhost:5268/api/Productoes";
const ApiCategoria = "http://localhost:5268/api/Categorias";
const ProductosAgregar = () => {
    
    const [producto,setProductos] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
        categoriaId: "",
    })
    const handleChange = (e) => {
        setProductos({ ...producto, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(ApiProductos,producto);
            alert("El producto agregado con exito");

        }catch(error){
            console.error("Error al agregar el productoos",error)
        }
    }
    const [categoria,setCategoria] = useState([]);

    useEffect(()=> {
        getCategoria();
    },[])

    const getCategoria = async ()=> {

        const respuesta = await axios.get(ApiCategoria)
        setCategoria(respuesta.data);

    }

    return(
        <div className="container mt-2">
            <div className="card shadow-lg p-4">
                <h1 className="text-center">Agregar</h1>
                <form  onSubmit={handleSubmit}>
                    {/*Nombre de producto */}
                    <div className="mb-3">
                        <label className="form-label">
                            Nombre
                        </label>
                        <input 
                        className="form-control"
                        type="text"
                        value={producto.nombre}
                        onChange={handleChange}
                        required
                        name="nombre"
                        placeholder="Ingresa el nombre"
                        >
                        </input>
                    </div>
                    { /* Descripcion */      }
                    <div className="mt-3">
                        <label className="form-label">
                            Descripcion
                        </label>

                        <textarea 
                        className="form-control"
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa la descripcion"
                        >
                        </textarea>
                    </div>
                    {/*pRECIO */}
                    
                    <div className="mb-3">
                        <label className="form-label">
                            Precio
                        </label>
                        <input 
                        className="form-control"
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        placeholder="Ingresa el precio"
                        required
                        >
                        </input>

                    </div>
                    {/* Stock */}
                   <div className="mb-3">
                        <label className="form-label">
                            Stock
                        </label>
                        <input 
                            className="form-control"
                            type="number"
                            name="stock"
                            value={producto.stock}
                            placeholder="Ingresa el Stock"
                            onChange={handleChange}
                            required
                        >
                        </input>

                   </div>
                   {/* imagen */}
                   <div className="mb-3">
                        <label className="form-label">
                            Imagen
                        </label>
                        <input 
                            className="form-control"
                            name="imagen"
                            type="text"
                            value={producto.imagen}
                            onChange={handleChange}
                            placeholder="Ingresa la url de la imagen"
                            required
                        >
                        </input>
                   </div>
                   {/* CATEGORIA */}
                   <div className="mb-3">
                        <label className="form-label">
                            Categoria
                        </label>
                        <select 
                            className="form-control"
                            name="categoriaId"
                            type="text"
                            value={producto.categoriaId}
                            onChange={handleChange}
                            placeholder="Ingresa la url de la categoria"
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categoria.map((categorias) => (
                                <option key={categorias.categoriaId} value={categorias.categoriaId}>
                                    {categorias.nombre}
                                </option>
                            ))}
                        </select>
                   </div>

                   {/* Botón de Enviar */}
                    <button type="submit" className="btn btn-success w-100">
                        Agregar Producto
                    </button>

                </form>

            </div>
        </div>
    );
}
export default ProductosAgregar;
