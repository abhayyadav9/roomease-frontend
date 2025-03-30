
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../redux/slice/roomSlice";
import { useDispatch } from "react-redux";
import {motion} from "framer-motion"

const TenantHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
   <>

<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}

      {/* Hero Section */}
      <div className="container mx-auto px-2 pt-32 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center"
        >
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Perfect
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Rental Home
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8"
            >
              Discover your ideal living space with our curated selection of
              rental properties.
            </motion.p>

            <motion.div variants={itemVariants} className="relative max-w-md">
              <input
                type="text"
                // value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                placeholder="Search by city, neighborhood, or ZIP..."
                className="w-full px-6 py-4 h-12  rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <motion.button
              
                className="absolute  right-1 h-12  bg-blue-600 text-white px-8 rounded-full"
                onClick={()=> navigate("/tenant/all-rooms")}
              >
                Search
              </motion.button>
            </motion.div>
          </div>

          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative h-96 bg-blue-100 rounded-3xl overflow-hidden"
            >
              {/* Add your hero image or 3D illustration here */}
              <div
                className="relative h-screen bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                }}
              ></div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-6 py-16"
      >
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose RoomEase?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🏠",
              title: "Smart Search",
              text: "AI-powered property recommendations",
            },
            {
              icon: "💰",
              title: "No Hidden Fees",
              text: "Transparent pricing guaranteed",
            },
            {
              icon: "🔒",
              title: "Secure",
              text: "Verified listings & safe transactions",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
    </div>

 
   
   
   </>
  );
};


export default TenantHome;