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
import * as XLSX from "xlsx";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#F44336", "#FF9800", "#2196F3"];

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const calculateSales = () => {
    const dailySales = {};
    let weeklyTotal = 0;
    let monthlyTotal = 0;
    let totalAmount = 0;

    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
    const currentMonth = currentDate.getMonth();

    orderList.forEach((order) => {
      const orderDate = new Date(order?.orderDate);
      const orderAmount = order?.totalAmount || 0;
      const orderWeek = getWeekNumber(orderDate);
      const orderMonth = orderDate.getMonth();

      const orderDateString = orderDate.toISOString().split("T")[0];
      dailySales[orderDateString] = (dailySales[orderDateString] || 0) + orderAmount;

      if (orderWeek === currentWeek) weeklyTotal += orderAmount;
      if (orderMonth === currentMonth) monthlyTotal += orderAmount;
      totalAmount += orderAmount;
    });

    return { dailySales, weeklyTotal, monthlyTotal, totalAmount };
  };

  const getWeekNumber = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const diff = date - startDate;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  };

  const handleExportExcel = () => {
    const { dailySales, weeklyTotal, monthlyTotal } = calculateSales();
    const data = [
      { Date: "Date", Sales: "Daily Sales" },
      ...Object.entries(dailySales).map(([date, sales]) => ({ Date: date, Sales: sales })),
      { Date: "Total Weekly Sales", Sales: weeklyTotal },
      { Date: "Total Monthly Sales", Sales: monthlyTotal },
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
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

  const { totalAmount, weeklyTotal, monthlyTotal } = calculateSales();

  const processOrderData = () => {
    const statusCounts = { delivered: 0, rejected: 0, pending: 0 };
    orderList.forEach((order) => {
      statusCounts[order.orderStatus] = (statusCounts[order.orderStatus] || 0) + 1;
    });
    return Object.keys(statusCounts).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: statusCounts[key],
    }));
  };

  const pieData = processOrderData();

  const processApprovedOrdersData = () => {
    const approvedSalesByDate = {};

    orderList.forEach((order) => {
      if (order.orderStatus === "delivered") {
        const orderDate = new Date(order?.orderDate);
        const orderDateString = orderDate.toISOString().split("T")[0];
        approvedSalesByDate[orderDateString] = (approvedSalesByDate[orderDateString] || 0) + order?.totalAmount;
      }
    });

    return Object.entries(approvedSalesByDate).map(([date, sales]) => ({
      date,
      sales,
    }));
  };

  const processRejectedOrdersData = () => {
    const rejectedSalesByDate = {};

    orderList.forEach((order) => {
      if (order.orderStatus === "rejected") {
        const orderDate = new Date(order?.orderDate);
        const orderDateString = orderDate.toISOString().split("T")[0];
        rejectedSalesByDate[orderDateString] = (rejectedSalesByDate[orderDateString] || 0) + order?.totalAmount;
      }
    });

    return Object.entries(rejectedSalesByDate).map(([date, sales]) => ({
      date,
      sales,
    }));
  };

  const approvedOrdersData = processApprovedOrdersData();
  const rejectedOrdersData = processRejectedOrdersData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas las ordenes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id de orden</TableHead>
              <TableHead>Fecha de orden</TableHead>
              <TableHead>Estatus de orden</TableHead>
              <TableHead>Total de orden</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.map((orderItem) => (
              <TableRow key={orderItem?._id}>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                    className={`py-1 px-3 ${
                      orderItem?.orderStatus === "delivered"
                        ? "bg-green-500"
                        : orderItem?.orderStatus === "rejected"
                        ? "bg-red-600"
                        : orderItem?.orderStatus === "inProcess"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
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
                    <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                      Ver detalles
                    </Button>
                    <AdminOrderDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


        <div className="flex flex-wrap justify-between space-x-4">
          {/* Gráfico de Órdenes Entregadas */}
          <div className="w-full sm:w-[30%] mb-8 sm:mb-0">
            <PieChart width={400} height={300}>
              <Pie data={pieData} cx={200} cy={150} outerRadius={100} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Gráfico de Órdenes Aprobadas */}
          <div className="w-full sm:w-[30%] mb-8 sm:mb-0">
            <BarChart width={400} height={300} data={approvedOrdersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#4CAF50" />
            </BarChart>
          </div>

          {/* Gráfico de Órdenes Rechazadas */}
          <div className="w-full sm:w-[30%]">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rejectedOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#F44336" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
