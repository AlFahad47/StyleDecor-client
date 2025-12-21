import { useQuery } from "@tanstack/react-query";

import {
  FaUsers,
  FaBoxOpen,
  FaDollarSign,
  FaCalendarCheck,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const serviceData = stats.serviceStats || [];
  const userData = stats.userBookingStats || [];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-bold mb-8">Analytics & Revenue</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="stat bg-base-200 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaDollarSign />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-info">
            ${stats.revenue?.toFixed(2)}
          </div>
        </div>

        <div className="stat bg-base-200 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-info">{stats.users}</div>
        </div>

        <div className="stat bg-base-200 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaCalendarCheck />
          </div>
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value text-info">{stats.bookings}</div>
        </div>

        <div className="stat bg-base-200 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaBoxOpen />
          </div>
          <div className="stat-title">Services</div>
          <div className="stat-value text-info">{stats.services}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 bg-base-200 p-6 rounded-xl shadow-xl border">
          <h3 className="text-xl font-bold mb-6 text-center">
            Service Demand (Most Popular)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={serviceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#8884d8"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-base-200 p-6 rounded-xl shadow-xl border">
          <h3 className="text-xl font-bold mb-6 text-center">
            Top Users by Bookings
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={userData}
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="_id"
                  type="category"
                  width={100}
                  style={{ fontSize: "12px" }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="bookingCount"
                  name="Bookings Made"
                  fill="#82ca9d"
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
