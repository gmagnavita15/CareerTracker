type FilterBarProps = {
  children: React.ReactNode;
  resultCount?: number;
};

function FilterBar({ children, resultCount }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-controls">{children}</div>
      {typeof resultCount === "number" ? (
        <span className="result-count" aria-live="polite">
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </span>
      ) : null}
    </div>
  );
}

export default FilterBar;
