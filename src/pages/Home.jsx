/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Zap, Globe, Smartphone, Monitor, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackgroundVideo({ src }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline /* iOS */
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover -z-10"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

const RotatingHeadline = () => {
  const headlines = [
    "One connection for every screen",
    "AI-powered monetization",
    "Programmatic Without Borders"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="h-20 flex items-center justify-center w-full">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-center"
        >
          {headlines[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" />
      
      {/* Animated network nodes */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0A84FF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-[#0B1120]/60" />
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Form submission failed:', error);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-gray-300 text-lg">
          We've received your message and will get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Input
            placeholder="Name *"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#0A84FF] focus:ring-[#0A84FF]/20"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#0A84FF] focus:ring-[#0A84FF]/20"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
      
      <Input
        placeholder="Company"
        value={formData.company}
        onChange={(e) => handleChange('company', e.target.value)}
        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#0A84FF] focus:ring-[#0A84FF]/20"
      />
      
      <Textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
        rows={4}
        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#0A84FF] focus:ring-[#0A84FF]/20"
      />
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#0A84FF]/20"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </form>
  );
};

export default function Home() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const integrations = [
    { name: 'Prebid (Client & Server)', icon: Globe },
    { name: 'Open RTB', icon: Zap },
    { name: 'JS Tags', icon: Monitor }
  ];

  return (
    <div className="min-h-screen w-full bg-[#0B1120] z-50 shadow relative text-white">
     {/* full-page video backdrop */}
     <BackgroundVideo src="src/assets/videos/video.mp4" />
      <nav className="fixed top-0 left-0 w-full bg-[#0B1120] z-50 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center">
            <img src="src/assets/images/omniAdWhiteLogo.png" alt="Logo" className="h-10 mr-3" />
            <span className="text-2xl font-bold text-white"></span>
          </div>
          <div className="space-x-8">
            <a href="#home" className="text-white hover:text-blue-400">Home</a>
            <a href="#advertisers" className="text-white hover:text-blue-400">Advertisers</a>
            <a href="#publishers"  className="text-white hover:text-blue-400">Publishers</a>
            <a href="#contact"     className="text-white hover:text-blue-400">Contact Us</a>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-center">
        <AnimatedBackground />
        {/* (optional) dark gradient overlay so text stays readable */}
       <div className="absolute inset-0 bg-black/80 pointer-events-none w-full" />
        
        <div className="relative z-10 w-full">
          <RotatingHeadline />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mt-6 mb-12 w-full text-center"
          >
            An AI-driven programmatic ad solution for mobile, CTV, and web.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#0A84FF]/20 text-lg"
            >
              Request Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Our Solution */}
      <section id="advertisers" className="py-24 px-6 bg-gradient-to-b from-[#0B1120] to-[#0d1528]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              AI-powered monetization
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              OmniAd is a streamlined programmatic monetization platform enabling publishers and advertisers to connect across mobile apps, CTV, and web. With OmniAd, there's no need to juggle multiple monetization partners or complex integrations. We bring together all major formats — banner, video, native, rewarded — into one seamless, high-performing connection designed to maximize your revenue. Our AI-driven platform is built to optimize publisher yield while maintaining maximum efficiency and cost-effectiveness for advertisers, ensuring both sides benefit from every impression.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-8 text-gray-300">Supported Integrations</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {integrations.map((integration, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all duration-200 px-6 py-3 text-lg"
                >
                  <integration.icon className="w-5 h-5 mr-2" />
                  {integration.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Publishers */}
      <section id="publishers" className="py-24 px-6 bg-[#0d1528]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Built for Publishers. <br />
                <span className="text-[#0A84FF]">Powered by Flexibility.</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Whether you're running a mobile app, a FAST channel, or a premium content site, OmniAd provides a smart and simple monetization layer that adapts to your traffic. Combine all formats through a single integration, maximize yield, and keep control over your inventory.
              </p>
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#0A84FF]/20"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid gap-6"
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#0A84FF]/20 rounded-lg flex items-center justify-center mr-4">
                      <Smartphone className="w-6 h-6 text-[#0A84FF]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Mobile Apps</h3>
                  </div>
                  <p className="text-gray-300">Seamless integration for mobile app monetization</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#0A84FF]/20 rounded-lg flex items-center justify-center mr-4">
                      <Monitor className="w-6 h-6 text-[#0A84FF]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">CTV & Web</h3>
                  </div>
                  <p className="text-gray-300">Cross-device reach for maximum revenue</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Advertisers */}
      <section id="advertisers" className="py-24 px-6 bg-gradient-to-b from-[#0d1528] to-[#0B1120]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid gap-6 lg:order-2"
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#0A84FF]/20 rounded-lg flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-[#0A84FF]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Premium Supply</h3>
                  </div>
                  <p className="text-gray-300">High-quality, cross-device inventory</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#0A84FF]/20 rounded-lg flex items-center justify-center mr-4">
                      <TrendingUp className="w-6 h-6 text-[#0A84FF]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">AI Optimization</h3>
                  </div>
                  <p className="text-gray-300">Real-time traffic shaping and optimization</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Premium Supply. <br />
                <span className="text-[#0A84FF]">Smarter Delivery.</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We offer high-quality, cross-device inventory with precision traffic shaping and real-time throttling. Our proprietary AI-powered traffic shaping algorithm is built to optimize efficiency and reduce operational overhead for advertisers. Integrate via Open RTB or Prebid and access our diverse pool of mobile, CTV, and web placements — all optimized for performance, transparency, and cost-effectiveness.
              </p>
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#0A84FF]/20"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Connect.</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Looking to learn more? We're here to answer your questions and explore opportunities.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0B1120] border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-lg mb-4">
            OmniAd.ai — Programmatic Without Borders
          </p>
          <p className="text-gray-500">
            <a href="mailto:contact@omniad.ai" className="hover:text-[#0A84FF] transition-colors">
              contact@omniad.ai
            </a>
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="#" className="text-gray-500 hover:text-[#0A84FF] transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-[#0A84FF] transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}