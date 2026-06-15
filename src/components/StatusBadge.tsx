type StatusBadgeProps = {
  value: string;
};

function StatusBadge({ value }: StatusBadgeProps) {
  const tone = value.toLowerCase().replace(/\s+/g, "-");
  return <span className={`status-badge status-${tone}`}>{value}</span>;
}

export default StatusBadge;
