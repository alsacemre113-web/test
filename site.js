
var CFG;
var $=function(s,r){return (r||document).querySelector(s)};
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function fmt(n){return n>=1e9?+(n/1e9).toFixed(2)+" Billion":n>=1e6?+(n/1e6).toFixed(2)+" Million":n.toLocaleString("en-US")}
function safeUrl(u){u=String(u==null?"":u).trim();return /^(https?:\/\/|mailto:|#|\/(?!\/))/i.test(u)?u:"#"}
function safeImg(u){u=String(u==null?"":u).trim();return /^(https?:\/\/|\/(?!\/)|data:image\/(png|jpe?g|webp|gif);base64,)/i.test(u)?u:""}
function app(){var c=CFG;
$("#app").innerHTML=
'<nav><div class="wrap"><b>'+esc(c.brand)+'</b><ul><li><a href="#about">About</a></li><li><a href="#tokenomics">Tokenomics</a></li><li><a href="#roadmap">Roadmap</a></li><li><a href="#how-to-buy">How to buy</a></li></ul><a class="btn main" href="#how-to-buy">Buy '+esc(c.ticker)+'</a></div></nav>'+
'<header class="hero"><div class="wrap"><img class="logo" src="'+esc(safeImg(c.logo))+'" alt="'+esc(c.brand)+' logo"><p>'+esc(c.tagline)+'</p><div class="cta"><a class="btn main" href="#how-to-buy">Buy '+esc(c.ticker)+'</a><a class="btn line" href="#roadmap">View roadmap</a></div><div class="ca"><code id="ca">'+esc(c.contract)+'</code><button id="copy" type="button">Copy</button></div></div></header>'+
'<section id="about"><div class="wrap about"><div><h2>'+esc(c.aboutTitle)+'</h2><p>'+esc(c.aboutText)+'</p><div class="facts"><div><span>Ticker</span><strong>'+esc(c.ticker)+'</strong></div><div><span>Network</span><strong>'+esc(c.chain)+'</strong></div><div><span>Total supply</span><strong>'+esc(fmt(c.supply))+'</strong></div></div></div><img src="'+esc(safeImg(c.badge))+'" alt="Dog with sunglasses badge"></div></section>'+
'<section id="tokenomics" style="background:linear-gradient(180deg,var(--night),#180c33 50%,var(--night))"><div class="wrap"><h2>Tokenomics</h2><p class="sub">Total supply: '+esc(fmt(c.supply))+' '+esc(c.ticker)+'. Tap a slice for details.</p><div class="tok"><div class="donut" id="donut"><svg viewBox="0 0 200 200" role="img" aria-label="Token distribution chart"></svg><div class="mid"><b id="midp">100%</b><span id="midl">'+esc(fmt(c.supply))+' '+esc(c.ticker)+'</span></div></div><div><ul class="legend" id="legend"></ul></div></div></div></section>'+
'<section id="roadmap"><div class="wrap"><h2>Roadmap</h2><p class="sub">'+esc(c.roadSub)+'</p><ol class="road">'+c.phases.map(function(p){return '<li><h3>'+esc(p.title)+'</h3><span class="tag">'+esc(p.tag)+'</span><ul>'+p.items.map(function(i){return '<li>'+esc(i)+'</li>'}).join("")+'</ul></li>'}).join("")+'</ol></div></section>'+
'<section id="how-to-buy" style="padding-top:0"><div class="wrap"><h2>How to buy</h2><p class="sub">From your wallet to '+esc(c.ticker)+' in four steps.</p><ol class="buy">'+c.steps.map(function(s){return '<li><b>'+esc(s.title)+'</b><span>'+esc(s.text)+'</span></li>'}).join("")+'</ol></div></section>'+
'<footer><div class="wrap"><div class="socials">'+c.links.map(function(l){return '<a class="btn line" href="'+esc(safeUrl(l.url))+'" target="_blank" rel="noopener">'+esc(l.name)+'</a>'}).join("")+'</div><p>'+esc(c.disc1)+'</p><p>'+esc(c.disc2)+'</p></div></footer>';
bind()}
function bind(){var c=CFG,svg=$("#donut svg"),lg=$("#legend"),donut=$("#donut"),mp=$("#midp"),ml=$("#midl"),R=80,C=2*Math.PI*R,off=0,NS="http://www.w3.org/2000/svg",els=[];
var tot=c.supply,full=fmt(tot)+" "+c.ticker;
var bg=document.createElementNS(NS,"circle");bg.setAttribute("cx",100);bg.setAttribute("cy",100);bg.setAttribute("r",R);bg.style.stroke="#ffffff10";bg.style.pointerEvents="none";svg.appendChild(bg);
c.tokens.forEach(function(x){var len=C*x.p/100,k=document.createElementNS(NS,"circle");
k.setAttribute("cx",100);k.setAttribute("cy",100);k.setAttribute("r",R);k.style.stroke=x.c;k.setAttribute("stroke-dasharray",Math.max(len-1.6,0)+" "+(C-Math.max(len-1.6,0)));k.setAttribute("stroke-dashoffset",-off);off+=len;svg.appendChild(k);
var li=document.createElement("li");li.tabIndex=0;li.innerHTML='<i style="background:'+esc(x.c)+'"></i><div>'+esc(x.n)+'<small>'+esc(x.d)+'</small></div><em>'+esc(x.p)+'%</em>';lg.appendChild(li);els.push([k,li]);
function on(){donut.classList.add("hov");els.forEach(function(e){e[0].classList.remove("on");e[1].classList.remove("on")});k.classList.add("on");li.classList.add("on");mp.textContent=x.p+"%";ml.textContent=x.n+" · "+fmt(tot*x.p/100)}
function offf(){donut.classList.remove("hov");k.classList.remove("on");li.classList.remove("on");mp.textContent="100%";ml.textContent=full}
[k,li].forEach(function(t){t.addEventListener("mouseenter",on);t.addEventListener("mouseleave",offf);t.addEventListener("click",on)});li.addEventListener("focus",on);li.addEventListener("blur",offf)});
$("#copy").addEventListener("click",function(){var b=this;try{navigator.clipboard.writeText($("#ca").textContent)}catch(e){}b.textContent="Copied";setTimeout(function(){b.textContent="Copy"},1600)})}

window.renderSite=function(c){CFG=c;app()};
