import React from 'react';
import { X, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { ModalState } from '../types';

interface ModalProps {
  state: ModalState;
  onClose: () => void;
  onDownload?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ state, onClose, onDownload }) => {
  if (!state.isOpen) return null;

  const isSuccess = state.type === 'success';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border-t-8 border-partyGreen">
        
        {/* Modal Header */}
        <div className={`p-6 text-center ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-4">
            {isSuccess ? (
              <CheckCircle className="w-10 h-10 text-partyGreen" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-partyRed" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{state.title}</h3>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            {state.message}
          </p>
          {isSuccess && (
            <p className="mt-4 text-sm text-gray-500 italic">
              আপনার কার্ডটি প্রস্তুত। এখনই ডাউনলোড করুন!
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 flex flex-col md:flex-row justify-center gap-3">
          {isSuccess && onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-transform transform active:scale-95 shadow-lg"
            >
              <Download size={18} />
              কার্ড ডাউনলোড
            </button>
          )}
          
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-full font-bold text-white transition-transform transform active:scale-95 shadow-lg ${
              isSuccess ? 'bg-partyGreen hover:bg-[#004d38]' : 'bg-partyRed hover:bg-red-700'
            }`}
          >
            {isSuccess ? 'ঠিক আছে' : 'বুঝলাম'}
          </button>
        </div>
      </div>
    </div>
  );
};