type DetailPanelProps = {
  label?: string;
  children: React.ReactNode;
};

function DetailPanel({ label = "View details", children }: DetailPanelProps) {
  return (
    <details className="detail-panel">
      <summary>{label}</summary>
      <div className="detail-panel-content">{children}</div>
    </details>
  );
}

export default DetailPanel;
