import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getChartDataApi } from "../shared/api/report.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ReportPage = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("fileId") || "";
  const [fileId, setFileId] = useState(initialId);
  const [activeId, setActiveId] = useState(initialId);

  const {
    data: chartResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chartData", activeId],
    queryFn: () => getChartDataApi(activeId),
    enabled: !!activeId,
  });

  const chartData =
    chartResponse?.data?.labels?.map((label, i) => ({
      name: label,
      value: chartResponse.data.values[i],
    })) ?? [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileId.trim()) return;
    setActiveId(fileId.trim());
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <div className="glass glass-card mb-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <h2>Report Visualizer</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            className="input"
            type="text"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            placeholder="Enter report ID..."
            required
            style={{ minWidth: "250px" }}
          />
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Loading..." : "Load Data"}
          </button>
        </form>
      </div>

      <div className="glass glass-card" style={{ minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {isError ? (
          <p className="error-text text-center">Failed to load chart data. Ensure the ID is correct.</p>
        ) : isLoading ? (
          <p className="text-center text-muted">Fetching report data...</p>
        ) : chartData.length > 0 ? (
          <div style={{ height: "350px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1e202c', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Bar dataKey="value" fill="url(#colorValue)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>Enter a report ID above to visualize the data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
