import { useEffect, useRef } from "react";
import AppIcon from "./AppIcon";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog className="confirm-dialog" onCancel={onCancel} ref={dialogRef}>
      <div className="dialog-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button aria-label="Close dialog" className="icon-button" onClick={onCancel} type="button">
          <AppIcon name="x" />
        </button>
      </div>
      <div className="dialog-actions">
        <button className="button-secondary" onClick={onCancel} type="button">Cancel</button>
        <button className="button-danger" onClick={onConfirm} type="button">{confirmLabel}</button>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;
