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
      <main className="text-primary-700 items-center justify-center">{children}</main>
      <footer className="flex justify-center items-center bg-primary-950 p-1 mt-5 w-full font-bold text-primary-50">That's all, folks</footer>

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
