import { Button } from "./Button";
import { FavoriteIconOutLine } from "./icons/FavoriteIconOutLine";
import { FavoriteIconFilled } from "./icons/FavoriteIconFilled";
import { useState, useEffect } from "react";

export function Favorite({ idProduct  }) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(idProduct);
  });
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isStored = favorites.includes(idProduct);

    setIsFavorite(isStored);
  }, [idProduct]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let updated;

    if (isFavorite) {
      updated = [...new Set([...favorites, idProduct])];
    } else {
      updated = favorites.filter((id) => id !== idProduct);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  }, [isFavorite]);

  function handleToggle() {
    setIsFavorite((prev) => !prev);
  }

  // Aquí elegimos el icono en base al estado (esto evita errores con React y hooks)
  const Icon = isFavorite ? FavoriteIconFilled : FavoriteIconOutLine;

  return (
    <Button
      icon={Icon}
      className="absolute top-2.5 right-2.5 z-10 rounded-full bg-gray-200/50 hover:bg-gray-500/50 "
      variant="neonBtn"
      onClick={handleToggle}
    />
  );
}
