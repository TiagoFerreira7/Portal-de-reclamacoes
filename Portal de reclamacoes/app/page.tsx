"use client";
import { motion } from "framer-motion";
import Link from "next/link";


export default function HomePage() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 transition-all duration-1000 text-white p-6"
    >
      <motion.h1
      className="text-5xl font-bold mb-4 cursor-pointer"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.05 }}
      >
      Bem-vindo ao Portal de Reclamações
      </motion.h1>

      <motion.p
      className="text-lg mb-6 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      whileHover={{ scale: 1.05 }}
      >
      Ajude-nos a melhorar enviando a sua reclamação.
      </motion.p>

      <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      whileHover={{ scale: 1.1 }}
      >
      <Link
        href="/home"
        className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        Fazer Reclamação
      </Link>
      </motion.div>
    </main>
  );
}
