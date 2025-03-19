import { useState, useEffect } from "react";
import banner1 from "../../assets/catalogo/banner1.jpg";
import banner2 from "../../assets/catalogo/banner2.jpg";

export const Header = () => {
  const images = [banner1, banner2];
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMainImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.imageWrapper}>
        <img
          src={images[mainImageIndex]}
          alt="Main"
          style={styles.mainImage}
        />
        {/* Overlay */}
        <div style={styles.overlay}>
          {/* <h1 style={styles.overlayText}>Bienvenido a nuestro catálogo</h1> */}
        </div>
      </div>
    </div>
  );
};

const styles = {
  carouselContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },

  imageWrapper: {
    position: "relative", // Para posicionar el overlay correctamente
    width: "100%",
  },

  mainImage: {
    width: "100vw",
    height: "600px",
    objectFit: "cover",
    borderRadius: "12px",
    transition: "transform 0.3s ease",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Oscurece la imagen
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlayText: {
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    padding: "0 20px",
  },

  "@media (max-width: 768px)": {
    mainImage: {
      height: "400px",
    },
  },

  "@media (min-width: 1024px)": {
    carouselContainer: {
      width: "80vw",
    },
    mainImage: {
      height: "400px",
    },
  },

  "@media (min-width: 1600px)": {
    carouselContainer: {
      width: "60vw",
    },
    mainImage: {
      height: "400px",
    },
  },
};
