import type { JobApplication } from "../types";
import { getApplicationStatusSummary } from "../services/dashboardService";
import EmptyState from "./EmptyState";

type StatusChartProps = {
  applications: JobApplication[];
};

function StatusChart({ applications }: StatusChartProps) {
  const summary = getApplicationStatusSummary(applications);

  return (
    <section className="section-card">
      <div className="panel-heading">
        <div>
          <h2>Application pipeline</h2>
          <p>Distribution across each stage of your search.</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          description="Pipeline analytics appear after you add an application."
          title="No pipeline data"
        />
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
