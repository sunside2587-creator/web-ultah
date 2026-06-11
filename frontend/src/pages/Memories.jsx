import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Daftar semua foto dari folder frontend/public/memories
const photoList = [
  '/memories/f1.jpeg', '/memories/f3.jpeg', '/memories/f4.jpeg',
  '/memories/f5.jpeg', '/memories/f6.jpeg', '/memories/f7.jpeg',
  '/memories/f8.jpeg', '/memories/f9.jpeg', '/memories/f10.jpeg',
  '/memories/f11.jpeg', '/memories/f12.jpeg', '/memories/f14.jpeg',
  '/memories/f15.jpeg', '/memories/f16.jpeg', '/memories/f17.jpeg',
  '/memories/f18.jpeg', '/memories/f19.jpeg', '/memories/f20.jpeg',
  '/memories/f21.jpeg', '/memories/f22.jpeg', '/memories/f23.jpeg',
  '/memories/f24].jpeg', '/memories/f25.jpeg'
];

// Split the photos into 3 columns for the masonry/waterfall effect
const col1 = photoList.slice(0, 8);
const col2 = photoList.slice(8, 16);
const col3 = photoList.slice(16, 23);

const Memories = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-slate-950 p-6 md:p-12 overflow-hidden relative flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Festive Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-pink-400 rounded-full opacity-30 shadow-[0_0_15px_#f472b6]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * -20 + '%', // Start slightly above
            }}
            animate={{
              y: ['0vh', '120vh'],
              x: [0, Math.random() * 50 - 25],
              rotate: [0, 360],
              opacity: [0.1, 0.8, 0.1]
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 font-serif drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          Kenangan Indah Bersama
        </h1>
        <p className="text-slate-300 mt-4 text-center max-w-2xl text-lg">
          Setiap detik bersamamu adalah cerita yang tak akan pernah kulupa.
        </p>
      </div>

      {/* Waterfall Gallery Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex gap-4 md:gap-8 h-[60vh] overflow-hidden relative z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        
        {/* Column 1 */}
        <div className="flex-1 flex flex-col gap-4 md:gap-8 animate-waterfall">
          {[...col1, ...col1].map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-pink-500/30 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img src={src} alt="Memory" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Column 2 (different speed/delay) */}
        <div className="flex-1 flex flex-col gap-4 md:gap-8 animate-waterfall-fast">
          {[...col2, ...col2].map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-purple-500/30 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img src={src} alt="Memory" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex-1 flex flex-col gap-4 md:gap-8 animate-waterfall-slow hidden sm:flex">
          {[...col3, ...col3].map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-indigo-500/30 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img src={src} alt="Memory" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <button 
          onClick={() => navigate('/wishes')}
          className="pointer-events-auto px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold rounded-full text-base shadow-[0_0_15px_rgba(236,72,153,0.8)] transition-all hover:scale-105 active:scale-95"
        >
          Lanjut ke Pesan & Doa →
        </button>
      </div>

    </motion.div>
  );
};

export default Memories;
