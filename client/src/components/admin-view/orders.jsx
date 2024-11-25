import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import * as XLSX from "xlsx"; // Importar xlsx para la generación de Excel

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  // Función para calcular ventas diarias, totales semanales y mensuales
  const calculateSales = () => {
    const dailySales = {};
    let weeklyTotal = 0;
    let monthlyTotal = 0;
    let totalAmount = 0; // Variable para el total de las órdenes

    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
    const currentMonth = currentDate.getMonth(); // 0 es enero, 1 es febrero, etc.

    orderList.forEach((order) => {
      const orderDate = new Date(order?.orderDate);
      const orderAmount = order?.totalAmount || 0;
      const orderWeek = getWeekNumber(orderDate);
      const orderMonth = orderDate.getMonth();

      // Sumar ventas diarias
      const orderDateString = orderDate.toISOString().split("T")[0];
      if (dailySales[orderDateString]) {
        dailySales[orderDateString] += orderAmount;
      } else {
        dailySales[orderDateString] = orderAmount;
      }

      // Sumar al total semanal si la orden es de la misma semana
      if (orderWeek === currentWeek) {
        weeklyTotal += orderAmount;
      }

      // Sumar al total mensual si la orden es del mismo mes
      if (orderMonth === currentMonth) {
        monthlyTotal += orderAmount;
      }

      // Sumar al total general
      totalAmount += orderAmount;
    });

    return { dailySales, weeklyTotal, monthlyTotal, totalAmount };
  };

  // Función para obtener el número de la semana del año
  const getWeekNumber = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const diff = date - startDate;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay / 7);
  };

  // Generar y descargar reporte en Excel
  const handleExportExcel = () => {
    const { dailySales, weeklyTotal, monthlyTotal } = calculateSales();

    // Crear datos para Excel
    const data = [
      { Date: "Date", Sales: "Daily Sales" },
      ...Object.entries(dailySales).map(([date, sales]) => ({
        Date: date,
        Sales: sales,
      })),
      { Date: "Total Weekly Sales", Sales: weeklyTotal },
      { Date: "Total Monthly Sales", Sales: monthlyTotal },
    ];

    // Crear hoja de Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

    // Exportar archivo
    XLSX.writeFile(workbook, "Sales_Report.xlsx");
  };

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const { totalAmount, weeklyTotal, monthlyTotal } = calculateSales(); // Obtener totales

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}

            {/* Fila con el total de las órdenes */}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold">
                Total Order Price:
              </TableCell>
              <TableCell>${totalAmount}</TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* Corte semanal */}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold">
                Total Weekly Sales:
              </TableCell>
              <TableCell>${weeklyTotal}</TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* Corte mensual */}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold">
                Total Monthly Sales:
              </TableCell>
              <TableCell>${monthlyTotal}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
          <Button onClick={handleExportExcel}>Download Sales Report</Button>

        </Table>
      </CardContent>
    </Card>
    
  );
}

export default AdminOrdersView;
