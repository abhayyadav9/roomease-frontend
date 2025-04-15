import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ChevronRightIcon,
  HomeModernIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import Contact, { Footer } from "./Contact.jsx";
import { useNotifications } from "../hooks/socket/useGetNotification.jsx";
import useGetRTM from "../hooks/socket/useGetRTM.jsx";

// Color Palette
const colors = {
  primary: "#1A365D", // Deep Navy
  secondary: "#6366F1", // Electric Violet
  accent: "#06B6D4", // Cyan
  highlight: "#F59E0B", // Amber
};

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useGetRTM();
  useNotifications();

  const features = [
    {
      name: " Matching",
      description: "Smart algorithm finds properties matching your lifestyle",
      icon: SparklesIcon,
    },
    {
      name: " Reality Tours",
      description: "Immersive  property walkthroughs from home",
      icon: UserGroupIcon,
    },
    {
      name: "Digital Contracts",
      description: "Secure electronic agreements with e-signature",
      icon: BuildingOfficeIcon,
    },
  ];

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "tenant") {
      navigate("/tenant/home");
    } else if(user?.role === "owner"){
      navigate("/owner/home")
    }
  }, [user?.role, navigate]); // Added dependencies

  const stats = [
    { id: 1, name: "Premium Listings", value: "25K+" },
    { id: 2, name: "Place Covered", value: "50+" },
    { id: 3, name: "Happy Clients", value: "98%" },
    { id: 4, name: "Response Time", value: "<2h" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />

        {/* Animated Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden pt-32 pb-24"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-cyan-100/20" />
            <div className="absolute left-20 top-20 h-64 w-64 animate-float rounded-full bg-cyan-200/30 blur-3xl" />
            <div className="absolute right-32 bottom-40 h-64 w-64 animate-float-delayed rounded-full bg-violet-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-2xl text-center"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent"
              >
                Rent Smarter Room
                <br />
                <span className="text-5xl sm:text-7xl">Rental Experience</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg leading-8 text-gray-600"
              >
                Discover seamless renting application where easy owner can
                rentted their house, room and their properties Easily, And
                Teanant get their dream home or rooms as per their need and
                smart contract management.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/all-rooms")}
                  className="rounded-lg bg-gradient-to-br from-cyan-600 to-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  Get Started
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl lg:text-center"
            >
              <h2 className="text-base font-semibold leading-7 text-cyan-600">
                Rent smarter
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Modern renting solution
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"
            >
              <dl className="grid max-w-xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <motion.div
                    key={feature.name}
                    variants={itemVariants}
                    className="group relative rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <dt className="flex flex-col">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-600">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="text-xl font-semibold text-gray-900">
                        {feature.name}
                      </span>
                    </dt>
                    <dd className="mt-4 text-base leading-6 text-gray-600">
                      {feature.description}
                    </dd>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50/50 to-violet-50/50 opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-slate-900 to-cyan-900 py-24 sm:py-32"
        >
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-10" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Trusted by modern renters
                </h2>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.id}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center rounded-xl bg-white/5 p-8 backdrop-blur-sm"
                  >
                    <dt className="text-base font-semibold leading-7 text-cyan-200">
                      {stat.name}
                    </dt>
                    <dd className="mt-4 text-5xl font-bold tracking-tight text-white">
                      {stat.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 to-violet-100/20" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-cyan-900 px-8 py-16 shadow-2xl"
            >
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to revolutionize your rental experience?
                </h2>
                <p className="mt-4 text-lg leading-8 text-cyan-100">
                  Join thousands of satisfied users today
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mt-8 flex justify-center"
                >
                  <a
                    href="/register"
                    className="inline-flex items-center gap-x-2 rounded-lg bg-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:bg-cyan-400"
                  >
                    Start Now
                    <ChevronRightIcon className="h-5 w-5" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm leading-5 text-gray-400">
              © 2024 LuxeRent. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
      </div>

      <div className="h-full mt-20 mb-0 flex flex-col">
        <main className="flex-1">
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Home;
