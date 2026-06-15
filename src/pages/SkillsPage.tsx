import SkillList from '../components/SkillList';
import type { Skill } from '../types';

type SkillsPageProps = {
    skills: Skill[];
    setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
};

function SkillsPage({skills,setSkills,}: SkillsPageProps) {
    return <SkillList skills={skills} setSkills={setSkills}/>;
}

export default SkillsPage;