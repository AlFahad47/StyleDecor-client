import { useQuery } from "@tanstack/react-query";

import { FaStar, FaAward } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const TopDecorators = () => {
  const axiosPublic = useAxios();
  const { data: decorators = [] } = useQuery({
    queryKey: ["top-decorators"],
    queryFn: async () => {
      const res = await axiosPublic.get("/public/decorators");
      return res.data.slice(0, 4);
    },
  });

  return (
    <div className="bg-base-200 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="md:text-4xl text-3xl font-bold text-center mb-4">
          Meet Our Top Decorators
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Experts who turn your dreams into reality
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {decorators.map((dec) => (
            <div
              key={dec._id}
              className="card bg-base-200 shadow-xl text-center p-6"
            >
              <div className="avatar mx-auto mb-4">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={dec.photoURL} alt={dec.displayName} />
                </div>
              </div>
              <h3 className="text-lg font-medium montserrat overflow-hidden">
                {dec.displayName}
              </h3>

              {/* Static/Mock Ratings for Visual Requirement */}
              <div className="flex justify-center items-center gap-1 mt-5 text-orange-400 mb-7">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < 4 ? "" : "text-gray-300"} />
                ))}
                <span className="text-gray-600 text-sm ml-2 ">(4.8)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDecorators;
