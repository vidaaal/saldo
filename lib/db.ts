import "server-only";
import {Pool} from "pg";
let pool:Pool|undefined;
function db(){if(!process.env.DATABASE_URL)throw Error("DATABASE_URL não configurada");if(!pool)pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.NODE_ENV==="production"?{rejectUnauthorized:true}:undefined,max:3});return pool}
export async function loadData(){const p=db();await p.query("CREATE TABLE IF NOT EXISTS saldo_state (id integer PRIMARY KEY CHECK (id = 1), data jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())");const r=await p.query("SELECT data FROM saldo_state WHERE id=1");return r.rows[0]?.data??null}
export async function saveData(data:unknown){const p=db();await p.query("CREATE TABLE IF NOT EXISTS saldo_state (id integer PRIMARY KEY CHECK (id = 1), data jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())");await p.query("INSERT INTO saldo_state (id,data) VALUES (1,$1::jsonb) ON CONFLICT (id) DO UPDATE SET data=EXCLUDED.data, updated_at=now()",[JSON.stringify(data)])}
