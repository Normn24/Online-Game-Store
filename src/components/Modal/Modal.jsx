import PropTypes from "prop-types";
import "./Modal.scss";

export default function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal__wrapper">
      <div className="modal">
        <div className="modal__header">
          <button
            className="modal__close"
            onClick={onClose}
            data-testid="close__button"
          >
            &times;
          </button>
        </div>
        <h2>{message}</h2>
        <div className="modal__footer">
          {onConfirm ? (
            <>
              <button onClick={onConfirm}>Confirm</button>
              <button onClick={onClose}>Cancel</button>
            </>
          ) : (
            <button onClick={onClose}>Close</button>
          )}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  message: PropTypes.string.isRequired,
};
