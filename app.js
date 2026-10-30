const $=s=>document.querySelector(s);
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button,.tab').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#'+b.dataset.t).classList.add('on')});
// SEA
const AT=[["Malé (Kaafu)",4.175,73.509],["Haa Alif",6.95,72.95],["Raa",5.6,72.95],["Baa",5.15,73.0],["Lhaviyani",5.35,73.55],["Thaa",2.35,73.1],["Laamu",1.95,73.4],["Huvadhu (Gaafu)",0.5,73.3],["Fuvahmulah",-0.29,73.42],["Addu",-0.63,73.16]];
AT.forEach((a,i)=>$('#atoll').add(new Option(a[0],i)));$('#atoll').value=localStorage.at||0;
const dir=d=>['N','NE','E','SE','S','SW','W','NW'][Math.round(d/45)%8];
async function wx(){const[a,la,lo]=AT[$('#atoll').value];localStorage.at=$('#atoll').value;$('#wx').innerHTML='<p>Loading…</p>';
 try{const[w,m]=await Promise.all([fetch(`https://api.open-meteo.com/v1/forecast?latitude=${la}&longitude=${lo}&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation&daily=sunrise,sunset&wind_speed_unit=kn&timezone=Indian%2FMaldives`).then(r=>r.json()),fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${la}&longitude=${lo}&current=wave_height,wave_direction,wave_period,swell_wave_height,sea_surface_temperature&timezone=Indian%2FMaldives`).then(r=>r.json())]);
 const c=w.current,s=m.current||{},t=x=>x.slice(11,16),ws=c.wind_speed_10m,wh=s.wave_height??0;
 const lvl=ws>=22||wh>=2.5?['🔴 Rough — think twice','#8a1c1c']:ws>=15||wh>=1.5?['🟠 Moderate — take care','#8a5a00']:['🟢 Fairly calm','#11633f'];
 $('#wx').innerHTML=`<div style="grid-column:1/-1;background:${lvl[1]}"><b>${lvl[0]}</b>Simple guide from wind &amp; waves, not an official warning</div>
 <div>Wind<b>${ws} kn</b>${dir(c.wind_direction_10m)} · gusts ${c.wind_gusts_10m} kn</div><div>Waves<b>${s.wave_height??'–'} m</b>period ${s.wave_period??'–'} s</div><div>Swell<b>${s.swell_wave_height??'–'} m</b>from ${s.wave_direction!=null?dir(s.wave_direction):'–'}</div><div>Sea temp<b>${s.sea_surface_temperature??'–'}°C</b>air ${c.temperature_2m}°C</div><div>Sunrise<b>${t(w.daily.sunrise[0])}</b>Sunset ${t(w.daily.sunset[0])}</div><div>Rain now<b>${c.precipitation} mm</b>updated ${t(c.time)}</div>`}
 catch(e){$('#wx').innerHTML='<p>Could not load live weather (offline?). Showing last saved data if any.</p>'}}
$('#atoll').onchange=wx;wx();
(function(){const p=((Date.now()/864e5-10957.25+5/24-5.6)%29.530588)/29.530588;const n=['🌑 New moon','🌒 Waxing crescent','🌓 First quarter','🌔 Waxing gibbous','🌕 Full moon','🌖 Waning gibbous','🌗 Last quarter','🌘 Waning crescent'][Math.round(p*8)%8];
$('#moon').innerHTML=`<b style="font-size:1.4rem">${n}</b><br>Day ${Math.floor(p*29.53)+1} of the lunar cycle (approx.). Dark nights near the new moon are often used for night handline and squid fishing; bright full moons light up the water.`})();
// ASK
const KB=[[/skipjack|kalhubila|godha/,"Skipjack (kalhubilamas) is caught by Maldivian pole-and-line: live bait (small reef fish like sprats/silver sprats) is thrown and water sprayed to keep the school near the boat. Look for birds working the surface."],
[/yellowfin|kanneli/,"Yellowfin tuna (kanneli) are caught by pole-and-line when young and by handline when larger, often near FADs (fish aggregating devices) and offshore. Use strong line and keep the catch iced quickly for quality."],
[/bait|ehi|live/,"Live bait for pole-and-line is usually small schooling fish caught on the reef or lagoon at dawn/night with fine nets, then kept alive in the boat's bait tank with flowing seawater. Don't overcrowd the tank."],
[/knot|tie|hook/,"Common knots: improved clinch knot (hook to line), palomar (strong, simple for braid), and uni knot (joining lines). Wet the line before pulling tight so it doesn't burn."],
[/ice|fresh|quality|keep/,"Bleed and ice fish as soon as possible, ideally in an ice-and-seawater slurry. Keep tuna out of the sun — heat quickly lowers quality and price."],
[/weather|wind|wave|storm|monsoon|hulhangu|iruvai/,"Maldives has two monsoons: Iruvai (north-east, roughly Dec–Apr, drier) and Hulhangu (south-west, roughly May–Nov, wetter and rougher). Check the Sea tab for live wind/waves and the Maldives Meteorological Service for warnings."],
[/knot speed|kn|beaufort/,"Wind in knots: under 10 kn light, 11–16 moderate, 17–21 fresh, 22–27 strong, 28+ near gale. Gusts can be much stronger than the average."],
[/safe|emergency|sos|sink|coast|help|191/,"In an emergency at sea call the Coast Guard on 191. Give your boat name, position (GPS), number of people and the problem. Wear life jackets and stay with the boat. See the Safety tab."],
[/fad|aggregat|raft/,"FADs (fish aggregating devices) are anchored floats that attract tuna. Ask your island fishing community or the fisheries ministry for current FAD locations."],
[/reef|grouper|snapper|faana|handline/,"Reef fish such as groupers (faana) and snappers are caught by handline near reef edges, often at dusk and night. Some species and areas are protected — check fisheries rules before keeping fish."],
[/shark|turtle|protect|ban|law/,"Sharks and turtles are protected in the Maldives — do not catch or keep them. If one is hooked, cut the line close to the hook and release it. Check the Ministry of Fisheries for current rules."],
[/moon|tide/,"The Sea tab shows today's moon phase. Spring tides (stronger currents) happen near new and full moon; neap tides near the quarters."],
[/price|cost|fuel|money|mvr/,"Use the Cost tab to work out fuel, ice and bait costs versus expected catch value in MVR. Enter today's real fuel and fish prices."],
[/hi|hello|assalaam|salaam/,"Assalaamu alaikum! Ask me about bait, skipjack, yellowfin, knots, weather, safety, ice or protected species."]];
const say=(t,c)=>{const d=document.createElement('div');d.className='m '+c;d.textContent=t;$('#chat').append(d);$('#chat').scrollTop=1e9};
say("Hi! I'm a simple offline helper (not AI). Ask about bait, tuna, knots, weather, ice, safety or protected species.","b");
const ask=q=>{say(q,'u');const h=KB.find(k=>k[0].test(q.toLowerCase()));setTimeout(()=>say(h?h[1]:"Sorry, I don't know that one yet. Try: bait, skipjack, yellowfin, knot, weather, ice, safety, shark, FAD, cost.","b"),250)};
$('#askf').onsubmit=e=>{e.preventDefault();const q=$('#q').value.trim();if(q)ask(q);$('#q').value=''};
["Best bait for skipjack?","Which knot for hooks?","Is the sea safe?","Can I keep sharks?","How to keep fish fresh?"].forEach(t=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>ask(t);$('#chips').append(b)});
// LOG
let L=JSON.parse(localStorage.log||'[]');$('#ld').valueAsDate=new Date();
const rl=()=>{localStorage.log=JSON.stringify(L);$('#logl').innerHTML=L.map((x,i)=>`<li><span>${x.d} · <b>${x.f}</b> ${x.k} kg ${x.p?'· '+x.p:''}</span><button data-i="${i}">✕</button></li>`).join('')||'<li>No catches yet.</li>';
 const t=L.reduce((a,x)=>a+ +x.k,0);$('#tot').innerHTML=`Total: <b>${t.toFixed(1)} kg</b> in ${L.length} entries`;
 $('#logl').querySelectorAll('button').forEach(b=>b.onclick=()=>{L.splice(b.dataset.i,1);rl()})};
const esc=s=>s.replace(/[<>&"]/g,c=>'&#'+c.charCodeAt(0)+';');
$('#logf').onsubmit=e=>{e.preventDefault();L.unshift({f:esc($('#lf').value),k:$('#lk').value,p:esc($('#lp').value),d:$('#ld').value});$('#lf').value=$('#lk').value=$('#lp').value='';rl()};rl();
$('#exp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['date,fish,kg,place\n'+L.map(x=>[x.d,x.f,x.k,x.p].join(',')).join('\n')]));a.download='catch-log.csv';a.click()};
// FISH
[["🐟","Skipjack tuna","Kalhubilamas","Main Maldivian catch. Dark stripes on belly. Pole-and-line."],["🐠","Yellowfin tuna","Kanneli","Yellow fins and finlets; large adults. Pole-and-line & handline."],["🐟","Bigeye tuna","","Looks like yellowfin, larger eye, deeper water."],["🐡","Frigate / little tuna","","Smaller tunas often mixed with skipjack schools."],["🐠","Wahoo","","Long, fast, sharp teeth. Trolling."],["🐟","Dolphinfish (mahi-mahi)","","Bright green-gold, often under floating objects."],["🐠","Groupers","Faana","Reef fish, handline at reef edges."],["🐟","Red snapper","","Reef/deep handline, often at night."],["🦈","Sharks","Miyaru","PROTECTED in the Maldives — release."],["🐢","Turtles","Velaa","PROTECTED — never catch or keep."]].forEach(f=>$('#fishl').insertAdjacentHTML('beforeend',`<div class="fish"><div class="ic">${f[0]}</div><h4>${f[1]}</h4><span class="dv">${f[2]}</span><p>${f[3]}</p></div>`));
// COST
const cc=()=>{const v=i=>+$('#c'+i).value||0,cost=v(1)*v(2)+v(3)+v(4),inc=v(5)*v(6),p=inc-cost;$('#cres').innerHTML=`Trip cost: <b>MVR ${cost.toLocaleString()}</b><br>Catch value: <b>MVR ${inc.toLocaleString()}</b><br>${p>=0?'✅ Profit':'⚠️ Loss'}: <b>MVR ${p.toLocaleString()}</b><br>Break-even catch: <b>${v(6)?Math.ceil(cost/v(6)):'–'} kg</b>`};
document.querySelectorAll('#cost input').forEach(i=>i.oninput=cc);cc();
// SAFETY
const CK=["Life jackets for everyone","Enough fuel + 20% spare","Drinking water & food","Phone charged, in waterproof bag","VHF radio / GPS working","Told someone on land your plan & return time","Checked wind & wave forecast","First aid kit","Torch & spare batteries","Anchor & rope","Engine checked, spare plugs & tools","Bucket / bilge pump"];
let C=JSON.parse(localStorage.ck||'{}');const rc=()=>{$('#chk').innerHTML=CK.map((t,i)=>`<li><label><input type="checkbox" data-i="${i}" ${C[i]?'checked':''}>${t}</label></li>`).join('');$('#chk').querySelectorAll('input').forEach(x=>x.onchange=()=>{C[x.dataset.i]=x.checked;localStorage.ck=JSON.stringify(C)})};
rc();$('#rst').onclick=()=>{C={};localStorage.ck='{}';rc()};
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
