import { useAuth } from "../shared/hooks/useAuth";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="glass glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-glass)", paddingBottom: "1rem", marginBottom: "2rem" }}>
          <h2>Admin Dashboard</h2>
          <button onClick={logout} className="btn-outline">Logout</button>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          <div className="glass" style={{ padding: "1.5rem", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-primary)", fontSize: "2rem", marginBottom: "0.5rem" }}>124</h3>
            <p className="text-muted">Total Users</p>
          </div>
          <div className="glass" style={{ padding: "1.5rem", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-primary)", fontSize: "2rem", marginBottom: "0.5rem" }}>892</h3>
            <p className="text-muted">Files Hosted</p>
          </div>
          <div className="glass" style={{ padding: "1.5rem", textAlign: "center" }}>
            <h3 style={{ color: "var(--accent-primary)", fontSize: "2rem", marginBottom: "0.5rem" }}>45</h3>
            <p className="text-muted">Active Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
