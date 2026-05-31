import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="text-center">
        <h1 style={{ fontSize: "6rem", background: "linear-gradient(135deg, #a855f7, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="text-muted mb-4">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
