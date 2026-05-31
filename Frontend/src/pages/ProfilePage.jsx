import { useState, useEffect } from "react";
import httpClient from "../shared/api/httpClient";
import { useAuth } from "../shared/hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    fullName: "",
    title: "",
    summary: "",
    email: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await httpClient.get("/profile");
        const data = response.data?.data;
        if (data) {
          setProfile({
            fullName: data.fullName || "",
            title: data.title || "",
            summary: data.summary || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
          });
        }
      } catch {
        // Profile may not exist yet
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await httpClient.put("/profile", profile);
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading profile...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="glass glass-card">
        <h2 className="mb-4">Profile Settings</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                className="input"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input 
                className="input"
                name="title" 
                value={profile.title} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Summary</label>
              <textarea
                className="input"
                name="summary"
                value={profile.summary}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                className="input"
                name="email" 
                type="email"
                value={profile.email} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                className="input"
                name="phone" 
                value={profile.phone} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                className="input"
                name="location"
                value={profile.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4" style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
