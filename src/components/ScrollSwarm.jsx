const ScrollSwarm = () => (
  <div className="scroll-swarm" aria-hidden="true">
    {Array.from({ length: 12 }, (_, index) => (
      <div className="scroll-swarm__agent" data-swarm-tool="arrow" key={index}>
      <div
        className="scroll-swarm__cursor"
      >
        <svg className="scroll-swarm__arrow" viewBox="0 0 24 24" focusable="false">
          <path d="M2 1.5v18l5.2-5 4.1 8 3-1.6-4-8H18L2 1.5z" />
        </svg>
        <svg className="scroll-swarm__duplicate" viewBox="0 0 24 24" focusable="false">
          <path d="M2 1.5v18l5.2-5 4.1 8 3-1.6-4-8H18L2 1.5z" transform="translate(3 2)" />
          <path d="M2 1.5v18l5.2-5 4.1 8 3-1.6-4-8H18L2 1.5z" />
        </svg>
        <svg className="scroll-swarm__crosshair" viewBox="0 0 24 24" focusable="false">
          <path d="M12 1v7m0 8v7M1 12h7m8 0h7" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
        <svg className="scroll-swarm__ibeam" viewBox="0 0 24 24" focusable="false">
          <path d="M7 3h10M12 3v18M7 21h10" />
        </svg>
        <svg className="scroll-swarm__pen" viewBox="0 0 24 24" focusable="false">
          <path d="M2 2l11 4 8 8-7 7-8-8Z" />
          <path className="scroll-swarm__pen-detail" d="M2 2l7 7" />
          <circle cx="10.5" cy="10.5" r="1.6" />
        </svg>
        <svg className="scroll-swarm__resize" viewBox="0 0 24 24" focusable="false">
          <path d="M4 10V4h6M20 14v6h-6M4 4l16 16" />
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
