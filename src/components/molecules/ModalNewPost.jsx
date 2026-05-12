import { useState } from "react";
import { db } from "../../services/firebase";
import { ref, push, serverTimestamp } from "firebase/database";
import { useAuth } from "../hook/useAuth";
import toast from "react-hot-toast";

export function ModalNewPost({ topics, onClose }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [category, setCategory] = useState(Object.keys(topics)[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const postData = {
      cliente: user?.displayName || user?.email?.split("@")[0] || "Anónimo",
      texto: text,
      timestamp: serverTimestamp(),
      voteCount: 0,
      uid: user.uid
    };

    try {
      // Insertamos en forum_topics/CATEGORIA/threads/opiniones
      const postRef = ref(db, `forum_topics/${category}/threads/opiniones`);
      await push(postRef, postData);
      toast.success("Publicado en la comunidad");
      onClose();
    } catch (error) {
      toast.error("Error al publicar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-emerald-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-emerald-900">Crear Publicación</h3>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
          </div>

          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Selecciona Categoría</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-emerald-50 border-none rounded-xl p-3 text-emerald-800 font-medium mb-4 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {Object.entries(topics).map(([key, val]) => (
              <option key={key} value={key}>{val.title}</option>
            ))}
          </select>

          <textarea
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comparte tus consejos o dudas..."
            className="w-full h-40 bg-gray-50 border-none rounded-2xl p-4 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none resize-none mb-4"
          />

          <button
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Publicando..." : "Publicar ahora"}
          </button>
        </form>
      </div>
    </div>
  );
}