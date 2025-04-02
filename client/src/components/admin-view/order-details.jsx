import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Función para manejar la actualización de estado
  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  // Función para exportar a PDF con formato de ticket
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    // Título y líneas decorativas
    doc.setTextColor(0, 0, 0);
    doc.text("TICKET DE PEDIDO", 20, 10);
    doc.text("**************************************", 20, 15);
    
    // Detalles del pedido
    doc.text(`ID del pedido: ${orderDetails?._id}`, 20, 25);
    doc.text(`Fecha: ${orderDetails?.orderDate.split("T")[0]}`, 20, 30);
    doc.text(`Total: $${orderDetails?.totalAmount}`, 20, 35);
    doc.text(`Método de pago: ${orderDetails?.paymentMethod}`, 20, 40);
    doc.text(`Estado de pago: Pagado`, 20, 45);

    // Estado de la orden con color
    doc.setTextColor(
      orderDetails?.orderStatus === "confirmed"
        ? 0
        : orderDetails?.orderStatus === "rejected"
        ? 255
        : 0
    );
    doc.text(`Estatus: ${orderDetails?.orderStatus}`, 20, 50);
    doc.setTextColor(0, 0, 0); // Reset color
    
    // Línea decorativa
    doc.text("**************************************", 20, 55);
    
    // Detalles de los productos
    doc.text("Productos:", 20, 60);
    let yPosition = 65;
    orderDetails?.cartItems?.forEach((item) => {
      doc.text(`Nombre: ${item.title}`, 20, yPosition);
      doc.text(`Cantidad: ${item.quantity}`, 100, yPosition);
      doc.text(`Precio: $${item.price}`, 140, yPosition);
      yPosition += 6;
    });
    
    // Línea final
    doc.text("**************************************", 20, yPosition + 5);
    doc.text(`Sucursal: ${user.userName}`, 20, yPosition + 10);
    doc.text(`${orderDetails?.addressInfo?.address}`, 20, yPosition + 15);
    doc.text(`${orderDetails?.addressInfo?.city} ${orderDetails?.addressInfo?.pincode}`, 20, yPosition + 20);
    doc.text(`${orderDetails?.addressInfo?.phone}`, 20, yPosition + 25);
    
    // Guardar el PDF
    doc.save("ticket_pedido.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      orderDetails?.cartItems.map((item) => ({
        Title: item.title,
        Quantity: item.quantity,
        Price: item.price,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Order Details");
    XLSX.writeFile(wb, "order_details.xlsx");
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Fecha de pedido</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Total</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Metodo de pago</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Estatus de pago</p>
            <Label>Pagado</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Estado de pedido</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Detalles</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Detalle: {item.title}</span>
                      <span>Cantidad: {item.quantity}</span>
                      <span>Precio: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Informacion de la sucursal</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Estatus del pedido",
                name: "status",
                componentType: "select",
                options: [
                  { id: "inProcess", label: "En proceso" },
                  { id: "delivered", label: "Entregado" },
                  { id: "rejected", label: "Rechazado" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Actualizar estado de pedido"}
            onSubmit={handleUpdateStatus}
          />
        </div>

        {/* Botones para exportar a PDF y Excel */}
        <div className="mt-4 flex gap-4">
          <button
            type="button"
            onClick={exportToPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Exportar PDF
          </button>
          
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
