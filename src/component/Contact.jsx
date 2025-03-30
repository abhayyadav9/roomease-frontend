import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiGlobe,
} from "react-icons/fi";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-20">
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
        {/* <div className="mt-16">
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
        </div> */}

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
    <footer className="bg-gray-900 text-gray-300 border-t  border-gray-700">
      <div className="container mx-auto px-2 py-4">
        <div className="md:flex md:justify-between md:items-start">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">

              <h1 className="font-metal text-2xl tracking-widest drop-shadow-2xl">
              Room<span className="text-[#F83002]">Ease</span>
            </h1>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-6">
              Transforming ideas into exceptional digital experiences.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-blue-400 transition-colors duration-300 hover:pl-2"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="hover:text-blue-400 transition-colors duration-300 hover:pl-2"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/security"
                    className="hover:text-blue-400 transition-colors duration-300 hover:pl-2"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="hover:text-blue-400 transition-colors duration-300 hover:pl-2"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="hover:text-blue-400 transition-colors duration-300 hover:pl-2"
                  >
                    Blog
                  </a>
                </li>
                {/* <li>
                  <a
                    href="/careers"
                    className="hover:text-blue-400 transition-colors duration-300 hover:pl-2"
                  >
                    Careers
                  </a>
                </li> */}
              </ul>
            </div>

            <div >
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-">
                <li>
                  <a
                    href="mailto:info@company.com"
                    className="hover:text-blue-400 transition-colors duration-300 "
                  >
                  roomease9@gmail.com
                  </a>
                </li>
                <li>9263833367</li>
                {/* <li>
                  123 Business Street
                  <br />
                  New York, NY 10001
                </li> */}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center md:text-left">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm">
              © {new Date().getFullYear()} RoomEase. All rights reserved.
            </p>

            <div className="mt-4 md:mt-0 flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">GitHub</span>
                {/* <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
