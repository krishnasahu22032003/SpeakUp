import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              w-[90%] max-w-md
              rounded-2xl
              bg-[var(--bg-glass)]
              border border-[var(--border-subtle)]
              backdrop-blur-xl
              p-6
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            "
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                <Trash2 className="w-6 h-6 text-rose-400" />
              </div>
            </div>

            {/* Text */}
            <h2 className="text-lg font-semibold text-center text-[var(--text-primary)]">
              Delete Complaint?
            </h2>

            <p className="text-sm text-center text-[var(--text-secondary)] mt-2">
              This action cannot be undone. This will permanently delete your complaint.
            </p>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="
                cursor-pointer
                  flex-1 py-2 rounded-xl
                  bg-white/5 border border-white/10
                  text-[var(--text-secondary)]
                  hover:bg-white/10 transition
                "
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="
                cursor-pointer
                  flex-1 py-2 rounded-xl
                  bg-rose-500/80
                  text-white
                  hover:bg-rose-500
                  transition
                  shadow-[0_0_18px_rgba(244,63,94,0.5)]
                "
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal ; 