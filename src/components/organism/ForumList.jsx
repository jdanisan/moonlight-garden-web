import { useEffect, useState, useMemo } from "react";
import { db } from "../../services/firebase";
import { ref, onValue, update, increment, push, serverTimestamp } from "firebase/database";
import { useAuth } from "../hook/useAuth";
import { Modal } from "../organism/Modal"; 
import toast from "react-hot-toast";

export function ForumList() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null); 
  const [commentText, setCommentText] = useState(""); 

  useEffect(() => {
    const dbRef = ref(db, "/");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  
  const groupedPosts = useMemo(() => {
    if (!data?.forum_topics) return {};
    
    const topicsMeta = data.topics || {};
    const grouped = {};

    Object.keys(data.forum_topics).forEach((topicKey) => {
      const threads = data.forum_topics[topicKey].threads?.opiniones;
      const categoryTitle = topicsMeta[topicKey]?.title || topicKey;
      
      if (threads) {
        const postsArray = Object.entries(threads).map(([id, content]) => ({
          id,
          topicKey,
          category: categoryTitle,
          author: content.cliente || "Anónimo",
          text: content.texto,
          timestamp: content.timestamp,
          voteCount: content.voteCount || 0,
          comments: content.comments 
            ? Object.entries(content.comments).map(([cId, cVal]) => ({ id: cId, ...cVal }))
              .sort((a, b) => a.timestamp - b.timestamp)
            : [],
          userVoteType: user ? content.votes?.[user.uid] : null
        })).sort((a, b) => b.timestamp - a.timestamp); 

        if (postsArray.length > 0) {
          grouped[categoryTitle] = postsArray;
        }
      }
    });

    return grouped;
  }, [data, user]);

  const handleVote = async (targetType, post) => {
    if (!user) return setShowAuthModal(true);
    const postPath = `forum_topics/${post.topicKey}/threads/opiniones/${post.id}`;
    const updates = {};
    const currentVote = post.userVoteType;

    if (currentVote === targetType) {
      updates[`${postPath}/voteCount`] = increment(targetType === "up" ? -1 : 1);
      updates[`${postPath}/votes/${user.uid}`] = null;
    } else {
      updates[`${postPath}/voteCount`] = increment(targetType === "up" ? 1 : -1);
      updates[`${postPath}/votes/${user.uid}`] = targetType;
    }

    try { await update(ref(db), updates); } catch (e) { toast.error("Error al votar"); }
  };

  const handleSendComment = async (post) => {
    if (!user) return setShowAuthModal(true);
    if (!commentText.trim()) return;
    const commentPath = `forum_topics/${post.topicKey}/threads/opiniones/${post.id}/comments`;
    try {
      await push(ref(db, commentPath), {
        author: user.email.split('@')[0],
        text: commentText,
        timestamp: serverTimestamp(),
        userId: user.uid
      });
      setCommentText("");
    } catch (e) { toast.error("Error"); }
  };

  if (loading) return <div className="py-20 text-center text-emerald-800 italic">Cargando secciones...</div>;

  return (
    <section className="bg-[#f6f1e7] py-8 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        

        {Object.entries(groupedPosts).map(([categoryName, posts]) => (
          <div key={categoryName} className="mb-12">
            {/* TÍTULO DE LA CATEGORÍA (Sticky) */}
            <div className="sticky top-0 z-10 bg-[#f6f1e7]/95 backdrop-blur-sm py-3 mb-4 border-b border-emerald-200">
              <h3 className="text-sm font-black text-emerald-700 uppercase tracking-[0.2em]">
                {categoryName}
              </h3>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 flex gap-4">
                    {/* VOTOS */}
                    <div className="flex flex-col items-center gap-1 min-w-[40px]">
                      <button onClick={() => handleVote("up", post)} className={`text-xl transition ${post.userVoteType === "up" ? "text-emerald-500 scale-110" : "text-gray-300 hover:text-emerald-400"}`}>▲</button>
                      <span className={`text-xs font-bold ${post.userVoteType === "up" ? "text-emerald-600" : post.userVoteType === "down" ? "text-orange-600" : "text-emerald-900"}`}>{post.voteCount}</span>
                      <button onClick={() => handleVote("down", post)} className={`text-xl transition ${post.userVoteType === "down" ? "text-orange-500 scale-110" : "text-gray-200 hover:text-orange-300"}`}>▼</button>
                    </div>

                    {/* CONTENIDO */}
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="text-[11px] text-gray-400 font-medium">
                          u/{post.author} • {new Date(post.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed whitespace-pre-line">{post.text}</p>
                      <button 
                        onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-emerald-800/50 hover:text-emerald-700 transition"
                      >
                        💬 {post.comments.length} Comentarios
                      </button>
                    </div>
                  </div>

                  {/* HILO DE COMENTARIOS */}
                  {expandedPostId === post.id && (
                    <div className="bg-gray-50/50 border-t border-gray-50 p-5">
                      <div className="space-y-4 border-l-2 border-emerald-100 ml-2 pl-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id}>
                            <p className="text-emerald-900 text-[11px] font-bold">{comment.author}</p>
                            <p className="text-gray-600 text-[12px]">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex gap-2">
                        <input 
                          type="text"
                          placeholder="Escribe una respuesta..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post)}
                          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-emerald-500"
                        />
                        <button onClick={() => handleSendComment(post)} className="bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold">Responder</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showAuthModal && <Modal type="new-user" onClose={() => setShowAuthModal(false)} />}
    </section>
  );
}