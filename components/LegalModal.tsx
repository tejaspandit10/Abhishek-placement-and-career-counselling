
import React from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#003366] p-6 text-white flex justify-between items-center flex-shrink-0">
          <h3 className="text-xl font-bold uppercase tracking-tight">{title}</h3>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow bg-slate-50">
          <div className="prose prose-slate max-w-none">
            {children}
          </div>
        </div>
        <div className="p-6 border-t bg-white flex justify-end flex-shrink-0">
          <button 
            onClick={onClose}
            className="bg-[#003366] text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-800 transition-all active:scale-95"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
