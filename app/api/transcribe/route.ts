import {NextRequest,NextResponse} from "next/server";
export const runtime="nodejs";
export async function POST(request:NextRequest){try{
 const key=process.env.GROQ_API_KEY;
 if(!key)return NextResponse.json({error:"GROQ_API_KEY não configurada."},{status:503});
 const form=await request.formData();const file=form.get("audio");
 if(!(file instanceof File))return NextResponse.json({error:"Envie um arquivo de áudio."},{status:400});
 if(file.size>20*1024*1024)return NextResponse.json({error:"Áudio maior que 20 MB."},{status:413});
 if(file.size===0)return NextResponse.json({error:"Áudio vazio."},{status:400});
 const valid=/^(audio\/|video\/webm|application\/octet-stream)/.test(file.type);
 if(!valid)return NextResponse.json({error:"Formato de áudio não aceito."},{status:415});
 const data=new FormData();data.append("file",file,file.name||"audio.webm");data.append("model","whisper-large-v3-turbo");data.append("language","pt");data.append("response_format","json");
 const response=await fetch("https://api.groq.com/openai/v1/audio/transcriptions",{method:"POST",headers:{Authorization:"Bearer "+key},body:data,signal:AbortSignal.timeout(30000)});
 if(!response.ok)return NextResponse.json({error:"A Groq não conseguiu transcrever o áudio. Confira formato e limites."},{status:502});
 const result=await response.json();if(typeof result.text!=="string")return NextResponse.json({error:"Transcrição indisponível."},{status:502});
 return NextResponse.json({text:result.text.slice(0,4000)},{headers:{"Cache-Control":"no-store"}});
 }catch{return NextResponse.json({error:"Falha na transcrição. Tente novamente."},{status:500})}}
