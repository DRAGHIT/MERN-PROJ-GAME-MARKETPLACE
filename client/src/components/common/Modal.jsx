import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="card w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="hover:text-gray-400 transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">{children}</div>
        {onConfirm && (
          <div className="flex gap-3 p-4 border-t border-dark-border">
            <button onClick={onClose} className="btn-secondary flex-1">
              {cancelText}
            </button>
            <button onClick={onConfirm} className="btn-danger flex-1">
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
