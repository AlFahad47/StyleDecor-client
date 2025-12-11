import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({
    transactionId: null,
    serviceName: null,
    loading: true,
    success: false,
    message: "Finalizing your payment...",
  });
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          const data = res.data;

          if (data.success) {
            setPaymentInfo({
              transactionId: data.transactionId,
              serviceName: data.paymentInfo.serviceName,
              loading: false,
              success: true,
              message: "Your service booking has been confirmed!",
            });
          } else if (data.message === "already exists") {
            setPaymentInfo({
              transactionId: data.transactionId,
              serviceName: data.serviceName,
              loading: false,
              success: true,
              message: "This payment was already processed. Thank you!",
            });
          } else {
            setPaymentInfo({
              transactionId: null,
              serviceName: null,
              loading: false,
              success: false,
              message: "Payment failed or could not be verified.",
            });
          }
        })
        .catch((error) => {
          setPaymentInfo({
            transactionId: null,
            serviceName: null,
            loading: false,
            success: false,
            message: "An error occurred while finalizing payment.",
          });
          console.error("Error processing payment success:", error);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="p-8  text-center max-w-3xl mx-auto">
      <div
        className={`p-8  shadow-2xl dark:shadow-white/20 ${
          paymentInfo.loading
            ? "bg-base-100"
            : paymentInfo.success
            ? "bg-primary"
            : "bg-red-50"
        }`}
      >
        {paymentInfo.loading ? (
          <>
            <FaSpinner className="text-6xl text-primary animate-spin mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-primary">
              Processing Payment...
            </h2>
          </>
        ) : paymentInfo.success ? (
          <>
            <FaCheckCircle className="text-6xl text-success mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-success mb-2">
              Payment Successful!
            </h2>
            <p className="text-lg mb-6">{paymentInfo.message}</p>
            {paymentInfo.serviceName && (
              <p className="text-xl font-semibold mb-2">
                Service Booked:{" "}
                <span className="text-primary-content">
                  {paymentInfo.serviceName}
                </span>
              </p>
            )}
            {paymentInfo.transactionId && (
              <p className="text-lg font-medium">
                Transaction ID:{" "}
                <span className="font-mono  p-1 rounded">
                  {paymentInfo.transactionId}
                </span>
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-error mb-4">
              Payment Failed!
            </h2>
            <p className="text-lg ">{paymentInfo.message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
