
import React from 'react';

export const PrivacyContent: React.FC = () => (
  <div className="space-y-8 text-slate-700 leading-relaxed">
    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">1. Information Collection</h2>
      <p>Abhishek Placement & Career Counselling (APCC) collects personal information only for the following purposes:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Candidate registration and profile building.</li>
        <li>Professional career counselling sessions.</li>
        <li>Facilitating placement support with hiring partners.</li>
        <li>Communication regarding job alerts and application status.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">2. Data Storage</h2>
      <p>Information such as your name, phone number, email address, Aadhaar number, educational history, and career details will be stored securely in our database.</p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">3. Data Sharing</h2>
      <p>Your data will NOT be sold to any third-party marketing firms. Information may be shared ONLY with:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Verified employers for the purpose of recruitment.</li>
        <li>Authorized recruitment partners.</li>
        <li>Internal APCC team members for administrative processing.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">4. Data Security</h2>
      <p>APCC follows reasonable industry-standard security practices to protect your user data from unauthorized access, disclosure, or destruction.</p>
    </section>

    <section>
      <h2 className="text-xl font-bold text-[#003366] mb-4">5. Contact Us</h2>
      <p>For any privacy-related queries, please contact us at info@jobs-apcc.in.</p>
    </section>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="pt-32 max-w-4xl mx-auto py-20 px-4">
    <h1 className="text-3xl font-black text-[#003366] mb-8 uppercase border-b-4 border-cyan-500 pb-2 inline-block">Privacy Policy</h1>
    <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
      <PrivacyContent />
    </div>
  </div>
);
