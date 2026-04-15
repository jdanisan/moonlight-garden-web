export function BaseModal({ title, children, onClose, type }) {
  return (
    <div className="modal">
      <div className={`modal-content modal-content--${type}`}>
        <div className="modal-title-close">
          <h2>{title}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        {type === "location" || type === "episode" ? (
          <div className="modal-characters">{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
