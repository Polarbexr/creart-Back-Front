// src/pages/home/HomePage.jsx
import { Header } from "./Header";
import { Nav } from "./nav";
import { CardSection } from "./Card";
import { Slide } from "./Slide";
import { ProjectCard } from "./ProjectCard";
import { Footer } from "./Footer";
import banner12 from "../../assets/catalogo/banner12.png";
import banner9 from "../../assets/catalogo/banner9.png";
import banner15 from "../../assets/catalogo/banner15.png";
import banner16 from "../../assets/catalogo/banner16.png";
import { FAQReviews } from "./comentarios";

export const  HomePage = () => {
 

  return (
    <div>
                <Nav />
                <Header/>
                <CardSection/>
                <Slide imageUrl={banner15}/>
                <ProjectCard title={"Desarrollo de la mano con Laplace Software"} description={"Proyecto de desarrollo de software donde se pretenede automatizar servicios de veterinaria asi como implementar el uso de una aplicacion movil para la venta de productos online."} participants={"Laplace software, GoodPet"}/>
                <Slide imageUrl={banner16}/>
                <FAQReviews/>
                <Footer/>
          </div>
  );
}

