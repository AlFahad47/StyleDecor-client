import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react"; // Added useEffect
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Added Arrow icons
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import ServiceCard from "./ServiceCard";
import ServicesSkeletonGrid from "../../Skeletons/ServicesSkeletonGrid";

const Services = () => {
  const axiosPublic = useAxios();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(8); // 8 items is good for 4-column grid
  const [currentPage, setCurrentPage] = useState(0);

  const { data: countData = { count: 0 } } = useQuery({
    queryKey: ["services-count", search, category, minPrice, maxPrice],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (minPrice) params.append("min", minPrice);
      if (maxPrice) params.append("max", maxPrice);

      const res = await axiosPublic.get(`/services-count?${params.toString()}`);
      return res.data;
    },
  });

  const numberOfPages = Math.ceil(countData.count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "services",
      currentPage,
      itemsPerPage,
      search,
      category,
      minPrice,
      maxPrice,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      // Add Pagination Params
      params.append("page", currentPage);
      params.append("size", itemsPerPage);

      // Add Filter Params
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (minPrice) params.append("min", minPrice);
      if (maxPrice) params.append("max", maxPrice);

      const res = await axiosPublic.get(`/services?${params.toString()}`);
      return res.data;
    },
  });

  useEffect(() => {
    setCurrentPage(0);
    refetch();
  }, [search, category, minPrice, maxPrice, refetch]);

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(0);
    refetch();
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Our Decoration Services</h2>
        <p className="text-secondary-content">
          Find the perfect decoration for your budget and style.
        </p>
      </div>

      <div className="bg-base-200 p-6 mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center shadow-md dark:shadow-white/10 rounded-xl">
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

        <div className="flex flex-wrap gap-2 w-full lg:w-2/3 md:justify-end justify-between items-center ">
          <select
            className="select select-bordered w-full md:w-auto bg-primary"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Corporate">Corporate</option>
          </select>

          <div className="flex items-center flex-wrap gap-2">
            <input
              type="number"
              placeholder="Min Price"
              className="input input-bordered w-24 md:w-32 bg-primary"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max Price"
              className="input input-bordered w-24 md:w-32 bg-primary"
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

      {/* --- SERVICES GRID --- */}
      {isLoading ? (
        <ServicesSkeletonGrid />
      ) : (
        <div className="min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))
            ) : (
              <div className="col-span-4 text-center py-20 text-primary-content text-xl">
                No services found matching your filters.
              </div>
            )}
          </div>
        </div>
      )}

      {/*pagination */}
      {!isLoading && services.length > 0 && (
        <div className="flex justify-center mt-12">
          <div className="join">
            {/* Prev Button */}
            <button
              onClick={handlePrevPage}
              className="join-item btn btn-outline"
              disabled={currentPage === 0}
            >
              <FaArrowLeft />
            </button>

            {/* number*/}
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`join-item btn ${
                  currentPage === page
                    ? "btn-active btn-primary"
                    : "btn-outline"
                }`}
              >
                {page + 1}
              </button>
            ))}

            {/* next */}
            <button
              onClick={handleNextPage}
              className="join-item btn btn-outline"
              disabled={currentPage === pages.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
