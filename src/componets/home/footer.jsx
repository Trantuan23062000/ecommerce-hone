import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white py-12"
    >
      <div className="container mx-auto grid grid-cols-1 justify-between md:grid-cols-2 gap-8 md:gap-12">
        {/* Logo và mạng xã hội */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center md:items-start"
        >
          <img src="https://res.cloudinary.com/tuantran2306/image/upload/v1717172037/logo_peurlm.png" alt="logo" className="w-24 mb-4" />
          <div className="flex justify-center md:justify-start space-x-5">
            <div className="hover:text-yellow-300">
              <FaFacebook size={24} />
            </div>
            <div className="hover:text-yellow-300">
              <FaInstagram size={24} />
            </div>
            <div className="hover:text-yellow-300">
              <FaTwitter size={24} />
            </div>
            <div className="hover:text-yellow-300">
              <FaGithub size={24} />
            </div>
          </div>
        </motion.div>

        {/* Liên hệ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <a href="/contact" className="hover:text-yellow-300 block mb-2">Email: trantuan230600@gmail.com</a>
          <a href="/contact" className="hover:text-yellow-300">Phone: 0795435792</a>
        </motion.div>

        {/* Form liên hệ */}
      </div>
    </motion.footer>
  );
};

export default Footer;
