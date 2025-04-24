const Toast = ({ message }) => {
  return (
    <div
      className="toast show align-items-center text-white bg-primary border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div
          className="toast-body"
          dangerouslySetInnerHTML={{ __html: message }}
        ></div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Toast;
