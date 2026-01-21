
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_DETAILS } from '../constants';

export const Confirmation: React.FC = () => {
  const context = localStorage.getItem('payment_context') || 'candidate';
  const txnId = localStorage.getItem('txn_id') || 'TXN_SAMPLE123';
  const invNo = `INV/APCC/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
  
  const rawData = context === 'candidate' 
    ? localStorage.getItem('pending_application') 
    : localStorage.getItem('pending_agent_registration');
  
  const data = rawData ? JSON.parse(rawData) : null;
  
  const base = context === 'agent' ? 300 : 200;
  const gst = base * 0.18;
  const cgst = gst / 2;
  const sgst = gst / 2;
  const total = base + gst;
  const paymentDetails = { base, cgst, sgst, total };

  // Sync with Mock Admin Database
  useEffect(() => {
    if (data) {
      if (context === 'agent') {
        const existing = JSON.parse(localStorage.getItem('admin_agents') || '[]');
        if (!existing.some((a: any) => a.agentCode === data.agentCode)) {
          localStorage.setItem('admin_agents', JSON.stringify([...existing, { ...data, payment: paymentDetails }]));
        }
      } else {
        const existing = JSON.parse(localStorage.getItem('admin_candidates') || '[]');
        localStorage.setItem('admin_candidates', JSON.stringify([...existing, { ...data, txnId, invNo, payment: paymentDetails }]));
      }
    }
  }, [data, context]);

  const handlePrint = () => window.print();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header Notification (No-Print) */}
      <div className="bg-green-600 p-8 rounded-3xl text-white text-center mb-10 no-print shadow-lg">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Registration Successful!</h1>
        <p className="text-green-100">Payment of ₹{paymentDetails.total.toFixed(2)} verified. Your Tax Invoice is ready below.</p>
      </div>

      {/* Tax Invoice Section */}
      <div className="bg-white p-12 rounded-2xl shadow-2xl border border-slate-200 relative overflow-hidden print:border-0 print:shadow-none">
        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-slate-100 pb-10 mb-10">
           <div className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-[#003366] flex items-center justify-center rounded-lg text-white font-black">AP</div>
               <h2 className="text-xl font-bold text-[#003366] uppercase tracking-tighter leading-none">
                 Abhishek Placement &<br/><span className="text-xs">Career Counselling</span>
               </h2>
             </div>
             <div className="text-[10px] text-slate-500 max-w-xs leading-relaxed">
               {BUSINESS_DETAILS.address}<br/>
               GSTIN: <span className="font-bold text-black">{BUSINESS_DETAILS.gstin}</span><br/>
               Contact: {BUSINESS_DETAILS.phone1}
             </div>
           </div>
           <div className="text-right mt-6 md:mt-0 space-y-1">
             <h3 className="text-3xl font-black text-slate-300 uppercase tracking-widest">Tax Invoice</h3>
             <p className="text-sm font-bold text-slate-700">Invoice No: {invNo}</p>
             <p className="text-sm text-slate-500">Date: {data?.date || data?.registrationDate}</p>
           </div>
        </div>

        {/* Bill To */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Bill To:</h4>
            <p className="text-lg font-bold text-blue-900">{context === 'agent' ? data?.fullName : `${data?.firstName} ${data?.lastName}`}</p>
            <p className="text-sm text-slate-600">{data?.address}</p>
            <p className="text-sm text-slate-600">Mob: {data?.mobile}</p>
          </div>
          {context === 'agent' && (
            <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 text-center flex flex-col justify-center">
              <h4 className="text-[10px] font-bold text-cyan-600 uppercase mb-1">Your Permanent Agent Code</h4>
              <p className="text-2xl font-black text-[#003366] tracking-widest">{data?.agentCode}</p>
              <p className="text-[9px] text-cyan-700 mt-2">Use this code for all candidate registrations.</p>
            </div>
          )}
        </div>

        {/* Items Table */}
        <table className="w-full mb-10 text-sm">
          <thead>
            <tr className="bg-slate-50 border-y-2 border-slate-100">
              <th className="p-4 text-left font-bold text-slate-700">Description</th>
              <th className="p-4 text-center font-bold text-slate-700">SAC Code</th>
              <th className="p-4 text-right font-bold text-slate-700">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-medium text-slate-800">
                {context === 'agent' ? 'APCC Professional Agent Partnership Fee' : 'Registration & Career Goal Questionnaire Fee'}
              </td>
              <td className="p-4 text-center text-slate-500">9983</td>
              <td className="p-4 text-right font-bold">₹{paymentDetails.base.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-full md:w-1/2 space-y-2 bg-slate-50 p-6 rounded-2xl">
             <div className="flex justify-between text-sm">
               <span className="text-slate-500">Subtotal</span>
               <span className="font-bold">₹{paymentDetails.base.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-slate-500">CGST (9%)</span>
               <span className="font-bold">₹{paymentDetails.cgst.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-slate-500">SGST (9%)</span>
               <span className="font-bold">₹{paymentDetails.sgst.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-xl font-black text-[#003366] border-t-2 border-white pt-4 mt-2">
               <span>Total Amount</span>
               <span>₹{paymentDetails.total.toFixed(2)}</span>
             </div>
          </div>
        </div>

        <div className="text-[9px] text-slate-400 italic text-center border-t pt-6">
          This is a computer-generated invoice and does not require a physical signature.<br/>
          Payment processed via Secure Gateway. Transaction ID: {txnId}
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center no-print">
        <button onClick={handlePrint} className="bg-[#003366] text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center gap-2">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
           Download Tax Invoice (PDF)
        </button>
        <Link to="/" className="bg-slate-100 text-slate-700 px-10 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all text-center">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};
