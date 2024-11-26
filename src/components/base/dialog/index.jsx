import "./dialog.css";

export default function Dialog({
  title,
  content,
  cancelText,
  okText,
  open = false,
  onOK,
  onCancel,
}) {
  return (
    <>
      {open && (
        <div className="overlay">
          <div className="base-dialog">
            <header className="d-flex justify-content-between align-items-center">
              <h5 className="dialog-title">{title}</h5>
              <i onClick={onCancel} className="fa-solid fa-xmark"></i>
            </header>

            <main className="py-2">
              <p>{content}</p>
            </main>

            <footer className="d-flex justify-content-end gap-2">
              <button onClick={onCancel} className="btn btn-secondary">
                {cancelText}
              </button>
              <button onClick={onOK} className="btn btn-danger">
                {okText}
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
