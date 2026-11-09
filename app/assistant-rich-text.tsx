import type {ReactNode} from "react";

function inline(value:string):ReactNode[] {
  return value.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part,index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2,-2)}</strong>
      : part.startsWith("`") && part.endsWith("`")
        ? <code key={index}>{part.slice(1,-1)}</code>
        : part
  );
}

function cells(line:string):string[] {
  return line.trim().replace(/^\|/,"").replace(/\|$/,"").split(/(?<!\\)\|/).map(cell => cell.trim().replace(/\\\|/g,"|"));
}

function isDivider(line:string,columns:number):boolean {
  const parts=cells(line);
  return parts.length===columns && parts.every(part => /^:?-{3,}:?$/.test(part.replace(/\s/g,"")));
}

export default function AssistantRichText({text}:{text:string}) {
  const lines=text.replace(/\r/g,"").split("\n");
  const blocks:ReactNode[]=[];
  for(let i=0;i<lines.length;i++) {
    const line=lines[i].trim();
    if(!line) continue;
    const total=line.match(/^>\s*Total previsto:\s*(.+)$/i);
    if(total) {blocks.push(<div className="assistant-financial-total" key={i}><span>Total previsto</span><strong>{inline(total[1])}</strong></div>);continue}
    const header=cells(line);
    if(line.includes("|") && i+1<lines.length && isDivider(lines[i+1],header.length)) {
      const rows:string[][]=[];
      i++;
      while(i+1<lines.length && lines[i+1].trim().includes("|") && lines[i+1].trim()) {
        rows.push(cells(lines[++i]));
      }
      blocks.push(<div className="ai-table-scroll" key={i} role="region" aria-label="Tabela da resposta" tabIndex={0}><table className="ai-response-table"><thead><tr>{header.map((cell,index)=><th scope="col" key={index}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.map((row,rowIndex)=><tr key={rowIndex}>{header.map((_,index)=><td key={index}>{inline(row[index]||"")}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    const heading=line.match(/^(#{1,4})\s+(.+)$/);
    if(heading) {blocks.push(<h3 className="ai-response-heading" key={i}>{inline(heading[2])}</h3>);continue}
    const bullet=line.match(/^[-*•]\s+(.+)$/);
    const numbered=line.match(/^(\d+)[.)]\s+(.+)$/);
    if(bullet||numbered) {blocks.push(<div className="ai-bullet" key={i}><span>{numbered?numbered[1]+".":"•"}</span><span>{inline((bullet||numbered)![1])}</span></div>);continue}
    blocks.push(<p key={i}>{inline(lines[i])}</p>);
  }
  return <div className="ai-rich-text">{blocks}</div>;
}
