import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BACKEND_URL = "https://razorpay-backend-1-aeoq.onrender.com";

// ✅ Put your LIVE Razorpay Key ID here (public key, safe to expose)
const RAZORPAY_KEY_ID = "rzp_live_SCmfJVKrLRgWdS";

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");

  const context = localStorage.getItem("payment_context") || "candidate";
  const baseAmount = context === "agent" ? 300 : 200;
  const gstAmount = baseAmount * 0.18;
  const totalAmount = baseAmount + gstAmount;

  const ensureRazorpayLoaded = () => {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);

      const existing = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existing) {
        // script tag exists but Razorpay not ready yet
        setTimeout(() => resolve(!!window.Razorpay), 300);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    console.log("✅ PAY CLICKED");
    setLoading(true);

    try {
      // 1) Ensure Razorpay SDK
      const ok = await ensureRazorpayLoaded();
      console.log(
        "Razorpay SDK loaded?",
        ok,
        "window.Razorpay:",
        !!window.Razorpay
      );

      if (!ok || !window.Razorpay) {
        alert("Razorpay SDK not loaded. Please refresh and try again.");
        setLoading(false);
        return;
      }

      // 2) Create order
      console.log("Creating order... amount:", totalAmount);

      const orderRes = await fetch(`${BACKEND_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await orderRes.json();
      console.log("Order API response:", order);

      // IMPORTANT: your backend currently returns order directly: {id, amount, currency...}
      if (!order?.id) {
        alert("Failed to create order. Check console logs.");
        setLoading(false);
        return;
      }

      // 3) Open Razorpay
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Abhishek Placement & Career Counselling",
        description: `${
          context === "agent" ? "Agent" : "Candidate"
        } Registration Fee`,
        order_id: order.id,

        handler: async (response: any) => {
          console.log("Payment success response:", response);

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
          console.log("Verify response:", verifyData);

          if (verifyData?.success) {
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
            alert("Payment verification failed. Check console.");
          }

          setLoading(false);
        },

        modal: {
          ondismiss: () => {
            console.log("Razorpay popup closed by user");
            setLoading(false);
          },
        },

        theme: { color: "#003366" },
      };

      console.log("Opening Razorpay...");
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        console.log("Payment failed:", resp);
        alert(resp?.error?.description || "Payment failed");
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Payment start error:", err);
      alert("Unable to start payment. Check console logs.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 bg-[#003366] text-white text-center">
          <h2 className="text-2xl font-bold">
            {context === "agent" ? "Agent" : "Candidate"} Registration Fee
            Payment
          </h2>
          <p className="text-cyan-200 mt-2">
            Amount to pay: ₹{totalAmount.toFixed(2)} (Incl. 18% GST)
          </p>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-bold mb-6 text-slate-800">
            Select Payment Method
          </h3>

          <div className="space-y-3">
            {[
              { id: "upi", name: "UPI (PhonePe, GPay, Paytm)", icon: "📱" },
              { id: "card", name: "Credit / Debit Card", icon: "💳" },
              { id: "netbanking", name: "Net Banking", icon: "🏦" },
            ].map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  method === m.id
                    ? "border-cyan-500 bg-cyan-50"
                    : "hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="paymethod"
                  checked={method === m.id}
                  onChange={() => setMethod(m.id as any)}
                  className="w-5 h-5 text-cyan-600"
                />
                <span className="text-xl">{m.icon}</span>
                <span className="font-medium text-slate-700">{m.name}</span>
              </label>
            ))}
          </div>

          <div className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-slate-500">Registration Fee</span>
              <span className="text-slate-900 font-bold">
                ₹{baseAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-slate-500">GST (18%)</span>
              <span className="text-slate-900 font-bold">
                ₹{gstAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg border-t pt-4">
              <span className="text-slate-700 font-bold">Total Payable</span>
              <span className="text-[#003366] font-bold text-2xl">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full mt-8 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all shadow-cyan-900/10"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "Proceed to Secure Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
