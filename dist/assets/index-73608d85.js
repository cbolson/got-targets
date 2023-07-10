(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const A="https://thronesapi.com/api/v2/Characters";let u=[],s=3;const v=[{id:3,targets:[{id:9,done:!0},{id:6,done:!1},{id:2,done:!1},{id:4,done:!0},{id:11,done:!0}]},{id:11,targets:[{id:3,done:!0},{id:14,done:!0},{id:13,done:!1}]},{id:1,targets:[{id:3,done:!1},{id:7,done:!0},{id:11,done:!1}]},{id:14,targets:[{id:3,done:!1}]}],D=document.querySelector("[player-img-login]"),x=document.querySelector("[player-name-login]"),w=document.querySelector("[player-img]"),I=document.querySelector("[player-name]"),C=document.querySelector("[player-family]"),b=document.querySelector("#player-targets"),L=document.querySelector("#tpl-character"),h=document.querySelector("#list-characters");let l;function T(){const e=q(s);l=$(s),D.src=l.imageUrl,w.src=l.imageUrl,x.innerText=l.firstName,I.innerText=l.firstName,C.innerText=l.family,document.querySelector("[player-firstname]").innerText=l.firstName,document.querySelector("[player-lastname]").innerText=l.lastName,document.querySelector("[player-title]").innerText=l.title,g(e.targets)}function g(e){b.innerHTML="";let t=0;e.forEach(r=>{k(r),r.done!==!1&&t++});const o=e.length,n=t/o*100;document.querySelector("#circle-completed").setAttribute("stroke-dasharray",`${n}, 100`),document.querySelector("[targets-done]").innerText=t}function k({id:e,done:t}){const o=u.find(a=>a.id==e),n=L.content.cloneNode(!0);n.querySelector("label").setAttribute("for",`player-${e}`),n.querySelector("[data-target-name]").innerText=o.fullName,n.querySelector("[data-target-family]").innerText=o.family,n.querySelector("img").src=o.imageUrl;const r=n.querySelector("input");t?(n.querySelector("li").classList.add("done"),n.querySelector("span").classList.remove("!hidden"),r.remove()):(r.setAttribute("id",`player-${e}`),r.value=e),r.addEventListener("change",()=>{O(r)}),b.append(n)}function O(e){const t=q(s),o=t.targets.find(n=>n.id==e.value);o.done=!!e.checked,g(t.targets)}function U(){h.innerHTML="";const e=E(s);u.map(({id:t,fullName:o,family:n,image:r})=>{const a=u.find(f=>f.id==t);if(t==s||e.find(f=>f.id==t))return;const c=L.content.cloneNode(!0);c.querySelector("label").setAttribute("for",`target-${t}`),c.querySelector("[data-target-name]").innerText=a.fullName,c.querySelector("[data-target-family]").innerText=a.family,c.querySelector("img").src=a.imageUrl;const d=c.querySelector("input");d.setAttribute("id",`target-${t}`),d.value=t,d.addEventListener("change",()=>{M(d)}),h.append(c)})}function $(e){return l=u.find(t=>t.id==e)}function q(e){return v.find(t=>t.id==e)}function E(e){return q(e).targets}function M(e){const t=E(s);e.checked?(t.unshift({id:e.value,done:!1}),e.closest("li").style.opacity=.5):(t.forEach((o,n)=>{o.id===e.value&&delete t[n]}),e.closest("li").style.opacity=1),g(t)}const y=document.querySelector("#accounts"),P=document.querySelector("#bt-account"),N=P.querySelector("span"),F=document.querySelector("#tpl-accounts"),H=y.querySelector("#btn-close-accounts");function V(){v.forEach(e=>{const t=e.id,o=u.find(r=>r.id==t),n=F.content.cloneNode(!0);n.querySelector("[account-name]").innerText=o.fullName,n.querySelector("img").src=o.imageUrl,n.querySelector("button").addEventListener("click",()=>{s=o.id,T(),S()}),y.append(n)})}let m=!1;P.addEventListener("click",()=>{m?S():(N.style.transform="rotate(180deg)",y.style.transform="translateY(0)",m=!0)});H.addEventListener("click",()=>S());function S(){N.style.transform="rotate(0)",y.style.transform="translateY(-120%)",m=!1}const p=document.querySelector("#btn-login");document.querySelector("input[type=password]").addEventListener("keyup",e=>{e.target.value.length>3?p.disabled=!1:p.disabled=!0});p.addEventListener("click",e=>{e.preventDefault(),i("profile")});document.querySelector("#btn-logout").addEventListener("click",e=>{i("login")});document.querySelector("#btn-profile").addEventListener("click",e=>{i("profile")});document.querySelector("#btn-targets").addEventListener("click",e=>{i("targets")});document.querySelector("#btn-targets-list").addEventListener("click",e=>{i("targets")});document.querySelector("#btn-targets-done").addEventListener("click",e=>{i("targets")});document.querySelector("#btn-new-targets").addEventListener("click",e=>{i("characters")});function i(e){document.querySelector(`#panel-${e}`).scrollIntoView({behavior:"smooth",inline:"start"})}window.addEventListener("load",e=>{(async function(){try{u=await(await fetch(A)).json(),T(),U(),V()}catch(o){console.log(o)}})()});document.querySelectorAll("a").forEach(e=>{e.addEventListener("click",t=>{e.getAttribute("href")=="#"&&t.preventDefault()})});
