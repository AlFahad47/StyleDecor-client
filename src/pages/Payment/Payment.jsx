import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Payment = () => {
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${bookingId}`);
      return res.data;
    },
    enabled: !!bookingId,
  });

  if (!isLoading && booking && booking.status === "paid") {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl text-success font-bold">
          🎉 Payment Already Completed!
        </h2>
        <p className="text-gray-500 mt-2">
          Transaction ID: {booking.transactionId}
        </p>
        <p className="text-gray-500">Service: {booking?.service_name}</p>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!booking || !user) return;

    const paymentInfo = {
      cost: booking.price,
      bookingId: booking._id,
      serviceName: booking?.service_name,
      senderEmail: user.email,
      metadata: {
        bookingId: booking._id,
        serviceName: booking?.service_name,
      },
    };

    try {
      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Could not start payment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-8 flex justify-center  items-center">
      <div className="bg-primary shadow-2xl dark:shadow-white/30 md:w-[400px] px-5 py-10">
        <h2 className="text-xl font-bold mb-6">Confirm Your Payment</h2>

        <div className="bg-base-200 p-6   ">
          <p className="text-xl mb-4">Service Name:</p>
          <h3 className="text-xl font-extrabold text-primary-content mb-2">
            {booking?.service_name}
          </h3>
          <p className="text-xl font-bold mb-6">
            <span className="">Amount: </span> $
            {parseFloat(booking.price).toFixed(2)}
          </p>

          <button
            onClick={handlePayment}
            className="btn btn-lg btn-primary text-primary-content w-full"
            disabled={!booking || booking.status === "paid"}
          >
            Pay ${parseFloat(booking.price).toFixed(2)} Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
