import { NavBar } from "./NavBar";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Footer } from "../organism/Footer";
import { Modal } from "../organism/Modal";
import { Toaster } from "react-hot-toast";

export function MainLayout({ children }) {
  const { currentModal, closeModal } = useContext(AppContext);
  return (
    <>
      <NavBar />
      <main className="text-primary-950 items-center justify-center">{children}</main>
      
      <Footer/>

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
       <Toaster position="bottom-right" />
    </>
  );
}
