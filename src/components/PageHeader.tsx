type PageHeaderProps = {
  title: string;
  description: string;
  actions?: React.ReactNode;
};

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </header>
  );
}

export default PageHeader;
