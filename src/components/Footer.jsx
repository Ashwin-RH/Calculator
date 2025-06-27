import React from "react";
import { FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";

const Footer = () => (
  <footer className="fixed bottom-2 inset-x-0 flex flex-col items-center text-sm text-gray-300">
    <span className="hover:text-gray-100">&copy; Ashwin Haragi</span>
    <div className="flex items-center gap-3 mt-1">
      <a
        href="https://github.com/Ashwin-RH"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300/70 hover:text-gray-100 hover:scale-105 transition-transform"
      >
        <FiGithub size={16} />
      </a>
      <a
        href="https://www.linkedin.com/in/ashwin-rh-aa263b217"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300/70 hover:text-gray-100 hover:scale-105 transition-transform"
      >
        <LuLinkedin size={16} />
      </a>
    </div>
  </footer>
);

export default Footer;
