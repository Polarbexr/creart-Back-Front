import React from 'react';
import banner4 from "../../assets/catalogo/banner4.png";
import banner11 from "../../assets/catalogo/banner11.png";
import banner13 from "../../assets/catalogo/banner13.jpg";
import banner14 from "../../assets/catalogo/banner14.png";
import banner17 from "../../assets/catalogo/banner17.png";
import banner18 from "../../assets/catalogo/banner18.jpg";
import banner19 from "../../assets/catalogo/banner19.png";
import banner20 from "../../assets/catalogo/banner20.jpg";
import banner21 from "../../assets/catalogo/banner21.jpg";
import banner22 from "../../assets/catalogo/banner22.png";
import banner24 from "../../assets/catalogo/banner24.png";


export const ProjectCard = ({ title, description, participants }) => {
  return (
    <div style={styles.cardContainer}>
      <div style={styles.imageContainer}>
        <img src={banner4} alt={title} style={styles.image} />
      </div>
      <div style={styles.infoContainer}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{description}</p>
        <p><strong>Participantes:</strong> {participants}</p>
        <div style={styles.imageRow}>
          <img src={banner14} alt="image1" style={styles.bottomImage} />
          <img src={banner22} alt="image2" style={styles.bottomImage} />
          <img src={banner24} alt="image3" style={styles.bottomImage} />
        </div>
      </div>
      <div style={styles.teamContainer}>
        <img src={banner11} alt="Logo" style={styles.logo} />
        <h4 style={styles.teamTitle}>Equipo</h4>
        <div style={styles.teamList}>
          <div style={styles.teamRow}>
            <div style={styles.memberCard}>
              <img src={banner21} alt="Bryan" style={styles.memberPhoto} />
              <p style={styles.memberName}>Bryan Josué Ortega Casillas</p>
              <p style={styles.memberRole}>Frontend</p>
            </div>
            <div style={styles.memberCard}>
              <img src={banner20} alt="Ulises" style={styles.memberPhoto} />
              <p style={styles.memberName}>Ulises Efrain Hernandez Suñiga</p>
              <p style={styles.memberRole}>Backend</p>
            </div>
          </div>
          <div style={styles.teamRow}>
            <div style={styles.memberCard}>
              <img src={banner17} alt="Patricia" style={styles.memberPhoto} />
              <p style={styles.memberName}>Patricia Marlene Rosas Chavez</p>
              <p style={styles.memberRole}>Diseñador UX/UI</p>
            </div>
            <div style={styles.memberCard}>
              <img src={banner18} alt="Samuel" style={styles.memberPhoto} />
              <p style={styles.memberName}>Samuel Giles Cisneros</p>
              <p style={styles.memberRole}>Project Manager</p>
            </div>
          </div>
          <div style={styles.teamRow}>
            <div style={styles.memberCard}>
              <img src={banner19} alt="Carlos" style={styles.memberPhoto} />
              <p style={styles.memberName}>Carlos Arnulfo Preciado Rodriguez</p>
              <p style={styles.memberRole}>QA Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxWidth: '1200px',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '50px auto',
    padding: '20px',
    flexDirection: 'row',
    textAlign: 'center',
  },
  imageContainer: {
    width: '30%',
    overflow: 'hidden',
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  infoContainer: {
    padding: '20px',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
    width: '100%',
  },
  bottomImage: {
    width: '30%',
    height: 'auto',
    objectFit: 'cover',
  },
  teamContainer: {
    width: '30%',
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '100px',
    height: 'auto',
    marginBottom: '10px',
  },
  teamTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  teamList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '10px',
  },
  memberCard: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column', // Asegura que la imagen esté arriba del nombre
    alignItems: 'center', // Centra la imagen con el nombre
    marginBottom: '10px', // Añadido margen para separar un poco más las tarjetas
  },
  memberPhoto: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '8px', // Separar imagen del nombre
  },
  memberName: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px', // Separar nombre del rol
  },
  memberRole: {
    fontSize: '12px',
    color: '#6b7280',
  },
};
