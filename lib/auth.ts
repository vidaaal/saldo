import "server-only";
import {createHmac,timingSafeEqual} from "node:crypto";
import {cookies} from "next/headers";
const cookieName="saldo_session";
function secret(){const v=process.env.SALDO_SESSION_SECRET;if(!v||v.length<32)throw Error("SALDO_SESSION_SECRET ausente ou muito curta");return v}
function sign(value:string){return createHmac("sha256",secret()).update(value).digest("hex")}
export function checkPassword(candidate:string){const expected=process.env.SALDO_PASSWORD;if(!expected||expected.length<16)throw Error("Configure SALDO_PASSWORD com pelo menos 16 caracteres");const a=createHmac("sha256",secret()).update(candidate).digest();const b=createHmac("sha256",secret()).update(expected).digest();return timingSafeEqual(a,b)}
export function createSession(){const expiry=Date.now()+12*60*60*1000;const payload=String(expiry);return payload+"."+sign(payload)}
export async function isAuthenticated(){try{const token=(await cookies()).get(cookieName)?.value||"";const [expiry,signature]=token.split(".");if(!expiry||!signature||!/^\d+$/.test(expiry)||Number(expiry)<Date.now()||Number(expiry)>Date.now()+13*60*60*1000)return false;const a=Buffer.from(signature,"hex");const b=Buffer.from(sign(expiry),"hex");return a.length===b.length&&timingSafeEqual(a,b)}catch{return false}}
export const sessionCookie=cookieName;
