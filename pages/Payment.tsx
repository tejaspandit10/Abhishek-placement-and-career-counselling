import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
console.error("🔥🔥🔥 PAYMENT FILE LOADED 🔥🔥🔥");
declare global {
  interface Window {
    Razorpay: any;
  }
}

const BACKEND_URL = "https://razorpay-backend-1-aeoq.onrender.com";
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const context = localStorage.getItem("payment_context") || "candidate";
  const baseAmount = context === "agent" ? 300 : 200;
  const gstAmount = baseAmount * 0.18;
  const totalAmount = baseAmount + gstAmount;

  const ensureRazorpayLoaded = () => {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const sdkLoaded = await ensureRazorpayLoaded();
      if (!sdkLoaded || !window.Razorpay) {
        throw new Error("Razorpay SDK failed to load");
      }

      // Step 1: Create Order on Backend
      // We send the raw amount; backend will multiply by 100
      const orderRes = await fetch(`${BACKEND_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await orderRes.json();

      if (!order?.id) {
        throw new Error("Order creation failed on server");
      }

      // Step 2: Configure Razorpay Options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount, // Already in paise from backend
        currency: "INR",
        name: "Abhishek Placement",
        description: `${
          context === "agent" ? "Agent" : "Candidate"
        } Registration`,
        order_id: order.id,
        handler: async (response: any) => {
          const verifyRes = await fetch(`${BACKEND_URL}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            localStorage.setItem("txn_id", response.razorpay_payment_id);
           // navigate("/confirmation");
          } else {
            alert("Verification failed");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: { color: "#003366" },
      };
      console.log("RAZORPAY KEY:", RAZORPAY_KEY_ID);
      console.log("OPTIONS:", options);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment Error:", err.message);
      alert(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "red",
      zIndex: 999999,
    }}
  >
    <button
  type="button"
  onClick={handlePay}
  style={{
    padding: "30px",
    fontSize: "20px",
    background: "black",
    color: "white",
  }}
>
  PAY NOW
</button>

  </div>
);

};
