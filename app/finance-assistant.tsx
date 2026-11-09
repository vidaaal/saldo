"use client";
import {useEffect,useRef,useState} from "react";
import {AppIcon} from "./icons";
import {ArrowUp,Download,Paperclip,Mic,Square} from "lucide-react";
import {exportFinanceCSV,exportFinanceExcel,printFinancePDF} from "./finance-exports";
import AssistantRichText from "./assistant-rich-text";
type Row={sheet:string;cells:Record<string,string>};
type Message={role:"user"|"assistant";text:string};
const prompts=[{title:"Esta compra cabe no mês?",detail:"Veja a margem que seus registros mostram",question:"Quanto resta nos meus registros depois dos gastos e faturas pendentes? O que devo considerar antes de uma nova compra?"},{title:"Quanto falta para um objetivo?",detail:"Compare o preço com o que já guardou",question:"Quanto falta para cada item da minha wishlist e qual deles parece mais próximo?"},{title:"Quais gastos pesam mais?",detail:"Confira as categorias com maior valor",question:"Quais categorias mais pesam nos meus gastos registrados? Mostre os valores e possíveis ajustes."},{title:"O que vem pela frente?",detail:"Veja as próximas faturas pendentes",question:"Quais faturas ainda estão pendentes e como posso me preparar para elas?"}];
export default function FinanceAssistant({rows}:{rows:Row[]}){const [messages,setMessages]=useState<Message[]>([]),[question,setQuestion]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState("");const scroll=useRef<HTMLDivElement>(null),composer=useRef<HTMLTextAreaElement>(null),abort=useRef<AbortController|null>(null),fileInput=useRef<HTMLInputElement>(null),recorder=useRef<MediaRecorder|null>(null),audioChunks=useRef<Blob[]>([]);const [recording,setRecording]=useState(false),[transcribing,setTranscribing]=useState(false);useEffect(()=>{if(messages.length>0)scroll.current?.scrollTo({top:scroll.current.scrollHeight,behavior:"smooth"})},[messages]);useEffect(()=>()=>{abort.current?.abort();if(recorder.current?.state==="recording")recorder.current.stop()},[]);
async function transcribe(file:File){setTranscribing(true);setError("");try{const form=new FormData();form.append("audio",file);const response=await fetch("/api/transcribe",{method:"POST",body:form});const result=await response.json();if(!response.ok)throw new Error(result.error||"Não foi possível transcrever.");setQuestion(v=>[v,result.text].filter(Boolean).join(" ").slice(0,1200));composer.current?.focus()}catch(e){setError(e instanceof Error?e.message:"Falha na transcrição.")}finally{setTranscribing(false)}}
async function toggleRecording(){if(recording){recorder.current?.stop();setRecording(false);return}try{if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==="undefined")throw new Error("Gravação não disponível neste navegador.");const stream=await navigator.mediaDevices.getUserMedia({audio:true});const media=new MediaRecorder(stream);audioChunks.current=[];recorder.current=media;media.ondataavailable=e=>{if(e.data.size)audioChunks.current.push(e.data)};media.onstop=()=>{stream.getTracks().forEach(t=>t.stop());const type=media.mimeType||"audio/webm";const blob=new Blob(audioChunks.current,{type});if(blob.size)void transcribe(new File([blob],type.includes("mp4")?"gravacao.m4a":type.includes("ogg")?"gravacao.ogg":"gravacao.webm",{type}))};media.start();setRecording(true)}catch(e){setError(e instanceof Error?e.message:"Não foi possível usar o microfone.");setRecording(false)}}
function exportFile(kind:"csv"|"excel"|"pdf"){try{if(kind==="csv")exportFinanceCSV(rows);else if(kind==="excel")exportFinanceExcel(rows);else printFinancePDF(rows)}catch(e){setError(e instanceof Error?e.message:"Falha ao gerar arquivo.")}}
async function ask(q:string){const value=q.trim();if(!value||busy)return;setMessages(v=>[...v,{role:"user",text:value},{role:"assistant",text:""}]);setQuestion("");setError("");setBusy(true);const controller=new AbortController();abort.current=controller;try{const response=await fetch("/api/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:value,rows}),signal:controller.signal});if(!response.ok){const data=await response.json().catch(()=>({}));throw new Error(data.error||"Não foi possível consultar a IA.")}if(!response.body)throw new Error("Resposta sem streaming.");const reader=response.body.getReader(),decoder=new TextDecoder();while(true){const {done,value:chunk}=await reader.read();if(done)break;const token=decoder.decode(chunk,{stream:true});if(token)setMessages(v=>v.map((m,i)=>i===v.length-1&&m.role==="assistant"?{...m,text:m.text+token}:m))}}catch(e){if(!controller.signal.aborted)setError(e instanceof Error?e.message:"Não foi possível responder.")}finally{setBusy(false);abort.current=null}}
return <section className="assistant-shell" aria-label="Assistente financeiro">
  <header className="assistant-page-head">
    <div><h1>Seu assistente financeiro</h1><p>Entenda suas finanças com clareza.</p></div>
    <details className="assistant-export">
      <summary><Download size={19} strokeWidth={1.7}/> Exportar registros</summary>
      <div className="assistant-export-menu">
        <button type="button" onClick={()=>exportFile("pdf")}>PDF</button>
        <button type="button" onClick={()=>exportFile("excel")}>Excel</button>
        <button type="button" onClick={()=>exportFile("csv")}>CSV</button>
      </div>
    </details>
  </header>
  <div className="assistant-conversation" ref={scroll} role="log" aria-label="Conversa com o saldo">
    <div className="assistant-thread">
      {messages.length===0?<div className="assistant-welcome">
        <span className="assistant-avatar"><AppIcon name="spark" size={20}/></span>
        <h2>O que você quer entender hoje?</h2>
        <p>Pergunte sobre seus gastos, faturas ou planos. Eu uso os registros que você adicionou ao saldo.</p>
      </div>:messages.map((m,i)=><article key={i} className={"assistant-message "+m.role}>
        {m.role==="assistant"?<div className="assistant-author"><span className="assistant-avatar"><AppIcon name="spark" size={19}/></span><strong>saldo.</strong></div>:null}
        <div className="assistant-message-body">{m.role==="assistant"?m.text?<><AssistantRichText text={m.text}/>{busy&&i===messages.length-1&&<span className="ai-v2-caret"/>}</>:<div className="ai-v2-thinking"><span/><span/><span/><small>Organizando a resposta...</small></div>:<p>{m.text}</p>}</div>
      </article>)}
      {error&&<div className="ai-v2-error" role="alert">{error}<button type="button" onClick={()=>setError("")}>Fechar</button></div>}
    </div>
  </div>
  <div className="assistant-dock">
    <div className="assistant-suggestions">{(messages.length?prompts.slice(0,2):prompts).map(p=><button type="button" key={p.title} onClick={()=>ask(p.question)} disabled={busy}><AppIcon name="spark" size={16}/><span>{p.title}</span></button>)}</div>
    <form className="assistant-compose" onSubmit={e=>{e.preventDefault();ask(question)}}>
      <textarea ref={composer} rows={1} value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ask(question)}}} maxLength={1200} placeholder="Pergunte sobre suas finanças..." aria-label="Sua pergunta"/>
      <input ref={fileInput} className="assistant-file-input" type="file" accept="audio/*,.webm,.m4a,.mp3,.wav,.ogg" onChange={e=>{const file=e.target.files?.[0];if(file)void transcribe(file);e.target.value=""}}/>
      <button type="button" className="assistant-icon-button" onClick={()=>fileInput.current?.click()} disabled={transcribing||recording} aria-label="Enviar arquivo de áudio" title="Enviar áudio"><Paperclip size={21} strokeWidth={1.8}/></button>
      <button type="button" className={"assistant-icon-button "+(recording?"is-recording":"")} onClick={toggleRecording} disabled={transcribing} aria-label={recording?"Parar gravação":"Gravar áudio"} title={recording?"Parar gravação":"Gravar áudio"}>{recording?<Square size={18} fill="currentColor"/>:<Mic size={21} strokeWidth={1.8}/>}</button>
      <span className="assistant-compose-divider" aria-hidden="true"/>
      <button type="submit" className="assistant-send" disabled={!question.trim()||busy} aria-label="Enviar mensagem"><ArrowUp size={23} strokeWidth={2}/></button>
    </form>
    <p className="assistant-caption"><span className="ai-v2-online"/>{transcribing?"Transcrevendo áudio…":recording?"Gravando áudio…":"Respostas baseadas nos seus registros, não no saldo bancário. Um resumo é enviado à Groq ao perguntar."}</p>
  </div>
</section>}
