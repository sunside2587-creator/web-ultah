import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Landing = ({ onOpenGift }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (onOpenGift) onOpenGift();
    setIsOpen(true);
    setTimeout(() => {
      navigate('/memories');
    }, 800);
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="z-10 flex flex-col items-center">
        <motion.div
          className="cursor-pointer will-change-transform will-change-opacity"
          animate={isOpen ? { scale: 50, opacity: 0 } : { scale: 1, rotate: [0, -2, 2, -2, 0] }}
          transition={
            isOpen 
              ? { duration: 0.8, ease: "easeIn" } 
              : { rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 2 } }
          }
          onClick={!isOpen ? handleOpen : undefined}
        >
          {/* Simple 3D Gift Box SVG Representation */}
          <svg width="160" height="160" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9H4V21H20V9Z" fill="#ec4899" stroke="#be185d" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M12 9V21" stroke="#be185d" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M4 9L12 3L20 9" fill="#f472b6" stroke="#be185d" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M12 3V9" stroke="#be185d" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M12 3C12 3 9.5 1 7.5 3C5.5 5 12 9 12 9" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M12 3C12 3 14.5 1 16.5 3C18.5 5 12 9 12 9" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(236, 72, 153, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="mt-8 px-8 py-3 bg-[#ec4899] text-white font-bold rounded-full text-lg shadow-lg"
          >
            Buka Hadiah
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Landing;
