import { useState, useEffect } from "react";
import { Modal } from "../organism/Modal";
import { Button } from "./Button";

export function LoadMoreBTN({ characters }) {
  // useState to control if the modal is open
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  }, []);

  // Función for open the modal
  const handleClick = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <div>
      {characters > 1 ? (
        <div className="center-button">
          <Button label={'Load More'} onClick={handleClick}></Button>
        </div>
      ) : (
        // <!-- MODAL for info of characters -->
        
        <Button label={'Load Info'} className="load-info-char" onClick={handleClick}>
          {showModal && <Modal characters={characters} onClose={handleClose}/>}
        </Button>
        
      )}

      
    </div>
  );
}