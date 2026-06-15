import PageHeader from "./PageHeader";

type SectionHeaderProps = {
  title: string;
  description: string;
};

function SectionHeader({ title, description }: SectionHeaderProps) {
  return <PageHeader description={description} title={title} />;
}

export default SectionHeader;
