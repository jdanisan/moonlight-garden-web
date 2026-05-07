import { useEffect, useState, useMemo } from "react";
import { db } from "../../services/firebase";
import { ref, onValue, update, increment } from "firebase/database";
import { useAuth } from "../hook/useAuth";
import { Modal } from "../organism/Modal";

export function ForumList() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estados para modales
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPostForComment, setSelectedPostForComment] = useState(null);

  useEffect(() => {
    // Escuchamos la raíz del objeto para tener acceso a 'topics' y 'forum_topics'
    const dbRef = ref(db, "/");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      setData(val);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allPosts = useMemo(() => {
    if (!data?.forum_topics) return [];
    
    const posts = [];
    const topicsMeta = data.topics || {};

    // Iteramos sobre las categorías (compra_semilla, consejos, etc.)
    Object.keys(data.forum_topics).forEach((topicKey) => {
      const threads = data.forum_topics[topicKey].threads?.opiniones;
      
      if (threads) {
        Object.entries(threads).forEach(([id, content]) => {
          posts.push({
            id,
            topicKey, 
            category: topicsMeta[topicKey]?.title || topicKey, // Cruce de datos con 'topics'
            author: content.cliente || "Anónimo",
            text: content.texto,
            timestamp: content.timestamp,
            voteCount: content.voteCount || 0,
            // Contamos los comentarios si el nodo existe
            commentCount: content.comments ? Object.keys(content.comments).length : 0,
            // Verificamos si el usuario actual ya ha votado (buscando su UID en el objeto votes)
            hasVoted: user && content.votes?.[user.uid] ? true : false
          });
        });
      }
    });

    // Ordenar por fecha (más reciente arriba)
    return posts.sort((a, b) => b.timestamp - a.timestamp);
  }, [data, user]);

  const handleInteraction = async (type, post) => {
    // GUARD: Si no está logueado, forzamos el modal de auth
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (type === "comment") {
      setSelectedPostForComment(post);
    }

    if (type === "vote") {
      if (post.hasVoted) return; // Evitar votos múltiples

      const postPath = `forum_topics/${post.topicKey}/threads/opiniones/${post.id}`;
      const updates = {};
      
      // Actualización atómica en Firebase
      updates[`${postPath}/voteCount`] = increment(1);
      updates[`${postPath}/votes/${user.uid}`] = 1;

      try {
        await update(ref(db), updates);
      } catch (err) {
        console.error("Error al votar:", err);
      }
    }
  };

  if (loading) return <div className="py-20 text-center text-emerald-800">Cargando comunidad...</div>;

  return (
    <section className="bg-[#f6f1e7] py-8">
      <div className="max-w-3xl mx-auto px-4">
        
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
          Comunidad 🌱
        </h2>

        <div className="space-y-4">
          {allPosts.map((post) => (
            <div 
              key={post.id} 
              className="flex gap-4 bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Lógica de Votos lateral */}
              <div className="flex flex-col items-center gap-1 min-w-[40px]">
                <button 
                  onClick={() => handleInteraction("vote", post)}
                  className={`text-xl transition ${post.hasVoted ? 'text-emerald-600' : 'text-gray-300 hover:text-emerald-500'}`}
                >
                  ▲
                </button>
                <span className="text-xs font-bold text-emerald-900">{post.voteCount}</span>
                <button className="text-xl text-gray-200 hover:text-orange-300 transition">▼</button>
              </div>

              {/* Contenido del post */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    u/{post.author} • {new Date(post.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed whitespace-pre-line">
                  {post.text}
                </p>

                <div className="flex gap-5 items-center pt-3 border-t border-gray-50">
                  <button 
                    onClick={() => handleInteraction("comment", post)}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-800/50 hover:text-emerald-700 transition"
                  >
                    💬 {post.commentCount} Comentarios
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Renderizado de Modales Condicionales */}
      {/* //TODO: Solucionar el fallo del renderizado sobre el modal */}
      {showAuthModal && (
        <Modal type="new-user" onClose={() => setShowAuthModal(false)} />
      )}

      {selectedPostForComment && (
        <Modal 
          type="comment-form" 
          post={selectedPostForComment} 
          onClose={() => setSelectedPostForComment(null)} 
        />
      )}
    </section>
  );
}