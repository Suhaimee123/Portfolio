'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  title: string;
  description: string;
  liveUrl?: string;
  detailUrl: string;
  coverImage?: string;
  tags: string[];
  gradient: string;
}

export default function ProjectCard({
  title,
  description,
  liveUrl,
  detailUrl,
  coverImage,
  tags,
  gradient
}: ProjectCardProps) {
  const router = useRouter();
  const goToDetail = () => router.push(detailUrl);

  return (
    <article
      className="project-card group relative flex flex-col justify-between p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 min-h-[430px] backdrop-blur-sm cursor-pointer"
      onClick={goToDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          goToDetail();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`ดูรายละเอียดโปรเจกต์ ${title}`}
    >
      {/* Hover Background Gradient Effects */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${gradient}`} />
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150" />
      
      <div className="relative z-10">
        {coverImage ? (
          <div className="relative mb-5 h-40 w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={coverImage}
              alt={`ภาพตัวอย่างโปรเจกต์ ${title}`}
              fill
              className="project-cover object-cover"
            />
          </div>
        ) : null}
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors">{title}</h3>
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:rotate-45 transition-all duration-500 border border-white/5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-white transition-colors">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        </div>
        
        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span key={tag} className="tag-pop px-4 py-1.5 text-xs font-medium text-zinc-300 bg-white/5 border border-white/5 rounded-full group-hover:border-white/10 transition-colors">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={detailUrl}
            onClick={(event) => event.stopPropagation()}
            className="cta-button px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            ดูรายละเอียด
          </Link>
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="chip-hover px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              ชมโปรเจกต์จริง
            </a>
          ) : (
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-zinc-500 cursor-not-allowed">
              ยังไม่มีลิงก์ระบบจริง
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
