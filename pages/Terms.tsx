
import React from 'react';

export const TermsContent: React.FC = () => (
  <div className="space-y-8 text-slate-700 leading-relaxed">
    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">1. General Policies</h2>
      <p>All services provided by Abhishek Placement & Career Counselling (APCC) are subject to company policies and legal guidelines. By utilizing our platform, you agree to comply with all stated terms.</p>
    </section>

    <section className="bg-red-50 p-6 rounded-2xl border border-red-100">
      <h2 className="text-xl font-bold text-red-700 mb-4 uppercase text-sm">2. No Refund Policy</h2>
      <p className="font-semibold mb-2">Registration, counselling, and service fees are charged for professional services and administrative processing.</p>
      <p className="text-red-900 text-sm italic underline">Once payment is made, the amount is non-refundable under any circumstances. This includes, but is not limited to, unsuccessful placement, withdrawal by the candidate, or a change of plans after registration.</p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">3. Intellectual Property</h2>
      <p>The Site and its original content, features, and functionality are and will remain the exclusive property of <strong>Abhishek Placement & Career Counselling (https://jobs-apcc.in/)</strong> and its licensors. The Site is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of APCC.</p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">4. Limitation of Liability</h2>
      <p>In no event shall <strong>Abhishek Placement & Career Counselling</strong>, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site.</p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">5. Termination</h2>
      <p>We may terminate or suspend your access to our Site immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">6. Governing Law</h2>
      <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">7. Service Modifications</h2>
      <p>APCC reserves the right to modify its services, fee structure, and company policies at any time without prior notice. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">8. Candidate Authenticity</h2>
      <p>Candidates must provide correct, genuine, and verified information. Any discrepancy in documentation or identity may lead to immediate disqualification from the placement process without a refund.</p>
    </section>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="pt-32 max-w-4xl mx-auto py-20 px-4">
    <h1 className="text-3xl font-black text-[#003366] mb-8 uppercase border-b-4 border-cyan-500 pb-2 inline-block">Terms & Conditions</h1>
    <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
      <TermsContent />
    </div>
  </div>
);
