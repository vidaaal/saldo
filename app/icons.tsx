import type {SVGProps} from "react";
export type IconName="overview"|"income"|"expense"|"bill"|"market"|"wish"|"backup"|"chevron"|"plus"|"spark";
const paths:Record<IconName,React.ReactNode>={
 overview:<><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></>,
 income:<><path d="M12 20V5m0 0-5 5m5-5 5 5"/><path d="M4 17v3h16v-3"/></>,
 expense:<><path d="M12 4v15m0 0-5-5m5 5 5-5"/><path d="M4 4v3m0-3h16v3"/></>,
 bill:<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
 market:<><path d="M4 9h16l-1.6 11H5.6L4 9Z"/><path d="m8 9 4-6 4 6M9 13v3m6-3v3"/></>,
 wish:<><path d="M20.3 8.7c0 4.2-8.3 10.5-8.3 10.5S3.7 12.9 3.7 8.7a4.6 4.6 0 0 1 8.3-2.8 4.6 4.6 0 0 1 8.3 2.8Z"/></>,
 backup:<><path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 17v3h16v-3"/></>,
 chevron:<path d="m9 5 7 7-7 7"/>,
 plus:<path d="M12 5v14M5 12h14"/>,
 spark:<><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/></>
};
export function AppIcon({name,size=20,...props}:{name:IconName;size?:number}&SVGProps<SVGSVGElement>){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>}
