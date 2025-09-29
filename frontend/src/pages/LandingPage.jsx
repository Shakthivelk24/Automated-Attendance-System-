import React, { useState, useEffect } from 'react';
import { Camera, Users, Clock, CheckCircle, Smartphone, Wifi, BookOpen, TrendingUp, Shield, Zap, MapPin, Star, Play, ArrowRight, Menu, X } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false); // New state for video modal

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Primary School Teacher",
      location: "Rajasthan",
      quote: "This system saves me 15 minutes every day. More time for teaching, less paperwork!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "School Administrator",
      location: "Uttar Pradesh",
      quote: "Attendance accuracy improved from 85% to 99%. Government reporting is now seamless.",
      rating: 5
    },
    {
      name: "Sunita Devi",
      role: "Headmistress",
      location: "Bihar",
      quote: "Students love the U-shaped seating. Better engagement and no proxy attendance.",
      rating: 5
    }
  ];

  const challenges = [
    {
      challenge: "Limited Technology Infrastructure",
      strategy: "Works with basic smartphones and minimal internet connectivity",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      challenge: "Teacher Training Requirements",
      strategy: "Simple one-click operation with visual tutorials and local language support",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      challenge: "Cost Constraints",
      strategy: "Low-cost solution using existing devices, government partnership pricing",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      challenge: "Connectivity Issues",
      strategy: "Offline mode with sync when connected, works on 2G networks",
      icon: <Wifi className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      title: "Time Efficient",
      description: "Reduce attendance time from 10-15 minutes to 30 seconds",
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      metric: "95% time saved"
    },
    {
      title: "100% Accurate",
      description: "Eliminate proxy attendance and manual errors completely",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      metric: "99.9% accuracy"
    },
    {
      title: "Better Engagement",
      description: "U-shaped seating promotes student-teacher interaction",
      icon: <Users className="w-8 h-8 text-purple-600" />,
      metric: "40% more participation"
    },
    {
      title: "User Friendly",
      description: "Can be easily adopted by rural teachers",
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      metric: "5 min setup"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                SmartAttend
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#solution" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Solution</a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Benefits</a>
              <a href="#feasibility" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Feasibility</a>
              <a href="#demo" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Demo</a>
            </div>

            <div className="hidden md:flex space-x-4">
              <button className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Login
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#solution" className="block py-2 text-gray-700 hover:text-blue-600">Solution</a>
              <a href="#benefits" className="block py-2 text-gray-700 hover:text-blue-600">Benefits</a>
              <a href="#feasibility" className="block py-2 text-gray-700 hover:text-blue-600">Feasibility</a>
              <a href="#demo" className="block py-2 text-gray-700 hover:text-blue-600">Demo</a>
              <div className="pt-2 space-y-2">
                <button className="w-full py-2 text-blue-600 border border-blue-600 rounded-lg">Login</button>
                <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg">Get Started</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>Transforming Rural Education in India</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Smart Attendance for
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Rural Schools</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Revolutionary face recognition system that takes attendance in 30 seconds with a single photo. 
                  Perfect for rural schools with minimal infrastructure requirements.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-2"
                  onClick={() => setIsVideoOpen(true)} // Set state to true on click
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Works Offline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Minimal Training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Low Cost</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Class 5-A Attendance</h3>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Complete</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">Photo Captured</span>
                      </div>
                      <span className="text-xs text-green-600">30s</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-blue-50 p-2 rounded text-center">
                          <div className="w-6 h-6 bg-blue-500 rounded-full mx-auto mb-1"></div>
                          <span className="text-xs text-gray-600">Present</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                      35/37 students present (94.6%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Challenge in Rural Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 50% of rural schools in India struggle with inefficient manual attendance systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Time Consuming</h3>
              <p className="text-gray-600 leading-relaxed">
                Teachers spend 10-15 minutes daily on manual attendance, reducing precious instructional time for millions of students.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Error Prone</h3>
              <p className="text-gray-600 leading-relaxed">
                Manual systems lead to proxy attendance, data entry errors, and inaccurate government reporting for schemes like mid-day meals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Resource Waste</h3>
              <p className="text-gray-600 leading-relaxed">
                Inaccurate records lead to mismanagement of resources and delays in government scheme implementations affecting student welfare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Revolutionary Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Smart U-shaped seating arrangement with instant face recognition attendance system
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">U-Shaped Seating Arrangement</h3>
                    <p className="text-gray-600">
                      Students sit in a curved formation ensuring every face is visible to both teacher and camera, 
                      promoting better interaction and engagement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Camera className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">One-Click Video Capture</h3>
                    <p className="text-gray-600">
                      Teacher simply takes one video of the entire class using a smartphone or webcam. 
                      No need to call names individually.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Instant Recognition</h3>
                    <p className="text-gray-600">
                      Advanced face recognition technology automatically identifies and marks attendance 
                      for all students in under 30 seconds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
                <h4 className="font-semibold text-lg mb-3">Key Advantages</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">No proxy attendance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Better engagement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">95% time savings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Accurate reporting</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-3xl shadow-2xl">
                {/* Image placeholder for classroom layout */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 w-full max-w-md mx-auto overflow-hidden flex items-center justify-center">
                    <img 
                        src="/Ushape.jpeg" 
                        alt="U-shaped classroom layout" 
                        className="w-full h-full object-cover rounded-2xl" 
                    />
  
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      Live Demo
                    </div>
                  </div>

                <div className="text-center text-sm text-gray-600 mt-4">
                  Smart U-shaped arrangement for optimal face recognition
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transformative Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience dramatic improvements in efficiency, accuracy, and student engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex flex-col items-center text-center space-y-4">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  <div className="bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-blue-700">{benefit.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feasibility Section */}
      <section id="feasibility" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Feasibility & Viability
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for rural schools with practical solutions to real challenges
            </p>
          </div>

          <div className="space-y-8">
            {challenges.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-red-700 mb-2">Challenge</h3>
                      <p className="text-gray-700">{item.challenge}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-700 mb-2">Our Solution</h3>
                      <p className="text-gray-700">{item.strategy}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready for Deployment</h3>
            <p className="text-lg mb-6 opacity-90">
              Minimal infrastructure • Government partnerships • Proven technology • Scalable solution
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Works on 2G networks</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Basic smartphone compatible</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Multi-language support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Government approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Educators
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from rural school teachers and administrators
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div className="space-y-2">
                <p className="font-semibold text-lg text-gray-900">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">SmartAttend</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Revolutionizing attendance management for rural schools across India with innovative face recognition technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>📧 info@smartattend.in</p>
                <p>📞 +91 9876543210</p>
                <p>📍 Hosahalli, Karnataka</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 SmartAttend. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-300 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Video Modal - Conditionally rendered based on isVideoOpen state */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video player */}
            <video
              src="/PixVerse_V5_Image_Text_360P_Create_a_3060_seco (1).mp4" // Make sure to place your video file here
              controls
              autoPlay
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;