import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserTie, FaCheckCircle, FaClock } from "react-icons/fa";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/bookings");
      return res.data;
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["active-decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/decorators");
      return res.data;
    },
  });

  const handleAssign = (bookingId, decoratorId) => {
    if (!decoratorId || decoratorId === "default") return;

    Swal.fire({
      title: "Assign Decorator?",
      text: "This decorator will be assigned to the Service.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Assign",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/bookings/assign/${bookingId}`, { decoratorId })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire("Assigned!", "Decorator has been assigned.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="p-8 w-full">
      <h2 className="text-3xl font-bold mb-6">
        Manage Bookings and Assign Decorator
      </h2>

      <div className="w-full">
        <table className="table w-full">
          <thead className="hidden md:table-header-group bg-base-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Service Info</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date & Time</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Decorator Assignment</th>
              <th className="p-3 text-left">Decorator Email</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-4 md:table-row-group">
            {bookings.map((item, index) => (
              <tr
                key={item._id}
                className="flex flex-col md:table-row bg-base-200 md:bg-transparent shadow-md md:shadow-none rounded-xl md:rounded-none border md:border-b p-4 md:p-0"
              >
                <td className="flex justify-between md:table-cell md:p-3 py-1 ">
                  <span className="font-bold md:hidden text-gray-500">#</span>
                  <span className="font-bold text-primary-content md:font-normal md:text-inherit">
                    {index + 1}
                  </span>
                </td>
                <td className="flex justify-between md:table-cell md:p-3 py-1 items-end ">
                  <div>
                    <span className="md:font-bold font-semibold md:hidden text-gray-500">
                      Service Info
                    </span>
                    <div className="md:font-bold">{item.service_name}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-50">${item.price}</div>
                  </div>
                </td>
                <td className="flex justify-between md:table-cell md:p-3 py-1 items-end">
                  <div>
                    <span className="md:font-bold font-semibold md:hidden text-gray-500">
                      Customer Details
                    </span>
                    <div className="md:font-bold">{item.customerName}</div>
                  </div>
                  <div className="text-xs text-gray-500">{item.email}</div>
                </td>
                <td className="flex justify-between md:table-cell md:p-3 py-1 ">
                  <span className="font-bold md:hidden text-gray-500">
                    Date
                  </span>
                  {item.date}
                </td>

                {/* payment satus */}
                <td className="flex justify-between md:table-cell md:p-3 py-1 ">
                  <span className="font-bold md:hidden text-gray-500">
                    Payment Status
                  </span>
                  <span>
                    {item.status === "pending" && (
                      <span className="badge badge-warning gap-1">
                        <FaClock /> Unpaid
                      </span>
                    )}
                    {(item.status === "paid" ||
                      item.status === "Assigned" ||
                      item.status === "Completed") && (
                      <span className="badge badge-success text-white gap-1">
                        <FaCheckCircle /> Paid
                      </span>
                    )}
                  </span>
                </td>

                <td className=" md:table-cell md:p-3 py-1">
                  {item.status === "pending" ? (
                    <span className="text-gray-400 text-sm italic">
                      Waiting for payment...
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 justify-between">
                      {item.decoratorId ? (
                        <>
                          <span className="font-bold text-primary-content flex items-center gap-2">
                            <FaUserTie /> {"Name: " + item.decoratorName}
                          </span>
                          <span className="text-white badge badge-success">
                            Assigned
                          </span>
                        </>
                      ) : (
                        <select
                          className="select select-bordered select-sm w-full max-w-xs border-primary text-primary-content"
                          onChange={(e) =>
                            handleAssign(item._id, e.target.value)
                          }
                          defaultValue="default"
                        >
                          <option disabled value="default">
                            Select Decorator(Name,Email)
                          </option>
                          {decorators.map((dec) => (
                            <option
                              className="text-primary-content"
                              key={dec._id}
                              value={dec._id}
                            >
                              {"Name: " +
                                dec.displayName +
                                ", Email: " +
                                dec.email}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                </td>
                {item?.decoratorEmail ? (
                  <td className="flex justify-between md:table-cell md:p-3 py-1">
                    <span className="font-bold md:hidden text-gray-500">
                      Decorator Email
                    </span>
                    <span className="text-sm md:text-base break-all">
                      {item?.decoratorEmail}
                    </span>
                  </td>
                ) : (
                  <td>Not Available</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
