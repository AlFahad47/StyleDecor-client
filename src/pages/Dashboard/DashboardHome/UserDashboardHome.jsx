import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import {
  FaCalendarPlus,
  FaClipboardList,
  FaHourglassStart,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import Loading from "../../../components/Loading";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">
            Welcome back,{" "}
            <span className="text-primary-content">{user?.displayName}!</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your events.
          </p>
        </div>
        <Link
          to="/services"
          className="btn btn-primary border-2 border-blue-500"
        >
          <FaCalendarPlus /> Book New Service
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stat bg-base-100 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaClipboardList />
          </div>
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value text-info">{stats.totalBookings || 0}</div>
          <div className="stat-desc">All time history</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaHourglassStart />
          </div>
          <div className="stat-title">Pending Payment</div>
          <div className="stat-value text-info">
            {stats.pendingBookings || 0}
          </div>
          <div className="stat-desc">Requires your attention</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-xl border-l-4 border-info">
          <div className="stat-figure text-info text-3xl">
            <FaCheckCircle />
          </div>
          <div className="stat-title">Events Completed</div>
          <div className="stat-value text-info">
            {stats.completedBookings || 0}
          </div>
          <div className="stat-desc">Successfully delivered</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
