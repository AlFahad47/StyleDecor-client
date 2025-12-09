import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUser, FaPaintBrush, FaBan, FaCheckCircle } from "react-icons/fa";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleChangeRole = (user, newRole) => {
    Swal.fire({
      title: `Make ${newRole}?`,
      text: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const endpoint =
          newRole === "decorator"
            ? `/users/decorator/${user._id}`
            : `/users/user/${user._id}`;

        axiosSecure.patch(endpoint).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire(
              "Updated!",
              `${user.name} is now a ${newRole}.`,
              "success"
            );
          }
        });
      }
    });
  };

  const handleToggleStatus = (user, newStatus) => {
    const action = newStatus === "active" ? "Activate" : "Disable";
    Swal.fire({
      title: `${action} Account?`,
      text: `This user will ${
        newStatus === "disabled" ? "lose" : "regain"
      } access.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "active" ? "#28a745" : "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/status/${user._id}`, { status: newStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire("Success", `User is now ${newStatus}`, "success");
            }
          });
      }
    });
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Manage Users & Decorators
      </h2>

      <div className="w-full">
        <table className="w-full">
          <thead className="hidden md:table-header-group bg-base-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Change Role</th>
              <th className="p-3 text-center">Account Actions</th>
            </tr>
          </thead>

          <tbody className="flex flex-col gap-4 md:table-row-group">
            {users.map((user, index) => (
              <tr
                key={user._id}
                // MOBILE: Card Layout (flex-col, border, shadow)
                // DESKTOP: Table Row Layout (table-row, border-bottom)
                className="flex flex-col md:table-row bg-base-200 md:bg-transparent shadow-md md:shadow-none rounded-xl md:rounded-none border md:border-b p-4 md:p-0"
              >
                <td className="flex justify-between md:table-cell md:p-3 py-1">
                  <span className="font-bold md:hidden text-gray-500">#</span>
                  <span className="font-bold text-primary-content md:font-normal md:text-inherit">
                    {index + 1}
                  </span>
                </td>

                <td className="flex justify-between md:table-cell md:p-3 py-1 items-center">
                  <span className="font-bold md:hidden text-gray-500">
                    User
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/T1bF4qD/def-user.png"
                          }
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div className="font-bold text-sm md:text-base ">
                      {user.displayName}
                    </div>
                  </div>
                </td>

                <td className="flex justify-between md:table-cell md:p-3 py-1">
                  <span className="font-bold md:hidden text-gray-500">
                    Email
                  </span>
                  <span className="text-sm md:text-base break-all">
                    {user.email}
                  </span>
                </td>

                <td className="flex justify-between md:table-cell md:p-3 py-1">
                  <span className="font-bold md:hidden text-gray-500">
                    Role
                  </span>
                  <span>
                    {user.role === "admin" ? (
                      <span className="badge badge-dash">Admin</span>
                    ) : user.role === "decorator" ? (
                      <span className="badge badge-secondary">Decorator</span>
                    ) : (
                      <span className="badge badge-ghost">User</span>
                    )}
                  </span>
                </td>

                <td className="flex justify-between md:table-cell md:p-3 py-1">
                  <span className="font-bold md:hidden text-gray-500">
                    Status
                  </span>
                  <div
                    className={`badge ${
                      user.status === "disabled"
                        ? "badge-error"
                        : "badge-success"
                    } text-white`}
                  >
                    {user.status || "Active"}
                  </div>
                </td>

                <td className="flex justify-between items-center md:table-cell md:p-3 py-2 border-t md:border-none mt-2 md:mt-0 text-center">
                  <span className="font-bold md:hidden text-gray-500">
                    Change Role
                  </span>
                  {user.role !== "admin" && (
                    <div className="join">
                      {user.role !== "decorator" && (
                        <button
                          onClick={() => handleChangeRole(user, "decorator")}
                          className="btn btn-xs join-item btn-outline btn-secondary"
                        >
                          <FaPaintBrush />{" "}
                          <span className="hidden md:inline">Decorator</span>
                        </button>
                      )}
                      {user.role === "decorator" && (
                        <button
                          onClick={() => handleChangeRole(user, "user")}
                          className="btn btn-xs join-item btn-outline"
                        >
                          <FaUser />{" "}
                          <span className="hidden md:inline">User</span>
                        </button>
                      )}
                    </div>
                  )}
                </td>

                <td className="flex justify-between items-center md:table-cell md:p-3 py-1 ">
                  <span className="font-bold md:hidden text-gray-500">
                    Account Actions
                  </span>
                  {user.role !== "admin" && (
                    <div className="flex gap-2 justify-center">
                      {user.status === "disabled" ? (
                        <button
                          onClick={() => handleToggleStatus(user, "active")}
                          className="btn btn-sm  btn-success text-white"
                          title="Activate"
                        >
                          <FaCheckCircle />
                          <span>Active it</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(user, "disabled")}
                          className="btn btn-sm  btn-error text-white"
                          title="Disable"
                        >
                          <FaBan />
                          <span>Disable it</span>
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
