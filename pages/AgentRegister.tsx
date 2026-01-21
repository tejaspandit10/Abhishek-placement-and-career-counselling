
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentFormData } from '../types';

export const AgentRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<AgentFormData>>({
    registrationDate: new Date().toLocaleDateString('en-GB')
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for generating Agent Code: firstname-lastname + random
    const code = `${formData.fullName?.split(' ')[0].toLowerCase() || 'agent'}-${Date.now().toString().slice(-4)}`;
    const finalData = { ...formData, agentCode: code };
    
    localStorage.setItem('pending_agent_registration', JSON.stringify(finalData));
    localStorage.setItem('payment_context', 'agent');
    navigate('/payment');
  };

  const inputClass = "w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none bg-white text-black transition-all";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-[#003366] to-[#004d99] p-10 text-white text-center">
          <h1 className="text-3xl font-bold mb-4">Become an APCC Agent</h1>
          <p className="text-cyan-200">Earn incentives and build careers by partnering with us.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name (संपूर्ण नाव)*</label>
              <input required name="fullName" onChange={handleInputChange} className={inputClass} placeholder="As per Aadhaar" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number (मोबाईल)*</label>
              <input required type="tel" maxLength={10} name="mobile" onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email ID (ईमेल)*</label>
              <input required type="email" name="email" onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Aadhaar Number (Optional)</label>
              <input name="aadhaar" maxLength={12} onChange={handleInputChange} className={inputClass} placeholder="12-digit number" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Address (पत्ता)*</label>
            <textarea required name="address" rows={3} onChange={handleInputChange} className={inputClass}></textarea>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4">
            <h3 className="font-bold text-[#003366]">Terms of Partnership</h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• A one-time registration fee of ₹300 + GST applies.</li>
              <li>• Agents will receive a unique code to tag candidates.</li>
              <li>• Incentives are processed monthly based on successful placements.</li>
            </ul>
          </div>

          <button type="submit" className="w-full bg-[#003366] hover:bg-blue-800 text-white py-5 rounded-2xl font-bold text-xl shadow-xl transition-all transform hover:-translate-y-1">
            Pay Registration Fee & Register
          </button>
        </form>
      </div>
    </div>
  );
};
