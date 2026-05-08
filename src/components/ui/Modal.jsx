export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.target.className === 'modal' && onClose()}>
      <div className="modal-card">
        <button className="modal-close" type="button" aria-label="Close modal" onClick={onClose}>×</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
