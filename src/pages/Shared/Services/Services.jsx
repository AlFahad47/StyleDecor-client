import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";
import Loading from "../../../components/Loading";

const Services = () => {
  const axiosPublic = useAxios();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["services", search, category, minPrice, maxPrice],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (minPrice) params.append("min", minPrice);
      if (maxPrice) params.append("max", maxPrice);

      const res = await axiosPublic.get(`/services?${params.toString()}`);
      return res.data;
    },
  });

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Our Decoration Services</h2>
        <p className="text-gray-500">
          Find the perfect decoration for your budget and style.
        </p>
      </div>

      {/* search and filters */}
      <div className="bg-base-200 p-6  mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center shadow-md dark:shadow-white/10">
        <div className="form-control w-full lg:w-1/3">
          <div className="input-group flex items-center bg-primary rounded-lg px-2 ">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search service name..."
              className="input input-ghost w-full focus:outline-none focus:bg-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full lg:w-2/3 md:justify-end justify-between items-center">
          <select
            className="select select-bordered w-full md:w-auto "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Corporate">Corporate</option>
          </select>

          <div className="flex items-center flex-wrap  gap-2">
            <input
              type="number"
              placeholder="Min Price"
              className="input input-bordered w-24 md:w-32"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max Price"
              className="input input-bordered w-24 md:w-32"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button
            onClick={handleReset}
            className="btn btn-ghost btn-circle text-xl tooltip"
            data-tip="Reset Filters"
          >
            ✕
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <Loading></Loading>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8">
          {/* card */}
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-base-100 shadow-xl hover:shadow-2xl dark:shadow-white/10 transition-all duration-300 "
              >
                <figure className="h-56 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.service_name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h2 className="card-title text-xl font-bold">
                      {service.service_name}
                    </h2>
                    <div className="badge badge-secondary badge-outline">
                      {service.category}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {service.description.slice(0, 40)}...
                  </p>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="text-lg font-bold text-primary-content">
                      ৳ {service.price}
                    </div>
                    <Link
                      to={`/services/${service._id}`}
                      className="btn btn-primary btn-sm hover:scale-120 transition-transform duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-5 text-center py-20 text-primary-content text-xl">
              No services found matching your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;
