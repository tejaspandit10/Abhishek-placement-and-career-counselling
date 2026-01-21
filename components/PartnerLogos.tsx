
import React from 'react';

export const InoraLogo = () => (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 100 40" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10 Q45 0 55 5 Q50 15 40 10" fill="#cddc39" />
      <path d="M60 10 Q55 0 45 5 Q50 15 60 10" fill="#2e7d32" />
      <text x="50" y="35" textAnchor="middle" className="text-[28px] font-bold fill-[#2e7d32]" style={{ fontFamily: 'Arial, sans-serif' }}>inora</text>
    </svg>
    <span className="text-[8px] font-bold text-[#2e7d32] tracking-[0.2em] mt-[-2px]">YOUR GREEN QUOTIENT</span>
  </div>
);

export const FutureTechLogo = () => (
  <div className="flex flex-col items-start scale-90">
    <div className="flex items-end gap-2">
      <svg viewBox="0 0 60 60" className="h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="10" r="8" fill="#d32f2f" />
        <path d="M10 25 H50 V35 H25 V55 H15 V25" fill="#039be5" />
        <path d="M10 40 H45 V50 H10 V40" fill="#7cb342" />
      </svg>
      <div className="flex flex-col">
        <span className="text-2xl font-black text-[#263238] leading-none">FUTURETECH</span>
        <span className="text-[8px] font-semibold text-[#263238] tracking-widest">INTEGRATED SOLUTIONS LLP</span>
      </div>
    </div>
  </div>
);

export const GorusLogo = () => (
  <div className="flex flex-col items-center bg-white p-1 rounded-lg">
    <svg viewBox="0 0 100 60" className="h-16 w-auto" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 30 Q30 5 50 25 L40 45 Q20 45 20 30" fill="#4caf50" stroke="#1b5e20" strokeWidth="1" />
      <path d="M25 25 L45 25 M30 35 L40 35" stroke="#1b5e20" strokeWidth="0.5" />
      <circle cx="55" cy="25" r="10" fill="#d32f2f" stroke="black" strokeWidth="1" />
      <circle cx="52" cy="22" r="1.5" fill="black" />
      <circle cx="58" cy="23" r="1.5" fill="black" />
      <circle cx="55" cy="28" r="1.5" fill="black" />
      <text x="50" y="55" textAnchor="middle" className="text-[14px] font-bold fill-black" style={{ fontFamily: 'cursive' }}>GORUS</text>
    </svg>
    <div className="text-[8px] text-[#2e7d32] text-center italic leading-none">
      <p className="font-serif">Forest Farm</p>
      <p className="text-[6px]">Nanegaon, Mulshi</p>
    </div>
  </div>
);

export const WofzerashLogo = () => (
  <div className="flex flex-col items-center bg-[#3e1414] px-4 py-2 rounded">
    <span className="text-[8px] text-[#d7ccc8] font-black tracking-widest mb-1">SPECIALITY COFFEE</span>
    <svg viewBox="0 0 200 40" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="30" textAnchor="middle" className="text-[32px] font-black fill-[#d7ccc8]" style={{ letterSpacing: '4px', fontFamily: 'Impact, sans-serif' }}>WOFZERASH</text>
    </svg>
    <span className="text-[7px] text-[#d7ccc8] font-medium mt-1">Sown by birds, grown by the forest</span>
  </div>
);

export const GrowscapeLogo = () => (
  <div className="flex flex-col items-start px-2">
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 50 50" className="h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="23" fill="none" stroke="#689f38" strokeWidth="1" />
        <path d="M25 10 C35 10 40 20 40 30 C40 40 30 45 20 40 C15 35 15 25 25 10" fill="#689f38" />
        <path d="M25 15 C30 20 32 25 32 30" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <span className="text-3xl font-serif text-[#689f38] tracking-widest font-light">GROWSCAPE</span>
    </div>
    <span className="text-[9px] text-[#689f38] tracking-[0.2em] font-medium ml-1">WHERE EXCELLENCE MEETS LOYALTY</span>
  </div>
);

export const SylvanscapeLogo = () => (
  <div className="flex flex-col items-center">
    <div className="flex items-center gap-3">
      <div className="bg-[#1b5e20] p-2 rounded-xl">
        <svg viewBox="0 0 40 40" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 30 Q15 10 30 10 M10 30 Q25 25 35 30 M10 30 L20 15" stroke="white" strokeWidth="2" fill="none" />
          <path d="M12 28 C15 25 18 22 20 20" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-serif text-[#2e7d32] leading-none">SYLVANSCAPE</span>
        <span className="text-xs font-serif italic text-slate-500">Feel the Bliss</span>
      </div>
    </div>
  </div>
);
