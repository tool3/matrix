import React, { forwardRef } from 'react';
import { motion } from "motion/react"
import Scramble from './Scramble';


const Slider = ({ isOn, toggleSwitch }) => {
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className="switcher" data-ison={isOn} onClick={() => toggleSwitch(!isOn)}>
      <motion.div className="handle" layout transition={spring} />
    </div>
  );

}

const Overlay = forwardRef((store, ref) => {

  const {
    clicked,
    setClicked,
    ready,
    setReady,
    light,
    setLight,
    couch,
    setCouch,
    rotate,
    setRotate,
    video,
    setVideo,
    sound,
    setSound,
  } = store
  return (
    <div className='wrapper' ref={ref}>
      <div className={`fullscreen ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div onClick={() => ready && setClicked(true)}>{!ready ?
          (
            <div className="scrambled">
              <Scramble />
            </div>
          )
          : 'click to continue'}</div>
      </div>
      <div className="footer">
        <div className="project">Matrix</div>
        <div className="controls">
          <div className="row">
            couch
            <Slider isOn={couch} toggleSwitch={setCouch} />
          </div>
          <div className="row">
            lights
            <Slider isOn={light} toggleSwitch={setLight} />
          </div>
          <div className="row">
            rotate
            <Slider isOn={rotate} toggleSwitch={setRotate} />
          </div>
          <div className="row">
            video
            <Slider isOn={video} toggleSwitch={setVideo} />
          </div>
          <div className="row">
            sound
            <Slider isOn={sound} toggleSwitch={setSound} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Overlay;
