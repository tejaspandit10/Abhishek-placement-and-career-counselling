
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { processPayment } from '../services/mockPayment';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const context = localStorage.getItem('payment_context') || 'candidate';
  const baseAmount = context === 'agent' ? 300 : 200;
  const gstAmount = baseAmount * 0.18;
  const totalAmount = baseAmount + gstAmount;

  const handlePay = async () => {
    setLoading(true);
    const result = await processPayment(totalAmount);
    if (result.success) {
      localStorage.setItem('txn_id', result.transactionId);
      localStorage.setItem('payment_details', JSON.stringify({
        base: baseAmount,
        gst: gstAmount,
        total: totalAmount
      }));
      navigate('/confirmation');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 bg-[#003366] text-white text-center">
          <h2 className="text-2xl font-bold">{context === 'agent' ? 'Agent' : 'Candidate'} Registration Fee Payment</h2>
          <p className="text-cyan-200 mt-2">Amount to pay: ₹{totalAmount.toFixed(2)} (Incl. 18% GST)</p>
        </div>
        
        <div className="p-8">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Select Payment Method</h3>
          <div className="space-y-3">
            {[
              { id: 'upi', name: 'UPI (PhonePe, GPay, Paytm)', icon: '📱' },
              { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
              { id: 'netbanking', name: 'Net Banking', icon: '🏦' }
            ].map(m => (
              <label 
                key={m.id} 
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${method === m.id ? 'border-cyan-500 bg-cyan-50' : 'hover:bg-slate-50'}`}
              >
                <input type="radio" name="paymethod" checked={method === m.id} onChange={() => setMethod(m.id as any)} className="w-5 h-5 text-cyan-600" />
                <span className="text-xl">{m.icon}</span>
                <span className="font-medium text-slate-700">{m.name}</span>
              </label>
            ))}
          </div>

          <div className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
             <div className="flex justify-between items-center mb-2 text-sm">
               <span className="text-slate-500">Registration Fee</span>
               <span className="text-slate-900 font-bold">₹{baseAmount.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center mb-4 text-sm">
               <span className="text-slate-500">GST (18%)</span>
               <span className="text-slate-900 font-bold">₹{gstAmount.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center text-lg border-t pt-4">
               <span className="text-slate-700 font-bold">Total Payable</span>
               <span className="text-[#003366] font-bold text-2xl">₹{totalAmount.toFixed(2)}</span>
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
              'Proceed to Secure Payment'
            )}
          </button>
          
          <div className="mt-6 flex justify-center items-center gap-4 opacity-50 grayscale text-xs font-medium">
            <span>SECURE PAYMENT BY</span>
            <img src="https://picsum.photos/40/20?text=VISA" alt="Visa" />
            <img src="https://picsum.photos/40/20?text=MC" alt="Mastercard" />
            <img src="https://picsum.photos/40/20?text=UPI" alt="UPI" />
          </div>
        </div>
      </div>
    </div>
  );
};
