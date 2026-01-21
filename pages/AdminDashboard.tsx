
import React, { useState, useEffect } from 'react';

export const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<'agents' | 'candidates' | 'summary'>('candidates');
  const [agents, setAgents] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    setAgents(JSON.parse(localStorage.getItem('admin_agents') || '[]'));
    setCandidates(JSON.parse(localStorage.getItem('admin_candidates') || '[]'));
  }, []);

  // Agent: 300 base + 54 GST = 354
  // Candidate: 200 base + 36 GST = 236
  const agentRevenue = agents.length * 354;
  const candidateRevenue = candidates.length * 236;
  const totalRevenue = agentRevenue + candidateRevenue;
  
  const agentGST = agents.length * 54;
  const candidateGST = candidates.length * 36;
  const totalGST = agentGST + candidateGST;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#003366] uppercase tracking-tighter">APCC Admin Central</h1>
          <p className="text-slate-500">Secure tracking and performance analytics</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold uppercase">
          Live Tracking Enabled
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        {['candidates', 'agents', 'summary'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-8 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${
              tab === t ? 'bg-[#003366] text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {tab === 'candidates' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b">
                <tr>
                  <th className="p-5">Date</th>
                  <th className="p-5">Candidate Name</th>
                  <th className="p-5">Agent Code</th>
                  <th className="p-5">Job Preference</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.length > 0 ? candidates.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5">{c.date}</td>
                    <td className="p-5 font-bold text-slate-900">{c.firstName} {c.lastName}</td>
                    <td className="p-5"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono font-bold uppercase">{c.agentCode || 'DIRECT'}</span></td>
                    <td className="p-5">{c.preferredJobType}</td>
                    <td className="p-5"><span className="text-green-600 font-bold">✓ PAID</span></td>
                    <td className="p-5 text-right font-bold text-[#003366]">₹236.00</td>
                  </tr>
                )) : (
                   <tr><td colSpan={6} className="p-10 text-center text-slate-400 italic">No registrations yet today.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'agents' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b">
                <tr>
                  <th className="p-5">Agent Name</th>
                  <th className="p-5">Agent Code</th>
                  <th className="p-5">Registration Date</th>
                  <th className="p-5">Candidates Added</th>
                  <th className="p-5">Contact</th>
                  <th className="p-5 text-right">Total Revenue Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {agents.map((a, i) => {
                  const myCandidates = candidates.filter(c => c.agentCode === a.agentCode).length;
                  const myTotal = (myCandidates * 236) + 354;
                  return (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-bold text-slate-900">{a.fullName}</td>
                      <td className="p-5 font-mono font-bold text-cyan-600 uppercase">{a.agentCode}</td>
                      <td className="p-5">{a.registrationDate}</td>
                      <td className="p-5 font-bold text-center">{myCandidates}</td>
                      <td className="p-5">{a.mobile}</td>
                      <td className="p-5 text-right font-bold text-green-600">₹{myTotal.toFixed(2)}</td>
                    </tr>
                  );
                })}
                {agents.length === 0 && (
                   <tr><td colSpan={6} className="p-10 text-center text-slate-400 italic">No agents registered yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'summary' && (
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
               <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Total Candidates</p>
                  <p className="text-4xl font-black text-[#003366]">{candidates.length}</p>
               </div>
               <div className="bg-cyan-50 p-6 rounded-3xl border border-cyan-100">
                  <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2">Total Agents</p>
                  <p className="text-4xl font-black text-cyan-700">{agents.length}</p>
               </div>
               <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">Gross Revenue</p>
                  <p className="text-4xl font-black text-green-700">₹{totalRevenue.toFixed(2)}</p>
               </div>
               <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">GST Collected</p>
                  <p className="text-4xl font-black text-orange-700">₹{totalGST.toFixed(2)}</p>
               </div>
            </div>
            
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200">
              <h3 className="font-bold text-[#003366] mb-6">Monthly Growth Outlook</h3>
              <div className="h-64 flex items-end justify-between gap-4">
                 {[40, 65, 30, 85, 45, 95].map((h, i) => (
                   <div key={i} className="w-full bg-blue-900/10 rounded-t-xl relative group">
                      <div 
                        className="absolute bottom-0 w-full bg-[#003366] rounded-t-xl transition-all duration-500 group-hover:bg-cyan-500" 
                        style={{ height: `${h}%` }}
                      ></div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
        APCC Proprietary Data Management Interface - Unauthorised Access Prohibited
      </div>
    </div>
  );
};
