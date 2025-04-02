import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
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
        {/* Sección de información */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="p-8 flex flex-col justify-center bg-primary text-white"
        >
          <h1 className="text-4xl font-bold">Bienvenido a GoodPet Admin</h1>
          <p className="mt-4 text-lg">
            Administra tu negocio con facilidad. Inicia sesión para continuar.
          </p>
          <p className="mt-6 text-sm">
            ¿No tienes una cuenta?
          </p>
          <Link to="/auth/register" className="mt-2 inline-block bg-white text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200">
            Regístrate aquí
          </Link>
        </motion.div>

        {/* Sección del formulario */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="p-8 flex flex-col justify-center"
        >
          <CommonForm
            formControls={loginFormControls}
            buttonText={"Ingresar"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AuthLogin;