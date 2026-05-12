import { useAuth } from "../hook/useAuth";

export function PostCreator({ onOpenModal }) {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || "Comunidad";

  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm mb-8 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
        {userName[0].toUpperCase()}
      </div>
      <button
        onClick={onOpenModal}
        className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left px-4 py-2.5 rounded-full text-gray-500 text-sm transition"
      >
        ¿Qué tienes en mente, {userName}? 🌱
      </button>
    </div>
  );
}