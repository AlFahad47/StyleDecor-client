import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";

import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ServiceDetails = () => {
  const service = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { _id, service_name, price, img, description, category, unit } =
    service;

  const handleBookClick = () => {
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "You need to be logged in to book a service.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location.pathname } });
        }
      });
    } else {
      document.getElementById("booking_modal").showModal();
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const date = form.date.value;
    const address = form.address.value;

    const bookingData = {
      service_id: _id,
      service_name: service_name,
      service_img: img,
      price: parseFloat(price),
      customerName: user?.displayName,
      email: user?.email,
      date,
      address,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);

      if (res.data.insertedId) {
        document.getElementById("booking_modal").close();
        Swal.fire({
          title: "Booking Successful!",
          text: "Check your dashboard for updates.",
          icon: "success",
        });
        navigate("/dashboard/my-bookings");
      } else if (res.data.message === "already booked") {
        document.getElementById("booking_modal").close();
        Swal.fire({
          title: "Booking Failed",
          text: "You have already booked this service for this date.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Booking failed. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 ">
      {/* card */}
      <div className="flex md:flex-row flex-col  shadow-xl dark:shadow-white/10 dark:shadow-xl overflow-hidden">
        <figure className="lg:w-1/2 h-[400px]">
          <img
            src={img}
            alt={service_name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2 p-8 lg:p-12">
          <h2 className="card-title text-2xl font-semibold mb-4 montserrat ">
            {service_name}
          </h2>
          <div className="text-secondary-content ">{category}</div>
          <p className="text-2xl font-semibold text-primary-content flex items-center my-4 montserrat">
            <FaBangladeshiTakaSign />
            {price}
          </p>
          <h2 className="font-semibold montserrat">Description</h2>
          <p className="text-secondary-content  text-sm leading-relaxed mb-6 montserrat">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="">
              <p className="text-sm text-gray-500">Unit</p>
              <p className="text-xl font-bold">{unit}</p>
            </div>
            <button
              onClick={handleBookClick}
              className="btn   w-full shadow-xl btn-action dark:shadow-white/10  dark:shadow-xl"
            >
              Book This Service
            </button>
          </div>
        </div>
      </div>

      {/* modal*/}
      <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-secondary">
          <h3 className="font-bold text-2xl text-center mb-6">
            Confirm Booking
          </h3>
          <form onSubmit={handleBookingSubmit}>
            <div className="form-control mb-3 flex flex-col">
              <label className="label">
                <span className="label-text w-full">Service Name</span>
              </label>
              <input
                type="text"
                defaultValue={service_name}
                readOnly
                className="input input-bordered bg-primary w-full"
              />
            </div>
            <div className="flex gap-4 mb-3">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered bg-primary"
                />
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered bg-primary"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-3">
              <div className="form-control mb-3 w-1/2">
                <label className="label">
                  <span className="label-text">Price (BDT)</span>
                </label>
                <input
                  type="text"
                  defaultValue={price}
                  readOnly
                  className="input input-bordered bg-primary"
                />
              </div>
              {/* date input */}
              <div className="form-control mb-3 w-1/2">
                <label className="label">
                  <span className="label-text font-bold ">Select Date</span>
                </label>
                <div className="input-group">
                  <input
                    type="date"
                    name="date"
                    required
                    className="input input-bordered w-full bg-primary"
                  />
                </div>
              </div>
            </div>

            {/* address input */}
            <div className="form-control mb-6 flex flex-col mb-3 ">
              <label className="label">
                <span className="label-text font-bold ">Venue Address</span>
              </label>
              <textarea
                name="address"
                placeholder="Enter full address of the event"
                required
                className=" textarea bg-primary h-32 w-full"
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("booking_modal").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
