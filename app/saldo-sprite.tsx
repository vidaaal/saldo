"use client";
import {useState} from "react";

/** Smooth, layered SVG character animation without external dependencies. */
export default function SaldoSprite(){
 const [playing,setPlaying]=useState(false);
 return <button type="button" className={"sprite-stage "+(playing?"sprite-celebrate":"")} onClick={()=>{setPlaying(v=>!v)}} aria-label="Animar mascote do saldo" title="Clique para ver o mascote comemorar">
  <span className="sprite-spark sprite-spark-a" aria-hidden="true">✦</span>
  <span className="sprite-spark sprite-spark-b" aria-hidden="true">✧</span>
  <span className="sprite-character" aria-hidden="true"><svg viewBox="0 0 80 82" width="92" height="95" shapeRendering="geometricPrecision">
   <path d="M20 16H61V20H69V27H73V59H69V67H61V71H20V67H12V59H8V27H12V20H20Z" fill="#111b15"/>
   <path d="M20 20H61V24H65V28H69V58H65V63H60V67H20V63H16V58H12V28H16V24H20Z" fill="#9ef5a0"/>
   <path d="M21 25H58V29H62V33H65V45H61V42H57V38H53V35H25V39H20V46H16V32H20Z" fill="#d9ffcb"/>
   <path d="M61 27H65V32H69V56H65V61H60V65H55V61H59V55H63V34H61Z" fill="#5cbf7e"/>
   <g className="sprite-eyes"><path d="M27 41H34V52H27ZM48 41H55V52H48Z" fill="#17291d"/></g>
   <path d="M20 55H25V58H20ZM57 55H62V58H57Z" fill="#68c77d"/>
   <g className="sprite-arm-left"><path d="M12 52H7V48H3V59H7V63H13Z" fill="#91e999" stroke="#111b15" strokeWidth="3"/></g><g className="sprite-arm-right"><path d="M69 52H74V48H78V59H74V63H68Z" fill="#91e999" stroke="#111b15" strokeWidth="3"/></g>
   <g className="sprite-feet"><path d="M23 69H34V79H23ZM47 69H58V79H47Z" fill="#14231a"/></g>
  </svg></span>
  <span className="sprite-caption">seu parceiro de bolso <span aria-hidden="true">↗</span></span>
 </button>
}
