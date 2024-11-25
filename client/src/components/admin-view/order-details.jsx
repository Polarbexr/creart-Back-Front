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

  // Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Order Details", 20, 10);
    doc.text(`Order ID: ${orderDetails?._id}`, 20, 20);
    doc.text(`Order Date: ${orderDetails?.orderDate.split("T")[0]}`, 20, 30);
    doc.text(`Order Price: $${orderDetails?.totalAmount}`, 20, 40);
    doc.text(`Payment Method: ${orderDetails?.paymentMethod}`, 20, 50);
    doc.text(`Payment Status: ${orderDetails?.paymentStatus}`, 20, 60);
    doc.text(`Order Status: ${orderDetails?.orderStatus}`, 20, 70);
    doc.text("Order Items:", 20, 80);

    let yPosition = 90;
    orderDetails?.cartItems?.forEach((item) => {
      doc.text(`Title: ${item.title}`, 20, yPosition);
      doc.text(`Quantity: ${item.quantity}`, 100, yPosition);
      doc.text(`Price: $${item.price}`, 160, yPosition);
      yPosition += 10;
    });

    doc.save("order_details.pdf");
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
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
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
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
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
            Export to PDF
          </button>
          <button
            type="button"
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Export to Excel
          </button>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
