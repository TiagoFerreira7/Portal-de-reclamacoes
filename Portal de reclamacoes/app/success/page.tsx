"use client"; // Marca o arquivo como cliente

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Importa framer-motion

export default function SuccessPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10); // Inicia com 10 segundos

  useEffect(() => {
    // Decrementa o contador a cada segundo
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // Redireciona para a página inicial quando o contador chega a 0
    if (seconds === 0) {
      clearInterval(timer); // Para o contador
      router.push("/"); // Redireciona
    }

    return () => clearInterval(timer); // Limpeza ao desmontar o componente
  }, [seconds, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {/* Título animado */}
      <motion.h1
        className="text-4xl font-bold text-center text-black mb-4"
        initial={{ opacity: 0, y: -50 }}  // Estado inicial
        animate={{ opacity: 1, y: 0 }}    // Estado final
        transition={{ duration: 0.7 }}     // Transição suave
      >
        Reclamação Enviada com Sucesso!
      </motion.h1>

      {/* Parágrafo animado */}
      <motion.p
        className="text-lg text-center text-gray-700 mb-6"
        initial={{ opacity: 0 }}        // Estado inicial
        animate={{ opacity: 1 }}        // Estado final
        transition={{ delay: 0.3, duration: 0.7 }} // Atraso e duração
      >
        Sua reclamação foi registrada com sucesso. Você será redirecionado para a página inicial em {seconds} segundos.
      </motion.p>

      {/* Botão animado */}
      <motion.button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition"
        whileHover={{ scale: 1.05 }}  // Animação ao passar o mouse
        whileTap={{ scale: 0.95 }}   // Animação ao clicar
      >
        Voltar para a Página Inicial
      </motion.button>
    </main>
  );
}
