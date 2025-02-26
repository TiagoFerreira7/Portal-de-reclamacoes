"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DOMPurify from 'dompurify';
import { FaEnvelope, FaUser, FaTag, FaFileAlt, FaRegCalendarAlt, FaPaperclip } from 'react-icons/fa'; // Adicionando ícones

export default function ComplaintPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "Serviço",
    complaint: "",
    productType: "",   
    incidentDate: "",   
  });

  const [files, setFiles] = useState<File[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const savedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(savedComplaints);

    const savedForm = JSON.parse(localStorage.getItem('form') || '{"name": "", "email": "", "category": "Serviço", "complaint": "", "productType": "", "incidentDate": ""}');
    setForm(savedForm);
    const savedFiles = JSON.parse(localStorage.getItem('files') || '[]');
    setFiles(savedFiles);
  }, []);

  useEffect(() => {
    localStorage.setItem('form', JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files));
  }, [files]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: DOMPurify.sanitize(value || "") });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.complaint || !form.incidentDate) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const newComplaints = [...complaints, { ...form, files }];
    setComplaints(newComplaints);

    localStorage.setItem('complaints', JSON.stringify(newComplaints));

    setForm({ name: "", email: "", category: "Serviço", complaint: "", productType: "", incidentDate: "" });
    setFiles([]);
    localStorage.removeItem('form');
    localStorage.removeItem('files');

    if (isClient) {
      router.push("/success");
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-black">
      <motion.h1
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        tabIndex={0}
      >
        Submeter Reclamação
      </motion.h1>

      <motion.h2
        className="text-lg mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        tabIndex={0}
      >
        Preencha todos os campos antes de submeter.
      </motion.h2>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-3/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block mb-2 font-semibold flex items-center">
            <FaUser className="mr-2 text-lg" />
            Nome
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Digite o seu nome"
            value={form.name || ""}
            onChange={handleChange}
            required
            aria-required="true"
          />

          
  <label className="block mb-2 font-semibold flex items-center">
    <FaEnvelope className="mr-2 text-lg" />
    Email
  </label>
  <input
    type="email"
    name="email"
    className={`w-full border ${form.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email) ? 'border-green-500' : 'border-gray-300'} rounded-md p-2 mb-4`}
    placeholder="Digite o seu email"
    value={form.email}
    onChange={handleChange}
    required
  />
          <label className="block mb-2 font-semibold flex items-center">
            <FaTag className="mr-2 text-lg" />
            Categoria
          </label>
          <select
            name="category"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            value={form.category || "Serviço"}  
            onChange={handleChange}
          >
            <option value="Serviço">Serviço</option>
            <option value="Produto">Produto</option>
            <option value="Atendimento">Atendimento</option>
            <option value="Outro">Outro</option>
          </select>

          <label className="block mb-2 font-semibold flex items-center">
            <FaFileAlt className="mr-2 text-lg" />
            Descrição
          </label>
          <textarea
            name="complaint"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            rows={3}
            placeholder="Descreva a sua reclamação..."
            value={form.complaint}
            onChange={handleChange}
            required
          />

          {form.category === "Produto" && (
            <div>
              <label className="block mb-2 font-semibold flex items-center">
                <FaTag className="mr-2 text-lg" />
                Tipo de Produto
              </label>
              <select
                name="productType"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                value={form.productType}
                onChange={handleChange}
              >
                <option value="Com Defeito">Com Defeito</option>
                <option value="Não Funcional">Não Funcional</option>
                <option value="Atrasado">Atrasado</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          )}

          <label className="block mb-2 font-semibold flex items-center">
            <FaRegCalendarAlt className="mr-2 text-lg" />
            Data do Ocorrido
          </label>
          <input
            type="date"
            name="incidentDate"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            value={form.incidentDate}
            onChange={handleChange}
            required
            max={new Date().toISOString().split("T")[0]}
          />
          {form.incidentDate && new Date(form.incidentDate) > new Date() && (
            <p className="text-red-500 text-sm mt-1">A data não pode ser no futuro.</p>
          )}

          <label className="block mb-2 font-semibold flex items-center">
            <FaPaperclip className="mr-2 text-lg" />
            Anexar Ficheiros (somente .jpg, .png, .pdf, .mp4)
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleFileChange}
            accept=".jpg,.png,.pdf,.mp4"
            multiple
          />
          {files.length > 0 && (
            <div className="mt-4">
              {files.map((f, index) => (
                <div key={index} className="mb-2">
                  <p>Ficheiro: {f.name}</p>
                  {f.type.startsWith('image') && (
                    <img src={URL.createObjectURL(f)} alt={f.name} className="w-24 h-24 object-cover mt-2" />
                  )}
                  {f.type === 'video/mp4' && (
                    <video controls className="w-24 h-24 object-cover mt-2">
                      <source src={URL.createObjectURL(f)} type="video/mp4" />
                      O seu navegador não suporta o elemento de vídeo.
                    </video>
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

        <motion.div
          className="bg-gray-100 p-4 rounded-lg shadow-lg w-full lg:w-1/3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          id="faq"
        >
          <h4 className="text-lg font-bold mb-4">Perguntas Frequentes</h4>
          <div className="space-y-4">
          {[
            { question: "Como posso alterar ou excluir a minha reclamação?", answer: "Atualmente, não é possível editar ou excluir reclamações diretamente após o envio. Se precisar de alguma alteração, entre em contato com nossa equipe de suporte." },
            { question: "Qual é o prazo para receber uma resposta?", answer: "Normalmente, respondemos dentro de 7 a 10 dias úteis. Se o seu caso for urgente, por favor, avise-nos no campo de descrição da reclamação." },
            { question: "Como posso acompanhar o estado da minha reclamação?", answer: "Você receberá atualizações por e-mail sobre o andamento da sua reclamação. Fique atento à sua caixa de entrada." },
            { question: "Posso fazer uma reclamação anónima?", answer: "Para garantir que possamos processar sua reclamação de forma adequada e responder, é necessário fornecer o seu nome e e-mail. A confidencialidade será mantida." },
            { question: "Posso submeter uma reclamação sobre uma empresa ou serviço fora do meu país?", answer: "Sim, pode. No entanto, recomenda-se fornecer o máximo de informações possíveis para facilitar o processo de investigação." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-sm cursor-pointer" onClick={() => toggleFAQ(index)}>
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-semibold text-gray-700">{item.question}</h5>
                <motion.div
                  animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path d="M1.5 6L8 12.5 14.5 6h-13z"/>
                  </svg>
                </motion.div>
              </div>
              <motion.div
                animate={{ height: expandedFAQ === index ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-gray-600 mt-2"
              >
                {expandedFAQ === index && <p>{item.answer}</p>}
              </motion.div>
            </div>
          ))
          }
          </div>
        </motion.div>
      </div>
    </main>
  );
}
