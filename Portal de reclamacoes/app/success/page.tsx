"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link" 

export default function SuccessPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10); 

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer); 
      router.push("/"); 
    }

    return () => clearInterval(timer);
  }, [seconds, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-700 text-white p-6 transition-all duration-1000">
      <motion.h1
        className="text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}  
        animate={{ opacity: 1, y: 0 }}    
        transition={{ duration: 0.7 }}
      >
        Reclamação Enviada com Sucesso!
      </motion.h1>

      <motion.p
        className="text-lg text-center mb-6"
        initial={{ opacity: 0 }}        
        animate={{ opacity: 1 }}       
        transition={{ delay: 0.3, duration: 0.7 }} 
      >
        A sua reclamação foi registrada com sucesso.
      </motion.p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <Link
        href="/home"
        className="block w-full px-5 py-2.5 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
          >
        Voltar à Página Anterior
          </Link>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <Link
        href="/"
        className="block w-full px-5 py-2.5 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
          >
        Voltar à Página Inicial
          </Link>
        </motion.div>
      </div>

      <motion.p
        className="text-center mt-4"
        initial={{ opacity: 0 }}        
        animate={{ opacity: 1 }}       
        transition={{ delay: 0.5, duration: 0.7 }} 
      >
        Será redirecionado automaticamente em {seconds} segundos.
      </motion.p>
    </main>
  );
}
