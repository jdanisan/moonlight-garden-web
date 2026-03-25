import { Favorite } from "../atoms/Favorite";

export function Cards({ character }) {
  if (character <= 0) return null;

  return (
    <div className="card">
      <img src="{character.image}" alt="{character.name}" />

      <Favorite idCharacter={character.id} />

      <div className="card-content">
        <div className="card-title">
          <h3>
            <strong>${character.name}</strong>
          </h3>
          <p>
            <strong>Specie: </strong>${character.species}
          </p>
          <p>
            <strong>Status: </strong> ${character.status}
          </p>
        </div>

        <button className="load-info-char">Load Information</button>
      </div>
    </div>
  );
}
