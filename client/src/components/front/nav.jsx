import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();
  return (

    <div className="w-full h-16 bg-gray-900 text-white flex items-center p-4">
    {/* Icono */}
    <div className="flex items-center mr-8">
      {/* <User className="w-8 h-8 mr-2" /> */}
      <span className="text-xl font-semibold">GoodPet</span>
    </div>

    {/* Pestañas */}
    <nav className="flex space-x-6">
      <a href="#" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg">
        {/* <Home className="w-5 h-5" /> */}
        <span>Inicio</span>
      </a>
      <a href="#" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg">
        {/* <Info className="w-5 h-5" /> */}
        <span>Nosotros</span>
      </a>
      <a href="#" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg">
        {/* <Box className="w-5 h-5" /> */}
        <span>Productos</span>
      </a>
      <a href="#" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg">
        {/* <Info className="w-5 h-5" /> */}
        <span>Información</span>
      </a>
    </nav>

    {/* Botón de inicio de sesión */}
    <div className="ml-auto">
      <button onClick={navigate("/authLogin ")} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
        {/* <LogIn className="w-5 h-5 mr-2" /> */}
        Iniciar sesión
      </button>
    </div>
  </div>
      );  
}
