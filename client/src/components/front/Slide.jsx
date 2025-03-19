import React from 'react';
import banner9 from "../../assets/catalogo/banner9.png";


export const Slide = ({ imageUrl, altText }) => {
  return (
    <div style={styles.slideContainer}>
      <img src={imageUrl} alt={altText} style={styles.image} />
    </div>
  );
};


const styles = {
  slideContainer: {
    width: "100%",  // El slide toma todo el ancho de la pantalla
    height: "600px",  // Altura fija de 600px
    overflow: "hidden",  // Asegura que la imagen no se salga de los límites
  },

  image: {
    width: "100%",  // La imagen ocupa todo el ancho del slide
    height: "100%",  // La imagen ocupa toda la altura disponible
    objectFit: "cover",  // Hace que la imagen cubra todo el área del contenedor sin distorsionarse
  },
};
