import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react"; // 1. Import useState
import { Link } from "react-router"; // 2. Import Link
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";

const DecoratorSchedule = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null); // 3. State for Modal

  const { data: projects = [] } = useQuery({
    queryKey: ["decorator-schedule", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/decorator/${user.email}`);
      return res.data;
    },
  });

  // Filter for TODAY
  const today = new Date().toISOString().split("T")[0];
  const todaysTasks = projects.filter((p) => p.date === today);

  // 4. Handler to open modal
  const handleViewDetails = (task) => {
    setSelectedTask(task);
    document.getElementById("details_modal").showModal();
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-bold mb-6">Today's Schedule ({today})</h2>

      {todaysTasks.length === 0 ? (
        <div className="hero bg-base-200 rounded-xl p-10">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-2xl font-bold">No tasks for today! 🎉</h1>
              <p className="py-6">
                Check your "Assigned Projects" tab for upcoming work.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {todaysTasks.map((task) => (
            <div
              key={task._id}
              className="alert alert-info shadow-lg flex-col items-start md:flex-row md:items-center"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg">{task.service_name}</h3>
                <div className="text-sm opacity-80 flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt /> {task.address}
                </div>
                <div className="text-xs font-mono mt-1 uppercase badge badge-ghost">
                  Status: {task.status}
                </div>
              </div>
              <div className="flex-none mt-2 md:mt-0">
                {/* 5. Button triggers modal */}
                <button
                  onClick={() => handleViewDetails(task)}
                  className="btn btn-sm btn-white text-info"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- 6. DETAILS MODAL --- */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box">
          {selectedTask && (
            <>
              <h3 className="font-bold text-2xl mb-4">
                {selectedTask.service_name}
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-base-200 rounded-lg">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                    Client Info
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-bold">
                      {selectedTask.customerName}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <FaEnvelope className="text-gray-400" />{" "}
                    {selectedTask.email}
                  </p>
                  {/* If phone exists in booking: <p><FaPhoneAlt/> {selectedTask.phone}</p> */}
                </div>

                <div className="p-3 bg-base-200 rounded-lg">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                    Event Details
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />{" "}
                    {selectedTask.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />{" "}
                    {selectedTask.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaDollarSign className="text-primary" />{" "}
                    {selectedTask.price} BDT
                  </p>
                </div>

                <div className="p-3 bg-base-200 rounded-lg">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                    Current Status
                  </p>
                  <span className="badge badge-lg badge-warning">
                    {selectedTask.status}
                  </span>
                </div>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-ghost">Close</button>
                </form>
                {/* Link to the main management page */}
                <Link
                  to="/dashboard/assigned-projects"
                  className="btn btn-primary"
                >
                  Update Status
                </Link>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default DecoratorSchedule;
