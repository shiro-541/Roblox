(function(){
document.documentElement.classList.add("js");
var KEY="rbx-done",store={},B=document.body,RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
try{store=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){}
var fav={};try{fav=JSON.parse(localStorage.getItem("rbx-fav")||"{}")}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}}
function $(s,r){return(r||document).querySelector(s)}
function $$(s,r){return[].slice.call((r||document).querySelectorAll(s))}
function toast(t){var e=$("#toast");if(!e)return;e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove("on")},2600)}
var em=(B.dataset.fx||"⭐").split(",");
/* partikel latar */
var fx=$("#fx");
if(fx&&!RM){for(var i=0;i<(innerWidth<600?9:18);i++){var s=document.createElement("span");s.textContent=em[i%em.length];
s.style.cssText="left:"+Math.random()*100+"%;font-size:"+(16+Math.random()*28)+"px;animation-duration:"+(10+Math.random()*16)+"s;animation-delay:-"+Math.random()*20+"s";fx.appendChild(s)}}
/* senter horor */
if(B.classList.contains("t-horror")){function mv(x,y){B.style.setProperty("--mx",x+"px");B.style.setProperty("--my",y+"px")}
addEventListener("pointermove",function(e){mv(e.clientX,e.clientY)});addEventListener("touchmove",function(e){mv(e.touches[0].clientX,e.touches[0].clientY)},{passive:true})}
/* puzzle: acak huruf judul */
var h1=$("h1");
if(B.classList.contains("t-puzzle")&&h1&&!RM){var tn=h1.lastChild,ft=tn.textContent,n=0,L="ABCDEFGHIJKLMNOPQRSTUVWXYZ",iv=setInterval(function(){n++;tn.textContent=ft.split("").map(function(c,j){return c===" "||j<n/2?c:L[Math.floor(Math.random()*26)]}).join("");if(n>ft.length*2){clearInterval(iv);tn.textContent=ft}},45)}
/* ledakan emoji */
function burst(x,y){if(RM)return;for(var i=0;i<12;i++){var b=document.createElement("span"),a=Math.random()*6.28,d=50+Math.random()*90;b.className="bst";b.textContent=em[i%em.length];
b.style.cssText="left:"+x+"px;top:"+y+"px;--dx:"+Math.cos(a)*d+"px;--dy:"+(Math.sin(a)*d-40)+"px;--r:"+(Math.random()*360)+"deg";document.body.appendChild(b);setTimeout(function(b){b.remove()},950,b)}}
/* tilt + sorot */
function tilt(el){if(!matchMedia("(hover:hover)").matches||RM)return;
el.addEventListener("pointermove",function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
el.style.setProperty("--ry",(x-.5)*10+"deg");el.style.setProperty("--rx",(.5-y)*10+"deg");el.style.setProperty("--px",x*100+"%");el.style.setProperty("--py",y*100+"%")});
el.addEventListener("pointerleave",function(){el.style.setProperty("--rx","0deg");el.style.setProperty("--ry","0deg")})}
/* muncul saat scroll */
var io="IntersectionObserver"in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.08}):null;
function reveal(c){if(io)io.observe(c);else c.classList.add("in")}
/* tombol ke atas */
var tp=$("#top");addEventListener("scroll",function(){tp.classList.toggle("on",scrollY>500)},{passive:true});tp.onclick=function(){scrollTo({top:0,behavior:"smooth"})};
function count(el,to){var t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/900);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
/* ekstra: orb, kursor, riak, progres scroll, judul neon, petir, parallax */
["var(--ac)","#ff5ea0","#3ddc97"].forEach(function(c,i){var o=document.createElement("div");o.className="orb";o.style.cssText="background:"+c+";width:"+(240+i*70)+"px;height:"+(240+i*70)+"px;left:"+(i*35)+"%;top:"+(i*25)+"%;animation-delay:-"+i*5+"s";B.appendChild(o)});
var sp=document.createElement("div");sp.className="sp";B.appendChild(sp);
addEventListener("scroll",function(){var m=document.documentElement.scrollHeight-innerHeight;sp.style.width=(m>0?scrollY/m*100:0)+"%";B.style.setProperty("--sy",scrollY)},{passive:true});
addEventListener("pointerdown",function(e){if(RM)return;var r=document.createElement("i");r.className="rip";r.style.left=e.clientX+"px";r.style.top=e.clientY+"px";B.appendChild(r);setTimeout(function(){r.remove()},700)});
if(matchMedia("(hover:hover) and (pointer:fine)").matches&&!RM){var cu=document.createElement("div"),lt=0;cu.className="cur";B.appendChild(cu);
addEventListener("pointermove",function(e){cu.style.transform="translate("+e.clientX+"px,"+e.clientY+"px)";cu.classList.toggle("h",!!(e.target.closest&&e.target.closest("a,button,label,input,select,.card")));
if(e.timeStamp-lt>45){lt=e.timeStamp;var t=document.createElement("i");t.className="trail";t.style.left=e.clientX-4+"px";t.style.top=e.clientY-4+"px";B.appendChild(t);setTimeout(function(){t.remove()},600)}})}
if(h1&&!B.classList.contains("t-puzzle")){var tn2=h1.lastChild,fr=document.createDocumentFragment();
tn2.textContent.split("").forEach(function(c,i){if(c===" "){fr.appendChild(document.createTextNode(" "));return}var s=document.createElement("span");s.className="l";s.style.setProperty("--k",i);s.textContent=c;fr.appendChild(s)});h1.replaceChild(fr,tn2)}
if(B.classList.contains("t-horror")&&!RM){var z=document.createElement("div");z.className="zap";B.appendChild(z);(function go(){setTimeout(function(){z.classList.remove("on");void z.offsetWidth;z.classList.add("on");go()},5000+Math.random()*9000)})()}
/* transisi halaman v4: interaktif, beda tiap tujuan */
var PG={"index.html":["🏠","Beranda","home"],"horror.html":["👻","Horror & Survival","horror"],"tycoon.html":["🏢","Business & Tycoon","tycoon"],"puzzle.html":["🧩","Puzzle & Mystery","puzzle"],"restoran.html":["🍔","Restaurant & Store","restoran"],"mount.html":["⛰️","Map Mount","mount"],"voice.html":["🎙️","Voice Chat","voice"],"podcast.html":["🎧","Podcast & Talk Show","podcast"],"knowledge.html":["💡","Knowledge","knowledge"],"board.html":["🎲","Board & Card Games","board"]},
CF={home:{n:7,t:1400,fx:"⭐,✨,🚀,💫",m:"Membuka portal…|Menyiapkan petualangan…|Hampir sampai…"},horror:{n:14,t:1500,fx:"🦇,💀,👻,🩸",m:"Menyalakan senter…|Jangan menoleh…|Ada yang mengikuti…"},tycoon:{n:10,t:1450,fx:"🪙,💰,💵,💎",m:"Menghitung laba…|Membangun gedung…|Cuan segera tiba…"},puzzle:{n:48,c:6,t:1500,fx:"🧩,❓,💡,🔑",m:"Menyusun kepingan…|Mencari petunjuk…|Hampir terpecahkan…"},restoran:{n:60,c:6,t:1500,fx:"🍔,🍕,🍟,🍩",m:"Memanaskan wajan…|Menata meja…|Pesanan segera datang…"},mount:{n:3,t:1500,fx:"❄️,❄️,🌨️,⛰️",m:"Memasang tali…|Mendaki puncak…|Udara makin dingin…"},voice:{n:18,t:1400,fx:"🎙️,🔊,🎵,🎤",m:"Mengetes mikrofon…|Satu, dua, tiga…|Siap mengobrol…"},podcast:{n:2,t:1450,fx:"🎧,📻,🎬,💬",m:"Lampu sorot menyala…|Mic on air…|Tamu segera masuk…"},knowledge:{n:3,t:1400,fx:"💡,❓,📚,🧠",m:"Membuka buku…|Mengasah otak…|Siap menjawab…"},board:{n:40,c:5,t:1500,fx:"🎲,♟️,🃏,♠️,♥️",m:"Mengocok kartu…|Melempar dadu…|Giliranmu segera tiba…"}};
function spark(x,y,fe,k){var s=document.createElement("span");s.className="spk";s.textContent=fe[k%fe.length];s.style.cssText="left:"+x+"px;top:"+y+"px;--dx:"+((Math.random()-.5)*130)+"px";B.appendChild(s);setTimeout(function(){s.remove()},900)}
function mk(d){var cf=CF[d.v],n=cf.n,c=cf.c||n,rows=Math.ceil(n/c),R=Math.random,fe=cf.fx.split(","),v=d.v,rain=v==="tycoon"||v==="mount",p=document.createElement("div"),h="",i;
p.className="pt v-"+v;p.style.setProperty("--pc",d.c);
for(i=0;i<n;i++){var col=i%c,rw=Math.floor(i/c),r=(v==="tycoon"||v==="home"||v==="mount"||v==="knowledge")?i/(n-1):v==="voice"?Math.abs(i-(n-1)/2)/((n-1)/2):v==="restoran"?(col+rw)/(c+rows-2):v==="podcast"?0:R();
h+='<b class="x" style="--r:'+r.toFixed(2)+';--s:'+(1-i*.13).toFixed(2)+';--gx:'+((R()-.5)*80).toFixed(0)+'vw;--rt:'+(R()*360-180).toFixed(0)+'deg;--cl:'+col+';--rw:'+rw+';--ck:'+((col+rw)%2?"#ff5a3c":"#fff0d6")+'"></b>'}
h+='<div class="fxl">';for(i=0;i<22;i++)h+='<span style="'+(rain?"left:"+(R()*100).toFixed(0)+"%;top:-12%;--dx:"+((R()-.5)*14).toFixed(0)+"vw;--dy:125vh;--du:"+(1.1+R()*.8).toFixed(2)+"s;--dl:"+(R()*.6).toFixed(2)+"s":"left:50%;top:50%;--dx:"+((R()-.5)*120).toFixed(0)+"vw;--dy:"+((R()-.5)*120).toFixed(0)+"vh;--du:.9s;--dl:"+(.25+R()*.3).toFixed(2)+"s")+";--rt:"+((R()*720-360).toFixed(0))+'deg">'+fe[i%fe.length]+"</span>";
h+='</div><div class="sl"></div><div class="ptc"><div class="hero"><span class="pe"></span><div class="ob">';for(i=0;i<6;i++)h+='<i style="--a:'+i*60+'deg">'+fe[i%fe.length]+"</i>";
h+='</div></div><span class="pl"></span><span class="pc">0%</span><span class="pm"></span></div><i class="pb"><u></u></i>';
p.innerHTML=h;$(".pe",p).textContent=d.e;var pl=$(".pl",p);d.l.split("").forEach(function(ch,j){var s=document.createElement("i");s.style.setProperty("--j",j);s.textContent=ch===" "?"\u00a0":ch;pl.appendChild(s)});B.appendChild(p);return p}
function live(p,fe){var lt=0,k=0;p.addEventListener("pointermove",function(e){p.style.setProperty("--mx",e.clientX+"px");p.style.setProperty("--my",e.clientY+"px");p.style.setProperty("--nx",((e.clientX/innerWidth-.5)*2).toFixed(2));p.style.setProperty("--ny",((e.clientY/innerHeight-.5)*2).toFixed(2));if(e.timeStamp-lt>60){lt=e.timeStamp;spark(e.clientX,e.clientY,fe,k++)}});
p.addEventListener("pointerdown",function(e){for(var i=0;i<10;i++)spark(e.clientX,e.clientY,fe,k++)})}
function run(p,cf){var t0=performance.now(),pc=$(".pc",p),pm=$(".pm",p),ms=cf.m.split("|"),mi=0,iv;pm.textContent=ms[0];iv=setInterval(function(){pm.textContent=ms[++mi%ms.length]},480);
(function f(t){if(!p.parentNode){clearInterval(iv);return}var q=Math.min(1,(t-t0)/cf.t);pc.textContent=Math.round(q*100)+"%";if(q<1)requestAnimationFrame(f);else clearInterval(iv)})(t0)}
try{var pf=sessionStorage.getItem("rbx-pt");if(pf){sessionStorage.removeItem("rbx-pt");var pj=JSON.parse(pf),po=mk(pj),H=document.documentElement;po.classList.add("cov");H.dataset.pv=pj.v;H.classList.add("pt-arr");setTimeout(function(){H.classList.remove("pt-arr")},1600);document.documentElement.classList.remove("pt-in");
requestAnimationFrame(function(){requestAnimationFrame(function(){po.classList.remove("cov");po.classList.add("out");setTimeout(function(){po.remove()},1500)})})}}catch(e){document.documentElement.classList.remove("pt-in")}
addEventListener("pageshow",function(e){if(e.persisted)$$(".pt").forEach(function(x){x.remove()})});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");
if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.protocol!==location.protocol||a.host!==location.host||a.pathname===location.pathname||RM)return;
var g=PG[a.pathname.split("/").pop()||"index.html"];if(!g)return;e.preventDefault();
var d={c:(getComputedStyle(a).getPropertyValue("--c")||"").trim()||"#6ea8ff",e:g[0],l:g[1],v:g[2]},cf=CF[g[2]];
try{sessionStorage.setItem("rbx-pt",JSON.stringify(d))}catch(x){}
var H2=document.documentElement;H2.dataset.pv=g[2];H2.classList.add("pt-go");var o=mk(d);o.classList.add("go");live(o,cf.fx.split(","));run(o,cf);
setTimeout(function(){location.href=a.href},cf.t);setTimeout(function(){o.remove();H2.classList.remove("pt-go")},5000)});
/* halaman kategori */
var cards=$$(".card[data-slug]");
if(cards.length){
var RK={horror:["Penakut","Berani","Pemburu Hantu","Raja Horor"],tycoon:["Karyawan","Manajer","Direktur","Sultan"],puzzle:["Pemula","Detektif","Ahli Sandi","Master Otak"],restoran:["Magang","Koki","Chef","Chef Bintang 5"],voice:["Pendengar","Pengobrol","Teman Akrab","Raja Nongkrong"],podcast:["Tamu","Host Baru","Host Andal","Bintang Podcast"],knowledge:["Murid","Pelajar","Cendekia","Profesor"],board:["Pemula","Pemain","Jago Main","Grandmaster"],mount:["Pejalan","Pendaki","Summiter","Legenda Puncak"]},
th=B.className.replace("t-","").split(" ")[0],st="all",q=$("#q"),bar=$("#bar"),cnt=$("#cnt"),empty=$("#empty"),grid=$(".grid"),orig=cards.slice();
function prog(){var d=cards.filter(function(c){return store[c.dataset.slug]}).length,p=d/cards.length,r=(RK[th]||[])[Math.min(3,Math.floor(p*4))];
cnt.innerHTML=d+" / "+cards.length+" selesai"+(r?' <span class="rk">'+r+'</span>':"");bar.style.width=p*100+"%";return d}
function apply(){var s=q.value.toLowerCase().trim(),n=0;cards.forEach(function(c){var done=!!store[c.dataset.slug],ok=c.dataset.name.indexOf(s)>-1&&(st==="all"||(st==="fav"?!!fav[c.dataset.slug]:(st==="done")===done));c.hidden=!ok;if(ok){n++;c.classList.add("in")}});empty.hidden=n>0}
cards.forEach(function(c,i){var k=c.dataset.slug,cb=$("input",c),fb=document.createElement("button");fb.type="button";fb.className="fav"+(fav[k]?" on":"");fb.textContent="⭐";fb.title="Favorit";fb.onclick=function(){fav[k]?delete fav[k]:fav[k]=1;fb.classList.toggle("on",!!fav[k]);try{localStorage.setItem("rbx-fav",JSON.stringify(fav))}catch(e){}if(fav[k]){var r=fb.getBoundingClientRect();burst(r.left+16,r.top+16)}if(st==="fav")apply()};c.appendChild(fb);
cb.checked=!!store[k];c.classList.toggle("done",cb.checked);tilt(c);reveal(c);
cb.onchange=function(){if(cb.checked){store[k]=1;var r=cb.getBoundingClientRect();burst(r.left+10,r.top+10);if(navigator.vibrate)navigator.vibrate(30)}else delete store[k];save();c.classList.toggle("done",cb.checked);var d=prog();if(d===cards.length){toast("🎉 Semua selesai! Kamu hebat!");burst(innerWidth/2,innerHeight/2)}if(st!=="all")setTimeout(apply,500)}});
q.oninput=apply;
$(".flt").insertAdjacentHTML("beforeend",'<label><input type="radio" name="s" value="fav"> ⭐ Favorit</label>');
$$("input[name=s]").forEach(function(r){r.onchange=function(){st=r.value;apply()}});
$("#so").onchange=function(){var l=this.value==="a"?cards.slice().sort(function(a,b){return a.dataset.name.localeCompare(b.dataset.name)}):orig;l.forEach(function(c){grid.appendChild(c)});cards=l.slice()};
$("#rnd").onclick=function(){var pool=cards.filter(function(c){return !c.hidden&&!store[c.dataset.slug]});
if(!pool.length){toast("Semua sudah dimainkan!");return}
$$(".won").forEach(function(x){x.classList.remove("won")});var i=0,steps=14+Math.floor(Math.random()*6),prev;
(function tick(){if(prev)prev.style.outline="";var c=pool[Math.floor(Math.random()*pool.length)];prev=c;i++;
if(i<steps){c.style.outline="3px solid var(--ac)";setTimeout(tick,60+i*18)}else{c.style.outline="";c.classList.add("won");c.scrollIntoView({behavior:"smooth",block:"center"});toast("🎲 Main: "+c.dataset.title);var r=c.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)}})()};
addEventListener("keydown",function(e){if(e.key==="/"&&document.activeElement!==q){e.preventDefault();q.focus()}});
prog();apply()}
/* halaman utama */
var hubs=$$(".cat[data-slugs]"),tot=0;
hubs.forEach(function(h){var sl=h.dataset.slugs.split(","),d=sl.filter(function(s){return store[s]}).length;tot+=d;tilt(h);
$(".prog",h).textContent=sl.length+" game · "+d+" selesai";$(".bar i",h).style.width=(d/sl.length*100)+"%"});
$$(".stats b").forEach(function(b){count(b,b.id==="dn"?tot:+b.dataset.n)});
var gq=$("#gq");
if(gq){var all=JSON.parse($("#all").textContent),out=$("#res");
gq.oninput=function(){var s=gq.value.toLowerCase().trim();out.innerHTML="";if(s.length<2)return;
var seen={},m=all.filter(function(g){if(g.n.toLowerCase().indexOf(s)<0||seen[g.s+g.c])return false;seen[g.s+g.c]=1;return true});
var h=document.createElement("h2");h.textContent=m.length?m.length+" hasil":"Tidak ada game yang cocok";out.appendChild(h);
if(m.length){var ul=document.createElement("ul");ul.className="grid";
m.forEach(function(g,i){var li=document.createElement("li");li.className="card in";li.style.setProperty("--ac",g.k);li.style.setProperty("--c",g.k);li.style.setProperty("--i",i);
li.innerHTML='<span class="no">'+g.e+'</span><h3></h3><div class="act"><a class="tag" href="'+g.p+'" style="text-decoration:none"></a><a class="go" target="_blank" rel="noopener"></a></div>';
li.querySelector("h3").textContent=g.n;var t=li.querySelector(".tag");t.textContent=g.t;
var a=li.querySelector(".go");a.href=g.u;a.textContent=g.d?"Main di Roblox ↗":"Cari di Roblox ↗";tilt(li);ul.appendChild(li)});out.appendChild(ul)}}}
})();
