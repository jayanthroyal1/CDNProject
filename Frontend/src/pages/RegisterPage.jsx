import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../shared/api/auth.api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerApi({ name, email, password });
      navigate("/login");
    } catch {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "4rem auto" }}>
      <div className="glass glass-card">
        <h2 className="text-center mb-4">Create an Account</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              className="input"
              placeholder="John Doe" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              className="input"
              placeholder="you@example.com" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              className="input"
              placeholder="Min 6 characters" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              minLength={6}
            />
          </div>
          {error && <p className="error-text text-center mb-4">{error}</p>}
          <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
