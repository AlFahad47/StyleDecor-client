import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FaWallet,
  FaClipboardCheck,
  FaHourglassHalf,
  FaChartLine,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../../components/Loading";

const DecoratorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["decorator-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorator-stats/${user.email}`);
      return res.data;
    },
  });

  // Data for Chart
  const chartData = [
    { name: "Completed", value: stats.completedProjects || 0 },
    { name: "Ongoing", value: stats.ongoingProjects || 0 },
  ];
  const COLORS = ["#0088FE", "#FFBB28"];

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user.displayName}!</h2>
      <h2 className="text-3xl font-bold mb-6">Earnings Summary</h2>

      {/* --- 1. EARNINGS & STATS SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Earnings */}
        <div className="stat bg-base-200 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaWallet />
          </div>
          <div className="stat-title">Total Earnings</div>
          <div className="stat-value text-primary-content">
            ${stats.totalEarnings?.toFixed(2) || 0}
          </div>
          <div className="stat-desc">From completed projects</div>
        </div>

        {/* Completed Projects */}
        <div className="stat bg-base-200 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaCheckCircle />
          </div>
          <div className="stat-title">Completed Jobs</div>
          <div className="stat-value text-info">
            {stats.completedProjects || 0}
          </div>
          <div className="stat-desc">Successfully delivered</div>
        </div>

        {/* Ongoing Projects */}
        <div className="stat bg-base-200 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaHourglassHalf />
          </div>
          <div className="stat-title">Ongoing</div>
          <div className="stat-value text-info">
            {stats.ongoingProjects || 0}
          </div>
          <div className="stat-desc">Currently active</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- 2. PAYMENT/EARNINGS HISTORY TABLE --- */}
        <div className="w-full lg:w-2/3">
          <div className="bg-base-200 shadow-xl rounded-xl border p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaChartLine /> Completed Jobs
            </h3>
            {stats.paymentHistory?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Service</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.paymentHistory.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.serviceName}</td>
                        <td>{item.customer}</td>
                        <td>{item.date}</td>
                        <td className="font-bold text-success">
                          +${item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No completed jobs yet.
              </p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-base-200 shadow-xl rounded-xl border p-6 pb-10 h-[350px]">
            <h3 className="text-xl font-bold mb-4 text-center">
              Work Distribution
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaCheckCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block w-8 h-8 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export default DecoratorDashboardHome;
