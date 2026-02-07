import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BUSINESS_DETAILS } from "../constants";

export const Confirmation: React.FC = () => {
  const navigate = useNavigate();

  const context = localStorage.getItem("payment_context") || "candidate";
  const txnId = localStorage.getItem("txn_id"); // 🔥 NO fallback
  const invNo = `INV/APCC/${new Date().getFullYear()}/${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  // 🔐 Guard: block confirmation if payment not done
  useEffect(() => {
    if (!txnId) {
      navigate("/payment");
    }
  }, [txnId, navigate]);

  const rawData =
    context === "candidate"
      ? localStorage.getItem("pending_application")
      : localStorage.getItem("pending_agent_registration");

  const data = rawData ? JSON.parse(rawData) : null;

  const base = context === "agent" ? 300 : 200;
  const gst = base * 0.18;
  const cgst = gst / 2;
  const sgst = gst / 2;
  const total = base + gst;

  const paymentDetails = { base, cgst, sgst, total };

  // 🔁 Sync with Admin (only after real payment)
  useEffect(() => {
    if (!data || !txnId) return;

    if (context === "agent") {
      const existing = JSON.parse(
        localStorage.getItem("admin_agents") || "[]"
      );

      if (!existing.some((a: any) => a.agentCode === data.agentCode)) {
        localStorage.setItem(
          "admin_agents",
          JSON.stringify([...existing, { ...data, payment: paymentDetails }])
        );
      }
    } else {
      const existing = JSON.parse(
        localStorage.getItem("admin_candidates") || "[]"
      );

      localStorage.setItem(
        "admin_candidates",
        JSON.stringify([
          ...existing,
          { ...data, txnId, invNo, payment: paymentDetails },
        ])
      );
    }
  }, [data, context, txnId]);

  const handlePrint = () => window.print();

  // ⛔ Avoid rendering before guard check
  if (!txnId) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Success Banner */}
      <div className="bg-green-600 p-8 rounded-3xl text-white text-center mb-10 no-print shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Registration Successful!
        </h1>
        <p className="text-green-100">
          Payment of ₹{total.toFixed(2)} verified successfully.
        </p>
      </div>

      {/* Invoice */}
      <div className="bg-white p-12 rounded-2xl shadow-2xl border">
        <div className="flex justify-between mb-10">
          <div>
            <h2 className="text-xl font-bold text-[#003366]">
              Abhishek Placement & Career Counselling
            </h2>
            <p className="text-xs text-slate-500">
              {BUSINESS_DETAILS.address}
            </p>
            <p className="text-xs">
              GSTIN: {BUSINESS_DETAILS.gstin}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">Invoice No: {invNo}</p>
            <p className="text-sm">Txn ID: {txnId}</p>
          </div>
        </div>

        <table className="w-full text-sm mb-8">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Description</th>
              <th className="text-right p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">
                {context === "agent"
                  ? "Agent Registration Fee"
                  : "Candidate Registration Fee"}
              </td>
              <td className="p-2 text-right">
                ₹{base.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="p-2">CGST (9%)</td>
              <td className="p-2 text-right">
                ₹{cgst.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="p-2">SGST (9%)</td>
              <td className="p-2 text-right">
                ₹{sgst.toFixed(2)}
              </td>
            </tr>
            <tr className="font-bold border-t">
              <td className="p-2">Total</td>
              <td className="p-2 text-right">
                ₹{total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-xs text-slate-500 text-center">
          This is a computer-generated invoice.
        </p>
      </div>

      <div className="mt-10 flex gap-4 justify-center no-print">
        <button
          onClick={handlePrint}
          className="bg-[#003366] text-white px-8 py-4 rounded-xl font-bold"
        >
          Download Invoice
        </button>

        <Link
          to="/"
          className="bg-slate-200 px-8 py-4 rounded-xl font-bold"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};
