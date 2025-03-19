import React from 'react';
import banner10 from "../../assets/catalogo/banner10.jpg";
import banner11 from "../../assets/catalogo/banner11.png";


export const ProjectCard = ({  title, description, participants }) => {
  return (
    <div style={styles.cardContainer}>
      <div style={styles.imageContainer}>
        <img src={banner11} alt={title} style={styles.image} />
      </div>
      <div style={styles.infoContainer}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{description}</p>
        <p><strong>Participantes:</strong> {participants}</p>
        <div style={styles.imageRow}>
          <img src={banner10} alt="image1" style={styles.bottomImage} />
          <img src={banner10} alt="image2" style={styles.bottomImage} />
          <img src={banner10} alt="image3" style={styles.bottomImage} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    alignItems: "center", // Centrado vertical
    justifyContent: "center", // Centrado horizontal
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    maxWidth: '600px', // Ancho máximo
    width: '100%', // Ocupa todo el ancho disponible
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '100px auto',
     // Centrado horizontal (margen automático) y espaciado superior/inferior
    flexDirection: 'row',
  },
  imageContainer: {
    width: '50%',
    overflow: 'hidden',
    marginLeft: 50,
    marginRight: 50,
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  infoContainer: {
    padding: '20px',
    width: '100%', // Se mantiene en 100% para ocupar todo el espacio disponible
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Centrado del contenido
    textAlign: 'center', // Asegura que todo el texto esté centrado
    paddingTop: '20px', // Padding arriba
    paddingBottom: '20px', // Padding abajo
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
    marginBottom: "12px",
  },
  imageRow: {
    display: 'flex',
    justifyContent: 'space-between', // Espacio entre las imágenes
    marginTop: '20px',
    width: '100%',
  },
  bottomImage: {
    width: '30%', // Toma un 30% del ancho para cada imagen
    height: 'auto',
    objectFit: 'cover',
  },
};
