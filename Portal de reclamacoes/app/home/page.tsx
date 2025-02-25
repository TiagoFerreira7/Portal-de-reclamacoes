"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ComplaintPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "Serviço",
    complaint: "",
  });

  const [isClient, setIsClient] = useState(false); // Para garantir que o código só rode no lado do cliente
  const router = useRouter(); // Usando o router do next/navigation

  useEffect(() => {
    setIsClient(true); // Garantir que estamos no lado do cliente
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.complaint) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Realizar o redirecionamento para a página de sucesso
    if (isClient) {
      router.push("/success"); // Redireciona para /success
    }

    // Resetando o formulário após o envio
    setForm({ name: "", email: "", category: "Serviço", complaint: "" });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.h1 
        className="text-4xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        Submeter Reclamação
      </motion.h1>

      <motion.h2 
        className="text-lg text-gray-600 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Preencha todos os campos antes de submeter.
      </motion.h2>

      <motion.form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <label className="block mb-2 font-semibold">Nome</label>
        <input
          type="text"
          name="name"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Digite o seu nome"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Digite o seu email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold">Categoria</label>
        <select
          name="category"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={form.category}
          onChange={handleChange}
        >
          <option value="Serviço">Serviço</option>
          <option value="Produto">Produto</option>
          <option value="Atendimento">Atendimento</option>
          <option value="Outro">Outro</option>
        </select>

        <label className="block mb-2 font-semibold">Descrição</label>
        <textarea
          name="complaint"
          className="w-full border border-gray-300 rounded-md p-2"
          rows={4}
          placeholder="Descreva a sua reclamação..."
          value={form.complaint}
          onChange={handleChange}
          required
        />

        <motion.button 
          type="submit" 
          className="mt-4 w-full px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enviar Reclamação
        </motion.button>
      </motion.form>
    </main>
  );
}
