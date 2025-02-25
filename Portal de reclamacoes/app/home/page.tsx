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

  const [files, setFiles] = useState<File[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]); // Guardando as reclamações enviadas
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Recuperar as reclamações do localStorage
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Recuperar as reclamações do localStorage
    const savedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(savedComplaints);
  }, [isDarkMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.complaint) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Adicionando a nova reclamação na lista
    const newComplaints = [...complaints, { ...form, files }];
    setComplaints(newComplaints);

    // Salvando as reclamações no localStorage
    localStorage.setItem('complaints', JSON.stringify(newComplaints));

    // Limpar o formulário
    setForm({ name: "", email: "", category: "Serviço", complaint: "" });
    setFiles([]);

    // Redirecionar para a página de agradecimento
    if (isClient) {
      router.push("/success");
    }
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

      <label className="block mb-2 font-semibold text-black dark:text-white">Anexar Ficheiros</label>
      <input
        type="file"
        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-transparent dark:bg-gray-700 text-black dark:text-white"
        onChange={handleFileChange}
        accept=".jpg,.png,.pdf"
        multiple
      />
      {files.length > 0 && (
        <div className="mt-4">
        {files.map((f, index) => (
          <div key={index} className="mb-2">
          <p className="text-black dark:text-white">Ficheiro: {f.name}</p>
          {f.size > 5 * 1024 * 1024 && (
            <p className="text-red-500">O ficheiro excede o tamanho máximo de 5MB.</p>
          )}
          {f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024 && (
            <img
            src={URL.createObjectURL(f)}
            alt="Preview"
            className="mt-2 max-w-full h-auto rounded-md"
            />
          )}
          </div>
        ))}
        </div>
      )}

      <motion.button
        type="submit"
        className="mt-4 w-full px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Enviar Reclamação
      </motion.button>
      </motion.form>

      {/* Exibição das Reclamações Enviadas */}
      <div className="mt-8 w-full max-w-md">
      <motion.h3
        className="text-2xl font-bold mb-4 dark:text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Reclamações Enviadas
      </motion.h3>
      {complaints.length > 0 ? (
        complaints.map((complaint, index) => (
          <div key={index} className="border p-4 rounded-md mt-2 bg-gray-100 dark:bg-gray-700">
        <p className="text-black dark:text-white"><strong>Nome:</strong> {complaint.name}</p>
        <p className="text-black dark:text-white"><strong>Email:</strong> {complaint.email}</p>
        <p className="text-black dark:text-white"><strong>Categoria:</strong> {complaint.category}</p>
        <p className="text-black dark:text-white"><strong>Reclamação:</strong> {complaint.complaint}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">Ainda não há reclamações enviadas.</p>
      )}
      </div>
    </main>
  );
}
