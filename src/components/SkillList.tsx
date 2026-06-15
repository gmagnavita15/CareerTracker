import { useState } from "react";
import toast from "react-hot-toast";
import { SKILL_CATEGORIES, SKILL_LEVELS } from "../constants";
import { formatDate } from "../services/formatService";
import { validateOptionalDate, validateRequired } from "../services/validationService";
import type { Skill, SkillCategory, SkillLevel } from "../types";
import ConfirmDialog from "./ConfirmDialog";
import DetailPanel from "./DetailPanel";
import EmptyState from "./EmptyState";
import FilterBar from "./FilterBar";
import FormField from "./FormField";
import PageHeader from "./PageHeader";
import StatusBadge from "./StatusBadge";

type SkillListProps = {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
};

function SkillList({ skills, setSkills }: SkillListProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("Frontend");
  const [level, setLevel] = useState<SkillLevel>("Beginner");
  const [targetLevel, setTargetLevel] = useState<SkillLevel>("Intermediate");
  const [lastPracticed, setLastPracticed] = useState("");
  const [notes, setNotes] = useState("");
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | SkillCategory>("All");
  const [levelFilter, setLevelFilter] = useState<"All" | SkillLevel>("All");
  const [pendingDelete, setPendingDelete] = useState<Skill | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextNameError = validateRequired(name, "Skill name", 80);
    const nextDateError = validateOptionalDate(lastPracticed);
    setNameError(nextNameError);
    setDateError(nextDateError);
    if (nextNameError || nextDateError) {
      toast.error("Review the highlighted skill fields.");
      return;
    }

    const timestamp = new Date().toISOString();
    setSkills((current) => [...current, {
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      level,
      targetLevel,
      lastPracticed,
      notes: notes.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
    }]);
    toast.success("Skill added");
    setName("");
    setCategory("Frontend");
    setLevel("Beginner");
    setTargetLevel("Intermediate");
    setLastPracticed("");
    setNotes("");
    setNameError("");
    setDateError("");
  }

  function handleLevelChange(id: string, nextLevel: SkillLevel) {
    setSkills((current) => current.map((skill) =>
      skill.id === id
        ? { ...skill, level: nextLevel, updatedAt: new Date().toISOString() }
        : skill
    ));
    toast.success("Skill level updated");
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    setSkills((current) => current.filter((skill) => skill.id !== pendingDelete.id));
    toast.success("Skill deleted");
    setPendingDelete(null);
  }

  const filteredSkills = skills
    .filter((skill) => {
      const search = searchTerm.trim().toLowerCase();
      return (
        (!search || [skill.name, skill.category, skill.notes]
          .some((value) => value.toLowerCase().includes(search))) &&
        (categoryFilter === "All" || skill.category === categoryFilter) &&
        (levelFilter === "All" || skill.level === levelFilter)
      );
    })
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

  return (
    <>
      <PageHeader
        description="Turn technical growth into visible goals, practice history, and measurable progress."
        title="Skills"
      />

      <section className="section-card">
        <div className="panel-heading">
          <div>
            <h2>Add a skill goal</h2>
            <p>Track where you are, where you want to be, and what you practiced.</p>
          </div>
        </div>
        <form className="form-grid" noValidate onSubmit={handleSubmit}>
          <FormField error={nameError} htmlFor="skill-name" label="Skill name" required>
            <input
              aria-describedby={nameError ? "skill-name-help" : undefined}
              id="skill-name"
              maxLength={80}
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </FormField>
          <FormField htmlFor="skill-category" label="Category">
            <select id="skill-category" onChange={(event) => setCategory(event.target.value as SkillCategory)} value={category}>
              {SKILL_CATEGORIES.map((option) => <option key={option}>{option}</option>)}
            </select>
          </FormField>
          <FormField htmlFor="skill-level" label="Current level">
            <select id="skill-level" onChange={(event) => setLevel(event.target.value as SkillLevel)} value={level}>
              {SKILL_LEVELS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </FormField>
          <FormField htmlFor="skill-target" label="Target level">
            <select id="skill-target" onChange={(event) => setTargetLevel(event.target.value as SkillLevel)} value={targetLevel}>
              {SKILL_LEVELS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </FormField>
          <FormField error={dateError} htmlFor="skill-practiced" label="Last practiced">
            <input
              aria-describedby={dateError ? "skill-practiced-help" : undefined}
              id="skill-practiced"
              onChange={(event) => setLastPracticed(event.target.value)}
              type="date"
              value={lastPracticed}
            />
          </FormField>
          <FormField htmlFor="skill-notes" label="Practice notes">
            <textarea
              id="skill-notes"
              maxLength={800}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Coursework, exercises, or next practice goal"
              rows={3}
              value={notes}
            />
          </FormField>
          <div className="form-actions"><button type="submit">Add skill</button></div>
        </form>
      </section>

      <section className="section-card">
        <div className="panel-heading">
          <div>
            <h2>Skill development</h2>
            <p>Recently updated skills appear first.</p>
          </div>
        </div>
        <FilterBar resultCount={filteredSkills.length}>
          <input
            aria-label="Search skills"
            className="search-field"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search skill, category, or notes"
            type="search"
            value={searchTerm}
          />
          <select aria-label="Filter by skill category" onChange={(event) => setCategoryFilter(event.target.value as "All" | SkillCategory)} value={categoryFilter}>
            <option>All</option>
            {SKILL_CATEGORIES.map((option) => <option key={option}>{option}</option>)}
          </select>
          <select aria-label="Filter by current skill level" onChange={(event) => setLevelFilter(event.target.value as "All" | SkillLevel)} value={levelFilter}>
            <option>All</option>
            {SKILL_LEVELS.map((option) => <option key={option}>{option}</option>)}
          </select>
        </FilterBar>

        {skills.length === 0 ? (
          <EmptyState description="Add a skill above to start tracking technical growth." title="No skills yet" />
        ) : filteredSkills.length === 0 ? (
          <EmptyState description="Try a broader search or clear the current filters." title="No skills match" />
        ) : (
          <div className="skill-grid">
            {filteredSkills.map((skill) => (
              <article className="skill-card" key={skill.id}>
                <div className="record-card-header">
                  <div>
                    <h3>{skill.name}</h3>
                    <p>{skill.category}</p>
                  </div>
                  <StatusBadge value={skill.level} />
                </div>
                <div className="skill-progress" aria-label={`${skill.name}: ${skill.level}, target ${skill.targetLevel}`}>
                  <div className="skill-progress-labels">
                    <span>{skill.level}</span>
                    <span>Target: {skill.targetLevel}</span>
                  </div>
                  <div className="skill-progress-track">
                    <span style={{ width: `${levelProgress(skill.level)}%` }} />
                    <i style={{ left: `${levelProgress(skill.targetLevel)}%` }} />
                  </div>
                </div>
                <p className="practice-date">Last practiced: {formatDate(skill.lastPracticed)}</p>
                <DetailPanel label="Practice notes">
                  {skill.notes || "No practice notes added."}
                </DetailPanel>
                <div className="record-actions">
                  <select
                    aria-label={`Update level for ${skill.name}`}
                    onChange={(event) => handleLevelChange(skill.id, event.target.value as SkillLevel)}
                    value={skill.level}
                  >
                    {SKILL_LEVELS.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <button className="button-secondary danger-text" onClick={() => setPendingDelete(skill)} type="button">
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <ConfirmDialog
        description={pendingDelete ? `This permanently removes ${pendingDelete.name} from your skill tracker.` : ""}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        open={Boolean(pendingDelete)}
        title="Delete skill?"
      />
    </>
  );
}

function levelProgress(level: SkillLevel) {
  return ({ Beginner: 33, Intermediate: 66, Advanced: 100 } as const)[level];
}

export default SkillList;
