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

const DualSelect = ({ track, setTrack }) => {
  const trackToSet = track === 'main' ? 'secondary' : 'main';

  const className1 = `select ${track === 'main' ? 'active' : ''}`;
  const className2 = `select ${track === 'secondary' ? 'active' : ''}`;
  console.log({ track, className1, className2 });
  return (
    <div className="dual-select" onClick={() => setTrack(trackToSet)}>
      <div className={className1}>_01</div>
      <div className={className2}>_02</div>
    </div>
  )
}

const Overlay = forwardRef((store, ref) => {

  const {
    clicked,
    setClicked,
    ready,
    light,
    setLight,
    couch,
    setCouch,
    rotate,
    setRotate,
    videoOn,
    setVideoOn,
    sound,
    setSound,
    track,
    setTrack
  } = store

  return (
    <div className='overlay' ref={ref}>
      <div className={`fullscreen ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div onClick={() => ready && setClicked(true)}>{
          !ready ?
            (
              <div className="scrambled">
                <Scramble />
              </div>
            )
            :
            <div className="enter">
              ENTER
            </div>

        }</div>
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
            <Slider isOn={videoOn} toggleSwitch={setVideoOn} />
          </div>
          <div className="row">
            <DualSelect track={track} setTrack={setTrack} />
            <Slider isOn={sound} toggleSwitch={setSound} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Overlay;
