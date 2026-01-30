
import React from 'react';
import { BUSINESS_DETAILS } from '../constants';

export const Contact: React.FC = () => {
  const mapUrl = "https://maps.app.goo.gl/bukKYdGSAtSxZ5bj7?g_st=iw";
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.910325374493!2d73.5356947!3d18.5329188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc299003666b60b%3A0xe542617f6943c2c5!2sAbhishek%20Placement%20and%20Career%20Counselling!5e0!3m2!1sen!2sin!4v1709100000000!5m2!1sen!2sin";

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#003366] mb-4">Contact Us</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">Have questions? We're here to help you navigate your career path. Reach out to our expert team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <div className="text-3xl mb-4">📍</div>
               <h3 className="font-bold text-[#003366] mb-2">Our Office</h3>
               <p className="text-slate-600 text-sm leading-relaxed">
                 {BUSINESS_DETAILS.address}
               </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <div className="text-3xl mb-4">📞</div>
               <h3 className="font-bold text-[#003366] mb-2">Call Us</h3>
               <p className="text-slate-600 text-sm leading-relaxed">
                 {BUSINESS_DETAILS.phone1}<br/>
                 {BUSINESS_DETAILS.phone2}<br/>
                 Mon - Sat: 10 AM - 6 PM
               </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-80 bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner border border-slate-200">
               <iframe 
                src={embedUrl}
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
               ></iframe>
            </div>
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-white border-2 border-slate-200 hover:border-cyan-500 hover:text-cyan-600 p-4 rounded-xl font-bold text-slate-700 transition-all group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              View on Google Maps
            </a>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold text-[#003366] mb-8">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input type="text" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white text-black" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white text-black" placeholder="Enter phone" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input type="email" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white text-black" placeholder="Enter email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
              <textarea rows={5} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all bg-white text-black" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-[#003366] hover:bg-blue-800 text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
