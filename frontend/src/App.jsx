import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Landing from './pages/Landing';
import Memories from './pages/Memories';
import Wishes from './pages/Wishes';
import Celebrate from './pages/Celebrate';

function App() {
  const location = useLocation();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Audio play failed", err));
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 overflow-hidden relative">
      <audio ref={audioRef} src="/instrumen_HBD.mp3" loop />
      
      {/* Floating Audio Toggle Button (Hidden on Landing page to force clicking the gift) */}
      {location.pathname !== '/' && (
        <button 
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] border border-white/20 hover:bg-white/20 transition-all"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 19h4l5 5V0L9 5H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.907L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing onOpenGift={startAudio} />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/wishes" element={<Wishes />} />
          <Route path="/celebrate" element={<Celebrate />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
