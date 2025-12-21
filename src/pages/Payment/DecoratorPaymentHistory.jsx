import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaHistory, FaFileInvoiceDollar } from "react-icons/fa";

const DecoratorPaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // get payment bookings of decorator
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["decorator-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorator-payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaHistory className="text-primary" /> Work & Payment History
      </h2>

      {payments.length === 0 ? (
        <div className="hero bg-base-200 rounded-xl p-10">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-2xl font-bold">No history yet!</h1>
              <p className="py-6">
                Complete your assigned projects to see them listed here.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
          <table className="table w-full">
            {/* Table Header */}
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Customer</th>
                <th>Completion Date</th>
                <th>Project Value</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {payments.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-base-100">
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">{booking.service_name}</div>
                    <div className="text-xs opacity-50">{booking.address}</div>
                  </td>
                  <td>
                    {booking.customerName}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {booking.email}
                    </span>
                  </td>
                  <td>{booking.date}</td>
                  <td className="text-right font-mono font-bold text-success">
                    ${booking.price}
                  </td>
                  <td>
                    <div className="badge badge-success gap-2 text-white">
                      <FaFileInvoiceDollar /> {booking.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DecoratorPaymentHistory;
