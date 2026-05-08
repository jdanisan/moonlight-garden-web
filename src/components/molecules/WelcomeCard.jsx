import React from "react";
import { useAuth } from "../hook/useAuth";

const WelcomeCard = () => {
  const { user } = useAuth();
  const name = user?.email ? user.email.split('@')[0] : "Alex";

  return (
    <div className="bg-green-700 text-white p-8 rounded-2xl mb-6 shadow-lg">
      <h1 className="text-3xl font-bold mb-2 capitalize">
        Bienvenido, {name}.
      </h1>
      <p className="opacity-90 text-sm">Tu jungla interior está creciendo con éxito.</p>
    </div>
  );
};

export default WelcomeCard;