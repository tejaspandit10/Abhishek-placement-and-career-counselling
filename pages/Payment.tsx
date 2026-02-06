import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// 🔗 Razorpay backend URL
const BACKEND_URL = "https://razorpay-backend-1-aeoq.onrender.com";

// 🔐 Public Razorpay Key (from .env.production)
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");

  const context = localStorage.getItem("payment_context") || "candidate";
  const baseAmount = context === "agent" ? 300 : 200;
  const gstAmount = baseAmount * 0.18;
  const totalAmount = baseAmount + gstAmount;

  // ------------------------------------
  // Load Razorpay SDK safely
  // ------------------------------------
  const ensureRazorpayLoaded = () => {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ------------------------------------
  // Start payment
  // ------------------------------------
  const handlePay = async () => {
    if (loading) return; // ⛔ prevent double click
    setLoading(true);

    try {
      // 1️⃣ Load SDK
      const sdkLoaded = await ensureRazorpayLoaded();
      if (!sdkLoaded || !window.Razorpay) {
        alert("Payment gateway failed to load.");
        setLoading(false);
        return;
      }

      // 2️⃣ Create order
      const orderRes = await fetch(`${BACKEND_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await orderRes.json();

      if (!order?.id) {
        alert("Unable to create order.");
        setLoading(false);
        return;
      }

      // 3️⃣ Open Razorpay popup
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Abhishek Placement & Career Counselling",
        description:
          context === "agent"
            ? "Agent Registration Fee"
            : "Candidate Registration Fee",
        order_id: order.id,

        handler: async (response: any) => {
          const verifyRes = await fetch(`${BACKEND_URL}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            localStorage.setItem("txn_id", response.razorpay_payment_id);
            localStorage.setItem(
              "payment_details",
              JSON.stringify({
                base: baseAmount,
                gst: gstAmount,
                total: totalAmount,
                orderId: response.razorpay_order_id,
              })
            );
            navigate("/confirmation");
          } else {
            alert("Payment verification failed.");
          }

          setLoading(false);
        },

        modal: {
          ondismiss: () => setLoading(false),
        },

        theme: { color: "#003366" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        alert(resp?.error?.description || "Payment failed");
        setLoading(false);
      });

      rzp.open();

      // ⏱ Safety timeout
      setTimeout(() => {
        if (loading) setLoading(false);
      }, 15000);
    } catch (err) {
      console.error(err);
      alert("Unable to start payment.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 bg-[#003366] text-white text-center">
          <h2 className="text-2xl font-bold">
            {context === "agent" ? "Agent" : "Candidate"} Registration Fee
          </h2>
          <p className="text-cyan-200 mt-2">
            Amount to pay: ₹{totalAmount.toFixed(2)} (Incl. 18% GST)
          </p>
        </div>

        <div className="p-8">
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full mt-8 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
          >
            {loading
              ? "Opening Payment Gateway..."
              : "Proceed to Secure Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};
