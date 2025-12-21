import { Link } from "react-router";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* 404 Illustration Image */}
        <img
          src="https://i.ibb.co/VpppSM7L/404-1500x665.png"
          alt="404 Page Not Found"
          className="w-full max-w-xs mx-auto mb-8 drop-shadow-xl"
        />

        <h2 className="text-3xl font-bold mt-4 mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex justify-center gap-4">
          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            <FaArrowLeft /> Go Back
          </button>

          {/* Home Button */}
          <Link to="/" className="btn btn-secondary">
            <FaHome /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
