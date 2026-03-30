export function BaseModal({ title,array, onClose }) {
  
  return (
    <div id="modal-char" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>title</h2>
        <div id="modal-loader-char">Loading...</div>
      </div>
    </div>
  );
}


