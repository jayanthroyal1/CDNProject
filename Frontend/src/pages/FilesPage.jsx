import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listFilesApi, uploadFileApi, deleteFileApi } from "../shared/api/file.api";

const FilesPage = () => {
  const [selected, setSelected] = useState(null);
  const [viewingFile, setViewingFile] = useState(null);
  const queryClient = useQueryClient();

  const { data: rawFiles, isLoading: isFetching } = useQuery({
    queryKey: ["files"],
    queryFn: listFilesApi,
  });
  const files = Array.isArray(rawFiles) ? rawFiles : rawFiles?.data?.files ?? [];

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: uploadFileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      setSelected(null);
    },
    onError: (err) => {
      alert(err?.response?.data?.message || "File upload failed.");
    }
  });

  const { mutate: deleteFile, isPending: isDeleting } = useMutation({
    mutationFn: deleteFileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      setViewingFile(null);
    },
    onError: (err) => {
      alert(err?.response?.data?.message || "File deletion failed.");
    }
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this file? This action cannot be undone.")) {
      deleteFile(viewingFile._id);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selected) return;
    uploadFile(selected);
  };

  const loading = isFetching || isUploading;

  // Helper to generate a colored badge for documents
  const getBadgeColor = (mimeType) => {
    if (mimeType.includes("pdf")) return "#e74c3c";
    if (mimeType.includes("csv") || mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "#2ecc71";
    return "#3498db";
  };

  const getFileExtension = (name) => {
    const parts = name.split('.');
    return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE';
  };

  return (
    <div>
      <div className="glass" style={{ padding: "1.5rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <h2>My Files</h2>
        <form onSubmit={handleUpload} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input 
            type="file" 
            onChange={(e) => setSelected(e.target.files[0])} 
            className="input" 
            style={{ maxWidth: "250px", padding: "0.5rem" }} 
          />
          <button type="submit" className="btn-primary" disabled={loading || !selected}>
            {isUploading ? "Uploading..." : "Upload File"}
          </button>
        </form>
      </div>

      {isFetching ? (
        <div className="text-center mt-4"><p>Loading files...</p></div>
      ) : files.length === 0 ? (
        <div className="glass glass-card text-center text-muted">
          <p>No files found. Upload your first file above.</p>
        </div>
      ) : (
        <ul className="file-list">
          {files.map((f) => {
            const baseUrl = import.meta.env.VITE_API_URL?.replace("/api/v1", "") || "http://localhost:5000";
            const fileUrl = f.storagePath ? `${baseUrl}/${f.storagePath.replace(/\\/g, "/")}` : `${baseUrl}/uploads/${f.fileName}`;
            const ext = getFileExtension(f.originalName);
            const badgeColor = getBadgeColor(f.mimeType);
            
            return (
              <li 
                key={f._id} 
                className="file-item glass-card" 
                style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => setViewingFile({ ...f, fileUrl })}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                {f.mimeType?.startsWith("image/") ? (
                  <img src={fileUrl} alt={f.originalName} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
                ) : f.mimeType?.startsWith("video/") ? (
                  <video src={`${fileUrl}#t=0.1`} preload="metadata" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px", backgroundColor: "#000" }} />
                ) : (
                  <div style={{ width: "100%", height: "150px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: badgeColor, borderRadius: "4px", color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
                    <span style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📄</span>
                    {ext}
                  </div>
                )}
                <div style={{ wordBreak: "break-all", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "0.5rem", fontWeight: "500" }} title={f.originalName}>
                  {f.originalName}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* File Viewer Modal */}
      {viewingFile && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.85)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(5px)"
        }}>
          <div className="glass" style={{
            position: "relative", width: "90%", maxWidth: "1000px", height: "85vh",
            padding: "2rem", display: "flex", flexDirection: "column",
            animation: "fadeIn 0.3s ease-out"
          }}>
            <button 
              onClick={() => setViewingFile(null)}
              style={{
                position: "absolute", top: "1rem", right: "1rem",
                background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                fontSize: "1.5rem", cursor: "pointer", width: "40px", height: "40px",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              ✕
            </button>
            <h3 style={{ marginTop: 0, marginBottom: "1.5rem", wordBreak: "break-all", paddingRight: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{viewingFile.originalName}</span>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                  backgroundColor: "rgba(231, 76, 60, 0.2)",
                  color: "#e74c3c",
                  border: "1px solid rgba(231, 76, 60, 0.4)",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => !isDeleting && (e.currentTarget.style.backgroundColor = "rgba(231, 76, 60, 0.4)")}
                onMouseLeave={(e) => !isDeleting && (e.currentTarget.style.backgroundColor = "rgba(231, 76, 60, 0.2)")}
              >
                {isDeleting ? "Deleting..." : "🗑️ Delete File"}
              </button>
            </h3>
            
            <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "8px" }}>
              {viewingFile.mimeType?.startsWith("image/") ? (
                <img src={viewingFile.fileUrl} alt={viewingFile.originalName} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              ) : viewingFile.mimeType?.startsWith("video/") ? (
                <video src={viewingFile.fileUrl} controls autoPlay style={{ maxWidth: "100%", maxHeight: "100%" }} />
              ) : viewingFile.mimeType === "application/pdf" ? (
                <iframe src={viewingFile.fileUrl} style={{ width: "100%", height: "100%", border: "none" }} title={viewingFile.originalName} />
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <span style={{ fontSize: "5rem", display: "block", marginBottom: "1rem" }}>📄</span>
                  <h4>Preview not available for this file type</h4>
                  <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>You can download the file to view it locally.</p>
                  <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                    <a href={viewingFile.fileUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
                      Download File
                    </a>
                    {(viewingFile.mimeType?.includes("csv") || viewingFile.mimeType?.includes("excel") || viewingFile.mimeType?.includes("spreadsheet")) && (
                      <a href={`/reports?fileId=${viewingFile._id}`} className="btn-primary" style={{ textDecoration: "none", display: "inline-block", backgroundColor: "#2ecc71" }}>
                        Visualize Report
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesPage;

