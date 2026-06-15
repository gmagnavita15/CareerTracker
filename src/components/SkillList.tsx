import { useState } from "react";
import toast from "react-hot-toast";
import type { Skill, SkillCategory, SkillLevel } from "../types";
import { SKILL_CATEGORIES, SKILL_LEVELS } from "../constants";
import SectionHeader from "./SectionHeader";

type SkillListProps = {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
};

function SkillList({ skills, setSkills }: SkillListProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("Frontend");
  const [level, setLevel] = useState<SkillLevel>("Beginner");
  const [categoryFilter, setCategoryFilter] = useState("All");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Skill name is required");
      return;
    }

    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name,
      category,
      level,
    };

    setSkills([...skills, newSkill]);
    toast.success("Skill added");

    setName("");
    setCategory("Frontend");
    setLevel("Beginner");
  }

  function handleDelete(id: string) {
    setSkills(skills.filter((skill) => skill.id !== id));
    toast.success("Skill deleted");
  }

  function handleLevelChange(id: string, newLevel: SkillLevel) {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, level: newLevel } : skill
      )
    );

    toast.success("Skill level updated");
  }

  const filteredSkills =
    categoryFilter === "All"
      ? skills
      : skills.filter((skill) => skill.category === categoryFilter);

  return (
    <section className="section-card">
      <SectionHeader
        title="Skills Tracker"
        description="Monitor technical growth across multiple categories."
      />

      <form className="application-form" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Skill name"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as SkillCategory)}
        >
          {SKILL_CATEGORIES.map((categoryOption) => (
            <option key={categoryOption}>{categoryOption}</option>
          ))}
        </select>

        <select value={level} onChange={(event) => setLevel(event.target.value as SkillLevel)}>
          {SKILL_LEVELS.map((levelOption) => (
            <option key={levelOption}>{levelOption}</option>
          ))}
        </select>

        <button type="submit">Add Skill</button>
      </form>

      <select
        className="search-input"
        value={categoryFilter}
        onChange={(event) => setCategoryFilter(event.target.value)}
      >
        <option>All</option>
        {SKILL_CATEGORIES.map((categoryOption) => (
          <option key={categoryOption}>{categoryOption}</option>
        ))}
      </select>

      {filteredSkills.length === 0 ? (
        <p className="empty-state">No skills found. Add a skill you are learning.</p>
      ) : (
        <table className="application-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Category</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSkills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.category}</td>
                <td>
                  <select
                    className="status-select"
                    value={skill.level}
                    onChange={(event) =>
                      handleLevelChange(skill.id, event.target.value as SkillLevel)
                    }
                  >
                    {SKILL_LEVELS.map((levelOption) => (
                      <option key={levelOption}>{levelOption}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(skill.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default SkillList;