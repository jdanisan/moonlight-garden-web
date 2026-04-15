import { NavBar } from "./NavBar";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Modal } from "../organism/Modal";

export function MainLayout({ children }) {
  // const { modal, closeModal } = useContext(AppContext);
  const { currentModal, closeModal } = useContext(AppContext);
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <footer>That's all, folks</footer>

      {/* {modal?.isOpen && (
        <Modal type={modal.type} data={modal.data} onClose={closeModal} />
      )} */}
      {currentModal && (
        <Modal
          type={currentModal.type}
          data={currentModal.data}
          onClose={closeModal}
        />
      )}
    </>
  );
}
