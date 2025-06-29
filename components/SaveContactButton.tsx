"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiCheck, FiX } from "react-icons/fi";

export default function SaveContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const contactData = {
    name: "Gebin George",
    phone: "+91-9741301245",
    email: "gebin.official@gmail.com"
  };

  const handleSaveContact = () => {
    // Create vCard data
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
TEL:${contactData.phone}
EMAIL:${contactData.email}
END:VCARD`;

    // Create blob and download
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactData.name.replace(' ', '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* Mobile-only floating action button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-20 left-6 p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 z-40 transition-all duration-300 border border-blue-400/20 hover:border-blue-400/40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Save Contact"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isSaved ? <FiCheck size={20} /> : <FiUser size={20} />}
        </motion.div>
      </motion.button>

      {/* Contact save modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full bg-gray-900 border-t border-gray-700 rounded-t-2xl p-6 pb-8"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Save Contact</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mr-3">
                      <FiUser className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{contactData.name}</h4>
                      <p className="text-gray-400 text-sm">MCA Student & Developer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-300">
                      <span className="text-blue-400 mr-2">📞</span>
                      <span>{contactData.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="text-blue-400 mr-2">✉️</span>
                      <span>{contactData.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleSaveContact}
                disabled={isSaved}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isSaved 
                    ? "bg-green-500 text-white" 
                    : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
                }`}
                whileHover={!isSaved ? { scale: 1.02 } : {}}
                whileTap={!isSaved ? { scale: 0.98 } : {}}
              >
                {isSaved ? (
                  <span className="flex items-center justify-center">
                    <FiCheck className="mr-2" />
                    Contact Saved!
                  </span>
                ) : (
                  "Save to Contacts"
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 