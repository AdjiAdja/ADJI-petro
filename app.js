const $=s=>document.querySelector(s),still=matchMedia('(prefers-reduced-motion:reduce)').matches;$('#y').textContent=new Date().getFullYear();
/* reveal saat scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
function rv(){document.querySelectorAll('section .tag,section h2,section .sub,.srv>div,section .frame,.pc,.mail,.kontak .btn,.chips,.pill,.stp>div').forEach(el=>{if(el.dataset.r)return;el.dataset.r=1;el.classList.add('rv');
el.style.setProperty('--d',(el.matches('.srv>div,.pc,.stp>div')?[...el.parentNode.children].indexOf(el)*.08:0)+'s');io.observe(el)})}
/* hero: grid panah piksel yang menoleh ke kursor (ala OnRamp) */
(()=>{const c=$('#dots'),x=c.getContext('2d'),h=$('#top'),A=new Path2D('M-6 -1H1V-4L7 0L1 4V1H-6Z'),G=17,pal=[];
for(let i=0;i<=9;i++)pal.push('rgba('+(140+i*12)+','+(196+i*6)+',255,'+(i/9).toFixed(2)+')');
let W,H,d=1,t=0,px=null,py=0,vis=true,run=false;
function fit(){d=Math.min(devicePixelRatio||1,2);W=c.clientWidth;H=c.clientHeight;c.width=W*d;c.height=H*d}
function frame(){x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,W,H);if(!still)t+=.016;const R=190;
for(let j=0;j<H/G;j++){const Y=j*G+G/2,fy=Y/H,base=fy<.62?.22+fy*.7:Math.max(0,(1-fy)/.38)*.66;
for(let i=0;i<W/G;i++){const X=i*G+G/2;let a=-.785+Math.sin(t*1.4+i*.18+j*.11)*.3,s=.8,al=base*(.75+.25*Math.sin(t*1.7+i*.3-j*.2));
if(px!==null){const dx=px-X,dy=py-Y,dist=Math.hypot(dx,dy);if(dist<R){const k=1-dist/R,e=k*k*(3-2*k);let da=Math.atan2(dy,dx)-a;da=Math.atan2(Math.sin(da),Math.cos(da));a+=da*e;s+=e*.7;al+=e*.6}}
const q=Math.min(9,Math.round(al*9));if(q<=0)continue;
const c1=Math.cos(a)*s,s1=Math.sin(a)*s;x.setTransform(d*c1,d*s1,-d*s1,d*c1,d*X,d*Y);x.fillStyle=pal[q];x.fill(A)}}}
function go(){if(run)return;run=true;(function l(){frame();if(vis&&!still)requestAnimationFrame(l);else run=false})()}
fit();addEventListener('resize',()=>{fit();go()});
h.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();px=e.clientX-r.left;py=e.clientY-r.top});h.addEventListener('pointerleave',()=>px=null);
new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)go()}).observe(h);go()})();
/* marquee brand: logo + glyph */
(()=>{const chip='<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/></svg>';
const ico={ARDUINO:'<svg viewBox="0 0 24 24"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/><path d="M5.5 12h5M13.5 12h5M16 9.5v5"/></svg>',
'RASPBERRY PI':'<svg viewBox="0 0 24 24"><circle cx="9" cy="15" r="3.2"/><circle cx="15" cy="15" r="3.2"/><circle cx="12" cy="10.5" r="3.2"/><path d="M12 7c0-2 1-3 3-3M12 7c0-2-1-3-3-3"/></svg>',
MODBUS:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 12h5l5-6M12 12l5 6"/></svg>',
DOCKER:'<svg viewBox="0 0 24 24"><path d="M4 11h4v4H4zM9 11h4v4H9zM14 11h4v4h-4zM9 6h4v4H9z"/><path d="M2 16c2 4 8 5 14 3 3-1 5-3 6-6"/></svg>',
PYTHON:'<svg viewBox="0 0 24 24"><path d="M12 3H8a2 2 0 0 0-2 2v4h8v2H6a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h2v-3a2 2 0 0 1 2-2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="M12 21h4a2 2 0 0 0 2-2v-4"/></svg>'};
const n=['ARDUINO','ESP32','RASPBERRY PI','STM32','KICAD','ALTIUM','PYTHON','C++','MODBUS','MQTT','DOCKER'];const L=$('nav img').src;
const one=n.map((k,i)=>(i%4==0?'<span class="it"><img src="'+L+'" alt=""></span>':'')+'<span class="it">'+(ico[k]||chip)+k+'</span>').join('');$('#mq').innerHTML=one+one})();

/* data proyek + halaman detail (routing lewat #p-nama) */
const P=[
{id:'p-rack',k:'IoT',im:'assets/datacenter.jpg',t:'Rack Environment Monitoring',a:'Suhu rack dicek manual, sehingga kenaikan suhu sering baru diketahui setelah terlambat.',b:'Satu node ESP8266 per rack membaca suhu dan kelembapan, lalu mengirim data lewat MQTT. Skrip Python menerima data itu dan mengirim alert ke Telegram saat ambang terlewati.',tg:['ESP8266','DHT22','MQTT','Python'],f:['DHT22','ESP8266','MQTT','Python','Telegram'],s:[['Perangkat','Node ESP8266, satu per rack'],['Sensor','DHT22 (suhu, kelembapan)'],['Transport','MQTT lewat WiFi'],['Notifikasi','Bot Telegram']]},
{id:'p-power',k:'IoT',t:'3-Phase Power Monitoring',a:'Tidak ada tampilan langsung untuk beban listrik tiga fase.',b:'Tiga modul PZEM-004T dibaca lewat Modbus RTU oleh gateway ESP32, lalu datanya dikirim ke dashboard.',tg:['ESP32','PZEM-004T','Modbus RTU'],f:['PZEM x3','Modbus RTU','ESP32','Broker','Dashboard'],s:[['Pengukuran','Tegangan, arus, daya per fase'],['Sensor','PZEM-004T'],['Protokol lapangan','Modbus RTU'],['Gateway','ESP32']]},
{id:'p-arcade',k:'Embedded',t:'ESP Arcade',a:'Membuat game utuh di layar kecil dengan satu tombol.',b:'Empat game retro berjalan di ESP32-C3 dengan OLED SSD1306. Game loop, sprite, dan tabrakan ditulis sendiri dalam C++.',tg:['ESP32-C3','SSD1306','C++'],f:['Tombol','ESP32-C3','Game loop','OLED'],s:[['Mikrokontroler','ESP32-C3'],['Layar','OLED SSD1306'],['Input','Satu tombol'],['Bahasa','C++']]},
{id:'p-dcim',k:'Web',t:'DCIM Web Application',a:'Data rak, perangkat, dan kapasitas tersebar di banyak file terpisah.',b:'Aplikasi full-stack yang mengumpulkan semuanya di satu tempat, dibungkus Docker agar mudah dipasang.',tg:['Full-stack','Docker'],f:['Browser','API','Database','Docker'],s:[['Cakupan','Rak, perangkat, kapasitas'],['Arsitektur','Full-stack web'],['Deployment','Container Docker']]},
{id:'p-aqua',k:'IoT',im:'assets/aquaculture.jpg',t:'Digital Twin Aquaculture',a:'Kondisi kolam ikan air tawar sering dicek manual, padahal suhu, pH, dan oksigen terlarut bisa berubah dalam hitungan jam.',b:'Digital twin 3D untuk empat kolam terpal bulat (lele, nila, gurame, patin). Tiap kolam menampilkan suhu, pH, oksigen terlarut, amonia, dan kekeruhan dengan indikator status, lalu memberi rekomendasi setting dan kalkulator tebar. Saat ini masih prototipe dengan data simulasi.',tg:['Digital twin','3D','Prototipe'],f:['Sensor kolam','Data simulasi','Digital twin 3D','Rekomendasi'],s:[['Kolam','4 kolam terpal bulat'],['Spesies','Lele, nila, gurame, patin'],['Parameter','Suhu, pH, DO, amonia, kekeruhan'],['Status','Prototipe, data simulasi']]},
{id:'p-aero',k:'IoT',im:'assets/aerotwin.jpg',t:'AeroTwin HVAC Digital Twin',a:'Kondisi AC sulit dibaca dari luar: efisiensi, getaran kompresor, dan kebersihan filter baru terasa setelah ada masalah.',b:'Antarmuka digital twin 3D untuk beberapa tipe HVAC (wall split, 4-way cassette, CRAC data center, VRF duct). Telemetri dari node ESP32 lewat MQTT tampil sebagai termodinamika evaporator, arus dan daya, getaran, serta status filter, lengkap dengan mode X-ray dan partikel aliran udara.',tg:['ESP32','MQTT','3D','HVAC'],f:['Sensor','ESP32','MQTT','Digital twin 3D'],s:[['Tipe unit','Wall split, 4-way cassette, CRAC, VRF duct'],['Telemetri','Suhu, arus dan daya, getaran, filter'],['Transport','MQTT'],['Node','ESP32']]},
{id:'p-nexa',k:'Web',im:'assets/nexavault.jpg',t:'NexaVault Landing Page',a:'Produk DeFi yang rumit perlu halaman yang menjelaskan nilai dan angka kuncinya dalam hitungan detik.',b:'Landing page gelap berbahasa Indonesia untuk protokol DeFi: hero dengan ilustrasi isometrik, statistik TVL dan uptime, harga pasar langsung, serta bagian simulator dan aktivitas.',tg:['Landing page','UI/UX','Dark UI'],f:['Hero','Statistik','Pasar langsung','Simulator'],s:[['Jenis','Landing page'],['Bahasa','Indonesia'],['Bagian','Pasar, Fitur, Dashboard, Simulator, Aktivitas'],['Tema','Gelap']]}];
let cat='Semua';
function rp(){$('#pj').innerHTML=P.filter(p=>cat=='Semua'||p.k==cat).map(p=>'<a class="pc" href="#'+p.id+'">'+(p.im?'<img class="th" src="'+p.im+'" alt="Tangkapan layar '+p.t+'" loading="lazy">':'')+'<span class="no">'+String(P.indexOf(p)+1).padStart(2,'0')+' / '+p.k.toUpperCase()+'</span><h3>'+p.t+'</h3><p>'+p.a+'</p><div class="tg">'+p.tg.map(k=>'<span class="tag">'+k+'</span>').join('')+'</div><span class="go">LIHAT DETAIL ↗</span></a>').join('');rv()}
$('#ch').innerHTML=['Semua','IoT','Embedded','Web'].map(k=>'<button class="chip'+(k==cat?' on':'')+'" data-k="'+k+'">'+k+'</button>').join('');
$('#ch').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cat=b.dataset.k;document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c==b));rp()};
$('#pj').addEventListener('pointermove',e=>{const c=e.target.closest('.pc');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});
rp();
function flow(n){const w=116,g=40;let h='<svg viewBox="0 0 '+(n.length*(w+g)-g+4)+' 80">';n.forEach((k,i)=>{const X=i*(w+g)+2;if(i)h+='<line x1="'+(X-g)+'" y1="40" x2="'+X+'" y2="40"/>';h+='<rect x="'+X+'" y="18" width="'+w+'" height="44" rx="4"/><text x="'+(X+w/2)+'" y="44">'+k+'</text>'});return h+'</svg>'}
function route(){const h=location.hash.slice(1),i=P.findIndex(p=>p.id==h),H=$('#home'),D=$('#detail');
if(i<0){H.hidden=false;D.hidden=true;const e=h&&document.getElementById(h);if(e)e.scrollIntoView();return}
const p=P[i],nx=P[(i+1)%P.length];H.hidden=true;D.hidden=false;
$('#db').innerHTML='<a class="back" href="#proyek">← SEMUA PROYEK</a><h1>'+p.t+'</h1><div class="tg">'+p.tg.map(k=>'<span class="tag">'+k+'</span>').join('')+'</div>'
+(p.im?'<img class="hero-im" src="'+p.im+'" alt="Tangkapan layar '+p.t+'">':'')+'<div class="cols"><div><h3>Masalah</h3><p>'+p.a+'</p></div><div><h3>Solusi</h3><p>'+p.b+'</p></div></div><div class="flow">'+flow(p.f)+'</div>'
+(p.r?'<div class="cols" style="margin-top:0"><div><h3>Hasil</h3><p>'+p.r+'</p></div></div>':'')+'<div class="spec">'+p.s.map(r=>'<div><span>'+r[0]+'</span><b style="font-weight:500">'+r[1]+'</b></div>').join('')+'</div>'
+'<a class="btn w" href="#'+nx.id+'">Proyek berikutnya: '+nx.t+'</a>';scrollTo(0,0)}
addEventListener('hashchange',route);route();

rv();
/* scroll-spy navigasi */
(()=>{const L=[...document.querySelectorAll('nav ul a')];const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)L.forEach(a=>a.classList.toggle('act',a.getAttribute('href')=='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
L.forEach(a=>{const s=document.querySelector(a.getAttribute('href'));if(s)spy.observe(s)})})();
/* manifesto: objek voxel bercahaya */
try{(()=>{const R=THREE,cv=$('#vx'),s=$('#manifest'),sc=new R.Scene(),cam=new R.PerspectiveCamera(34,1,.1,60),rd=new R.WebGLRenderer({canvas:cv,antialias:true,alpha:true}),grp=new R.Group(),pal=[0x5b3df5,0x8a4dff,0xd05cff,0xff7a59,0xffb36b],ms=[];
cam.position.set(0,0,14);sc.add(grp);
function cube(x,y,z,z0,c){const g=new R.BoxGeometry(z0,z0,z0),m=new R.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:.5,roughness:.25,metalness:.35,transparent:true,opacity:.9}),b=new R.Mesh(g,m);b.position.set(x,y,z);
b.add(new R.LineSegments(new R.EdgesGeometry(g),new R.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.5})));grp.add(b);ms.push(m)}
cube(0,0,0,1,0x7a5cff);
[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].forEach((v,k)=>{for(let i=1;i<=3;i++)cube(v[0]*i*1.05,v[1]*i*1.05,v[2]*i*1.05,.86-i*.14,pal[(i+k)%5])});
[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0]].forEach((v,k)=>{for(let i=1;i<=2;i++)cube(v[0]*i*.8,v[1]*i*.8,0,.5-i*.1,pal[(i+k+2)%5])});
sc.add(new R.AmbientLight(0xffffff,.35));
[[0x8cc4ff,4,3,5],[0xff7a59,-4,-3,4],[0xb06cff,0,5,-3]].forEach(a=>{const l=new R.PointLight(a[0],2.2,30);l.position.set(a[1],a[2],a[3]);sc.add(l)});
const gc=document.createElement('canvas');gc.width=gc.height=128;const gx=gc.getContext('2d'),gr=gx.createRadialGradient(64,64,0,64,64,64);
gr.addColorStop(0,'rgba(170,120,255,.55)');gr.addColorStop(.4,'rgba(120,80,255,.2)');gr.addColorStop(1,'rgba(0,0,0,0)');gx.fillStyle=gr;gx.fillRect(0,0,128,128);
const sp=new R.Sprite(new R.SpriteMaterial({map:new R.CanvasTexture(gc),blending:R.AdditiveBlending,transparent:true,depthWrite:false}));sp.scale.set(14,14,1);sp.position.z=-3;sc.add(sp);
let tx=0,ty=0,vis=false,run=false,t=0;
function rs(){const w=cv.clientWidth,h=cv.clientHeight;rd.setPixelRatio(Math.min(devicePixelRatio||1,2));rd.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}rs();addEventListener('resize',rs);
s.addEventListener('pointermove',e=>{const r=s.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2});
function draw(){t+=.016;if(!still)grp.rotation.y+=.006;grp.rotation.x+=((.35+ty*.35)-grp.rotation.x)*.05;grp.rotation.z+=((-tx*.25)-grp.rotation.z)*.05;
sp.material.opacity=.8+Math.sin(t*1.5)*.2;ms.forEach((m,i)=>m.emissiveIntensity=.5+Math.sin(t*2+i*.6)*.18);rd.render(sc,cam)}
function go(){if(run)return;run=true;(function l(){draw();if(vis&&!still)requestAnimationFrame(l);else run=false})()}
new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)go()}).observe(s)})()}catch(e){}
/* suara 8-bit */
let AC;const bp=(f,d,ty)=>{try{AC=AC||new AudioContext();const o=AC.createOscillator(),g=AC.createGain();o.type=ty||'square';o.frequency.value=f;g.gain.value=.04;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+d);o.stop(AC.currentTime+d)}catch(e){}};
/* Lab: osiloskop */
(()=>{const o=$('#osc'),x=o.getContext('2d'),fr=$('#fr'),du=$('#du');let m='P',t=0;const bits=[0,1,0,0,0,0,0,1,0,1,1];
const set=k=>{m=k;$('#mP').classList.toggle('on',k=='P');$('#mU').classList.toggle('on',k=='U');du.disabled=k=='U'};$('#mP').onclick=()=>set('P');$('#mU').onclick=()=>set('U');set('P');
(function f(){const W=o.width,H=o.height;x.fillStyle='#050b17';x.fillRect(0,0,W,H);x.strokeStyle='#12243c';x.lineWidth=1;for(let i=0;i<=10;i++){x.beginPath();x.moveTo(i*W/10,0);x.lineTo(i*W/10,H);x.stroke()}for(let j=0;j<=4;j++){x.beginPath();x.moveTo(0,j*H/4);x.lineTo(W,j*H/4);x.stroke()}
const F=+fr.value;t+=F*.0025;x.strokeStyle='#8cc4ff';x.lineWidth=2.5;x.beginPath();
for(let i=0;i<=W;i++){const u=m=='P'?i/W*F/2+t:i/W*bits.length*.999+t*2,hi=m=='P'?(u%1)<du.value/100:bits[Math.floor(u)%bits.length],y=hi?45:H-45;i?x.lineTo(i,y):x.moveTo(i,y)}x.stroke();
$('#oi').textContent=m=='P'?F*100+' Hz · duty '+du.value+'%':'9600 baud · 8N1 · 0x41 "A"';if(!still)requestAnimationFrame(f)})()})();
/* Lab: tiga fase + Telegram */
(()=>{const c=$('#ph'),x=c.getContext('2d'),tg=$('#tgm'),st=$('#ps');let t=0,fault=false,amp=1;
function say(h,ok){const d=document.createElement('div');d.className='bub'+(ok?' ok':'');d.innerHTML='<small>ADJI Alert Bot</small>'+h+'<small>'+new Date().toTimeString().slice(0,5)+'</small>';tg.appendChild(d);tg.scrollTop=tg.scrollHeight;while(tg.children.length>7)tg.firstChild.remove()}
function sf(on){if(fault==on)return;fault=on;st.textContent=on?'GANGGUAN FASE S':'NORMAL';st.style.color=on?'#e5534b':'#3ecf8e';bp(on?160:880,.2);say(on?'⚠️ <b>ALERT</b> Tegangan fase S turun di bawah ambang. Cek panel utama.':'✅ Fase R, S, T kembali normal.',!on)}
$('#ft').onclick=()=>sf(true);$('#cl').onclick=()=>sf(false);say('Bot aktif. Memantau panel tiga fase.',true);
const col=['#e5534b','#f2cc60','#8cc4ff'];
(function f(){const W=c.width,H=c.height;x.fillStyle='#050b17';x.fillRect(0,0,W,H);amp+=((fault?.35:1)-amp)*.05;t+=.03;
col.forEach((cl,k)=>{x.strokeStyle=cl;x.lineWidth=2;x.beginPath();const a=(k==1?amp:1)*H*.4;for(let i=0;i<=W;i+=4){const y=H/2-Math.sin(i/W*Math.PI*4+t-k*2*Math.PI/3)*a;i?x.lineTo(i,y):x.moveTo(i,y)}x.stroke();x.fillStyle=cl;x.font='12px monospace';x.fillText('RST'[k],8,18+k*14)});
if(!still)requestAnimationFrame(f)})()})();
/* PCB 3D */
(()=>{const R=THREE,cv=$('#c3'),sc=new R.Scene(),cam=new R.PerspectiveCamera(38,1,.1,60),rd=new R.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
sc.add(new R.AmbientLight(0xffffff,.7));const dl=new R.DirectionalLight(0xffffff,.9);dl.position.set(3,7,4);sc.add(dl);
const M=(c,r=.6,m=0,o=1)=>new R.MeshStandardMaterial({color:c,roughness:r,metalness:m,transparent:o<1,opacity:o}),bx=(w,h,d,c,r,m,o)=>new R.Mesh(new R.BoxGeometry(w,h,d),M(c,r,m,o));
const root=new R.Group(),bot=bx(4.6,.03,4.4,0xb87333,.5,.6,.9),core=bx(4.6,.14,4.4,0x2a6b46,.7),top=bx(4.62,.02,4.42,0x1d5a38,.5,0,.8),parts=new R.Group();
const k=document.createElement('canvas');k.width=k.height=512;const q=k.getContext('2d');q.fillStyle=q.strokeStyle='#e8f1ff';q.lineWidth=3;q.strokeRect(8,8,496,496);q.font='bold 24px monospace';
[['ADJI project v1.0',30,40],['U1',140,260],['U5',255,270],['R1',470,150],['4056',40,420],['BAT+',20,215],['GND',420,470]].forEach(a=>q.fillText(a[0],a[1],a[2]));
const silk=new R.Mesh(new R.PlaneGeometry(4.6,4.4),new R.MeshBasicMaterial({map:new R.CanvasTexture(k),transparent:true}));silk.rotation.x=-Math.PI/2;
const ad=(m,x,y,z)=>{m.position.set(x,y,z);parts.add(m);return m};
function term(x,z,n,r){const g=new R.Group(),w=.42*n;g.add(bx(w,.34,.5,0x1f5fd6,.5));for(let i=0;i<n;i++){const s=new R.Mesh(new R.CylinderGeometry(.13,.13,.04,16),M(0xc9ced6,.3,.8));s.position.set(-w/2+.21+i*.42,.19,0);g.add(s)}ad(g,x,.17,z).rotation.y=r||0}
ad(bx(1.8,.12,1.1,0x151515),-1.0,.06,-1.4);ad(bx(.95,.1,.85,0xdcdcdc,.3,.7),-.65,.17,-1.4);ad(bx(.2,.1,.3,0xb0b0b0,.3,.8),-1.95,.17,-1.4);
const hs=ad(new R.Group(),-1.9,0,-1.95);hs.add(bx(.7,.12,.5,0xaaaaaa,.4,.7));for(let i=0;i<6;i++){const f=bx(.05,.45,.5,0xc4c4c4,.4,.7);f.position.set(-.3+i*.12,.28,0);hs.add(f)}
term(.5,-2.0,3);term(1.6,-2.0,3);term(2.05,-.7,3,Math.PI/2);term(-2.05,.4,3,Math.PI/2);term(-2.05,1.5,2,Math.PI/2);
term(-.6,1.95,4);term(.9,1.7,3);term(1.9,1.5,3);
ad(bx(1.0,.1,1.0,0x2b5fd0,.5),1.0,.1,-1.1);ad(bx(.55,.12,.35,0x333,.5,.6),1.0,.2,-1.55);
ad(bx(.7,.08,.8,0x2fa84f,.5),-.7,.08,.1);ad(bx(.8,.12,.7,0xb9b9b5,.3,.5),.3,.1,.1);
ad(bx(1.3,.1,.8,0x2d6cdf,.5),.6,.1,.9);ad(bx(.4,.25,.4,0x1a1a1a),.4,.22,.9);ad(bx(.25,.22,.25,0x2557c4),1.05,.2,.9);
ad(bx(.8,.08,1.0,0xd7262b,.5),-1.6,.08,1.0);ad(bx(.5,.14,.35,0xc9ced6,.3,.8),-1.6,.18,1.45);ad(bx(.35,.1,.3,0x161616),-1.6,.12,.7);
ad(new R.Mesh(new R.CylinderGeometry(.05,.05,.28,10),M(0xd2b48c)),1.7,.16,-.1).rotation.z=Math.PI/2;
root.add(bot,core,top,silk,parts);root.rotation.x=.55;sc.add(root);cam.position.set(0,4.4,7.2);cam.lookAt(0,0,0);
let ry=-.6,ex=0,drag=false,lx=0,vis=false,on=false;const sl=$('#ex');
function rs(){const w=cv.parentElement.clientWidth;rd.setPixelRatio(Math.min(devicePixelRatio||1,2));rd.setSize(w,430,false);cam.aspect=w/430;cam.updateProjectionMatrix()}rs();addEventListener('resize',rs);
cv.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;cv.setPointerCapture(e.pointerId)});cv.addEventListener('pointermove',e=>{if(drag){ry+=(e.clientX-lx)*.01;lx=e.clientX}});
['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,()=>drag=false));
function loop(){if(on)return;on=true;(function f(){if(!vis){on=false;return}if(!drag&&!still)ry+=.004;ex+=(sl.value/100-ex)*.12;root.rotation.y=ry;
bot.position.y=-.05-ex*.9;top.position.y=.08+ex*.5;silk.position.y=.1+ex*1.0;parts.position.y=.08+ex*1.8;rd.render(sc,cam);requestAnimationFrame(f)})()}
new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)loop()},{threshold:.1}).observe(cv)})();

/* Arcade platformer */
(()=>{const c=$('#game'),x=c.getContext('2d');x.imageSmoothingEnabled=false;
const T=16,VW=256,VH=144,LW=112,PW=10,PH=14,FL=106,pits=[[20,22],[46,49],[72,75]],pal={y:'#f2cc60',s:'#f0b88a',k:'#0a0a0a',b:'#4a6fa5',w:'#e8f1ff',r:'#e5534b',e:'#d9534f'};
const body=['..yyyyyy..','.yyyyyyyy.','.yyyyyyyy.','..ssssss..','..skssks..','..ssssss..','..bbbbbb..','.rbbbbbbr.','sbbbwwbbbs','sbbbbbbbbs','.bbbbbbbb.'],
legs={a:['..bb..bb..','..kk..kk..','..kk..kk..'],b:['...bbbb...','...kkkk...','...kkkk...'],j:['.bb....bb.','.kk....kk.','.kk....kk.']};
const EN=[['....eeee....','..eeeeeeee..','.eeeeeeeeee.','.ewweeeewwe.','.ewkeeeekwe.','eeeeeeeeeeee','.eeeeeeeeee.','..kk....kk..','.kk......kk.'],['....eeee....','..eeeeeeee..','.eeeeeeeeee.','.ewweeeewwe.','.ewkeeeekwe.','eeeeeeeeeeee','.eeeeeeeeee.','...kk..kk...','..kk....kk..']];
function spr(a,X,Y,fl){const w=a[0].length;a.forEach((r,j)=>{for(let i=0;i<w;i++){const ch=r[i];if(ch!='.'){x.fillStyle=pal[ch];x.fillRect(Math.round(X+(fl?w-1-i:i)),Math.round(Y+j),1,1)}}})}
const R=(col,a,b,w,h)=>{x.fillStyle=col;x.fillRect(Math.round(a),Math.round(b),w,h)};
let map,en,co,cam,p,lives,score,coins,st=0,vis=false,K={l:0,r:0,j:0},fr=0,pops=[];
function build(){map=Array.from({length:9},()=>Array(LW).fill(0));en=[];co=[];
for(let i=0;i<LW;i++)if(!pits.some(q=>i>=q[0]&&i<q[1]))map[7][i]=map[8][i]=1;
[[30,2],[56,3],[88,2]].forEach(([i,h])=>{for(let k=0;k<h;k++)for(let d=0;d<2;d++)map[6-k][i+d]=k==h-1?5:6});
const B=(r,c0,s)=>[...s].forEach((ch,i)=>map[r][c0+i]={B:2,'?':3}[ch]);
B(4,12,'B?B?B');B(3,38,'?');B(4,62,'BB?BB');B(2,64,'?');B(4,80,'?B?');B(3,94,'B');
for(let i=0;i<6;i++)for(let k=0;k<=i;k++)map[6-k][99+i]=1;
[14,26,36,52,66,82,92].forEach(c=>en.push({x:c*T,y:7*T-9,vx:-.35,d:0}));
const a=(c,r)=>co.push({x:c*T+4,y:r*T+4});[19.5,20.5,21.5].forEach((c,i)=>a(c,5-(i==1)));[45.5,46.5,47.5,48.5].forEach((c,i)=>a(c,5-(i%3?1:0)));[71.5,72.5,73.5,74.5].forEach((c,i)=>a(c,5-(i%3?1:0)));[40,41,42].forEach(c=>a(c,6));[9,10,11].forEach(c=>a(c,6));
p={x:24,y:7*T-PH,vx:0,vy:0,on:true,dir:1};cam=0}
function newGame(){lives=3;score=0;coins=0;build();st=1}
const sol=(px,py)=>{const c=Math.floor(px/T),r=Math.floor(py/T);if(c<0||c>=LW)return true;if(r<0||r>8)return false;return map[r][c]>0},
hit=(X,Y)=>sol(X,Y)||sol(X+PW-1,Y)||sol(X,Y+PH-1)||sol(X+PW-1,Y+PH-1);
function die(){bp(110,.3,'sawtooth');lives--;if(lives<=0){st=2;return}const l=lives,s=score,cn=coins;build();lives=l;score=s;coins=cn}
function jump(){if(st!=1){newGame();return}if(p.on){p.vy=-5.4;p.on=false;bp(520,.08)}}
function step(){fr++;const a=K.r-K.l;p.vx+=a*.2;if(!a)p.vx*=.8;p.vx=Math.max(-1.7,Math.min(1.7,p.vx));if(a)p.dir=a;
p.x+=p.vx;if(hit(p.x,p.y)){p.x-=p.vx;p.vx=0}
p.vy+=p.vy<0&&K.j?.24:.6;if(p.vy>7)p.vy=7;p.y+=p.vy;p.on=false;
if(hit(p.x,p.y)){if(p.vy>0){p.y=Math.floor((p.y+PH-1)/T)*T-PH;p.on=true}else{const r=Math.floor(p.y/T),c=Math.floor((p.x+PW/2)/T);
if(map[r]&&map[r][c]==3){map[r][c]=4;coins++;score+=100;bp(1180,.07);pops.push({x:c*T+4,y:r*T-4,t:20})}p.y=(r+1)*T}p.vy=p.vy>0?0:1}
if(p.y>VH+10){die();return}
en.forEach(e=>{if(e.d){e.d++;return}const nx=e.x+e.vx,fx=e.vx<0?nx:nx+12;if(sol(fx,e.y+4)||!sol(fx,e.y+14)&&e.y>100)e.vx*=-1;else e.x=nx;
if(p.x+PW>e.x&&p.x<e.x+12&&p.y+PH>e.y&&p.y<e.y+9){if(p.vy>0&&p.y+PH-e.y<9){e.d=1;p.vy=-3.5;score+=200;bp(300,.1)}else{die();return}}});en=en.filter(e=>e.d<15);
co=co.filter(k=>{if(p.x+PW>k.x&&p.x<k.x+8&&p.y+PH>k.y&&p.y<k.y+8){coins++;score+=50;bp(1180,.07);return false}return true});
pops.forEach(o=>{o.t--;o.y-=.8});pops=pops.filter(o=>o.t>0);
cam=Math.max(0,Math.min(LW*T-VW,p.x-96));if(p.x>FL*T){st=3;score+=500}}
function tile(id,X,Y,r,cc){if(id==1){R('#1f7a45',X,Y,T,T);R('#2c9a5a',X,Y,T,2);R('#175a33',X,Y+T-1,T,1);if(r==7){R('#f2cc60',X+6,Y+8,3,3);R('#3fae6c',X+1,Y+5,5,1)}else R('#2c9a5a',X+4,Y+6,8,1)}
else if(id==2){R('#c9803b',X,Y,T,T);R('#8a5420',X,Y+7,T,1);R('#8a5420',X+7,Y,1,7);R('#8a5420',X+3,Y+8,1,8);R('#8a5420',X+12,Y+8,1,8);R('#e0a35f',X,Y,T,1)}
else if(id==3||id==4){const u=id==4;R(u?'#4a3d26':'#f2cc60',X,Y,T,T);R(u?'#6b5a3a':'#ffe08a',X+1,Y+1,T-2,1);R(u?'#2e2616':'#b8860b',X,Y+T-1,T,1);if(!u){x.fillStyle='#8a5420';x.font='10px Silkscreen,monospace';x.fillText('?',X+5,Y+12)}}
else{const L=!map[r][cc-1]||map[r][cc-1]<5;R('#4a7fc0',X,Y,T,T);R('#8cc4ff',X+(L?2:T-5),Y,3,T);R('#2d5a96',X+(L?T-3:0),Y,3,T);if(id==5){R('#8cc4ff',X-1,Y,T+2,3);R('#2d5a96',X-1,Y+4,T+2,1)}}}
function draw(){R('#0b1a3a',0,0,W=VW,VH);for(let i=0;i<30;i++)R('#9fd0ff',(i*83-cam*.1)%VW+(i*83-cam*.1<0?VW:0),(i*37)%70,1,1);
for(let i=0;i<5;i++){const hx=((i*100-cam*.3)%500+500)%500-60;R('#0f2a57',hx,76,70,36);R('#12336a',hx+6,70,58,6);for(let k=0;k<5;k++)R('#0b1a3a',hx+4+k*13,112-22,2,22)}
const c0=Math.floor(cam/T);for(let r=0;r<9;r++)for(let cc=c0;cc<=c0+17&&cc<LW;cc++){const id=map[r][cc];if(id)tile(id,cc*T-cam,r*T,r,cc)}
co.forEach(k=>{const w=Math.max(2,Math.abs(Math.cos(fr/8+k.x/20))*8);x.fillStyle='#f2cc60';x.beginPath();x.ellipse(k.x-cam+4,k.y+4,w/2,4,0,0,7);x.fill()});
R('#e8f1ff',FL*T-cam,3*T,2,4*T);R('#779ecf',FL*T-cam+2,3*T,14,9);R('#06142f',FL*T-cam+5,3*T+2,2,5);
en.forEach(e=>{if(e.d)R('#d9534f',e.x-cam,e.y+6,12,3);else spr(EN[(fr>>4)&1],e.x-cam,e.y)});
spr(body.concat(!p.on?legs.j:Math.abs(p.vx)>.3?legs[(fr>>3)&1?'a':'b']:legs.b),p.x-cam,p.y,p.dir<0);
x.font='8px Silkscreen,monospace';x.fillStyle='#e8f1ff';x.textAlign='left';x.fillText('SCORE '+String(score||0).padStart(5,'0'),6,11);x.fillText('COIN x'+(coins||0),96,11);x.fillText('LIFE '+'♥'.repeat(Math.max(lives||0,0)),156,11);x.textAlign='right';x.fillText('1-1',VW-6,11);
pops.forEach(o=>{x.fillStyle='#f2cc60';x.textAlign='left';x.fillText('+100',o.x-cam-6,o.y)});
if(st!=1){R('rgba(5,11,23,.82)',36,42,184,40);x.fillStyle='#e8f1ff';x.textAlign='center';x.fillText(st==0?'ESP ARCADE  1-1':st==2?'GAME OVER':'STAGE CLEAR!',128,57);x.fillStyle='#8cc4ff';x.fillText(st==3?'TAP UNTUK MAIN LAGI':'TAP / SPASI UNTUK MULAI',128,71)}}
const kk={ArrowLeft:'l',KeyA:'l',ArrowRight:'r',KeyD:'r',Space:'j',ArrowUp:'j',KeyW:'j'};
addEventListener('keydown',e=>{const k=kk[e.code];if(!k||!vis)return;e.preventDefault();if(k=='j'&&!K.j)jump();K[k]=1});addEventListener('keyup',e=>{const k=kk[e.code];if(k)K[k]=0});
c.addEventListener('pointerdown',e=>{if(st!=1){e.preventDefault();newGame()}});
document.querySelectorAll('.pad button').forEach(b=>{const k=b.dataset.k;b.addEventListener('pointerdown',e=>{e.preventDefault();if(k=='j')jump();K[k]=1});['pointerup','pointerleave','pointercancel'].forEach(t=>b.addEventListener(t,()=>K[k]=0))});
new IntersectionObserver(e=>vis=e[0].isIntersecting,{threshold:.4}).observe(c);
build();st=0;setInterval(()=>{if(!vis)return;if(st==1)step();draw()},16)})();