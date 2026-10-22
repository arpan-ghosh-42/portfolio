import type { CSSProperties } from 'react';
import { profile } from '../data/profile';
import { asset, external, scrollToId } from '../lib/utils';
import { ArrowDownIcon, DownloadIcon, GitHubIcon, LinkedInIcon, PlayIcon } from './icons';
import { ModelCard } from './ModelCard';
import { RoleRotator } from './RoleRotator';

// The entrance uses CSS (.rise / .rise-visible) rather than JS so the prerendered hero paints
// immediately, before the bundle has loaded.
const step = (n: number) => ({ '--d': `${n * 70}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden
        className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_30%_20%,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full bg-accent/10 blur-3xl dark:bg-accent/[0.07]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          {profile.photo && (
            <img
              src={asset(profile.photo.src)}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              decoding="async"
              style={step(0)}
              className="rise mb-6 ml-1.5 size-28 rounded-full object-cover ring-2 ring-accent ring-offset-4 ring-offset-bg sm:mb-8 sm:size-40"
            />
          )}
          {profile.status.open && (
            <p
              style={step(0)}
              className="rise mb-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line bg-elev/80 px-3 py-1.5 text-sm text-muted"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-live motion-safe:animate-[ping-soft_1.8s_ease-out_infinite]" />
                <span className="relative size-2 rounded-full bg-live" />
              </span>
              <span className="font-medium text-fg">{profile.status.label}</span>
            </p>
          )}

          <p style={step(1)} className="rise mb-3 font-mono text-xs tracking-wide text-subtle sm:text-sm">
            {profile.headline}
          </p>

          <h1
            id="hero-title"
            style={step(2)}
            className="rise-visible text-5xl leading-[0.95] font-extrabold xs:text-6xl sm:text-7xl lg:text-[5.5rem]"
          >
            {profile.name}
          </h1>

          <p style={step(3)} className="rise mt-5 font-display text-2xl font-semibold sm:text-3xl">
            <span className="font-mono text-base font-normal text-subtle sm:text-lg">role = </span>
            <RoleRotator roles={profile.roles} />
          </p>

          <p style={step(4)} className="rise-visible mt-6 max-w-xl text-lg text-pretty text-muted sm:text-xl">
            {profile.tagline}
          </p>

          <div style={step(5)} className="rise mt-9 flex flex-wrap gap-3">
            <a href="#projects" onClick={(e) => (e.preventDefault(), scrollToId('projects'))} className="btn-primary">
              View projects <ArrowDownIcon width={16} height={16} />
            </a>
            <a href="#demos" onClick={(e) => (e.preventDefault(), scrollToId('demos'))} className="btn-secondary">
              <PlayIcon width={16} height={16} /> Live demos
            </a>
            <a href={asset(profile.resume)} download="Arpan-Ghosh-Resume.pdf" className="btn-secondary">
              <DownloadIcon width={16} height={16} /> Download resume
            </a>
          </div>
          <div style={step(6)} className="rise mt-3 flex flex-wrap gap-1">
            <a href={profile.github} {...external} className="btn-ghost">
              <GitHubIcon width={16} height={16} /> GitHub
            </a>
            <a href={profile.linkedin} {...external} className="btn-ghost">
              <LinkedInIcon width={16} height={16} /> LinkedIn
            </a>
          </div>
        </div>

        <ModelCard />
      </div>
    </section>
  );
}
