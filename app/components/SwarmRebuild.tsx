'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

type LayerKind = 'box' | 'text' | 'circle';
type RunMode = 'viewport' | 'tour';
type EnginePhase = 'idle' | 'running' | 'done';

interface SwarmLayer {
  id: number;
  el: HTMLElement;
  kind: LayerKind;
  x: number;
  y: number;
  w: number;
  h: number;
  isFixed: boolean;
  isMultilineText: boolean;
  duration: number;
  status: 'pending' | 'active' | 'done';
  progress: number;
  agentIndex: number;
  flashAlpha: number;
}

interface SwarmAgent {
  index: number;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  mode: 'pointer' | 'ibeam';
  layerId: number | null;
}

const AGENT_COLORS = [
  '#00a2ff',
  '#38bdf8',
  '#a855f7',
  '#10b981',
  '#f59e0b',
  '#f43f5e',
  '#ec4899',
  '#6366f1',
  '#14b8a6',
  '#eab308',
  '#06b6d4',
  '#8b5cf6',
];

const NUM_AGENTS = AGENT_COLORS.length;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function isAtomicLayer(el: HTMLElement): LayerKind | null {
  const tag = el.tagName;

  if (el.classList.contains('avatar-float')) {
    return 'circle';
  }

  if (tag === 'A' || tag === 'BUTTON') {
    return 'box';
  }

  if (tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4' || tag === 'P') {
    return 'text';
  }

  if (
    el.classList.contains('project-card') ||
    el.classList.contains('reveal-card') ||
    el.classList.contains('cta-button') ||
    el.classList.contains('chip-hover')
  ) {
    return 'box';
  }

  // Hero stat cards, terminal cards, and skill/contact cards without nested atomic cards
  const hasCardShape =
    (el.classList.contains('rounded-2xl') ||
      el.classList.contains('rounded-3xl') ||
      el.classList.contains('rounded-[2rem]') ||
      el.classList.contains('rounded-[2.5rem]')) &&
    !el.querySelector('a, button, .project-card, .reveal-card');

  if (hasCardShape) {
    return 'box';
  }

  // Section eyebrow badges / pills
  if (
    tag === 'SPAN' &&
    el.classList.contains('font-mono') &&
    el.textContent &&
    el.textContent.trim().length > 0 &&
    el.textContent.trim().length < 60
  ) {
    return 'text';
  }

  if (
    tag === 'DIV' &&
    el.classList.contains('inline-flex') &&
    el.classList.contains('rounded-full')
  ) {
    return 'box';
  }

  return null;
}

function collectLayers(mode: RunMode): SwarmLayer[] {
  const roots = Array.from(document.querySelectorAll('header, main'));
  const layers: SwarmLayer[] = [];
  const vh = window.innerHeight;

  const walk = (node: Element, inFixedHeader: boolean) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.hasAttribute('data-swarm-ignore')) return;

    const style = window.getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden') return;
    if (style.pointerEvents === 'none' && !node.classList.contains('avatar-float')) return;

    const rect = node.getBoundingClientRect();
    if (rect.width < 12 || rect.height < 10) return;

    const isFixed = inFixedHeader || style.position === 'fixed';

    if (mode === 'viewport' && !isFixed) {
      if (rect.bottom < -40 || rect.top > vh + 80) {
        return;
      }
    }

    const kind = isAtomicLayer(node);
    if (kind) {
      const docX = isFixed ? rect.left : rect.left + window.scrollX;
      const docY = isFixed ? rect.top : rect.top + window.scrollY;

      layers.push({
        id: layers.length,
        el: node,
        kind,
        x: docX,
        y: docY,
        w: rect.width,
        h: rect.height,
        isFixed,
        isMultilineText: kind === 'text' && rect.height > 62,
        duration:
          kind === 'text'
            ? 1050 + Math.min(750, rect.width * 0.95)
            : 900 + Math.min(680, (rect.width + rect.height) * 0.72),
        status: 'pending',
        progress: 0,
        agentIndex: -1,
        flashAlpha: 0,
      });
      return;
    }

    for (const child of Array.from(node.children)) {
      walk(child, isFixed);
    }
  };

  for (const root of roots) {
    walk(root, root.tagName === 'HEADER');
  }

  // Sort top-to-bottom, left-to-right
  layers.sort((a, b) => {
    if (Math.abs(a.y - b.y) > 28) return a.y - b.y;
    return a.x - b.x;
  });

  return layers.map((layer, index) => ({ ...layer, id: index }));
}

function drawPointerCursor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  mode: 'pointer' | 'ibeam'
) {
  ctx.save();
  ctx.translate(x, y);

  if (mode === 'ibeam') {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-4, -9);
    ctx.lineTo(4, -9);
    ctx.moveTo(0, -9);
    ctx.lineTo(0, 9);
    ctx.moveTo(-4, 9);
    ctx.lineTo(4, 9);
    ctx.stroke();

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-4, -9);
    ctx.lineTo(4, -9);
    ctx.moveTo(0, -9);
    ctx.lineTo(0, 9);
    ctx.moveTo(-4, 9);
    ctx.lineTo(4, 9);
    ctx.stroke();
    ctx.restore();
    return;
  }

  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 15.5);
  ctx.lineTo(4.1, 11.8);
  ctx.lineTo(7.4, 17.5);
  ctx.lineTo(9.8, 16.2);
  ctx.lineTo(6.5, 10.6);
  ctx.lineTo(11.8, 10.6);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.lineWidth = 1.35;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.restore();
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

interface SwarmRebuildProps {
  autoStart?: boolean;
}

export default function SwarmRebuild({ autoStart = true }: SwarmRebuildProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const layersRef = useRef<SwarmLayer[]>([]);
  const agentsRef = useRef<SwarmAgent[]>([]);
  const speedRef = useRef<number>(1);
  const soundRef = useRef<boolean>(false);
  const modeRef = useRef<RunMode>('viewport');

  const [phase, setPhase] = useState<EnginePhase>('idle');
  const [mode, setMode] = useState<RunMode>('viewport');
  const [speed, setSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [progressCounts, setProgressCounts] = useState({ done: 0, total: 0 });
  const [isMinimizedPill, setIsMinimizedPill] = useState(false);

  const playSound = useCallback((kind: 'pop' | 'tick') => {
    if (!soundRef.current) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = kind === 'pop' ? 'triangle' : 'sine';
      const now = ctx.currentTime;
      if (kind === 'pop') {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(860, now + 0.045);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.065);
      } else {
        osc.frequency.setValueAtTime(340, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.035);
      }
    } catch {
      // Ignore audio errors if blocked by browser policy
    }
  }, []);

  const cleanupDOM = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    for (const layer of layersRef.current) {
      layer.el.removeAttribute('data-swarm-state');
      layer.el.style.removeProperty('--swarm-clip-x');
      layer.el.style.removeProperty('--swarm-clip-y');
    }
    document.documentElement.classList.remove('swarm-active');
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const finishRun = useCallback(() => {
    cleanupDOM();
    setPhase('done');
    setIsMinimizedPill(true);
  }, [cleanupDOM]);

  const startSwarm = useCallback(
    (runMode: RunMode) => {
      cleanupDOM();
      modeRef.current = runMode;
      setMode(runMode);
      setIsMinimizedPill(false);

      if (runMode === 'tour') {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }

      document.documentElement.classList.add('swarm-active');
      const discovered = collectLayers(runMode);

      if (discovered.length === 0) {
        document.documentElement.classList.remove('swarm-active');
        setPhase('done');
        setIsMinimizedPill(true);
        return;
      }

      for (const layer of discovered) {
        layer.el.setAttribute('data-swarm-state', 'hidden');
      }

      layersRef.current = discovered;

      const cx = window.innerWidth * 0.5;
      const cy = Math.min(220, window.innerHeight * 0.25);

      agentsRef.current = AGENT_COLORS.map((color, idx) => {
        const angle = (idx / NUM_AGENTS) * Math.PI * 2;
        return {
          index: idx,
          color,
          x: cx + Math.cos(angle) * 48,
          y: cy + Math.sin(angle) * 28,
          targetX: cx,
          targetY: cy,
          mode: 'pointer',
          layerId: null,
        };
      });

      setProgressCounts({ done: 0, total: discovered.length });
      setPhase('running');

      const startTime = performance.now();
      let lastFrameTime = startTime;
      let lastReportedDone = 0;
      let nextLayerCursor = 0;
      let convergeDone = false;
      let settleTimer = 0;

      const step = (now: number) => {
        const rawDt = Math.max(0, Math.min(48, now - lastFrameTime));
        lastFrameTime = now;
        const dt = rawDt * speedRef.current;
        const elapsed = Math.max(0, (now - startTime) * speedRef.current);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (canvas.width !== Math.floor(vw * dpr) || canvas.height !== Math.floor(vh * dpr)) {
          canvas.width = Math.floor(vw * dpr);
          canvas.height = Math.floor(vh * dpr);
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, vw, vh);

        const layers = layersRef.current;
        const agents = agentsRef.current;

        // Brief convergence around the logo/avatar before fanning out
        if (elapsed > 450) {
          convergeDone = true;
        }

        // Tour auto-scroll smoothly follows the active construction frontier
        const activeOrPendingFrontier =
          layers.find((l) => l.status === 'active' && !l.isFixed) ||
          layers.find((l) => l.status === 'pending' && !l.isFixed);

        const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
        if (modeRef.current === 'tour' && convergeDone && activeOrPendingFrontier) {
          const desiredScroll = Math.max(0, activeOrPendingFrontier.y - vh * 0.34);
          const targetScroll = Math.min(maxScroll, desiredScroll);
          const curScroll = window.scrollY;
          if (Math.abs(targetScroll - curScroll) > 1.5) {
            const nextY = curScroll + (targetScroll - curScroll) * Math.min(1, dt * 0.008);
            window.scrollTo({ top: nextY, behavior: 'instant' as ScrollBehavior });
          }
        }

        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const atPageBottom = scrollY >= maxScroll - 4;

        // Assign pending layers to idle agents
        if (convergeDone) {
          for (const agent of agents) {
            if (agent.layerId === null && nextLayerCursor < layers.length) {
              // Stagger agent start across a readable wave
              if (elapsed < 450 + agent.index * 115) continue;

              const candidate = layers[nextLayerCursor];
              // In tour mode, wait until scrolled near element unless already at page bottom
              const candidateViewY = candidate.isFixed ? candidate.y : candidate.y - scrollY;
              if (
                modeRef.current === 'tour' &&
                !atPageBottom &&
                candidateViewY > vh * 0.88 &&
                nextLayerCursor > 5
              ) {
                continue;
              }

              candidate.status = 'active';
              candidate.agentIndex = agent.index;
              candidate.progress = 0;
              agent.layerId = candidate.id;
              agent.mode = candidate.kind === 'text' ? 'ibeam' : 'pointer';

              if (candidate.kind === 'text') {
                candidate.el.setAttribute('data-swarm-state', 'building-text');
                candidate.el.style.setProperty('--swarm-clip-x', '100%');
                candidate.el.style.setProperty('--swarm-clip-y', candidate.isMultilineText ? '100%' : '0%');
              }

              playSound('tick');
              nextLayerCursor++;
            }
          }
        }

        // Update active & flashing layers and render wireframes
        let doneCount = 0;
        for (const layer of layers) {
          const vx = layer.isFixed ? layer.x : layer.x - scrollX;
          const vy = layer.isFixed ? layer.y : layer.y - scrollY;

          if (layer.status === 'active') {
            layer.progress = Math.min(1, layer.progress + dt / layer.duration);
            const p = easeOutCubic(layer.progress);

            const agent = agents[layer.agentIndex];
            if (layer.kind === 'text') {
              // Phase 1 (0..0.25): frame box; Phase 2 (0.25..1.0): wipe/type text
              const boxP = Math.min(1, p / 0.28);
              const textP = Math.max(0, (p - 0.22) / 0.78);
              const curW = Math.max(8, layer.w * easeInOutQuad(boxP));
              const curH = Math.max(8, layer.h * easeInOutQuad(boxP));

              if (layer.isMultilineText) {
                layer.el.style.setProperty('--swarm-clip-x', '0%');
                layer.el.style.setProperty('--swarm-clip-y', `${((1 - textP) * 100).toFixed(1)}%`);
              } else {
                layer.el.style.setProperty('--swarm-clip-x', `${((1 - textP) * 100).toFixed(1)}%`);
                layer.el.style.setProperty('--swarm-clip-y', '0%');
              }

              if (agent) {
                if (p < 0.25) {
                  agent.mode = 'pointer';
                  agent.targetX = vx + curW;
                  agent.targetY = vy + curH;
                } else {
                  agent.mode = 'ibeam';
                  if (layer.isMultilineText) {
                    const lineCycle = (textP * 3) % 1;
                    agent.targetX = vx + Math.min(layer.w, layer.w * lineCycle + 12);
                    agent.targetY = vy + layer.h * textP;
                  } else {
                    agent.targetX = vx + layer.w * textP;
                    agent.targetY = vy + layer.h * 0.52;
                  }
                }
              }

              // Draw selection frame + handles + size pill
              if (vy + layer.h > -40 && vy < vh + 40) {
                ctx.save();
                ctx.strokeStyle = '#00a2ff';
                ctx.lineWidth = 1.25;
                ctx.fillStyle = 'rgba(0, 162, 255, 0.05)';
                ctx.fillRect(vx, vy, curW, curH);
                ctx.strokeRect(vx, vy, curW, curH);

                // Blinking caret at typing frontier
                if (p >= 0.25 && Math.floor(now / 260) % 2 === 0) {
                  ctx.fillStyle = '#38bdf8';
                  const caretX = layer.isMultilineText ? agent.targetX : vx + layer.w * textP;
                  const caretY = layer.isMultilineText ? Math.max(vy + 4, vy + layer.h * textP - 10) : vy + 3;
                  const caretH = layer.isMultilineText ? 16 : Math.max(14, layer.h - 6);
                  ctx.fillRect(caretX, caretY, 2, Math.min(26, caretH));
                }

                drawCornersAndBadge(ctx, vx, vy, curW, curH, layer.w, layer.h);
                ctx.restore();
              }
            } else {
              // Box or circle frame drag
              const curW = Math.max(8, layer.w * p);
              const curH = Math.max(8, layer.h * p);

              if (agent) {
                agent.mode = 'pointer';
                agent.targetX = vx + curW;
                agent.targetY = vy + curH;
              }

              if (vy + layer.h > -40 && vy < vh + 40) {
                ctx.save();
                ctx.strokeStyle = '#00a2ff';
                ctx.lineWidth = 1.5;
                ctx.fillStyle = 'rgba(0, 162, 255, 0.07)';
                ctx.fillRect(vx, vy, curW, curH);
                ctx.strokeRect(vx, vy, curW, curH);

                if (layer.kind === 'circle' && curW > 18 && curH > 18) {
                  ctx.setLineDash([4, 3]);
                  ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
                  ctx.beginPath();
                  ctx.ellipse(
                    vx + curW / 2,
                    vy + curH / 2,
                    curW / 2,
                    curH / 2,
                    0,
                    0,
                    Math.PI * 2
                  );
                  ctx.stroke();
                  ctx.setLineDash([]);
                }

                // Orange-red alignment guide snap lines near completion
                if (layer.progress > 0.78) {
                  ctx.strokeStyle = 'rgba(255, 90, 54, 0.55)';
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.moveTo(vx, Math.max(0, vy - 28));
                  ctx.lineTo(vx, Math.min(vh, vy + curH + 28));
                  ctx.moveTo(Math.max(0, vx - 28), vy);
                  ctx.lineTo(Math.min(vw, vx + curW + 28), vy);
                  ctx.stroke();
                }

                drawCornersAndBadge(ctx, vx, vy, curW, curH, curW, curH);
                ctx.restore();
              }
            }

            if (layer.progress >= 1) {
              layer.status = 'done';
              layer.flashAlpha = 0.85;
              layer.el.setAttribute('data-swarm-state', 'revealed');
              layer.el.style.removeProperty('--swarm-clip-x');
              layer.el.style.removeProperty('--swarm-clip-y');
              if (agent) {
                agent.layerId = null;
                agent.mode = 'pointer';
              }
              playSound('pop');
            }
          } else if (layer.status === 'done') {
            doneCount++;
            if (layer.flashAlpha > 0.01) {
              layer.flashAlpha = Math.max(0, layer.flashAlpha - dt * 0.0032);
              if (vy + layer.h > -20 && vy < vh + 20) {
                ctx.save();
                ctx.strokeStyle = `rgba(56, 189, 248, ${layer.flashAlpha.toFixed(2)})`;
                ctx.lineWidth = 1.5;
                ctx.strokeRect(vx, vy, layer.w, layer.h);
                ctx.restore();
              }
            }
          }
        }

        if (doneCount !== lastReportedDone) {
          lastReportedDone = doneCount;
          setProgressCounts({ done: doneCount, total: layers.length });
        }

        // Update agent cursor positions smoothly and draw all cursors
        const lerpFactor = Math.min(1, dt * 0.014);
        const allDone = doneCount === layers.length;
        const frontierViewY = activeOrPendingFrontier
          ? Math.max(120, Math.min(vh * 0.72, activeOrPendingFrontier.y - scrollY))
          : vh * 0.42;

        for (const agent of agents) {
          if (allDone) {
            const angle = (agent.index / NUM_AGENTS) * Math.PI * 2;
            agent.targetX = vw * 0.5 + Math.cos(angle) * vw * 0.65;
            agent.targetY = vh * 0.5 + Math.sin(angle) * vh * 0.65;
          } else if (agent.layerId === null && convergeDone) {
            // Hover gently near the active frontier
            const angle = now * 0.002 + agent.index * 0.9;
            agent.targetX = vw * 0.5 + Math.cos(angle) * 180;
            agent.targetY = frontierViewY + Math.sin(angle) * 55;
          }

          agent.x += (agent.targetX - agent.x) * lerpFactor;
          agent.y += (agent.targetY - agent.y) * lerpFactor;

          const cursorAlpha = allDone ? Math.max(0, 1 - settleTimer / 580) : 1;
          if (cursorAlpha > 0.02) {
            ctx.save();
            ctx.globalAlpha = cursorAlpha;
            drawPointerCursor(ctx, agent.x, agent.y, agent.color, agent.mode);
            ctx.restore();
          }
        }

        ctx.restore();

        if (allDone) {
          settleTimer += rawDt;
          if (settleTimer > 640) {
            finishRun();
            return;
          }
        }

        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [cleanupDOM, finishRun, playSound]
  );

  // Auto-start immediately when webpage loads (if autoStart enabled)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !autoStart) {
      const id = requestAnimationFrame(() => {
        setPhase('done');
        setIsMinimizedPill(true);
      });
      return () => cancelAnimationFrame(id);
    }

    const frameId = requestAnimationFrame(() => {
      startSwarm('viewport');
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
      cleanupDOM();
    };
  }, [autoStart, cleanupDOM, finishRun, startSwarm]);

  const cycleSpeed = () => {
    const next = speed === 1 ? 2 : speed === 2 ? 3 : 1;
    speedRef.current = next;
    setSpeed(next);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    soundRef.current = next;
    setSoundEnabled(next);
    if (next) {
      playSound('pop');
    }
  };

  const progressPct =
    progressCounts.total > 0
      ? Math.round((progressCounts.done / progressCounts.total) * 100)
      : 0;

  return (
    <>
      {/* Full-viewport Swarm Canvas Overlay */}
      <canvas
        ref={canvasRef}
        data-swarm-ignore="true"
        aria-hidden="true"
        style={{ width: '100vw', height: '100vh' }}
        className={`fixed top-0 left-0 w-screen h-screen pointer-events-none z-[950] transition-opacity duration-300 ${
          phase === 'running' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Control Pill */}
      {phase === 'running' ? (
        <div
          data-swarm-ignore="true"
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[960] max-w-[calc(100vw-24px)] flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 rounded-full bg-[#0c1017]/95 border border-white/15 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] text-xs font-mono text-zinc-200"
        >
          {/* Overlapping colored agent dots */}
          <div className="hidden sm:flex items-center -space-x-1.5 pr-1">
            {AGENT_COLORS.slice(0, 5).map((color, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-[#0c1017]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <span className="font-bold text-white whitespace-nowrap hidden sm:inline">
            {NUM_AGENTS} agents
          </span>

          <span className="text-zinc-400 tabular-nums whitespace-nowrap">
            {progressCounts.done} / {progressCounts.total} layers
          </span>

          {/* Progress track */}
          <div className="w-14 sm:w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[#00a2ff] transition-[width] duration-150 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Tour toggle */}
          <button
            type="button"
            onClick={() => startSwarm(mode === 'tour' ? 'viewport' : 'tour')}
            className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
              mode === 'tour'
                ? 'bg-[#00a2ff]/20 border-[#00a2ff] text-[#38bdf8] font-bold'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:border-white/25'
            }`}
            title="Auto-scroll rebuild whole page"
          >
            Tour
          </button>

          {/* Speed toggle */}
          <button
            type="button"
            onClick={cycleSpeed}
            className="px-2 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00a2ff]/60 text-zinc-200 transition-colors cursor-pointer tabular-nums"
            title="Change rebuild speed"
          >
            {speed}×
          </button>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute swarm sound' : 'Enable swarm sound'}
            className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#00a2ff]/20 border-[#00a2ff] text-[#38bdf8]'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Skip button */}
          <button
            type="button"
            onClick={finishRun}
            aria-label="Skip swarm animation"
            className="px-2 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-rose-500/20 hover:border-rose-400/50 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Skip (Esc)"
          >
            ✕
          </button>
        </div>
      ) : isMinimizedPill ? (
        <div
          data-swarm-ignore="true"
          className="fixed bottom-16 right-4 md:right-8 z-[850] flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#0c1017]/90 border border-white/15 backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.5)] text-[11px] font-mono"
        >
          <button
            type="button"
            onClick={() => startSwarm('viewport')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00a2ff]/15 hover:bg-[#00a2ff]/30 text-[#38bdf8] border border-[#00a2ff]/30 transition-colors cursor-pointer font-semibold"
            data-cursor="REPLAY"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a2ff]" />
            Replay Swarm
          </button>
          <button
            type="button"
            onClick={() => startSwarm('tour')}
            className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            data-cursor="TOUR"
            title="Auto-scroll and rebuild entire page"
          >
            Tour
          </button>
        </div>
      ) : null}
    </>
  );
}

function drawCornersAndBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  curW: number,
  curH: number,
  labelW: number,
  labelH: number
) {
  const hs = 5;
  const corners = [
    [x, y],
    [x + curW, y],
    [x, y + curH],
    [x + curW, y + curH],
  ];
  for (const [cx, cy] of corners) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - hs / 2, cy - hs / 2, hs, hs);
    ctx.strokeStyle = '#00a2ff';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - hs / 2, cy - hs / 2, hs, hs);
  }

  if (curW > 42) {
    const label = `${Math.round(labelW)} × ${Math.round(labelH)}`;
    ctx.font = '600 10px ui-monospace, SFMono-Regular, Menlo, monospace';
    const textW = ctx.measureText(label).width;
    const pillW = textW + 10;
    const pillH = 16;
    const pillX = x + curW / 2 - pillW / 2;
    const pillY = y + curH + 5;

    drawRoundedRectPath(ctx, pillX, pillY, pillW, pillH, 4);
    ctx.fillStyle = '#00a2ff';
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(label, pillX + pillW / 2, pillY + pillH / 2 + 0.5);
  }
}
