import { useState } from 'react';
import { profile } from '../data/profile';
import { sectionCopy } from '../data/site';
import { asset, external } from '../lib/utils';
import { CheckIcon, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import { Reveal } from './Section';

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers/contexts without the async clipboard API.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function Contact({ onCopied }: { onCopied: (ok: boolean) => void }) {
  const { index, eyebrow, title } = sectionCopy('contact');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const ok = await copyText(profile.email);
    onCopied(ok);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 outline-none sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="card dot-grid relative overflow-hidden px-5 py-12 sm:px-12 sm:py-16">
          <div aria-hidden className="absolute -right-24 -bottom-24 size-72 rounded-full bg-accent/15 blur-3xl" />
          <p className="eyebrow mb-3 flex items-center gap-3">
            <span className="text-subtle">{index}</span>
            <span className="h-px w-8 bg-accent/60" aria-hidden />
            {eyebrow}
          </p>
          <h2 id="contact-title" className="max-w-3xl text-4xl font-extrabold text-balance sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">{profile.status.detail}</p>

          <p className="mt-8 font-mono text-base break-all text-fg select-all sm:text-xl">{profile.email}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <MailIcon width={16} height={16} /> Email me
            </a>
            <button type="button" onClick={copy} className="btn-secondary min-w-[9.5rem]">
              {copied ? <CheckIcon width={16} height={16} className="text-live" /> : <CopyIcon width={16} height={16} />}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
            <a href={asset(profile.resume)} download="Arpan-Ghosh-Resume.pdf" className="btn-secondary">
              <DownloadIcon width={16} height={16} /> Resume
            </a>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            <a href={profile.linkedin} {...external} className="btn-ghost">
              <LinkedInIcon width={16} height={16} /> LinkedIn
            </a>
            <a href={profile.github} {...external} className="btn-ghost">
              <GitHubIcon width={16} height={16} /> GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
