import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prepareTypedText } from "./typedText";

export function runSwarmBuild(page) {
  const swarm = page.querySelector(".scroll-swarm");
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const agentElements = [...swarm.querySelectorAll(".scroll-swarm__agent")];
  const activeElements = agentElements.slice(0, touch ? 6 : 12);
  gsap.set(agentElements.slice(activeElements.length), { autoAlpha: 0 });
  const agents = activeElements.map((element) => ({
    element,
    cursor: element.querySelector(".scroll-swarm__cursor"),
    frame: element.querySelector(".scroll-swarm__draft"),
    badge: element.querySelector(".scroll-swarm__size"),
    guides: [...element.querySelectorAll(".scroll-swarm__guide")],
    busy: false,
  }));
  const pieces = [...page.querySelectorAll("[data-build-piece]")];
  const elements = pieces.filter((node) => node.getClientRects().length);
  const hiddenPieces = pieces.filter((node) => !node.getClientRects().length);
  // Hidden navigation must inherit the built header when a breakpoint makes it visible.
  gsap.set(hiddenPieces, { visibility: "inherit" });
  const tasks = elements.map((target) => {
    const group = target.closest("[data-build-component]");
    const parallel = group?.matches(".focus-row, .project-card, .experience-item, .leadership-item");
    return { target, component: parallel ? target : group || target, state: "pending" };
  });
  const byElement = new Map(tasks.map((task) => [task.target, task]));
  tasks.forEach((task) => {
    const parent = task.target.parentElement.closest("[data-build-piece]");
    const master = task.target.dataset.buildPiece === "duplicate"
      ? task.target.parentElement.querySelector(':scope > [data-build-piece="box"]') : null;
    task.dependencies = [byElement.get(parent), byElement.get(master)].filter(Boolean);
  });
  const componentBounds = new Map();
  const remaining = new Map();
  tasks.forEach((task) => {
    task.container = task.target.closest(".site-header, .build-section");
    task.alwaysVisible = Boolean(task.target.closest("#home, .site-header"));
    if (task.container) remaining.set(task.container, (remaining.get(task.container) || 0) + 1);
  });
  const measure = () => {
    tasks.forEach((task) => {
      const rect = task.target.getBoundingClientRect();
      task.top = rect.top + window.scrollY;
      task.left = rect.left;
      task.bottom = rect.bottom + window.scrollY;
    });
    componentBounds.clear();
    tasks.forEach(({ component }) => {
      if (componentBounds.has(component)) return;
      const rect = component.getBoundingClientRect();
      componentBounds.set(component, { x: rect.left + rect.width / 2, y: rect.top + window.scrollY + Math.min(rect.height / 2, 160) });
    });
  };
  measure();
  const containers = [...page.querySelectorAll(".site-header, .build-section")];
  const animations = [];
  const owners = new Map();
  let disposed = false;
  let time = 0;
  let wallTime = performance.now() / 1000;
  let needsSchedule = false;

  containers.forEach((container) => { container.inert = true; });
  gsap.set(containers, { visibility: "hidden" });
  gsap.set(elements, { autoAlpha: 0 });
  gsap.set(elements.filter((node) => node.dataset.buildPiece === "text"), { transformOrigin: "left center" });
  gsap.set(swarm, { autoAlpha: 1 });
  gsap.set(agents.map((agent) => agent.cursor), { autoAlpha: 1 });

  let scrollSpeed = 0;
  const pointer = { x: window.innerWidth * 0.55, y: window.innerHeight * 0.55, seen: false };
  const followPointer = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.seen = true;
  };
  const releaseTouch = (event) => { if (event.pointerType === "touch") pointer.seen = false; };
  window.addEventListener("pointermove", followPointer, { passive: true });
  window.addEventListener("pointerdown", followPointer, { passive: true });
  window.addEventListener("pointerup", releaseTouch, { passive: true });
  window.addEventListener("pointercancel", releaseTouch, { passive: true });
  agents.forEach((agent, index) => {
    const phase = index * 2.4;
    agent.x = window.innerWidth * 0.5 + Math.cos(phase) * (30 + index * 9);
    agent.y = window.scrollY + window.innerHeight * 0.48 + Math.sin(phase) * (30 + index * 7);
    agent.vx = Math.cos(phase) * 70;
    agent.vy = Math.sin(phase) * 70;
    agent.goal = { x: agent.x, y: agent.y };
    agent.working = false;
    agent.rotation = 0;
    agent.setX = gsap.quickSetter(agent.cursor, "x", "px");
    agent.setY = gsap.quickSetter(agent.cursor, "y", "px");
    agent.setRotation = gsap.quickSetter(agent.cursor, "rotation", "deg");
    agent.setX(agent.x);
    agent.setY(agent.y);
  });

  function build(task, agent) {
    task.state = "building";
    task.target.dataset.buildTaskState = "building";
    agent.busy = true;
    agent.staging = null;
    agent.returning = false;
    agent.element.dataset.returning = "false";
    agent.element.dataset.queued = "false";
    agent.component = task.component;
    owners.set(task.component, agent);
    agent.element.dataset.busy = "true";
    const target = task.target;
    const kind = target.dataset.buildPiece;
    const container = task.container;
    if (container) {
      gsap.set(container, { visibility: "visible" });
      if (!container.matches(".site-header")) container.inert = false;
    }
    let rect = target.getBoundingClientRect();
    if (kind === "text") {
      const range = document.createRange();
      range.selectNodeContents(target);
      const textRect = range.getBoundingClientRect();
      if (textRect.width) rect = textRect;
    }
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;
    const width = Math.max(2, rect.width);
    const height = Math.max(2, rect.height);
    const frame = agent.frame;
    agent.element.dataset.swarmTool = "arrow";
    const timeline = gsap.timeline({ onComplete: () => {
      task.state = "done";
      target.dataset.buildTaskState = "done";
      target.dataset.buildDone = "true";
      agent.busy = false;
      agent.working = false;
      agent.element.dataset.busy = "false";
      agent.element.dataset.swarmTool = "arrow";
      if (container) {
        remaining.set(container, remaining.get(container) - 1);
        if (remaining.get(container) === 0) container.inert = false;
      }
      const next = tasks.find((item) => item.component === agent.component && canStart(item));
      if (next) {
        build(next, agent);
      } else {
        owners.delete(agent.component);
        agent.component = null;
        agent.returning = true;
        agent.returnStarted = time;
        agent.element.dataset.returning = "true";
        schedule();
      }
    } });
    animations.push(timeline);


    if (kind === "duplicate") {
      const master = task.dependencies.find((item) => item.target.dataset.buildPiece === "box");
      if (master) {
        const bounds = master.target.getBoundingClientRect();
        timeline.to(agent.goal, { x: bounds.left + bounds.width / 2, y: bounds.top + window.scrollY + bounds.height / 2, duration: 0.2 });
      }
    }
    const travelTime = Math.min(0.65, 0.2 + Math.hypot(agent.x - x, agent.y - y) / 2200);
    timeline.to(agent.goal, { x, y, duration: travelTime, ease: "power2.inOut" });
    timeline.call(() => { agent.working = true; agent.element.dataset.swarmTool = "box"; });
    timeline.set(frame, { x, y, width: 1, height: 1, backgroundColor: "rgba(100,100,100,0.07)", autoAlpha: 1 });
    timeline.set(agent.guides[0], { x: 0, y, width: page.clientWidth, autoAlpha: 0.5 }, "<");
    timeline.set(agent.guides[1], { x, y: window.scrollY, height: window.innerHeight, autoAlpha: 0.5 }, "<");
    timeline.to(frame, {
      width, height, duration: 0.32, ease: "power2.inOut",
      onUpdate: () => {
        const w = Math.round(parseFloat(frame.style.width));
        const h = Math.round(parseFloat(frame.style.height));
        agent.badge.textContent = `${kind === "duplicate" ? "⌥ · " : ""}${w} × ${h}`;
      },
    });
    timeline.to(agent.goal, { x: x + width, y: y + height, duration: 0.32, ease: "power2.inOut" }, "<");
    timeline.set(target, { autoAlpha: 1 });

    if (kind === "text") {
      const typing = prepareTypedText(target);
      task.typing = typing;
      const counter = { count: 0 };
      const heading = Boolean(target.closest("h1,h2,h3"));
      const scale = heading ? 0.7 : 1;
      const duration = Math.min(1.5, Math.max(0.25, typing.length / 85));
      timeline.set(target, { scale });
      timeline.call(() => {
        agent.element.dataset.swarmTool = "text";
        target.dataset.buildPhase = "typing";
        typing.start();
      });
      timeline.to(counter, {
        count: typing.length, duration, ease: "none",
        onUpdate: () => {
          const caret = typing.render(counter.count);
          if (!caret) return;
          agent.goal.x = x + (caret.x - x) * scale;
          agent.goal.y = y + height / 2 + (caret.y - y - height / 2) * scale;
        },
        onComplete: () => typing.finishText(),
      });
      if (heading) {
        timeline.to(target, {
          scale: 1, duration: 0.22, ease: "power2.out",
          onStart: () => { target.dataset.buildPhase = "growing"; },
        });
      }
      timeline.call(() => { typing.releaseSize(); target.dataset.buildPhase = "done"; });
    } else if (kind === "media") {
      timeline.fromTo(target, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0)", duration: 0.55, ease: "none" });
      timeline.fromTo(agent.goal, { x: x + width, y }, { y: y + height, duration: 0.55, ease: "none" }, "<");
    } else if (kind === "line") {
      timeline.fromTo(target, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.32 });
    }
    const adjusts = width > (touch ? 180 : 100) && height > 20
      && (target.closest("h1,h2,h3") || ["box", "duplicate", "media"].includes(kind));
    if (adjusts) {
      timeline.call(() => {
        target.dataset.buildPhase = "adjusting";
        agent.element.dataset.swarmTool = "box";
      });
      timeline.set(agent.guides[0], { y: y + height });
      timeline.to(agent.goal, { x: x + width + 3, y: y + height + 2, duration: 0.14 });
      timeline.to(frame, { width: width + 3, height: height + 2, duration: 0.14 }, "<");
      timeline.to(target, { x: 2, y: -1, duration: 0.14 }, "<");
      timeline.call(() => { agent.element.dataset.swarmTool = "arrow"; });
      timeline.to(agent.goal, { x: x + width, y: y + height, duration: 0.2, ease: "power2.out" });
      timeline.to(frame, { width, height, duration: 0.2, ease: "power2.out" }, "<");
      timeline.to(target, { x: 0, y: 0, duration: 0.2, ease: "power2.out" }, "<");
      timeline.call(() => { target.dataset.buildPhase = "done"; });
    }
    timeline.to(frame, { backgroundColor: "transparent", duration: 0.08 });
    timeline.to(frame, { autoAlpha: 0, duration: 0.14 }, "+=0.12");
    timeline.to(agent.guides, { autoAlpha: 0, duration: 0.14 }, "<");
    task.timeline = timeline;
    task.startedAt = wallTime;
    timeline.timeScale(buildPace(task));
  }

  function buildPace(task) {
    const viewportY = (task.top - window.scrollY) / window.innerHeight;
    if (task.bottom < window.scrollY) return 8;
    if (viewportY < 0.1) return 4.5;
    const scrollPace = Math.min(3.5, 1.15 + Math.abs(scrollSpeed) / 1800);
    const visiblePace = viewportY < 0.65 ? 2.2 : 1.6;
    const age = wallTime - (task.visibleSince ?? task.startedAt);
    const overdue = age > 1.5 ? 6 : age > 0.9 ? 4 : 1;
    return Math.max(scrollPace, visiblePace, overdue);
  }

  function canStart(task) {
    return task.state === "pending"
      && task.dependencies.every((dependency) => dependency.state === "done")
      && (task.alwaysVisible || task.top < window.scrollY + window.innerHeight * 0.9);
  }

  function schedule() {
    if (disposed) return;
    const idle = agents.filter((agent) => !agent.busy);
    while (idle.length) {
      const candidates = tasks.filter((task) => canStart(task) && !owners.has(task.component));
      if (!candidates.length) break;
      const occupied = [...owners.keys()].map((component) => componentBounds.get(component));
      // Pick the component farthest from active jobs so agents fan across the page.
      const distanceFromJobs = (task) => {
        const point = componentBounds.get(task.component);
        return Math.min(...occupied.map((other) => Math.hypot(point.x - other.x, point.y - other.y)));
      };
      candidates.sort((a, b) => {
        const visibleA = Number(a.bottom > window.scrollY + 64);
        const visibleB = Number(b.bottom > window.scrollY + 64);
        return visibleB - visibleA || (occupied.length ? distanceFromJobs(b) - distanceFromJobs(a) : 0);
      });
      const next = candidates[0];
      idle.sort((a, b) => Math.hypot(a.x - next.left, a.y - next.top) - Math.hypot(b.x - next.left, b.y - next.top));
      build(next, idle.shift());
    }
    const waiting = tasks.filter((task) => task.state === "pending"
      && task.top < window.scrollY + window.innerHeight * 0.9 && task.bottom > window.scrollY);
    idle.forEach((agent, index) => {
      const next = waiting.length ? waiting[index % waiting.length] : null;
      agent.staging = next ? { x: next.left + 24, y: next.top + 20 } : null;
      agent.element.dataset.queued = String(Boolean(next));
    });
  }

  const tick = () => {
    const dt = Math.min(gsap.ticker.deltaRatio() / 60, 1 / 30);
    time += dt;
    wallTime = performance.now() / 1000;
    scrollSpeed *= Math.exp(-dt * 5);
    tasks.forEach((task) => {
      if (task.visibleSince === undefined && task.top < window.scrollY + window.innerHeight * 0.9
        && task.bottom > window.scrollY + 64) task.visibleSince = wallTime;
      if (task.state !== "building" || !task.timeline) return;
      const pace = buildPace(task);
      if (Math.abs(task.timeline.timeScale() - pace) > 0.1) task.timeline.timeScale(pace);
    });
    const followingMouse = pointer.seen;
    const cx = followingMouse ? pointer.x : window.innerWidth * 0.55;
    const cy = window.scrollY + (followingMouse ? pointer.y : window.innerHeight * 0.55)
      + Math.max(-120, Math.min(120, scrollSpeed * 0.04));
    // Integrate from one snapshot so agent order cannot bias the flock.
    const flock = agents.map(({ x, y, vx, vy }) => ({ x, y, vx, vy }));
    let regrouped = false;
    agents.forEach((agent, index) => {
      const working = agent.busy && agent.working;
      const stiffness = working ? 260 : (agent.busy || agent.staging) ? 65 : agent.returning ? 10 : 6;
      const damping = working ? 30 : (agent.busy || agent.staging) ? 15 : agent.returning ? 6 : 4.3;
      const wanderX = Math.sin(time * 0.55 + index * 2.4) * 60 + Math.cos(time * 0.81 + index) * 20;
      const wanderY = Math.sin(time * 0.43 + index * 1.7) * 45 + Math.cos(time * 0.7 + index) * 15;
      const goalX = agent.busy ? agent.goal.x : agent.staging ? agent.staging.x : Math.max(40, Math.min(window.innerWidth - 40, cx + wanderX));
      const goalY = agent.busy ? agent.goal.y : agent.staging ? agent.staging.y : Math.max(window.scrollY + 100, Math.min(window.scrollY + window.innerHeight - 40, cy + wanderY));
      let ax = (goalX - agent.x) * stiffness - agent.vx * damping;
      let ay = (goalY - agent.y) * stiffness - agent.vy * damping;
      if (!working) {
        flock.forEach((neighbor, other) => {
          if (index === other) return;
          const dx = agent.x - neighbor.x;
          const dy = agent.y - neighbor.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          if (distance < 50) {
            const push = (1 - distance / 50) * 350;
            ax += dx / distance * push;
            ay += dy / distance * push;
          }
          if (!agent.busy && distance < 200) {
            ax += (neighbor.vx - agent.vx) * 0.12;
            ay += (neighbor.vy - agent.vy) * 0.12;
          }
        });
        if (followingMouse && !agent.busy) {
          const dx = agent.x - pointer.x;
          const dy = agent.y - window.scrollY - pointer.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          if (distance < 55) {
            ax += dx / distance * 450;
            ay += dy / distance * 450;
          }
        }
        ax += Math.sin(time * 1.1 + index * 2.4) * 35;
        ay += Math.cos(time * 0.8 + index * 1.7) * 35;
      }
      agent.vx += ax * dt;
      agent.vy += ay * dt;
      const speed = Math.hypot(agent.vx, agent.vy);
      const maxSpeed = working ? 2000 : agent.busy ? 1400 : (agent.returning ? 1100 : 500) + Math.min(900, Math.abs(scrollSpeed) * 0.2);
      if (speed > maxSpeed) {
        agent.vx *= maxSpeed / speed;
        agent.vy *= maxSpeed / speed;
      }
      agent.x += agent.vx * dt;
      agent.y += agent.vy * dt;
      const tilt = working ? 0 : Math.max(-22, Math.min(22, agent.vx * 0.045));
      agent.rotation += (tilt - agent.rotation) * Math.min(1, dt * 8);
      agent.setX(agent.x);
      agent.setY(agent.y);
      agent.setRotation(agent.rotation);
      if (agent.returning && time - agent.returnStarted > 0.25
        && Math.hypot(agent.x - cx, agent.y - cy) < 140) {
        agent.returning = false;
        agent.element.dataset.returning = "false";
        regrouped = true;
      }
    });
    if (regrouped || needsSchedule) { needsSchedule = false; schedule(); }
  };
  gsap.ticker.add(tick);
  const trigger = ScrollTrigger.create({
    trigger: page, start: "top top", end: "max",
    onUpdate: (self) => {
      scrollSpeed = self.getVelocity();
      needsSchedule = true;
    },
    onRefresh: () => { measure(); needsSchedule = true; },
  });
  schedule();

  return () => {
    disposed = true;
    gsap.ticker.remove(tick);
    window.removeEventListener("pointermove", followPointer);
    window.removeEventListener("pointerdown", followPointer);
    window.removeEventListener("pointerup", releaseTouch);
    window.removeEventListener("pointercancel", releaseTouch);
    trigger.kill();
    animations.forEach((animation) => animation.kill());
    tasks.forEach((task) => task.typing?.restore());
    gsap.killTweensOf(swarm);
    containers.forEach((container) => { container.inert = false; });
    gsap.set(elements, { clearProps: "opacity,visibility,transform,clipPath" });
    gsap.set(hiddenPieces, { clearProps: "visibility" });
    elements.forEach((element) => {
      delete element.dataset.buildDone;
      delete element.dataset.buildTaskState;
      delete element.dataset.buildPhase;
    });
  };
}
