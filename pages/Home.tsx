
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICES, TESTIMONIALS, PARTNERS } from '../constants';

interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export const Home: React.FC = () => {
  const { hash } = useLocation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    // Responsive visible count
    const updateCount = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  useEffect(() => {
    // Load reviews from constant + localStorage
    const savedReviews = localStorage.getItem('user_reviews');
    const parsedSaved = savedReviews ? JSON.parse(savedReviews) : [];
    setReviews([...TESTIMONIALS, ...parsedSaved]);
  }, []);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewToAdd: Review = {
      id: Date.now().toString(),
      name: newReview.name,
      role: newReview.role,
      content: newReview.content,
      rating: newReview.rating,
      image: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
    };

    const updatedReviews = [...reviews, reviewToAdd];
    setReviews(updatedReviews);
    
    // Persist user reviews specifically
    const savedReviews = localStorage.getItem('user_reviews');
    const parsedSaved = savedReviews ? JSON.parse(savedReviews) : [];
    localStorage.setItem('user_reviews', JSON.stringify([...parsedSaved, reviewToAdd]));

    setIsModalOpen(false);
    setNewReview({ name: '', role: '', content: '', rating: 5 });
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Logic to get circular slice of reviews
  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return items;
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-[#003366]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1920" 
            alt="Business Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Pathway to a <span className="text-cyan-400">Successful Career</span> Starts Here.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              Empowering job seekers and students in India with expert career counselling and reliable placement opportunities. Let's build your future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/apply"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-center transition-all transform hover:scale-105 shadow-xl shadow-cyan-900/20"
              >
                Apply Now / Fill Form
              </Link>
              <Link
                to="/contact"
                className="bg-white hover:bg-slate-100 text-[#003366] px-8 py-4 rounded-lg font-bold text-center transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">Our Core Services</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.slice(0, 3).map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 transition-shadow group h-full">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-xl font-bold text-[#003366] mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Runner */}
      <section className="py-20 bg-white overflow-hidden border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <h2 className="text-2xl font-bold text-[#003366] uppercase tracking-widest">Our Distinguished Partners</h2>
          <div className="w-16 h-0.5 bg-slate-200 mx-auto mt-4"></div>
        </div>
        <div className="relative">
          <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap gap-24 items-center">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
              <div key={index} className="flex flex-col items-center justify-center min-w-[320px] px-8 transition-all duration-500 group">
                <div className="h-32 flex items-center justify-center">
                   <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain transition-all duration-300 transform group-hover:scale-110" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="reviews" className="bg-[#003366] py-24 text-white scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Candidates Say</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
          </div>
          
          <div className="relative group">
            <div className="flex items-center gap-6 overflow-hidden">
              {/* Previous Arrow */}
              <button 
                onClick={prevReview}
                className="absolute left-0 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all -ml-4 md:-ml-8 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Previous review"
              >
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Reviews Track */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full transition-all duration-500">
                {getVisibleReviews().map((t, idx) => (
                  <div key={`${t.id}-${idx}`} className="bg-blue-950/50 p-8 rounded-xl border border-blue-900 transition-all hover:bg-blue-900/40 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex text-cyan-400 mb-4 text-lg">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < t.rating ? 'text-cyan-400' : 'text-blue-900'}>★</span>
                      ))}
                    </div>
                    <p className="italic mb-6 text-blue-100 leading-relaxed min-h-[80px]">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover" />
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-sm text-blue-300">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Arrow */}
              <button 
                onClick={nextReview}
                className="absolute right-0 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all -mr-4 md:-mr-8 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Next review"
              >
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-cyan-500 w-8' : 'bg-blue-900 hover:bg-blue-800'}`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-block border-2 border-cyan-500 bg-cyan-500/10 px-8 py-3 rounded-lg font-bold hover:bg-cyan-500 hover:text-white transition-all transform active:scale-95"
            >
              Add Your Review
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-[#003366] p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Write a Review</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-blue-100 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddReview} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                <input 
                  required 
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none bg-white text-black" 
                  placeholder="e.g. Rahul Patil"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Current Role / Company</label>
                <input 
                  required 
                  value={newReview.role}
                  onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none bg-white text-black" 
                  placeholder="e.g. Software Engineer at TCS"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className={`text-2xl transition-all ${star <= newReview.rating ? 'text-yellow-400 scale-110' : 'text-slate-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Feedback</label>
                <textarea 
                  required 
                  rows={4}
                  value={newReview.content}
                  onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none bg-white text-black" 
                  placeholder="Share your experience with Abhishek Placement..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#003366] hover:bg-blue-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white p-16 rounded-3xl shadow-lg border border-slate-100">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">Ready to Transform Your Career?</h2>
        <p className="text-lg text-slate-600 mb-10">
          Join thousands of successful professionals who started their journey with Abhishek Placement.
        </p>
        <Link
          to="/apply"
          className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all shadow-cyan-900/10"
        >
          Get Started Now
        </Link>
      </section>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * ${PARTNERS.length})); }
        }
      `}</style>
    </div>
  );
};
