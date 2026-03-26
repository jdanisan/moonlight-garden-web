import { useState, useEffect } from "react";
import { Modal } from "../organism/Modal";
import { Button } from "./Button";

export function LoadMoreBTN({ characters }) {
  // useState to control if the modal is open
  const [showModal, setShowModal] = useState(false);

  // TODO: load card info of a specific character
  //TODO: Preguntar a Fran, un boton comun para todo es todo o (TODO)
  useEffect(() => {
    /* TODO: load card info of an expecific character */
  }, []);

  // Función for open the modal
  const handleClick = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <div>
        {/** 
         * * <Button label='Label del botón' icon='elIconoQueSea' className={seMuestra ? 'clase para que se muestre' : 'clase para que no se muestre'}/>
    label && <span>{label}</span>
    icon && mostrar icono **/}
      {characters > 1 ? (
        /* TODO: create function for load basics cards of characters (residents/cards basics) */
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