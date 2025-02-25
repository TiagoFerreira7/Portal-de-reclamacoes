"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <motion.h1 
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        Bem-vindo ao Portal de Reclamações
      </motion.h1>

      <motion.p 
        className="text-lg mb-6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        Ajude-nos a melhorar enviando a sua reclamação.
      </motion.p>

      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <Link 
          href="/home"
          className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Fazer Reclamação
        </Link>
      </motion.div>
    </main>
  );
}
