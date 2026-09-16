const API_ENDPOINT='https://sakithati.bond/v1/chat/completions';
const API_KEY='elf-live-0f00da3f6da781df2a3887ca935d8407';
function extract(t){if(!t)return null;const s=t.indexOf('[');const e=t.lastIndexOf(']');if(s<0||e<0)return null;try{return JSON.parse(t.slice(s,e+1))}catch{return null}}
async function tryModel(mdl){
  for(let a=0;a<4;a++){try{
    const ctl=new AbortController();const to=setTimeout(()=>ctl.abort(),45000);
    const r=await fetch(API_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${API_KEY}`,'Accept':'application/json'},
      body:JSON.stringify({model:mdl,messages:[{role:'user',content:`Buat 10 soal pilihan ganda pajak Indonesia. Output HANYA JSON array: [{"question":"...","options":["A","B","C","D"],"answerIndex":0,"explanation":"..."}] Session ${Date.now()}_${Math.floor(Math.random()*1e5)}`}],temperature:1.0,max_tokens:2500,top_p:0.95}),
      signal:ctl.signal});
    clearTimeout(to);
    const d=await r.json();const m=d.choices?d.choices[0].message:null;
    if(!m)return null;const arr=extract(m.content)||extract(m.reasoning_content||'');
    if(arr&&arr.length>=10)return arr.map(x=>x.question);
  }catch(e){await new Promise(r=>setTimeout(r,1500));}}
  return null;
}
for(const m of ['elf/mimo-v2.5','elf/muse-spark-1.3-contributor','elf/solar-pro4']){
  let ok=0,fail=0;const ex=[];
  for(let i=0;i<4;i++){const q=await tryModel(m);if(q){ok++;if(ex.length<2)ex.push(q[0].slice(0,38));}else fail++;}
  console.log(m.padEnd(34),`=> OK ${ok}/4, FAIL ${fail}/4 | ${ex.join(' | ')}`);
}
