import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaCalendarDay,
  FaPhoneAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const AssignedProjects = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const statusSteps = [
    "Assigned",
    "Planning Phase",
    "Materials Prepared",
    "On the Way",
    "Setup in Progress",
    "Completed",
  ];

  const {
    data: projects = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["decorator-projects", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/decorator/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleProceedToNext = (projectId, nextStatus) => {
    Swal.fire({
      title: `Move to ${nextStatus}?`,
      text: "Confirm advancing the project to the next stage.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/bookings/status/${projectId}`, { status: nextStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Progress Updated!",
                text: `Project is now in: ${nextStatus}`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to update status", "error");
          });
      }
    });
  };

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 w-full">
      <h2 className="text-3xl font-bold mb-8">My Assigned Projects</h2>

      {projects.length === 0 ? (
        <div className="alert alert-info shadow-lg max-w-2xl mx-auto">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>No projects currently assigned. Wait for new tasks.</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {projects.map((project) => {
            // Determine current progress state
            const currentStatusStr = project.status || "Assigned";
            const currentIndex = statusSteps.indexOf(currentStatusStr);
            const nextStatusStr = statusSteps[currentIndex + 1];
            const isCompleted = currentIndex === statusSteps.length - 1;

            return (
              <div
                key={project._id}
                className=" bg-base-100 shadow-xl dark:shadow-white/10 border border-base-200 overflow-hidden"
              >
                {/* Project Header Info */}
                <div className="bg-base-300 p-6 border-b border-base-300 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-primary-content">
                      {project.service_name}
                    </h2>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-70">
                      <span className="flex items-center gap-1">
                        <FaCalendarDay /> {project.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {project.address}
                      </span>
                    </div>
                  </div>
                  <div className="badge badge-lg p-4 font-semibold badge-ghost border-primary-content text-primary-content">
                    Current Status: {currentStatusStr}
                  </div>
                </div>

                <div className=" p-6">
                  {/* steps */}
                  <div className="w-full overflow-x-auto pb-4">
                    <ul className="steps md:steps-horizontal steps-vertical w-full ">
                      {statusSteps.map((step, index) => (
                        <li
                          key={step}
                          className={`step ${
                            index <= currentIndex ? "step-info" : ""
                          } font-medium`}
                          data-content={
                            index < currentIndex
                              ? "✓"
                              : index === currentIndex
                              ? "★"
                              : index + 1
                          }
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customer Info (Optional context) */}
                  <div className="mt-4 p-4 bg-base-200  text-sm shadow-xl dark:shadow-white/10">
                    <p className="font-bold mb-1">Client Details:</p>
                    <p className="flex items-center gap-2">
                      <FaPhoneAlt className="text-xs" /> {project.customerName}{" "}
                      ({project.email})
                    </p>
                  </div>

                  {/* --- ACTION BUTTON (Enforces Step-by-Step) --- */}
                  <div className="card-actions justify-end mt-6">
                    {isCompleted ? (
                      <button className="btn btn-success text-white btn-wide no-animation cursor-default ">
                        <FaCheckCircle /> Decoration Finished
                      </button>
                    ) : (
                      <button
                        // Only allow clicking if there is a next status defined
                        onClick={() =>
                          nextStatusStr &&
                          handleProceedToNext(project._id, nextStatusStr)
                        }
                        className="btn btn-info btn-wide text-primary-content  hover:animate-pulse"
                      >
                        {nextStatusStr} <FaArrowRight className="ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignedProjects;
