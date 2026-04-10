export function BaseModal({ title, children, onClose }) {
  return (
    <div id="modal-char" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{title}</h2>
        {children}
        <div id="modal-loader-char">Loading...</div>
      </div>
    </div>
  );
}
