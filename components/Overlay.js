import React, { forwardRef } from 'react';

const Overlay = forwardRef(({ ready, clicked, setClicked }, ref) => {
  return (
    <div ref={ref}>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div onClick={() => ready && setClicked(true)}>{!ready ? 'loading' : 'click to continue'}</div>
      </div>
      <div className="footer">
        <div className="project">Matrix</div>
        {/* <div className="author">
          <div className="name">tool3</div>
          <div className="github">matrix</div>
        </div> */}
      </div>
    </div>
  );
});

export default Overlay;
