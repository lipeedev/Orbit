import { X } from "lucide-react";

interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div onClick={onClose} className={`${isOpen ? 'visible' : 'invisible'} fixed z-50  inset-0 bg-black bg-opacity-50 flex justify-center items-center`}>
      <div onClick={e => e.stopPropagation()} className={`${isOpen ? 'scale-90' : 'scale-95'} transition-transform bg-white p-4 rounded-lg`}>
        <button>
          <X onClick={onClose} className="absolute top-4 right-4" />
        </button>

        {children}
      </div>
    </div>
  )
}
