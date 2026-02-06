const handlePay = async () => {
  console.log("PAY BUTTON CLICKED");
  setLoading(true);

  const res = await loadRazorpay();

  if (!res) {
    alert("Razorpay SDK failed to load.");
    setLoading(false);
    return;
  }

  try {
    const orderRes = await fetch(`${BACKEND_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: totalAmount
      })
    });

    const order = await orderRes.json();

    if (!order.id) {
      console.error(order);
      alert("Failed to create order");
      setLoading(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Abhishek Placement & Career Counselling",
      description: "Registration Fee",
      order_id: order.id,

      handler: async function (response: any) {
        const verifyRes = await fetch(`${BACKEND_URL}/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(response)
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          localStorage.setItem("txn_id", response.razorpay_payment_id);
          localStorage.setItem(
            "payment_details",
            JSON.stringify({
              base: baseAmount,
              gst: gstAmount,
              total: totalAmount
            })
          );

          navigate("/confirmation");
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: "",
        email: "",
        contact: ""
      },

      theme: {
        color: "#003366"
      },

      modal: {
        ondismiss: () => {
          setLoading(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Unable to start payment");
    setLoading(false);
  }
};
