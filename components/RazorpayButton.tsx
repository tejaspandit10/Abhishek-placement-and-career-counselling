import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayButton = () => {

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {

    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // 👉 change this to your backend URL (Render / localhost)
    const result = await axios.post(
      "http://localhost:5000/create-order",
      {
        amount: 500
      }
    );

    const order = result.data.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Tejas Studio",
      description: "Payment",
      order_id: order.id,

      handler: async function (response: any) {

        await axios.post(
          "http://localhost:5000/verify-payment",
          response
        );

        alert("Payment successful");
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 18px",
        background: "#0f172a",
        color: "white",
        borderRadius: "6px"
      }}
    >
      Pay Now
    </button>
  );
};

export default RazorpayButton;
