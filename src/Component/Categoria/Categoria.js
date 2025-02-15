import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Api = "http://localhost:5268/api/Categorias";

const Categoria = () => {

    const [Categoria, setCategoria] = useState([]);

    useEffect(()=> {
        getCategoria();
    },[]);

    const getCategoria = async()=> {
        try{
            const respuesta = await axios.get(Api)
            setCategoria(respuesta.data);
        }catch(error){
            console.error("Upss hubo un error al obtener datos",error);
        }

    }


    return(
        <div className="container mt-2">
            <h1 className="text-center mt-3">Categria</h1>
            <div>
                <Link className="btn btn-success mt-3">
                    Agregar
                </Link>
            
            </div>
            <div
                class="table-responsive mt-3"
            >
                <table
                    class="table"
                >
                    <thead class="table">                        
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Categoria.map((categoria)=> (
                            <tr
                                key={categoria.categoriaId}
                            >
                                <td>{categoria.categoriaId}</td>
                                <td>{categoria.nombre}</td>
                                <td>
                                    <Link className="btn btn-primary">
                                        Editar
                                    </Link>
                                </td>
                                <td>
                                    <Link className="btn btn-danger">
                                        Eliminar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
            
            
        </div>
    )

}
export default Categoria;