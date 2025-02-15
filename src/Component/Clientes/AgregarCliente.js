import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApiCliente = "http://localhost:5268/api/Clientes";

const AgregarCliente = () => {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nombre: "",
        apellido: "",
        email: "",
        direccion: "",
        telefono: "",
        ciudad: "",
        estado: "",
        codigoPostal: "",
        pais: "",
        status: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // Validación para que solo acepte números en teléfono y código postal
        if (name === "telefono" || name === "codigoPostal") {
            newValue = value.replace(/[^0-9]/g, "");
        }

        setCliente({ ...cliente, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(ApiCliente, cliente);
            alert("El cliente se agregó correctamente");
            navigate("/Cliente");
        } catch (error) {
            console.error("Error al agregar los datos", error);
        }
    };

    return (
        <div className="container mt-3">
            <div className="card shadow-lg p-4">
                <h1 className="text-center">Agregar Cliente</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" name="nombre" placeholder="Ingresa el Nombre" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input type="text" className="form-control" name="apellido" placeholder="Ingresa el apellido" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" placeholder="abc@mail.com" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            name="telefono"
                            placeholder="Ingresa el número"
                            maxLength="10"
                            required
                            value={cliente.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <textarea className="form-control" name="direccion" rows="3" onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ciudad</label>
                        <input type="text" className="form-control" name="ciudad" placeholder="Ingresa la ciudad" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Estado</label>
                        <input type="text" className="form-control" name="estado" placeholder="Ingresa el estado" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Código Postal</label>
                        <input
                            type="text"
                            className="form-control"
                            name="codigoPostal"
                            placeholder="Ingresa el código postal"
                            maxLength="5"
                            required
                            value={cliente.codigoPostal}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">País</label>
                        <input type="text" className="form-control" name="pais" placeholder="Ingresa el país" required onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Agregar Cliente
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AgregarCliente;
