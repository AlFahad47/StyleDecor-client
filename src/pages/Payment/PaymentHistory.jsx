import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHistory, FaCheckCircle } from "react-icons/fa";
import Loading from "../../components/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaHistory className="text-primary" /> Payment History
      </h2>

      {payments.length === 0 ? (
        <div className="alert alert-info">
          You haven't made any payments yet.
        </div>
      ) : (
        <div className="w-full">
          <table className=" w-full">
            <thead className="hidden md:table-header-group bg-base-200">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Transaction ID</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-4 md:table-row-group">
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="flex flex-col md:table-row bg-base-200 md:bg-transparent shadow-md md:shadow-none rounded-xl md:rounded-none border md:border-b p-4 md:p-0"
                >
                  <td className="flex justify-between md:table-cell md:p-3 py-1 ">
                    <span className="font-bold md:hidden text-gray-500">#</span>
                    <span className="font-bold text-primary-content md:font-normal md:text-inherit">
                      {index + 1}
                    </span>
                  </td>
                  <td className="flex justify-between md:table-cell md:p-3 py-1">
                    <span className="font-bold md:hidden text-gray-500">
                      Service
                    </span>
                    <span className="text-sm md:text-base break-all">
                      {payment.serviceName}
                    </span>
                  </td>
                  <td className="flex justify-between md:table-cell md:p-3 py-1">
                    <span className="font-bold md:hidden text-gray-500">
                      Transaction ID
                    </span>
                    <span className="text-sm md:text-base break-all">
                      {payment.transactionId}
                    </span>
                  </td>
                  <td className="flex justify-between md:table-cell md:p-3 py-1">
                    <span className="font-bold md:hidden text-gray-500">
                      Amount
                    </span>
                    <span className="text-sm md:text-base break-all">
                      ${parseFloat(payment.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="flex justify-between md:table-cell md:p-3 py-1">
                    <span className="font-bold md:hidden text-gray-500">
                      Date
                    </span>
                    <span className="text-sm md:text-base break-all">
                      {new Date(payment.paidAt).toLocaleDateString()} at{" "}
                      {new Date(payment.paidAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <td className="flex justify-between md:table-cell md:p-3 py-1">
                    <span className="font-bold md:hidden text-gray-500">
                      Status
                    </span>
                    <div className="badge badge-success text-white gap-1">
                      <FaCheckCircle /> {payment.paymentStatus}
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

export default PaymentHistory;
