import React from 'react';

interface LogoProps {
  className?: string;
  hideText?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", hideText = false, light = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Brandmark container with scale applied to the image */}
      <div className="h-full flex items-center justify-center relative">
        <img 
          src="https://github.com/tejaspandit10/APCC/blob/main/Artboard%205@4x-8.png?raw=true" 
          alt="Abhishek Placement Logo" 
          className="h-full w-auto object-contain transform scale-[1.5] origin-center"
        />
      </div>
      
      {!hideText && (
        <div className="flex flex-col justify-center leading-none ml-2">
          <span className={`text-xl font-serif font-bold tracking-wider ${light ? 'text-white' : 'text-[#003366]'}`}>
            ABHISHEK
          </span>
          <span className={`text-[8px] sm:text-[10px] font-sans font-semibold tracking-tighter ${light ? 'text-blue-100' : 'text-[#003366]'}`}>
            PLACEMENT AND CAREER COUNSELLING
          </span>
        </div>
      )}
    </div>
  );
};