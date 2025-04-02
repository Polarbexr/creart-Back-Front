import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      transition={{ duration: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-gray-100"
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        {/* Sección del formulario */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="p-8 flex flex-col justify-center"
        >
          <CommonForm
            formControls={registerFormControls}
            buttonText={"Crear cuenta"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </motion.div>
        
        {/* Sección de información */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="p-8 flex flex-col justify-center bg-primary text-white"
        >
          <h1 className="text-4xl font-bold">Crea una nueva cuenta</h1>
          <p className="mt-4 text-lg">
            Únete a GoodPet Admin y gestiona tu negocio fácilmente.
          </p>
          <p className="mt-6 text-sm">
            ¿Ya tienes una cuenta?
          </p>
          <Link to="/auth/login" className="mt-2 inline-block bg-white text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200">
            Ingresar
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AuthRegister;