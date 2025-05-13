import React, { useEffect, useRef } from 'react';
import { ArrowRight, BarChart, Zap, Users, ChevronRight, Home, Building, Key, MapPin } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Background animation sequence
  useEffect(() => {
    // Start the animated gradient
    controls.start({
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  }, [controls]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth animation
      },
    },
  };

  const tabs = [
    { id: 'generate', label: 'Generate', icon: <Zap className="h-4 w-4" /> },
    { id: 'qualify', label: 'Qualify', icon: <Users className="h-4 w-4" /> },
    { id: 'convert', label: 'Convert', icon: <BarChart className="h-4 w-4" /> },
  ];

  // Buildings for the animated cityscape
  const buildings = [
    { width: 60, height: 180, x: '5%', delay: 0, windows: 6 },
    { width: 40, height: 120, x: '15%', delay: 0.2, windows: 4 },
    { width: 70, height: 200, x: '25%', delay: 0.5, windows: 8 },
    { width: 50, height: 150, x: '40%', delay: 0.8, windows: 5 },
    { width: 80, height: 220, x: '55%', delay: 1.1, windows: 9 },
    { width: 45, height: 130, x: '70%', delay: 1.4, windows: 4 },
    { width: 65, height: 190, x: '85%', delay: 1.7, windows: 7 },
  ];

  return (
    <div 
      className="relative pt-24 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-32 overflow-hidden"
      ref={backgroundRef}
    >
      {/* Main background gradient - animated */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        animate={controls}
        style={{
          background: 'linear-gradient(125deg, #0f172a 0%, #1e3a8a 50%, #0f766e 100%)',
          backgroundSize: '200% 200%',
          zIndex: -20,
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: -15,
        }}
      />
      
      {/* Blueprint-style circles (strategic points on map) */}
      {[...Array(12)].map((_, i) => {
        const size = 6 + Math.random() * 20;
        return (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border-2 border-teal-400/20 backdrop-blur-sm"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: -10,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 0.4, 0.2]
            }}
            transition={{ 
              duration: 2, 
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 15 + Math.random() * 20
            }}
          />
        );
      })}
      
      {/* Animated cityscape at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[25vh] overflow-hidden" style={{ zIndex: -12 }}>
        {/* Buildings */}
        {buildings.map((building, index) => (
          <motion.div
            key={`building-${index}`}
            className="absolute bottom-0 bg-blue-900/30 backdrop-blur-sm border-t border-l border-r border-blue-400/20 rounded-t-lg"
            style={{
              width: building.width,
              height: building.height,
              left: building.x,
              zIndex: -12 + index,
            }}
            initial={{ y: building.height }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: building.delay,
              ease: "easeOut",
            }}
          >
            {/* Building windows */}
            {[...Array(building.windows)].map((_, i) => (
              <motion.div 
                key={`window-${index}-${i}`}
                className="absolute bg-yellow-300/30 backdrop-blur-sm rounded-sm border border-yellow-400/10"
                style={{
                  width: building.width * 0.2,
                  height: building.width * 0.2,
                  left: (building.width * 0.15) + (i % 2 === 0 ? 0 : building.width * 0.5),
                  top: building.height - ((Math.floor(i / 2) + 1) * building.width * 0.3),
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.4, 0.7, 0.3] }}
                transition={{
                  duration: 4,
                  delay: building.delay + 1 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
      
      {/* Animated property connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -10 }}>
        {/* Property connection lines */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={`path-${i}`}
            d={`M${-100 + Math.random() * 100},${100 + Math.random() * 200} C${100 + Math.random() * 400},${-100 + Math.random() * 200} ${300 + Math.random() * 400},${200 + Math.random() * 200} ${600 + Math.random() * 100},${-50 + Math.random() * 100}`}
            stroke="rgba(45, 212, 191, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="8,12"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0, 0.3]
            }}
            transition={{ 
              duration: 8 + i * 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1
            }}
          />
        ))}
        
        {/* Map pins */}
        {[...Array(8)].map((_, i) => {
          const xPos = Math.random() * 100;
          const yPos = Math.random() * 100;
          return (
            <motion.g key={`pin-${i}`} style={{ opacity: 0.6 }}>
              <motion.circle 
                cx={`${xPos}%`} 
                cy={`${yPos}%`} 
                r="4"
                fill="rgba(56, 189, 248, 0.3)"
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  opacity: [0, 0.8, 0.5],
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 10 + Math.random() * 15
                }}
              />
              <motion.circle 
                cx={`${xPos}%`} 
                cy={`${yPos}%`} 
                r="12"
                fill="none"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1],
                  opacity: [0, 0.4, 0],
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 10 + Math.random() * 15
                }}
              />
            </motion.g>
          );
        })}
      </svg>
      
      {/* Floating real estate icons with glow */}
      {[...Array(12)].map((_, i) => {
        const icons = [
          <Home size={20} />,
          <Building size={20} />,
          <Key size={20} />,
          <MapPin size={20} />
        ];
        
        // Define specific positions for each icon to ensure good distribution
        const positions = [
          { x: '5%', y: '15%' },
          { x: '85%', y: '25%' },
          { x: '25%', y: '8%' },
          { x: '65%', y: '75%' },
          { x: '15%', y: '40%' },
          { x: '35%', y: '85%' },
          { x: '75%', y: '10%' },
          { x: '55%', y: '65%' },
          { x: '92%', y: '45%' },
          { x: '40%', y: '30%' },
          { x: '80%', y: '60%' },
          { x: '10%', y: '70%' },
        ];
        
        // Use a different size for each icon for more variety
        const size = 16 + (i % 3) * 8;
        const selectedIcon = icons[i % icons.length];
        const position = positions[i % positions.length];
        
        return (
          <motion.div
            key={`icon-${i}`}
            className="absolute text-teal-300/70 filter drop-shadow-lg"
            style={{
              zIndex: -5,
              left: position.x,
              top: position.y,
              textShadow: '0 0 8px rgba(45, 212, 191, 0.8)'
            }}
            initial={{ 
              opacity: 0,
              scale: 0,
            }}
            animate={{ 
              x: [
                -20,
                20,
                -20
              ],
              y: [
                -20,
                20,
                -20
              ],
              rotate: [0, 180, 360],
              opacity: 0.7,
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              x: { 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              },
              y: { 
                duration: 15 + Math.random() * 10, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              },
              rotate: { 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              },
              opacity: { duration: 2, delay: i * 0.2 },
              scale: {
                duration: 8 + i % 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            {React.cloneElement(selectedIcon, { size })}
          </motion.div>
        );
      })}
      
      {/* Dynamic map lines pattern - top right */}
      <motion.div 
        className="absolute top-0 right-0 w-[40vw] h-[40vh] opacity-20"
        style={{ zIndex: -8 }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 2 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 500 500">
          {[...Array(15)].map((_, i) => (
            <motion.path
              key={`top-path-${i}`}
              d={`M${Math.random() * 500},0 Q${250 + Math.random() * 100},${100 + Math.random() * 300} ${Math.random() * 500},500`}
              stroke={i % 2 === 0 ? "rgba(45, 212, 191, 0.4)" : "rgba(56, 189, 248, 0.4)"}
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 5 + Math.random() * 5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 2
              }}
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-12"
        >
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 text-teal-300 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="mr-2"
              >
                <Zap className="h-4 w-4" />
              </motion.div>
              <span>Next-Gen Lead Generation</span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight"
            >
              <span className="block mb-2">Transform visitors</span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400"
              >
                into customers
              </motion.span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-blue-100/90 mb-8 max-w-lg font-light leading-relaxed"
            >
              Our AI-powered platform automates lead generation, qualification, and nurturing - helping businesses increase conversion rates by up to 320%.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(45, 212, 191, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                href="#demo"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white text-base font-medium transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
              >
                <span className="flex items-center justify-center">
                  Get Started Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </motion.div>
                </span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                href="#how-it-works"
                className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-md text-white border border-white/20 text-base font-medium transition-all hover:border-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
              >
                Watch Demo
              </motion.a>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-2 gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="flex items-center p-3 rounded-xl transition-all bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                  <BarChart className="h-5 w-5 text-teal-300" />
                </div>
                <div>
                  <span className="block text-white font-semibold">320%</span>
                  <span className="text-blue-200/70 text-sm">More Conversions</span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="flex items-center p-3 rounded-xl transition-all bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <span className="block text-white font-semibold">10,000+</span>
                  <span className="text-blue-200/70 text-sm">Companies</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end relative">
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-md"
              animate={{ y: [0, -8, 0] }}
              transition={{ 
                y: { 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: "reverse" as const, 
                  ease: "easeInOut" 
                } 
              }}
            >
              {/* Animated glow effects */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl opacity-50 blur-xl"
                animate={{ 
                  boxShadow: ['0 0 20px rgba(45, 212, 191, 0.3)', '0 0 30px rgba(45, 212, 191, 0.5)', '0 0 20px rgba(45, 212, 191, 0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/40 to-teal-600/40 rounded-2xl" />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
              >
                {/* Tabs navigation */}
                <div className="mb-6">
                  <div className="flex bg-white/5 p-1 rounded-lg">
                    {tabs.map((tab, index) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(index)}
                        className={`flex-1 flex items-center justify-center py-2 px-3 text-sm rounded-md ${
                          activeTab === index 
                            ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md" 
                            : "text-white/70 hover:text-white"
                        }`}
                        whileHover={{ backgroundColor: activeTab !== index ? "rgba(255,255,255,0.1)" : undefined }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="mr-1.5">{tab.icon}</span>
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 0 && (
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            Target audience
                          </label>
                          <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            <option>B2B Technology</option>
                            <option>E-commerce</option>
                            <option>Healthcare</option>
                            <option>Financial Services</option>
                          </select>
                        </div>
                        
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            Lead source
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Website", "Social", "Email", "Events"].map((option) => (
                              <motion.button
                                key={option}
                                whileHover={{ scale: 1.03, backgroundColor: "rgba(45, 212, 191, 0.3)" }}
                                whileTap={{ scale: 0.97 }}
                                className={`px-4 py-3 rounded-lg border ${
                                  option === "Website"
                                    ? "border-teal-500 bg-teal-500/20"
                                    : "border-white/20 hover:bg-white/10"
                                } text-white text-sm focus:outline-none transition-colors`}
                              >
                                {option}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 1 && (
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            Qualification criteria
                          </label>
                          <div className="space-y-3">
                            {["Budget", "Need", "Authority", "Timing"].map((criteria) => (
                              <motion.div 
                                key={criteria}
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                                className="flex items-center p-2.5 rounded-lg border border-white/10"
                              >
                                <input
                                  type="checkbox"
                                  id={criteria}
                                  className="h-4 w-4 border-white/30 rounded text-teal-500 focus:ring-teal-500 focus:ring-offset-0 bg-white/20"
                                  defaultChecked={criteria !== "Authority"}
                                />
                                <label htmlFor={criteria} className="ml-3 text-white">
                                  {criteria}
                                </label>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 2 && (
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            Conversion goal
                          </label>
                          <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            <option>Demo Request</option>
                            <option>Free Trial</option>
                            <option>Consultation</option>
                            <option>Purchase</option>
                          </select>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-white/10 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-indigo-500/20">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-white">Expected conversion rate</span>
                            <span className="text-teal-300 font-medium">+215%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2.5">
                            <motion.div 
                              className="bg-gradient-to-r from-teal-500 to-blue-500 h-2.5 rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: "65%" }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(45, 212, 191, 0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white text-base font-medium transition-all flex items-center justify-center"
                    >
                      {activeTab < 2 ? (
                        <>
                          Continue
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        "Start Converting"
                      )}
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};