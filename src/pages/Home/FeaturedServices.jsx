import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import ServiceCard from "../Shared/Services/ServiceCard";

const FeaturedServices = () => {
  const axiosPublic = useAxios();

  // Fetch first 3 or 6 services for the home page
  const { data: services = [] } = useQuery({
    queryKey: ["featured-services"],
    queryFn: async () => {
      const res = await axiosPublic.get("/services");
      return res.data.slice(0, 3); // Displaying top 3
    },
  });

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our Premium Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard service={service} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/services" className="btn btn-wide btn-primary">
          View All Services
        </Link>
      </div>
    </div>
  );
};

export default FeaturedServices;
