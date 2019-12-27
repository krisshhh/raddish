import React from 'react';

export default function TimelineEvent({ event }) {
  const { time, name } = event;
  const displayTime = `${time.getHours()}:${time.getMinutes()}`;
  return (
    <div className="timeline-event">
        <span className="tag">{ displayTime }</span>
        <div className="timeline-element-icon"></div>
        <label>{ name }</label>
    </div>
  )
}