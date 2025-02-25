"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; 

export default function SuccessPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10); 

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer); 
      router.push("/"); // Redireciona para a página inicial
    }

    return () => clearInterval(timer);
  }, [seconds, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {/* Título animado */}
      <motion.h1
        className="text-4xl font-bold text-center text-black mb-4"
        initial={{ opacity: 0, y: -50 }}  
        animate={{ opacity: 1, y: 0 }}    
        transition={{ duration: 0.7 }}
      >
        Reclamação Enviada com Sucesso!
      </motion.h1>

      {/* Mensagem animada */}
      <motion.p
        className="text-lg text-center text-gray-700 mb-6"
        initial={{ opacity: 0 }}        
        animate={{ opacity: 1 }}       
        transition={{ delay: 0.3, duration: 0.7 }} 
      >
        Sua reclamação foi registrada com sucesso.
      </motion.p>

      {/* Botões */}
      <div className="flex flex-col gap-4">
        {/* Botão Voltar à Página Anterior */}
        <motion.button
          onClick={() => router.back()} // Voltar à página anterior
          className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 transition"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          Voltar à Página Anterior
        </motion.button>

        {/* Botão Voltar à Home */}
        <motion.button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          Voltar para a Página Inicial
        </motion.button>
      </div>

      {/* Timer - para redirecionamento automático */}
      <motion.p
        className="text-center text-gray-500 mt-4"
        initial={{ opacity: 0 }}        
        animate={{ opacity: 1 }}       
        transition={{ delay: 0.5, duration: 0.7 }} 
      >
        Você será redirecionado automaticamente em {seconds} segundos.
      </motion.p>
    </main>
  );
}
