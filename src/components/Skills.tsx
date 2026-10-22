import { skillGroups } from '../data/skills';
import { cn } from '../lib/utils';
import { Reveal, Section } from './Section';

interface SkillsProps {
  active: string | null;
  onSelect: (skill: string | null) => void;
}

export function Skills({ active, onSelect }: SkillsProps) {
  return (
    <Section
      id="skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 0.06} className="card p-5 sm:p-6">
            <h3 className="flex items-baseline justify-between gap-3 text-lg font-semibold">
              {g.title}
              <span className="font-mono text-xs font-normal text-subtle">/{g.tag}</span>
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${g.title} skills`}>
              {g.skills.map((s) => {
                const on = active === s;
                return (
                  <li key={s}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => onSelect(on ? null : s)}
                      className={cn(
                        'min-h-9 rounded-lg border px-3 py-1 text-sm transition-[background-color,border-color,color,transform] duration-200 active:scale-95',
                        on
                          ? 'border-accent bg-accent text-accent-fg'
                          : 'border-line bg-surface/50 text-fg hover:border-accent/60 hover:text-accent',
                      )}
                    >
                      {s}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
