const API_ENDPOINT='https://sakithati.bond/v1/chat/completions';
const API_KEY='elf-live-0f00da3f6da781df2a3887ca935d8407';
const MODEL='elf/qwen3.8-flash';
function extract(t){if(!t)return null;const s=t.indexOf('[');const e=t.lastIndexOf(']');if(s<0||e<0)return null;try{return JSON.parse(t.slice(s,e+1))}catch{return null}}
async function one(){
  for(let a=0;a<4;a++){try{
    const ctl=new AbortController();const to=setTimeout(()=>ctl.abort(),60000);
    const r=await fetch(API_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${API_KEY}`,'Accept':'application/json'},
      body:JSON.stringify({model:MODEL,messages:[{role:'user',content:`Buat 10 soal pilihan ganda pajak Indonesia. Output HANYA JSON array: [{"question":"...","options":["A","B","C","D"],"answerIndex":0,"explanation":"..."}] Session:${Date.now()}_${Math.floor(Math.random()*100000)}`}],temperature:1.0,max_tokens:2500,top_p:0.95}),
      signal:ctl.signal});
    clearTimeout(to);
    const d=await r.json();const m=d.choices?d.choices[0].message:null;
    const arr=extract(m.content)||extract(m.reasoning_content||'');
    if(arr&&arr.length>=10)return arr.map(x=>x.question);
  }catch(e){await new Promise(r=>setTimeout(r,2000));}}
  return null;
}
const runs=[];
for(let i=1;i<=3;i++){const q=await one();if(q){runs.push(q);console.log(`RUN ${i}: API OK - ${q.length} q | Q1: ${q[0].slice(0,50)}`);}else console.log(`RUN ${i}: FALLBACK/empty`);}
const o=(a,b)=>a.filter(x=>b.includes(x)).length;
if(runs.length>=2){const ov=runs.slice(1).map((r,i)=>o(runs[0],r));console.log(`\n=== OVERLAP RUN1 vs others: ${ov.join(', ')} (of 10) ===`);console.log(ov.every(x=>x===0)?'✅ LIVE API generates FRESH random questions each call':'⚠️ overlap');}
else console.log('⚠️ could not get 2 clean API runs (endpoint flaky)');
