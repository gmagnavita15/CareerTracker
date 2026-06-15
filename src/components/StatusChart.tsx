import type { JobApplication } from "../types";
import { getApplicationStatusSummary } from "../services/dashboardService";

type StatusChartProps = {
  applications: JobApplication[];
};

function StatusChart({ applications }: StatusChartProps) {
  const summary = getApplicationStatusSummary(applications);

  return (
    <section className="section-card">
      <h2>Application Status Breakdown</h2>

      {applications.length === 0 ? (
        <p className="empty-state">No application data yet.</p>
      ) : (
        <div className="chart-list">
          {summary.map((item) => (
            <div className="chart-row" key={item.status}>
              <div className="chart-label">
                <span>{item.status}</span>
                <span>
                  {item.count} ({item.percentage}%)
                </span>
              </div>

              <div className="chart-bar-background">
                <div
                  className="chart-bar-fill"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default StatusChart;