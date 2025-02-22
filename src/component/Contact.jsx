import React from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiGlobe,
} from "react-icons/fi";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl md:text-2xl mb-8">
            We're here to help and answer any question you might have
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FiMapPin className="text-blue-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Headquarters</h3>
                  <p className="text-gray-600">
                    Tech Park Tower, 1th Floor
                    <br />
                    Selaqui Dehradun, CA 94025
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FiPhone className="text-blue-600 text-2xl" />
                <div>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm PST</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FiMail className="text-blue-600 text-2xl" />
                <p className="text-gray-600">contact@company.com</p>
              </div>

              <div className="flex items-center gap-4">
                <FiGlobe className="text-blue-600 text-2xl" />
                <p className="text-gray-600">www.company.com</p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4 text-gray-800">Follow Us</h3>
                <div className="flex gap-4">
                  <FaLinkedin className="text-2xl text-blue-600 hover:text-blue-700 cursor-pointer" />
                  <FaTwitter className="text-2xl text-blue-600 hover:text-blue-700 cursor-pointer" />
                  <FaFacebook className="text-2xl text-blue-600 hover:text-blue-700 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              Send Us a Message
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@company.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Legal Agreements */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            Legal Information
          </h2>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Terms of Service
              </h3>
              <p className="text-gray-600 mb-4">
                By using our services, you agree to our Terms of Service. Please
                read our full
                <a href="/terms" className="text-blue-600 hover:underline ml-1">
                  Terms and Conditions
                </a>
                .
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FiCheckCircle className="text-green-600" />
                Last updated: July 15, 2023
              </div>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Privacy Policy
              </h3>
              <p className="text-gray-600 mb-4">
                We are committed to protecting your privacy. Review our
                <a
                  href="/privacy"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Privacy Policy
                </a>
                to understand how we handle your data.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FiCheckCircle className="text-green-600" />
                GDPR compliant
              </div>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Service Level Agreement (SLA)
              </h3>
              <p className="text-gray-600 mb-4">
                Our commitment to service quality and uptime. View our
                <a href="/sla" className="text-blue-600 hover:underline ml-1">
                  SLA details
                </a>
                .
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FiCheckCircle className="text-green-600" />
                99.9% Uptime Guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-64 rounded-xl mb-4 overflow-hidden group">
                  <img
                    src="https://res.cloudinary.com/dbleyewzf/image/upload/v1740222435/vphfg0jcgfst1vf6ja9x.jpg"
                    alt="Abhay Yadav"
                    className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Abhay Yadav
                </h3>
                <p className="text-gray-600 mb-2">CEO & Founder</p>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FiUser className="text-sm" />
                  <span className="text-sm">Connect on LinkedIn</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d18506.11255977516!2d77.85631675156642!3d30.349362736875072!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1740222182730!5m2!1sen!2sin"
            className="w-full h-96 border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Footer */}
     
     
    </div>
  );
};

export default Contact;



export const Footer = () => {
  return (
    <div>
       <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2023 Company Name. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a
              href="/privacy"
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a
              href="/security"
              className="hover:text-blue-400 transition-colors"
            >
              Security
            </a>
            <a
              href="/contact"
              className="hover:text-blue-400 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}


