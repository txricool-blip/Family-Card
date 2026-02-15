import React from 'react';
import { ServiceCardProps } from '../types';
import { CheckCircle } from 'lucide-react';

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,106,78,0.6)] cursor-pointer border-2 ${isSelected ? 'bg-[#004d38] border-yellow-400 ring-2 ring-yellow-400/50' : 'bg-gradient-to-br from-partyGreen to-[#004d38] border-transparent hover:border-green-300'}`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white opacity-10 blur-xl transition-all duration-500 group-hover:scale-150"></div>
      
      {isSelected && (
        <div className="absolute top-3 right-3 text-yellow-400 animate-bounce">
          <CheckCircle size={24} fill="currentColor" className="text-white" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        <div className={`p-3 rounded-full backdrop-blur-sm border transition-transform duration-300 ${isSelected ? 'bg-yellow-400/20 border-yellow-400 scale-110' : 'bg-white/20 border-white/30 group-hover:scale-110'}`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold tracking-wide drop-shadow-md ${isSelected ? 'text-yellow-300' : 'text-white'}`}>{title}</h3>
      </div>
    </div>
  );
};