import React, { forwardRef } from 'react';
import { Wheat, Wifi, Cpu, User } from 'lucide-react';
import { CardType } from '../types';

interface LiveIdCardProps {
  name: string;
  mobile: string;
  cardType: CardType;
  photo: string | null;
}

export const LiveIdCard = forwardRef<HTMLDivElement, LiveIdCardProps>(({ name, mobile, cardType, photo }, ref) => {
  const getCardTitle = () => {
    switch (cardType) {
      case 'Family': return 'ফ্যামিলি কার্ড';
      case 'Agriculture': return 'কৃষি কার্ড';
      case 'Health': return 'স্বাস্থ্য কার্ড';
      default: return 'সদস্য কার্ড';
    }
  };

  const formatCardNumber = (num: string) => {
    const clean = num.replace(/\D/g, '');
    const placeholder = '0000 0000 0000 0000';
    if (!clean) return placeholder;
    
    // Simulate a 16 digit number using the mobile number
    // Prefix 880 for BD, then the mobile number, then padding
    let fullNum = '880' + clean;
    fullNum = fullNum.padEnd(16, '0').slice(0, 16);
    
    return fullNum.match(/.{1,4}/g)?.join(' ') || placeholder;
  };

  const getGradient = () => {
    switch (cardType) {
        case 'Family': return 'from-blue-900 via-blue-800 to-blue-600';
        case 'Agriculture': return 'from-[#3f3108] via-yellow-700 to-yellow-600';
        case 'Health': return 'from-red-900 via-red-800 to-red-600';
        default: return 'from-[#004d38] via-[#006a4e] to-[#008f6b]';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8 perspective-1000 transform transition-all duration-500 ease-out animate-fadeIn">
        <div ref={ref} className={`relative w-full aspect-[1.58/1] rounded-2xl shadow-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${getGradient()} transition-colors duration-500 group`}>
            
            {/* Background Texture/Watermark */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                 <div className="absolute -right-10 -bottom-20 transform -rotate-12 transition-transform duration-700 group-hover:rotate-0">
                    <Wheat size={300} strokeWidth={0.5} />
                 </div>
                 {/* Subtle noise texture simulation */}
                 <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
            </div>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-10">
                
                {/* Top Row: Bank/Party Name */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/BNP_logo.png/960px-BNP_logo.png" 
                          alt="BNP Logo" 
                          className="w-8 h-8 object-contain drop-shadow-md"
                          crossOrigin="anonymous"
                        />
                        <span className="text-white font-bold tracking-widest text-sm uppercase drop-shadow-md font-sans">বিএনপি সেবা</span>
                    </div>
                    <span className="text-white/80 font-mono text-[10px] md:text-xs italic tracking-wider border border-white/20 px-2 py-0.5 rounded">{getCardTitle()}</span>
                </div>

                {/* Middle Row: Chip, Wifi and Photo */}
                <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-4 pl-2">
                        {/* EMV Chip */}
                        <img 
                          src="https://static.vecteezy.com/system/resources/thumbnails/009/400/645/small/sim-card-clipart-design-illustration-free-png.png"
                          alt="Card Chip"
                          className="w-10 h-8 md:w-12 md:h-10 object-contain"
                        />
                        <Wifi className="text-white/80 rotate-90 drop-shadow-sm" size={24} />
                    </div>

                    {/* Photo Area */}
                    <div className="w-16 h-20 md:w-20 md:h-24 bg-gray-200/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center justify-center overflow-hidden shadow-inner mr-2 relative group-hover:scale-105 transition-transform duration-300">
                        {photo ? (
                            <img src={photo} alt="User ID" className="w-full h-full object-cover" crossOrigin="anonymous" />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-white/40">
                                <User size={24} />
                                <span className="text-[8px] mt-1">ছবি</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card Number */}
                <div className="mt-auto mb-2 md:mb-4">
                    <p className="text-white font-mono text-xl md:text-2xl tracking-widest drop-shadow-md w-full" style={{textShadow: "1px 1px 2px rgba(0,0,0,0.6)"}}>
                        {formatCardNumber(mobile)}
                    </p>
                </div>

                {/* Bottom Row: Details & Logo */}
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="text-[6px] md:text-[8px] text-white/70 uppercase leading-tight">
                                মেয়াদ<br/>শেষ
                            </div>
                            <span className="text-white font-mono text-sm shadow-black drop-shadow-sm">12/30</span>
                        </div>
                        <h3 className="text-white font-medium text-base md:text-lg uppercase tracking-wider drop-shadow-md truncate max-w-[180px] font-sans">
                            {name || "নাম এখানে আসবে..."}
                        </h3>
                    </div>

                    {/* Visa-style Logo */}
                    <div className="flex flex-col items-end">
                         <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded shadow-lg flex items-center gap-1 border border-white/40">
                             <span className="font-black text-partyGreen italic text-xl leading-none" style={{ fontFamily: 'serif' }}>BNP</span>
                             <span className="font-bold text-partyRed text-xs tracking-tighter self-start">PAY</span>
                         </div>
                    </div>
                </div>
            </div>
            
        </div>
        <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            লাইভ প্রিভিউ: ডিজিটাল স্মার্ট কার্ড
        </p>
    </div>
  );
});

LiveIdCard.displayName = 'LiveIdCard';