export const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidad</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Términos de Servicio</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Contacto</a>
          </div>
        </div>
      </footer>
    );
  };