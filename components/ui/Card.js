// ============================================================
// Card — premium white surface with elevation
// ============================================================

export default function Card({ children, className = "", onClick, noPadding = false }) {
  return (
    <div
      onClick={onClick}
      className={["reno-card", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = "" }) {
  return (
    <div className={["px-6 pt-6 pb-4", className].join(" ")}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = "" }) {
  return (
    <div className={["px-6 py-4", className].join(" ")}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = "" }) {
  return (
    <div
      className={["px-6 py-4 rounded-b-2xl", className].join(" ")}
      style={{ borderTop: "1px solid #F1F5F9", background: "#FAFBFC" }}
    >
      {children}
    </div>
  );
};

Card.Divider = function CardDivider() {
  return <div className="h-px mx-6" style={{ background: "#F1F5F9" }} />;
};
