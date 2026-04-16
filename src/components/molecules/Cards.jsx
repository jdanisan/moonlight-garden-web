import { Favorite } from "../atoms/Favorite";
import { Button } from "../atoms/Button";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
/* \//TODO: make this more comun for the both types of card in the project */
// export function Cards({ character }) {
//   if (!character) return null;
//   const { openModal } = useContext(AppContext);

//   return (
//     <div className="card">
//       <img src={character.image} alt={character.name} />

//       <Favorite idCharacter={character.id} />

//       <div className="card-content">
//         <div className="card-title">
//           <h3>
//             <strong>{character.name}</strong>
//           </h3>
//           <p>
//             <strong>Specie: </strong>
//             {character.species}
//           </p>
//           <p>
//             <strong>Status: </strong>
//             {character.status}
//           </p>
//         </div>

//         {/* <!-- MODAL for info of characters --> */}
//         <Button
//           label="Load Info"
//           className="load-info-char"
//           onClick={() => openModal("character", character)}
//         />
//         {/* <LoadMoreBTN characters={3} /> */}
//       </div>
//     </div>
//   );
// }
export function Cards({ character, variant = "default" }) {
  if (!character) return null;
  const { openModal } = useContext(AppContext);

  return (
    <div className={`card card--${variant}`}>
      <img
        src={character.image}
        alt={character.name}
        className={`card-image card-image--${variant}`}
      />

      <div className={`card-content card-content--${variant}`}>
        <h3 className={`card-title card-title--${variant}`}>
          <strong>{character.name}</strong>
        </h3>

        <p><strong>Specie:</strong> {character.species}</p>
        <p><strong>Status:</strong> {character.status}</p>
        <Favorite idCharacter={character.id}/>

        {variant === "default" && (
          <Button
            label="Load Info"
            className="load-info-char"
            onClick={() => openModal("character", character)}
          />
          
        )}

        {variant ==="modal" && (
          <>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Actual location:</strong> {character.location.name}</p>
          </>
        )}
      </div>
    </div>
  );
}

