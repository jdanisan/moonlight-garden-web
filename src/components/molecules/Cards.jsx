import { Favorite } from "../atoms/Favorite";
import { Button } from "../atoms/Button";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const VARIANTS = {
  default: "flex-col items-center",
  horizontal: "flex-row items-start",
  modal: "flex-col md:flex-row",
};
export function Cards({ character, variant = "default" }) {
  if (!character) return null;
  const { openModal } = useContext(AppContext);

  return (
    <div
      className={`${VARIANTS[variant]} flex rounded-2xl font-bold p-0  text-primary-500 overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition bg-card relative hover:shadow-[3px_3px_10px_rgba(59,130,246,0.8)] card--${variant}`}
    >
      <img
        src={character.image}
        alt={character.name}
        className={`w-full block h-auto min-h-fit object-cover card-image--${variant}`}
      />

      <div
        className={`flex flex-col justify-between h-full w-11/12 p-4 text-primary-700 card-content--${variant}`}
      >
        <h3 className={`flex flex-col bottom-0 card-title--${variant}`}>
          <strong>{character.name}</strong>
        </h3>

        <p className={`m-0`}>
          <strong>Specie:</strong> {character.species}
        </p>
        <p className={`m-0`}>
          <strong>Status:</strong> {character.status}
        </p>
        <Favorite idCharacter={character.id} />

        {variant === "default" && (
          <Button
            label="Load Info"
            variant="loadMore"
            onClick={() => openModal("character", character)}
          />
        )}

        {variant === "modal" && (
          <>
            <p>
              <strong>Origin:</strong> {character.origin.name}
            </p>
            <p>
              <strong>Actual location:</strong> {character.location.name}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
