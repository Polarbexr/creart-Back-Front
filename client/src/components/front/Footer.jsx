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
      
      {/* Mapa */}
      <div className="mt-6 w-full h-64">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9559283153189!3d-37.81720974201416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1649302727326!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      {/* Redes Sociales */}
      <div className="mt-6 flex justify-center space-x-4">
        <a href="#" className="text-gray-400 hover:text-white transition">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </footer>
  );
};
