import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./Component/Inicio/Inicio.js";  
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Component/Navbar/Navbar.js";
import Cliente from "./Component/Clientes/Clientes.js";
import Productos from "./Component/Productos/Productos.js";
import ProductosAgregar from "./Component/Productos/ProductosAgregar.js";
import EditarProductos from "./Component/Productos/EditarProductos.js";
import AgregarCliente from "./Component/Clientes/AgregarCliente.js";
import EditarCliente from "./Component/Clientes/EditarCliente.js";
import Categoria from "./Component/Categoria/Categoria.js";

function App() {
  return (
    <BrowserRouter>
      {/* Coloca el Navbar fuera de Routes */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Cliente" element={<Cliente />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/ProductosAgregar" element={<ProductosAgregar />} />
        <Route path="/EditarProductos/:id" element={<EditarProductos />} />
        <Route path="/AgregarCliente" element={<AgregarCliente />} />
        <Route path="/EditarCliente/:id" element={<EditarCliente></EditarCliente>}></Route>
        <Route path="/Categoria" element={<Categoria />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
