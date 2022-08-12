import React from "react";

function MainModalLayout({ onClick, title, description, children }) {
  return (
    <div
      className="position-fixed d-flex justify-content-center align-items-center"
      style={{
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(00,00,00,0.5)",
        zIndex: "1059",
      }}
    >
      <div
        className="d-flex flex-column px-4 py-3"
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          maxWidth: "20rem",
        }}
      >
        <div className="d-flex justify-content-end">
          <i
            onClick={onClick}
            className="bi bi-x m-0 p-0"
            style={{ fontSize: "2rem", cursor: "pointer" }}
          ></i>
        </div>
        <h4>{title}</h4>
        <p className="mb-2">{description}</p>
        {children}
      </div>
    </div>
  );
}

export default MainModalLayout;
