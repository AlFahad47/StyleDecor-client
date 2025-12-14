import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className="hero min-h-[600px]"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/Q7xGyjc6/christmas-new-year-decoration-bauble-christmas-tree.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className=" text-center text-neutral-content  w-[90%]">
        <div className=" flex flex-col ">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20 md:text-7xl text-3xl font-bold metal-regular text-white text-left ml-auto  max-w-2xl  "
          >
            Transform Your Events into Memories
          </motion.h1>
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-5 text-gray-200  max-w-xs text-left montserrat"
          >
            From intimate gatherings to grand weddings, we bring your vision to
            life with our expert decoration services.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-md text-left "
          >
            <Link to="/services">
              <button className="btn btn-primary md:btn-lg border-none hover:scale-105  montserrat">
                Book Decoration Service
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
