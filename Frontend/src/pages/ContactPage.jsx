import { useState } from "react";
import { sendContactApi } from "../shared/api/contact.api";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    try {
      await sendContactApi(form);
      setSuccessMsg("Your message has been sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="glass glass-card">
        <h2 className="mb-4">Contact Support</h2>
        <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
          Have a question or need help? Fill out the form below and we'll get back to you as soon as possible.
        </p>

        {successMsg && (
          <div className="mb-4" style={{ padding: "1rem", backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid var(--success)", color: "var(--success)", borderRadius: "8px" }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label>Name</label>
              <input
                className="input"
                placeholder="John Doe"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="input"
                placeholder="you@example.com"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Subject</label>
            <input
              className="input"
              placeholder="How can we help?"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="input"
              placeholder="Provide details here..."
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
