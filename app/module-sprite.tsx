"use client";
import {AppIcon,type IconName} from "./icons";
type Variant="income"|"expense"|"bill"|"market"|"wish"|"backup";
const config:Record<Variant,{icon:IconName;title:string;description:string}>={
income:{icon:"income",title:"Cada entrada conta",description:"Registre o que chegou e acompanhe sua evolução."},
expense:{icon:"expense",title:"No controle",description:"Um lançamento de cada vez, sem perder o ritmo."},
bill:{icon:"bill",title:"Tudo no prazo",description:"Organize seus próximos vencimentos."},
market:{icon:"market",title:"Cesta organizada",description:"Monte sua lista com o que realmente precisa."},
wish:{icon:"wish",title:"Seus próximos planos",description:"Todo desejo começa com um primeiro passo."},
backup:{icon:"backup",title:"Tudo guardado",description:"Leve uma cópia dos seus dados com você."}
};
export default function ModuleSprite({variant}:{variant:Variant}){
const c=config[variant];return <div className={"module-sprite module-sprite-"+variant}><div className="module-sprite-art" aria-hidden="true"><span className="module-sprite-orbit orbit-a"/><span className="module-sprite-orbit orbit-b"/><span className="module-sprite-main"><AppIcon name={c.icon} size={36}/></span><span className="module-sprite-star star-a">✦</span><span className="module-sprite-star star-b">✧</span></div><div className="module-sprite-copy"><strong>{c.title}</strong><span>{c.description}</span></div></div>
}
