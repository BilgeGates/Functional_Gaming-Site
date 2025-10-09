import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

import { ExploreButton } from "../../components/ui";

import { useDocumentTitle } from "../../hooks";

import {
  Users,
  Target,
  Gamepad2,
  Star,
  TrendingUp,
  Heart,
  Search,
  Filter,
  Database,
  Shield,
  Globe,
  Quote,
} from "lucide-react";

import DeveloperIMG from "../../assets/Developer.jpg";

const About = () => {
  useDocumentTitle("About Us | PlayGuide");

  const [activeFeature, setActiveFeature] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Powerful search engine that helps you find games by name, genre, platform, or even specific features.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description:
        "Filter games by rating, release date, price, multiplayer support, and dozens of other criteria.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Database,
      title: "Comprehensive Database",
      description: "Get instant access to detailed info on 40 top games.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Heart,
      title: "Personal Collections",
      description:
        "Create wishlists, mark favorites, and track your gaming progress across all platforms.",
      color: "from-red-500 to-rose-600",
    },
  ];

  const stats = [
    { number: "1000", label: "Games in Database", icon: Gamepad2 },
    { number: "0", label: "Active Users", icon: Users },
    { number: "0", label: "Reviews & Ratings", icon: Star },
    { number: "9 hours", label: "Uptime", icon: TrendingUp },
  ];

  const teamMembers = [
    {
      name: "Khatai Huseynzada",
      role: "Front-End Developer",
      bio: "I craft user-friendly, consistent designs across all devices, turning static mockups into dynamic, interactive websites where creativity meets clean, scalable code",
      image: DeveloperIMG,
    },
    {
      name: "Khatai Huseynzada",
      role: "Front-End Developer",
      bio: "I build engaging, responsive interfaces that feel natural to use, bringing mockups to life while blending creativity, technical skill, and a passion for constant growth",
      image: DeveloperIMG,
    },
    {
      name: "Khatai Huseynzada",
      role: "Front-End Developer",
      bio: "I design seamless experiences that work beautifully everywhere, transforming concepts into performant, interactive solutions that combine precision, innovation, and user-focused design",
      image: DeveloperIMG,
    },
  ];

  const testimonials = [
    {
      text: "Play Guide has helped me explore games in a more structured way. I enjoy how simple it is to navigate and find something new. It's been a useful tool for my learning journey",
      author: "Khatai Huseynzada",
      role: "Front-End Developer",
    },
    {
      text: "I like how Play Guide keeps things clear and easy to use. It helps me quickly and efficiently find the type of games I'm interested in. It's a good resource for improving my skills.",
      author: "Khatai Huseynzada",
      role: "Front-End Developer",
    },
    {
      text: "Play Guide makes discovering games straightforward and enjoyable. I can find what I need without wasting time. It's a practical platform for anyone learning and exploring",
      author: "Khatai Huseynzada",
      role: "Front-End Developer",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-600/10 to-transparent"></div>
          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 sm:mb-8">
                <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <span className="text-cyan-300 font-medium text-sm sm:text-base">
                  About Play Guide
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight px-4">
                Your Ultimate
                <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text pb-2 sm:pb-3 pt-2">
                  Gaming Companion
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
                We're passionate gamers building the world's most comprehensive
                gaming discovery platform. Find your next favorite game from our
                curated collection of 1000 titles.
              </p>

              <ExploreButton variant="sectionButton">
                Explore Games
              </ExploreButton>
            </div>
          </div>

          <div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-2xl backdrop-blur-sm animate-float"></div>
          <div className="absolute top-40 right-8 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full backdrop-blur-sm animate-float-delayed"></div>
        </section>

        {/* Mission Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30 mb-4 sm:mb-6">
                  <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  <span className="text-cyan-300 text-xs sm:text-sm font-medium">
                    Our Mission
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
                  Connecting Gamers
                  <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text pb-2 sm:pb-3 pt-2">
                    With Perfect Games
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed">
                  At Play Guide, we believe every gamer deserves to find their
                  perfect match. Our mission is to eliminate the frustration of
                  endless searching and connect you with games that truly
                  resonate with your preferences, mood, and gaming style.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        Trusted Platform
                      </h4>
                      <p className="text-white/60 text-xs sm:text-sm">
                        Verified reviews and authentic ratings
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        Global Community
                      </h4>
                      <p className="text-white/60 text-xs sm:text-sm">
                        Gamers from 0 countries worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
                    alt="Gaming setup"
                    className="w-full h-60 sm:h-72 lg:h-80 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6"
                  />
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm sm:text-base">
                        Games Discovered Today
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-cyan-400">
                        0
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm sm:text-base">
                        Happy Gamers
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-purple-400">
                        0
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-3xl blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-black/20">
          <div className="container mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight px-4">
                Powerful Features for
                <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text pb-2 sm:pb-3 pt-2">
                  Every Gamer
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4">
                Discover what makes Play Guide the ultimate gaming discovery
                platform
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 ${
                      activeFeature === index
                        ? "bg-gradient-to-r from-white/20 to-white/10 border-2 border-cyan-400/50"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/70 text-sm sm:text-base">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop"
                    alt="Gaming interface"
                    className="w-full h-60 sm:h-72 lg:h-80 object-cover rounded-xl sm:rounded-2xl"
                  />
                  <div className="absolute top-8 sm:top-12 left-8 sm:left-12 right-8 sm:right-12 p-3 sm:p-4 bg-black/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20">
                    <div className="flex items-center gap-2 sm:gap-3 text-white">
                      {React.createElement(features[activeFeature].icon, {
                        className:
                          "w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0",
                      })}
                      <span className="font-semibold text-sm sm:text-base">
                        {features[activeFeature].title}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-cyan-600/20 rounded-3xl blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight px-4">
                Trusted by Millions
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/70">
                Numbers that speak for themselves
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2 transition-all duration-1000 ${
                      statsAnimated
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-white/60 font-medium text-xs sm:text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-black/20">
          <div className="container mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight px-4">
                Meet Our
                <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text pb-2 sm:pb-3 pt-2">
                  Gaming Experts
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4">
                Passionate gamers and tech experts working together to
                revolutionize game discovery
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 group-hover:scale-105">
                    <div className="relative mb-4 sm:mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover mx-auto"
                      />
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {member.name}
                      </h3>
                      <div className="text-cyan-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                        {member.role}
                      </div>
                      <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight px-4">
                What Gamers Say
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/70">
                Real feedback from our gaming community
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 group-hover:scale-105 h-full">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mb-4 sm:mb-6" />
                    <p className="text-white/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {testimonial.text}
                    </p>
                    <div>
                      <div className="font-bold text-white text-sm sm:text-base">
                        {testimonial.author}
                      </div>
                      <div className="text-purple-400 text-xs sm:text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-cyan-600/20 to-purple-600/20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight px-4">
              Ready to Find Your
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text pb-2 sm:pb-3 pt-2">
                Next Favorite Game?
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
              Join millions of gamers who trust Play Guide to discover amazing
              games. Start your gaming journey today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <ExploreButton>Start Exploring</ExploreButton>
              <Link to="/contact">
                <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(3deg);
            }
          }
          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(-3deg);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default About;
