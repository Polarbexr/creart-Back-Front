import { Outlet } from "react-router-dom";
import { Nav } from "../front/nav";
import { Header } from "../front/Header";
import { CardSection } from "../front/Card";
import {Slide} from "../front/Slide"
import { Footer } from "../front/Footer";
import { ProjectCard } from "../front/ProjectCard";
import banner12 from "../../assets/catalogo/banner12.png";
import banner9 from "../../assets/catalogo/banner9.png";


function AuthLayout() {

  return (
      <div>
            <Nav />
            <Header/>
            <CardSection/>
            <Slide imageUrl={banner9}/>
            <ProjectCard title={"Desarrollo de la mano con Laplace Software"} description={"Proyecto de desarrollo de software donde se pretenede automatizar servicios de veterinaria asi como implementar el uso de una aplicacion movil para la venta de productos online."} participants={"Laplace software, GoodPet"}/>
            <Slide imageUrl={banner12}/>
            {/* <Outlet/> */}
            <Footer/>
      </div>
  );
}

export default AuthLayout;
