import { Favorite } from "../atoms/Favorite";
import { LoadMoreBTN } from "../atoms/LoadMore";
import { Modal } from "../organism/Modal";
import { Button } from "../atoms/Button";
import { useState, useEffect } from "react";
/* \//TODO: make this more comun for the both types of card in the project */
export function Cards({ character }) {
  if (!character) return null;

  const [showModal, setShowModal] = useState(false);
  // Functionn for open the modal
  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    <div className="card">
      <img src={character.image} alt={character.name} />

      <Favorite idCharacter={character.id} />

      <div className="card-content">
        <div className="card-title">
          <h3>
            <strong>{character.name}</strong>
          </h3>
          <p>
            <strong>Specie: </strong>
            {character.species}
          </p>
          <p>
            <strong>Status: </strong>
            {character.status}
          </p>
        </div>

        {/* <!-- MODAL for info of characters --> */}
        <Button
          label={"Load Info"}
          className="load-info-char"
          onClick={handleClick}
        />
        {showModal && <Modal characters={character} onClose={handleClose} />}

        {/* <LoadMoreBTN characters={3} /> */}
      </div>
    </div>
  );
}
