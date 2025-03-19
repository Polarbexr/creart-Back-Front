import banner5 from "../../assets/catalogo/banner5.png";
import banner6 from "../../assets/catalogo/banner6.png";
import banner7 from "../../assets/catalogo/banner7.png";
import banner8 from "../../assets/catalogo/banner8.png";


const Card = ({ title, subtitle, logo }) => {
    return (
      <div style={styles.card}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>
    );
  };
  
  export const CardSection = () => {
    const cards = [
      {
        title: "Consulta General",
        subtitle: "Nuestros veterinarios están listos para evaluar su salud, diagnosticar problemas y ofrecer el mejor tratamiento",
        logo: banner5,
      },
      {
        title: "Limpieza ",
        subtitle: "Ofrecemos limpiezas dentales profesionales para prevenir problemas de encías y mal aliento en tus mascotas.",
        logo: banner7,
      },
      {
        title: "Vacunación",
        subtitle: "Protege a tu mascota de enfermedades comunes. Administramos vacunas y antiparasitarios de manera segura.",
        logo: banner6,
      },
      {
        title: "Estética",
        subtitle: "Haz que tu mascota luzca increíble! Ofrecemos cortes de pelo, baños medicados y cuidado de uñas para que tu mejor amigo se sienta feliz.",
        logo: banner8,
      },
    ];
  
    return (
      <div style={styles.container}>
        {/* TÍTULO LLAMATIVO */}
        <h1 style={styles.heading}>🔥 Tus Mejores Opciones 🔥</h1>
  
        {/* SECCIÓN DE CARDS */}
        <div style={styles.section}>
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    );
  };
  
  const styles = {
    container: {
      width: "100vw", // Ocupa el 100% del ancho de la pantalla
      padding: "20px",
      paddingTop: 100,
      paddingBottom: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  
    heading: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#1f2937",
      textAlign: "center",
      marginBottom: "24px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  
    section: {
      display: "flex",
      flexDirection: "row",
      gap: "16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap", // Permite que las cards salten a una nueva línea si no hay espacio suficiente
      width: "100%", // Ocupa el 100% del ancho
    },
  
    card: {
      width: "100%", // Ocupa el 100% disponible del contenedor
      maxWidth: "300px", // Limita el tamaño máximo de cada card para que no se deformen
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
  
    logo: {
      width: "150px",
      height: "150px",
      marginBottom: "12px",
    },
  
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "8px",
    },
  
    subtitle: {
      fontSize: "16px",
      color: "#6b7280",
      textAlign: "center",
    },
  
    // Hover para la card
    cardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    },
  };
  