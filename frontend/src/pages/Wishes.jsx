import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Wishes = () => {
  const navigate = useNavigate();
  const [wishes, setWishes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ sender: '', message: '' });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchWishes = () => {
    fetch('https://web-ultah-mblw.vercel.app/api/wishes')
      .then(res => res.json())
      .then(data => setWishes(data))
      .catch(err => {
        console.error('Error fetching wishes:', err);
        // Fallback data if backend is not running
        if (wishes.length === 0) {
          setWishes([
            { id: 1, sender: 'Mama & Papa', message: 'Selamat ulang tahun sayang! Semoga panjang umur, sehat selalu, dan semua cita-citamu tercapai. We love you so much!' },
            { id: 2, sender: 'Sahabat Sejatimu', message: 'Happy level up day! Jangan pernah berubah ya, tetap jadi bestie yang paling asik. Traktiran ditunggu bos!' }
          ]);
        }
      });
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sender || !formData.message) return;
    
    setIsSubmitting(true);
    try {
      if (editingId) {
        // Update logic
        const response = await fetch(`https://web-ultah-mblw.vercel.app/api/wishes/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          setWishes(wishes.map(w => w.id === editingId ? { ...w, sender: formData.sender, message: formData.message } : w));
        } else {
          console.error('Failed to update wish');
        }
      } else {
        // Create logic
        const response = await fetch('https://web-ultah-mblw.vercel.app/api/wishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          const newWish = await response.json();
          setWishes([newWish, ...wishes]); // Add to top
        } else {
          console.error('Failed to submit wish');
        }
      }
      closeModal();
    } catch (err) {
      console.error('Error:', err);
      // Fallback
      if (editingId) {
        setWishes(wishes.map(w => w.id === editingId ? { ...w, sender: formData.sender, message: formData.message } : w));
      } else {
        setWishes([{ id: Date.now(), sender: formData.sender, message: formData.message }, ...wishes]);
      }
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pesan ini?')) return;
    
    try {
      const response = await fetch(`https://web-ultah-mblw.vercel.app/api/wishes/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setWishes(wishes.filter(w => w.id !== id));
      } else {
        console.error('Failed to delete wish');
      }
    } catch (err) {
      console.error('Error deleting wish:', err);
      // Fallback
      setWishes(wishes.filter(w => w.id !== id));
    }
  };

  const openEditModal = (wish) => {
    setFormData({ sender: wish.sender, message: wish.message });
    setEditingId(wish.id);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setFormData({ sender: '', message: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ sender: '', message: '' });
    setEditingId(null);
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black p-6 md:p-12 overflow-x-hidden relative flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative background blur */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-pink-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 mb-6 font-serif">
          Pesan & Doa Untukmu
        </h1>
        <p className="text-slate-300 text-lg md:text-xl text-center max-w-2xl">
          Tinggalkan pesan manis dan doa terbaikmu di hari spesial ini.
        </p>
        <button 
          onClick={openCreateModal}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold rounded-full text-lg shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Tulis Ucapan
        </button>
      </div>

      <div className="flex-1 flex flex-wrap justify-center items-center gap-8 md:gap-12 relative z-10 pb-32">
        <AnimatePresence>
          {wishes.map((wish, i) => (
            <WishCard 
              key={wish.id || i} 
              wish={wish} 
              index={i} 
              onEdit={() => openEditModal(wish)}
              onDelete={() => handleDelete(wish.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <button 
          onClick={() => navigate('/celebrate')}
          className="pointer-events-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold rounded-full text-lg shadow-2xl transition-all hover:scale-105"
        >
          Puncak Perayaan 🎉
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingId ? 'Edit Doa Terbaikmu' : 'Tulis Doa Terbaikmu'}
              </h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-slate-300 mb-2 text-sm">Nama Pengirim</label>
                  <input 
                    type="text" 
                    required
                    value={formData.sender}
                    onChange={(e) => setFormData({...formData, sender: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                    placeholder="Nama kamu..."
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2 text-sm">Pesan & Doa</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none"
                    placeholder="Tulis ucapan selamat ulang tahun..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-4 w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all disabled:opacity-70"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Ucapan'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

const WishCard = ({ wish, index, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const duration = (Math.random() * 2 + 3);
  const yOffset = (Math.random() * 10 + 5);
  const delay = (index * 0.1);

  const handleAction = (e, action) => {
    e.stopPropagation(); // Prevent card from flipping when clicking buttons
    action();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -yOffset, 0] }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: { duration: 0.4 },
        y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }}
      className="w-72 h-72 cursor-pointer will-change-transform [perspective:1000px] group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-700 shadow-2xl rounded-2xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of Card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-6 flex flex-col items-center justify-center border-t-8 border-pink-400 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-violet-500 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg">
            {wish.sender.charAt(0).toUpperCase()}
          </div>
          <p className="text-slate-800 text-xl font-bold mb-2 text-center">{wish.sender}</p>
          <div className="mt-auto bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <p className="text-pink-600 text-sm font-medium animate-pulse">Buka Pesan 💌</p>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 flex flex-col border-t-8 border-violet-500 [transform:rotateY(180deg)] overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          
          <div className="flex-1 overflow-y-auto relative z-10 flex flex-col items-center justify-start pt-2 pb-6">
            <p className="text-slate-200 text-sm md:text-base text-center italic font-serif leading-relaxed px-2">
              "{wish.message}"
            </p>
            <p className="text-violet-400 text-xs mt-4 font-medium">- {wish.sender}</p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex justify-center gap-4 mt-auto pt-4 border-t border-slate-700/50">
            <button 
              onClick={(e) => handleAction(e, onEdit)}
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-full transition-colors"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button 
              onClick={(e) => handleAction(e, onDelete)}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
              title="Hapus"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Wishes;
