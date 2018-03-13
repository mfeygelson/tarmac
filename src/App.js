import React from 'react';
import sampleData from "./sampleData"
import renderJobs from "./renderJobs"
import "./App.css"

export default () => {
  const rendered = renderJobs(sampleData)
  return (
    <svg>
    <rect width="100%" height="100%" fill="lightBlue"/>
    {rendered.boxes.map((box, i) => link(box, (
      <svg key={i} overflow="visible" x={box.x} y={box.y} width={box.width} height={box.height}>
      {box.active && <rect className="animated" width="100%" height="100%" rx="10" ry="10" fill="gold"/>}
      <rect width="100%" height="100%" rx="10" ry="10" fill={box.color}/>
      <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle" fill="#eeeeee">{box.name}</text>
      </svg>
    )))}
    {rendered.arrows.map(({from, to}, i) =>
      <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#999999"/>
    )}
    </svg>
  )
}

function link({href}, h) {
  if (href) {
    return <a href={href}>{h}</a>
  }
  return h
}
