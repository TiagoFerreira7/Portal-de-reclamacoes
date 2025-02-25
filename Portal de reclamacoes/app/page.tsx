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

  const [file, setFile] = useState<File | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.complaint) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    if (isClient) {
      router.push("/success"); 
    }

    setForm({ name: "", email: "", category: "Serviço", complaint: "" });
    setFile(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className={`flex flex-col items-center justify-center min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="absolute top-4 right-4">
      <motion.button 
        onClick={toggleTheme} 
        className="flex items-center bg-gray-300 dark:bg-gray-700 p-2 rounded-full overflow-hidden w-16 h-8"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="mr-2">{isDarkMode ? '🌙' : '☀️'}</span>
        <motion.div 
        className={`w-6 h-6 bg-white rounded-full shadow-md ${isDarkMode ? 'translate-x-8' : 'translate-x-0'}`}
        initial={{ x: isDarkMode ? 8 : 0 }}
        animate={{ x: isDarkMode ? 8 : 0 }}
        transition={{ type: "", stiffness: 7000, damping: 300 }}
        />
      </motion.button>
      </div>

      <motion.h1 
        className="text-4xl font-bold mb-2 text-center dark:text-white"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        Submeter Reclamação
      </motion.h1>

      <motion.h2 
        className="text-lg mb-6 text-center dark:text-white"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Preencha todos os campos antes de submeter.
      </motion.h2>

      <motion.form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <label className="block mb-2 font-semibold text-black dark:text-white">Nome</label>
        <input
          type="text"
          name="name"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 bg-transparent dark:bg-gray-700"
          placeholder="Digite o seu nome"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold text-black dark:text-white">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 bg-transparent dark:bg-gray-700"
          placeholder="Digite o seu email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold text-black dark:text-white">Categoria</label>
        <select
          name="category"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 bg-transparent dark:bg-gray-700 text-black dark:text-white"
          value={form.category}
          onChange={handleChange}
        >
            <option value="Serviço" className="text-black dark:text-white">Serviço</option>
            <option value="Produto" className="text-black dark:text-white">Produto</option>
            <option value="Atendimento" className="text-black dark:text-white">Atendimento</option>
            <option value="Outro" className="text-black dark:text-white">Outro</option>
        </select>

        <label className="block mb-2 font-semibold text-black dark:text-white">Descrição</label>
        <textarea
          name="complaint"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-transparent dark:bg-gray-700"
          rows={4}
          placeholder="Descreva a sua reclamação..."
          value={form.complaint}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-semibold text-black dark:text-white">Anexar Ficheiro</label>
        <input
          type="file"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-transparent dark:bg-gray-700 text-black dark:text-white"
          onChange={handleFileChange}
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
