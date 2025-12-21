import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  return (
    <>
      {" "}
      <Link
        to={`/services/${service._id}`}
        key={service._id}
        className="bg-primary  hover:shadow-2xl dark:shadow-white/40 transition-all duration-200 hover:cursor-pointer  hover:px-2 transition-normal "
      >
        <figure className="h-72 overflow-hidden ">
          <img
            src={service.img}
            alt={service.service_name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </figure>
        <div className=" montserrat ">
          <div className="flex flex-col justify-between items-start">
            <div className="text-secondary-content montserrat font-semibold mt-5">
              {service.category}
            </div>
            <h2 className="  font-bold  mt-1.5">{service.service_name}</h2>
          </div>
          <p className="text-secondary-content text-sm mt-2">
            {service.description.slice(0, 40)}...
          </p>

          <div className="text-2xl mt-3 text-primary-content mb-2">
            ৳ {service.price}
          </div>
        </div>
      </Link>
    </>
  );
};
export default ServiceCard;
