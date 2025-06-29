"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from "react-icons/fi";
import ScrollAnimation from "./ScrollAnimation";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-primary-50/50 to-white dark:from-dark-900 dark:to-dark-800"></div>
        
        {/* Animated shapes */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-200/20 dark:bg-primary-900/10 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary-200/20 dark:bg-secondary-900/10 blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 20, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.05]" width="100%" height="100%">
          <pattern id="contactGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contactGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Get in Touch
          </h2>
        </ScrollAnimation>
        
        <ScrollAnimation delay={0.1} direction="up">
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Feel free to reach out to me for any inquiries, collaborations, or just to say hello.
          </p>
        </ScrollAnimation>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <ScrollAnimation delay={0.2} direction="right">
              <div className="rounded-xl overflow-hidden bg-white dark:bg-dark-800 shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-5">
                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 mr-4">
                        <FiMail className="text-primary-600 dark:text-primary-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                        <a
                          href="mailto:gebin.official@gmail.com"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          gebin.official@gmail.com
                        </a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 mr-4">
                        <FiPhone className="text-primary-600 dark:text-primary-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                        <a 
                          href="tel:+919035614579" 
                          className="text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          +91 90356 14579
                        </a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 mr-4">
                        <FiMapPin className="text-primary-600 dark:text-primary-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                        <p className="text-gray-800 dark:text-white">
                          Bangalore, India
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Map or decorative element */}
                <div className="h-48 bg-gray-200 dark:bg-dark-700 relative overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.6600754044!2d77.35073327009468!3d12.954517010883638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1686489711685!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map of Bangalore"
                  ></iframe>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent dark:from-dark-900/30 pointer-events-none"></div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <ScrollAnimation delay={0.3} direction="left">
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  Send Me a Message
                </h3>
                
                {isSubmitted ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-10 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <FiCheckCircle className="text-primary-600 dark:text-primary-400 text-4xl" />
                    </motion.div>
                    <h4 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 px-4 py-3 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-primary-500/40 transition-all"
                          placeholder="Your name"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 px-4 py-3 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-primary-500/40 transition-all"
                          placeholder="Your email"
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 px-4 py-3 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-primary-500/40 transition-all"
                        placeholder="Subject of your message"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 px-4 py-3 text-gray-800 dark:text-white focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-primary-500/40 transition-all resize-none"
                        placeholder="Your message"
                      ></textarea>
                    </motion.div>
                    
                    {error && (
                      <motion.div 
                        className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.div>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="pt-2"
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative group overflow-hidden rounded-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-medium transition-colors duration-300 flex items-center justify-center w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message
                            <FiSend className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        )}
                        
                        {/* Button shine effect */}
                        <motion.span 
                          className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                          animate={{ translateX: ["100%", "-100%"] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            repeatDelay: 2
                          }}
                        />
                      </button>
                    </motion.div>
                  </form>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
} 