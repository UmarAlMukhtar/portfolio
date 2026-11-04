const ScrollSwarm = () => (
  <div className="scroll-swarm" aria-hidden="true">
    {Array.from({ length: 12 }, (_, index) => (
      <div className="scroll-swarm__agent" data-swarm-tool="arrow" key={index}>
      <div
        className="scroll-swarm__cursor"
      >
        <svg className="scroll-swarm__arrow" viewBox="0 0 20 24" focusable="false">
          <path d="M2 1.5v18l5.2-5 4.1 8 3-1.6-4-8H18L2 1.5z" />
        </svg>
        <svg className="scroll-swarm__crosshair" viewBox="0 0 24 24" focusable="false">
          <path d="M12 1v7m0 8v7M1 12h7m8 0h7" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
        <svg className="scroll-swarm__ibeam" viewBox="0 0 16 24" focusable="false">
          <path d="M3 2h10M8 2v20M3 22h10" />
        </svg>
      </div>
      <div className="scroll-swarm__guide scroll-swarm__guide--x" />
      <div className="scroll-swarm__guide scroll-swarm__guide--y" />
      <div className="scroll-swarm__draft">
      {[0, 1, 2, 3].map((corner) => <i className={`scroll-swarm__handle scroll-swarm__handle--${corner}`} key={corner} />)}
      <span className="scroll-swarm__size" />
      </div>
      </div>
    ))}
  </div>
);

export default ScrollSwarm;
