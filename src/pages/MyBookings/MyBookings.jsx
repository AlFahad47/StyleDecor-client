import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { Link } from "react-router";
import {
  FaTrashAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Bookings for logged-in user
  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  // 2. Handle Cancellation (Delete Booking)
  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/bookings/${id}`, { status: "canceled" })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                "Cancelled!",
                "Your booking has been cancelled.",
                "success"
              );
            }
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-base-200 rounded-xl">
          <h3 className="text-xl">No bookings found.</h3>
          <Link to="/services" className="btn btn-primary mt-4">
            Book a Service
          </Link>
        </div>
      ) : (
        <div className="w-full">
          <table className="w-full">
            {/* HEADER (Desktop Only) */}
            <thead className="hidden md:table-header-group bg-base-200">
              <tr>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Details</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="flex flex-col gap-4 md:table-row-group">
              {bookings.map((item) => (
                <tr
                  key={item._id}
                  className="flex flex-col md:table-row bg-base-100 shadow-md md:shadow-none rounded-xl md:rounded-none border md:border-b p-4 md:p-0"
                >
                  {/* 1. Service Info */}
                  <td className="md:table-cell md:p-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              item.service_img ||
                              "https://i.ibb.co/hY5b19X/placeholder.png"
                            }
                            alt="Service"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.service_name}</div>
                        <div className="text-sm opacity-50 md:hidden">
                          Booking ID: {item._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Date & Address */}
                  <td className="md:table-cell md:p-3 py-2">
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" /> {item.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaMapMarkerAlt /> {item.address}
                      </div>
                    </div>
                  </td>

                  {/* 3. Price */}
                  <td className="md:table-cell md:p-3 py-2 flex justify-between md:table-cell">
                    <span className="font-bold md:hidden text-gray-500">
                      Price:
                    </span>
                    <span className="font-bold text-lg">৳{item.price}</span>
                  </td>

                  {/* 4. Status */}
                  <td className="md:table-cell md:p-3 py-2 flex justify-between md:table-cell">
                    <span className="font-bold md:hidden text-gray-500">
                      Status:
                    </span>
                    <span
                      className={`badge ${
                        item.status === "pending"
                          ? "badge-warning"
                          : item.status === "Completed"
                          ? "badge-success"
                          : item.status === "canceled"
                          ? "badge-error"
                          : "badge-ghost"
                      } text-primary-content`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* 5. Actions (Pay & Cancel) */}
                  <td className="md:table-cell md:p-3 py-2 border-t md:border-none mt-2 md:mt-0">
                    <div className="flex justify-end md:justify-center gap-3">
                      {/* PAY BUTTON: Only if pending */}
                      {item.status === "pending" ? (
                        <Link to={`/dashboard/payment/${item._id}`}>
                          <button className="btn btn-sm btn-primary">
                            <FaCreditCard /> Pay
                          </button>
                        </Link>
                      ) : item.status === "canceled" ? (
                        <button className=" btn btn-sm btn-disabled">
                          Canceled
                        </button>
                      ) : (
                        <button className=" btn btn-sm btn-disabled">
                          Paid
                        </button>
                      )}

                      {/* CANCEL BUTTON: Only if pending */}
                      {item.status === "pending" ? (
                        <button
                          onClick={() => handleCancelBooking(item._id)}
                          className="btn btn-sm btn-error text-white"
                          title="Cancel Booking"
                        >
                          <FaTrashAlt />
                        </button>
                      ) : item.status === "canceled" ? (
                        <div className="tooltip" data-tip="Already Canceled.">
                          <button className="btn btn-sm btn-disabled">
                            <FaTrashAlt />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="tooltip"
                          data-tip="Cannot cancel active bookings"
                        >
                          <button className="btn btn-sm btn-disabled">
                            <FaTrashAlt />
                          </button>
                        </div>
                      )}
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

export default MyBookings;
