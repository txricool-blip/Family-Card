import React, { useState, useRef } from 'react';
import { Wheat, Users, HeartPulse, Send, Sprout, Upload, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import { FormData, ModalState, CardType } from './types';
import { Modal } from './components/Modal';
import { ServiceCard } from './components/ServiceCard';
import { LiveIdCard } from './components/LiveIdCard';

const App: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    ward: '',
    income: '',
    cardType: '',
    photo: null,
  });

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: null,
    title: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardSelect = (type: CardType) => {
    setFormData(prev => ({ ...prev, cardType: type }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for card type
    if (!formData.cardType) {
      alert("দয়া করে একটি সেবা কার্ড সিলেক্ট করুন!");
      return;
    }

    const incomeValue = Number(formData.income);

    if (incomeValue > 5000) {
      setModal({
        isOpen: true,
        type: 'rejection',
        title: 'ও ভাই, আপনি তো নিজেই ডোনার!',
        message: 'আল্লাহর রহমতে আপনার অনেক আছে। দলের ফাণ্ডে কিছু চান্দা দেন, কার্ডের আশা বাদ দেন। দেশ বাঁচাতে আগে ত্যাগ স্বীকার করুন! 🌾',
      });
    } else {
      setModal({
        isOpen: true,
        type: 'success',
        title: 'আবেদন গৃহীত হয়েছে',
        message: 'স্বাগতম! আপনার আবেদনটি হাই-কমান্ডের অনুমোদনের জন্য পাঠানো হলো। চান্দা দিয়ে ধানের শীষের সাথেই থাকুন।',
      });
    }
  };

  const handleDownloadCard = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: 3, // High resolution
          useCORS: true, // Handle external images if any
          backgroundColor: null, // Keep transparency if any
          logging: false
        });
        
        const link = document.createElement('a');
        link.download = `bnp-card-${formData.mobile || 'user'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error("Error downloading card:", error);
        alert("কার্ড ডাউনলোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-hind pb-12">
      {/* Header Section */}
      <header className="relative bg-partyGreen text-white shadow-xl border-b-4 border-partyRed overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 watermark-bg opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 text-white opacity-10 pointer-events-none">
          <Wheat size={300} strokeWidth={0.5} />
        </div>

        <div className="container mx-auto px-4 py-8 md:py-10 relative z-10 text-center">
          <div className="flex justify-center mb-4">
             <div className="bg-white p-3 rounded-full border-4 border-partyRed shadow-lg animate-bounce">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/BNP_logo.png/960px-BNP_logo.png" 
                  alt="BNP Logo" 
                  className="w-20 h-20 object-contain"
                />
             </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight text-shadow-lg">
            বিএনপি ফ্যামিলি কার্ড পোর্টাল
          </h1>
          <p className="text-lg md:text-2xl font-light text-green-100 bg-black/20 inline-block px-6 py-1 rounded-full">
            খাম্বা ও চান্দার রাজনীতি
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-6 relative z-20">
        
        {/* Live ID Card Preview */}
        <LiveIdCard 
            ref={cardRef}
            name={formData.name} 
            mobile={formData.mobile} 
            cardType={formData.cardType} 
            photo={formData.photo}
        />

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ServiceCard 
            title="ফ্যামিলি কার্ড" 
            icon={<Users size={32} className="text-white" />} 
            isSelected={formData.cardType === 'Family'}
            onClick={() => handleCardSelect('Family')}
          />
          <ServiceCard 
            title="কৃষি কার্ড" 
            icon={<Sprout size={32} className="text-white" />} 
            isSelected={formData.cardType === 'Agriculture'}
            onClick={() => handleCardSelect('Agriculture')}
          />
          <ServiceCard 
            title="স্বাস্থ্য কার্ড" 
            icon={<HeartPulse size={32} className="text-white" />} 
            isSelected={formData.cardType === 'Health'}
            onClick={() => handleCardSelect('Health')}
          />
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 border-b-4 border-partyGreen">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-partyRed rounded-full block"></span>
              আবেদন ফরম
            </h2>
            <p className="text-gray-400 text-sm mt-1 ml-4">সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Photo Upload Section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
               <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                 <ImageIcon size={18} className="text-partyGreen" />
                 আপনার ছবি যুক্ত করুন
               </label>
               <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center overflow-hidden bg-white ${formData.photo ? 'border-partyGreen' : 'border-gray-300 border-dashed'}`}>
                     {formData.photo ? (
                       <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                     ) : (
                       <Users size={24} className="text-gray-300" />
                     )}
                  </div>
                  <label className="cursor-pointer bg-white border border-gray-300 hover:border-partyGreen text-gray-700 hover:text-partyGreen px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2 font-medium text-sm">
                     <Upload size={16} />
                     ছবি আপলোড
                     <input 
                       type="file" 
                       accept="image/*" 
                       className="hidden" 
                       onChange={handleImageUpload}
                     />
                  </label>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">আপনার নাম</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="পুরো নাম লিখুন"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-partyGreen focus:border-partyGreen outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="017xxxxxxxx"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-partyGreen focus:border-partyGreen outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="ward" className="block text-sm font-semibold text-gray-700">ওয়ার্ড নং</label>
                <input
                  type="number"
                  id="ward"
                  name="ward"
                  required
                  value={formData.ward}
                  onChange={handleInputChange}
                  placeholder="উদাহরণ: ০৫"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-partyGreen focus:border-partyGreen outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="income" className="block text-sm font-bold text-partyGreen">মাসিক আয় / অনুদান ক্ষমতা (টাকা)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500 font-bold">৳</span>
                  <input
                    type="number"
                    id="income"
                    name="income"
                    required
                    value={formData.income}
                    onChange={handleInputChange}
                    placeholder="আপনার আয় লিখুন"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-green-100 focus:ring-2 focus:ring-partyGreen focus:border-partyGreen outline-none transition-all bg-green-50/50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-partyGreen hover:bg-[#004d38] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Send size={20} />
                আবেদন জমা দিন
              </button>
            </div>
          </form>
          
          <div className="bg-gray-100 p-4 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">© ২০২৪ বিএনপি সেবা পোর্টাল | চান্দা উঠাও, দেশ বাঁচাও</p>
          </div>
        </div>
      </main>

      <Modal 
        state={modal} 
        onClose={() => setModal({ ...modal, isOpen: false })} 
        onDownload={handleDownloadCard}
      />
    </div>
  );
};

export default App;