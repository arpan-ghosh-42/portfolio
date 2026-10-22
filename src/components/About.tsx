import { profile } from '../data/profile';
import { Reveal, Section } from './Section';

export function About() {
  const [lead, ...rest] = profile.bio;
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="space-y-5">
          <p className="text-xl leading-relaxed text-pretty sm:text-2xl">{lead}</p>
          {rest.map((para) => (
            <p key={para} className="text-base leading-relaxed text-pretty text-muted sm:text-lg">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <div className="card p-5 sm:p-6">
            <p className="eyebrow mb-3">Currently</p>
            <p className="font-medium">{profile.status.current}</p>
            <p className="mt-2 text-sm text-muted">{profile.status.detail}</p>
          </div>
          <div className="card p-5 sm:p-6">
            <p className="eyebrow mb-3">Drawn to</p>
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((t) => (
                <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5 sm:p-6">
            <p className="eyebrow mb-3">Based in</p>
            <p className="font-medium">{profile.location}</p>
            <p className="mt-1 font-mono text-xs text-subtle">{profile.timezone} · open to remote</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
