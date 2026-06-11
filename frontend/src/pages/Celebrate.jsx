import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

import useWindowSize from '../hooks/useWindowSize';

const Celebrate = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [blowConfetti, setBlowConfetti] = useState(false);

  // Confetti timeout as per PRD (high intensity for 5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleBlowCandle = () => {
    if (!isCandleBlown) {
      setIsCandleBlown(true);
      setBlowConfetti(true);
      setTimeout(() => setBlowConfetti(false), 5000); // 5 seconds of celebration confetti
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-950 flex flex-col items-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Heavy Confetti initially, then stops */}
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={800} gravity={0.15} />}
      {/* Light Confetti continuously after */}
      {!showConfetti && !blowConfetti && <Confetti width={width} height={height} numberOfPieces={50} gravity={0.05} opacity={0.5} />}
      {/* Celebration Confetti when candle is blown */}
      {blowConfetti && <Confetti width={width} height={height} recycle={true} numberOfPieces={800} gravity={0.2} />}

      {/* Floating Balloons Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`balloon-${i}`}
            className="absolute rounded-full"
            style={{
              width: '60px',
              height: '80px',
              backgroundColor: ['#f472b6', '#a78bfa', '#60a5fa', '#fcd34d', '#34d399'][i % 5],
              left: `${10 + (i * 12)}%`,
              bottom: '-100px',
              boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.2)',
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%'
            }}
            animate={{
              y: [0, -height - 200],
              x: [0, Math.sin(i) * 50, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
             {/* Balloon string */}
             <div className="w-[2px] h-20 bg-white/30 absolute left-1/2 -translate-x-1/2 top-full"></div>
          </motion.div>
        ))}
      </div>

      <motion.h1 
        className="text-5xl md:text-7xl font-bold text-center mt-8 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        Happy Birthday!
      </motion.h1>

      <div className="z-10 w-full max-w-3xl mt-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-black aspect-video flex justify-center items-center">
        <ReactPlayer 
          url="https://youtu.be/4Zya_t98x3s?si=MpcKfkmGcEaEKgET" 
          width="100%"
          height="100%"
          controls={true}
          playing={true}
          muted={false}
          loop={true}
        />
      </div>

      <div className="z-10 mt-24 flex flex-col items-center">
        <motion.div 
          className="relative cursor-pointer group"
          onClick={handleBlowCandle}
          animate={isCandleBlown ? { scale: [1, 1.1, 0.95, 1], rotate: [0, -2, 2, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Cake Base */}
          <div className="w-48 h-24 bg-pink-300 rounded-lg relative shadow-xl border-b-8 border-pink-400">
            <div className="absolute top-0 left-0 w-full h-4 bg-white/50 rounded-t-lg"></div>
            {/* Decorations */}
            <div className="absolute top-1/2 w-full flex justify-between px-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Candle */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-12 bg-white border-2 border-slate-200 rounded-sm">
            {/* Candle Stripes */}
            <div className="w-full h-2 bg-pink-400 mt-2"></div>
            <div className="w-full h-2 bg-pink-400 mt-2"></div>
            
            {/* Flame or Smoke */}
            <AnimatePresence mode="wait">
              {!isCandleBlown ? (
                <motion.div
                  key="flame"
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-8 bg-yellow-400 rounded-full"
                  style={{ boxShadow: '0 0 15px #fbbf24' }}
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    rotate: [0, -5, 5, -2, 0]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  exit={{ opacity: 0, scale: 0 }}
                />
              ) : (
                <motion.svg
                  key="smoke"
                  width="20" height="40" viewBox="0 0 20 40"
                  className="absolute -top-10 left-1/2 -translate-x-1/2 text-gray-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 0], y: -20, x: [0, -5, 5, -10] }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  <path d="M10,40 Q0,30 10,20 T10,0" fill="none" stroke="currentColor" strokeWidth="2" />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {!isCandleBlown && (
          <p className="mt-4 text-pink-300 animate-pulse font-medium">Klik lilin untuk meniup!</p>
        )}

        <AnimatePresence>
          {isCandleBlown && (
            <motion.div
              initial={{ y: 50, scale: 0.5, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
              className="mt-8 text-center flex flex-col items-center"
            >
              <motion.p 
                className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-400 mb-2"
                animate={{ backgroundPosition: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% auto' }}
              >
                Yeay! Harapanmu akan segera terwujud! ✨
              </motion.p>
              <p className="text-slate-300 mb-6 text-lg">Terima kasih telah menjadi bagian berharga dalam hidup kami.</p>
              
              <motion.button 
                onClick={() => navigate('/memories')}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-full text-lg shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-all hover:scale-110 active:scale-95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Lihat Memori Bersama →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
};

export default Celebrate;
