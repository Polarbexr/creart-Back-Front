import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="w-full h-16 bg-gray-900 text-white flex items-center p-4">
      {/* Icono y Link de descarga */}
      <div className="flex items-center mr-8 space-x-4">
        <span className="text-xl font-semibold">GoodPet</span>
        {/* Link de descarga */}
        <a
          href="../../assets/exe/Juego2D.exe"
          download
          className="text-green-400 hover:underline"
        >
          Descargar Juego
        </a>
      </div>

      {/* Pestañas */}
      <nav className="flex space-x-6"></nav>

      {/* Botones */}
      <div className="ml-auto flex space-x-6">
        {/* Botón de inicio de sesión */}
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg shadow-blue-500/50 border border-blue-300 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-700/50"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};
