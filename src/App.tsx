import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Lock, Cpu, Zap, ChevronRight, ChevronLeft, ArrowRight, Wallet } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Slides data
const slides = [
  {
    id: 1,
    title: "Welcome to Trezor",
    subtitle: "The Future of Secure Digital Asset Management",
    description: "Begin your journey to unparalleled crypto security",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    icon: Shield
  },
  {
    id: 2,
    title: "Hardware Security",
    subtitle: "Military-Grade Protection",
    description: "Discover how our advanced technology safeguards your assets",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    icon: Lock
  },
  {
    id: 3,
    title: "Intuitive Interface",
    subtitle: "Simplicity Meets Innovation",
    description: "Experience our user-friendly ecosystem designed for everyone",
    image: "https://images.unsplash.com/photo-1642104704072-0b8f0b4b1b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    icon: Cpu
  },
  {
    id: 4,
    title: "Get Started Today",
    subtitle: "Your Security Journey Begins Now",
    description: "Follow our simple setup process and secure your digital future",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    icon: Zap
  }
];

// Feature sections
const features = [
  {
    title: "Uncompromising Security",
    description: "Our hardware wallets utilize advanced cryptographic protocols and secure elements to ensure your private keys never leave the device.",
    icon: Shield
  },
  {
    title: "Intuitive Setup Process",
    description: "Follow our guided initialization process to set up your device in minutes, with clear instructions at every step.",
    icon: Zap
  },
  {
    title: "Multi-Currency Support",
    description: "Manage Bitcoin, Ethereum, and thousands of other cryptocurrencies from a single secure device.",
    icon: Wallet
  },
  {
    title: "Offline Transaction Signing",
    description: "Sign transactions completely offline, eliminating exposure to online threats and malware.",
    icon: Lock
  }
];

// Animated section component
const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play on user interaction
  const handleManualSlideChange = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    handleManualSlideChange((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    handleManualSlideChange((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Slider */}
      <section className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slides[currentSlide].image})`,
                filter: 'brightness(0.4)'
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6"
              >
                {React.createElement(slides[currentSlide].icon, { size: 64, className: "mx-auto mb-6 text-blue-400" })}
              </motion.div>
              
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl md:text-3xl font-light mb-6"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
              >
                {slides[currentSlide].description}
              </motion.p>
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center group">
                  Get Started Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Slider controls */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-500 w-10' : 'bg-gray-400 bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </section>
      
      {/* Main content */}
      <main>
        {/* Introduction Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Begin Your Trezor Journey
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Welcome to Trezor.io/start, your gateway to the world of secure cryptocurrency management. 
                As digital assets continue to revolutionize the financial landscape, protecting your investments 
                has never been more crucial. Trezor hardware wallets represent the pinnacle of security technology, 
                designed to safeguard your digital wealth against the ever-evolving threats in the cyber realm.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Our step-by-step initialization process ensures that even newcomers to cryptocurrency can establish 
                bank-grade security for their digital assets with confidence and ease. This guide will walk you through 
                the entire setup process, from unboxing your device to securing your first transaction.
              </p>
            </AnimatedSection>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-16 px-4 bg-gray-900 bg-opacity-50">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Why Choose Trezor?
              </h2>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <AnimatedSection key={index}>
                  <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                    {React.createElement(feature.icon, { size: 48, className: "text-blue-400 mb-6" })}
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        
        {/* Setup Process */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Simple Setup Process
              </h2>
            </AnimatedSection>
            
            <div className="space-y-16">
              <AnimatedSection>
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="md:w-1/2">
                    <div className="bg-blue-500 bg-opacity-10 p-1 rounded-2xl border border-blue-500 border-opacity-30">
                      <img 
                        src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                        alt="Unboxing your Trezor device" 
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">1. Unbox Your Device</h3>
                    <p className="text-gray-300 mb-6">
                      Your Trezor arrives in tamper-evident packaging to ensure it hasn't been compromised. 
                      Verify the security seals are intact before proceeding with the setup process. Inside, 
                      you'll find your Trezor device, USB cable, recovery seed cards, and quick start guide.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-300">Check for package tampering</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-300">Verify all components are included</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                  <div className="md:w-1/2">
                    <div className="bg-purple-500 bg-opacity-10 p-1 rounded-2xl border border-purple-500 border-opacity-30">
                      <img 
                        src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                        alt="Connecting your Trezor device" 
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">2. Connect and Initialize</h3>
                    <p className="text-gray-300 mb-6">
                      Connect your Trezor to your computer using the provided USB cable. Visit trezor.io/start 
                      in your web browser to download Trezor Suite, our comprehensive desktop application that 
                      will guide you through the initialization process and serve as your control center for 
                      managing digital assets.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-300">Download Trezor Suite</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-300">Follow on-screen instructions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="md:w-1/2">
                    <div className="bg-blue-500 bg-opacity-10 p-1 rounded-2xl border border-blue-500 border-opacity-30">
                      <img 
                        src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                        alt="Creating recovery seed" 
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">3. Secure Your Recovery Seed</h3>
                    <p className="text-gray-300 mb-6">
                      During setup, your Trezor will generate a unique recovery seed – a sequence of 12 or 24 words 
                      that serves as the master key to all your crypto assets. Record these words carefully on the 
                      provided recovery seed cards and store them in a secure, private location. Never store your 
                      recovery seed digitally or share it with anyone.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-300">Write down recovery seed words</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-300">Store in a secure location</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Digital Future?</h2>
              <p className="text-xl text-gray-300 mb-10">
                Join thousands of users worldwide who trust Trezor to protect their digital assets. 
                Our hardware wallets combine cutting-edge security with intuitive design to provide 
                the ultimate protection for your cryptocurrency investments.
              </p>
              <button className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Get Your Trezor Today
              </button>
            </AnimatedSection>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Frequently Asked Questions
              </h2>
            </AnimatedSection>
            
            <div className="space-y-8">
              <AnimatedSection>
                <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4">What happens if I lose my Trezor device?</h3>
                  <p className="text-gray-300">
                    If your Trezor is lost, stolen, or damaged, you can fully recover all your assets using your 
                    recovery seed. Simply purchase a new Trezor device and select the recovery option during setup. 
                    This is why properly securing your recovery seed is crucial – it's your ultimate backup.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4">Which cryptocurrencies does Trezor support?</h3>
                  <p className="text-gray-300">
                    Trezor supports thousands of cryptocurrencies, including Bitcoin, Ethereum, and all ERC-20 tokens, 
                    as well as many other blockchain ecosystems. Our development team continuously adds support for 
                    new cryptocurrencies to ensure you can manage your diverse portfolio from a single secure device.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4">Is Trezor suitable for beginners?</h3>
                  <p className="text-gray-300">
                    Absolutely! Trezor is designed with both beginners and experts in mind. Our intuitive interface 
                    and step-by-step setup process make it easy for anyone to secure their digital assets, regardless 
                    of technical expertise. Additionally, our comprehensive support resources and active community 
                    are always available to help you along your journey.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;