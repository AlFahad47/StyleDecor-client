import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaIdCard, FaUserTag, FaCalendarAlt } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user?.email}`);
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
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-300 shadow-2xl border border-base-100 overflow-hidden">
        <div className="h-40  bg-blue-600 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="avatar online">
              <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2 shadow-lg">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body pt-20 text-center">
          <h2 className="text-3xl font-bold">{user?.displayName}</h2>
          <div className="mt-2">
            <span className="badge badge-lg uppercase font-bold  border border-accent px-4 py-3 bg-base-200 ">
              {dbUser.role || "User"}
            </span>
          </div>

          <div className="divider my-4"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-lg mx-auto w-full">
            {/* emil */}
            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
              <div className="p-3 bg-white text-blue-600 rounded-full">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">
                  Email Address
                </p>
                <p className="font-semibold text-gray-700 break-all">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
              <div className="p-3 bg-white text-purple-600 rounded-full">
                <FaIdCard size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">
                  User ID
                </p>
                <p className="font-mono text-sm text-gray-700 break-all">
                  {dbUser._id || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
              <div className="p-3 bg-white text-green-600 rounded-full">
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">
                  Created At
                </p>
                <p className="font-semibold text-gray-700">
                  {dbUser?.createdAt
                    ? new Date(dbUser.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
              <div className="p-3 bg-white text-orange-600 rounded-full">
                <FaUserTag size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">
                  Account Status
                </p>
                <p className="font-bold text-success">
                  {dbUser?.status || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
