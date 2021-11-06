var app=function(){"use strict";function t(){}const n=t=>t;function e(t,n){for(const e in n)t[e]=n[e];return t}function r(t){return t()}function i(){return Object.create(null)}function l(t){t.forEach(r)}function o(t){return"function"==typeof t}function s(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function a(t,n,r,i){return t[1]&&i?e(r.ctx.slice(),t[1](i(n))):r.ctx}const c="undefined"!=typeof window;let u=c?()=>window.performance.now():()=>Date.now(),d=c?t=>requestAnimationFrame(t):t;const p=new Set;function h(t){p.forEach((n=>{n.c(t)||(p.delete(n),n.f())})),0!==p.size&&d(h)}function f(t){let n;return 0===p.size&&d(h),{promise:new Promise((e=>{p.add(n={c:t,f:e})})),abort(){p.delete(n)}}}function y(t,n){t.appendChild(n)}function _(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}function g(t){const n=b("style");return function(t,n){y(t.head||t,n)}(_(t),n),n}function w(t,n,e){t.insertBefore(n,e||null)}function m(t){t.parentNode.removeChild(t)}function $(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function b(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function x(){return v(" ")}function k(){return v("")}function z(t,n,e,r){return t.addEventListener(n,e,r),()=>t.removeEventListener(n,e,r)}function C(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function P(t,n,e,r){t.style.setProperty(n,e,r?"important":"")}function M(t,n,e){t.classList[e?"add":"remove"](n)}function S(t,n,e=!1){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,!1,n),r}const O=new Set;let A,H=0;function W(t,n,e,r,i,l,o,s=0){const a=16.666/r;let c="{\n";for(let t=0;t<=1;t+=a){const r=n+(e-n)*l(t);c+=100*t+`%{${o(r,1-r)}}\n`}const u=c+`100% {${o(e,1-e)}}\n}`,d=`__svelte_${function(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}(u)}_${s}`,p=_(t);O.add(p);const h=p.__svelte_stylesheet||(p.__svelte_stylesheet=g(t).sheet),f=p.__svelte_rules||(p.__svelte_rules={});f[d]||(f[d]=!0,h.insertRule(`@keyframes ${d} ${u}`,h.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${d} ${r}ms linear ${i}ms 1 both`,H+=1,d}function N(t,n){const e=(t.style.animation||"").split(", "),r=e.filter(n?t=>t.indexOf(n)<0:t=>-1===t.indexOf("__svelte")),i=e.length-r.length;i&&(t.style.animation=r.join(", "),H-=i,H||d((()=>{H||(O.forEach((t=>{const n=t.__svelte_stylesheet;let e=n.cssRules.length;for(;e--;)n.deleteRule(e);t.__svelte_rules={}})),O.clear())})))}function E(t){A=t}function T(){const t=function(){if(!A)throw new Error("Function called outside component initialization");return A}();return(n,e)=>{const r=t.$$.callbacks[n];if(r){const i=S(n,e);r.slice().forEach((n=>{n.call(t,i)}))}}}const J=[],V=[],j=[],G=[],R=Promise.resolve();let I=!1;function q(){I||(I=!0,R.then(F))}function B(t){j.push(t)}let L=!1;const D=new Set;function F(){if(!L){L=!0;do{for(let t=0;t<J.length;t+=1){const n=J[t];E(n),U(n.$$)}for(E(null),J.length=0;V.length;)V.pop()();for(let t=0;t<j.length;t+=1){const n=j[t];D.has(n)||(D.add(n),n())}j.length=0}while(J.length);for(;G.length;)G.pop()();I=!1,L=!1,D.clear()}}function U(t){if(null!==t.fragment){t.update(),l(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(B)}}let K;function Q(){return K||(K=Promise.resolve(),K.then((()=>{K=null}))),K}function X(t,n,e){t.dispatchEvent(S(`${n?"intro":"outro"}${e}`))}const Y=new Set;let Z;function tt(){Z={r:0,c:[],p:Z}}function nt(){Z.r||l(Z.c),Z=Z.p}function et(t,n){t&&t.i&&(Y.delete(t),t.i(n))}function rt(t,n,e,r){if(t&&t.o){if(Y.has(t))return;Y.add(t),Z.c.push((()=>{Y.delete(t),r&&(e&&t.d(1),r())})),t.o(n)}}const it={duration:0};function lt(e,r,i,s){let a=r(e,i),c=s?0:1,d=null,p=null,h=null;function y(){h&&N(e,h)}function _(t,n){const e=t.b-c;return n*=Math.abs(e),{a:c,b:t.b,d:e,duration:n,start:t.start,end:t.start+n,group:t.group}}function g(r){const{delay:i=0,duration:o=300,easing:s=n,tick:g=t,css:w}=a||it,m={start:u()+i,b:r};r||(m.group=Z,Z.r+=1),d||p?p=m:(w&&(y(),h=W(e,c,r,o,i,s,w)),r&&g(0,1),d=_(m,o),B((()=>X(e,r,"start"))),f((t=>{if(p&&t>p.start&&(d=_(p,o),p=null,X(e,d.b,"start"),w&&(y(),h=W(e,c,d.b,d.duration,0,s,a.css))),d)if(t>=d.end)g(c=d.b,1-c),X(e,d.b,"end"),p||(d.b?y():--d.group.r||l(d.group.c)),d=null;else if(t>=d.start){const n=t-d.start;c=d.a+d.d*s(n/d.duration),g(c,1-c)}return!(!d&&!p)})))}return{run(t){o(a)?Q().then((()=>{a=a(),g(t)})):g(t)},end(){y(),d=p=null}}}function ot(t){t&&t.c()}function st(t,n,e,i){const{fragment:s,on_mount:a,on_destroy:c,after_update:u}=t.$$;s&&s.m(n,e),i||B((()=>{const n=a.map(r).filter(o);c?c.push(...n):l(n),t.$$.on_mount=[]})),u.forEach(B)}function at(t,n){const e=t.$$;null!==e.fragment&&(l(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ct(n,e,r,o,s,a,c,u=[-1]){const d=A;E(n);const p=n.$$={fragment:null,ctx:null,props:a,update:t,not_equal:s,bound:i(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:i(),dirty:u,skip_bound:!1,root:e.target||d.$$.root};c&&c(p.root);let h=!1;if(p.ctx=r?r(n,e.props||{},((t,e,...r)=>{const i=r.length?r[0]:e;return p.ctx&&s(p.ctx[t],p.ctx[t]=i)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](i),h&&function(t,n){-1===t.$$.dirty[0]&&(J.push(t),q(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}(n,t)),e})):[],p.update(),h=!0,l(p.before_update),p.fragment=!!o&&o(p.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);p.fragment&&p.fragment.l(t),t.forEach(m)}else p.fragment&&p.fragment.c();e.intro&&et(n.$$.fragment),st(n,e.target,e.anchor,e.customElement),F()}E(d)}class ut{$destroy(){at(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function dt(t){const n=t-1;return n*n*n+1}function pt(t){return--t*t*t*t*t+1}
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function ht(t,{delay:n=0,duration:e=400,easing:r=dt,start:i=0,opacity:l=0}={}){const o=getComputedStyle(t),s=+o.opacity,a="none"===o.transform?"":o.transform,c=1-i,u=s*(1-l);return{delay:n,duration:e,easing:r,css:(t,n)=>`\n\t\t\ttransform: ${a} scale(${1-c*n});\n\t\t\topacity: ${s-u*n}\n\t\t`}}function ft(t){var{fallback:n}=t,r=function(t,n){var e={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(e[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(e[r[i]]=t[r[i]])}return e}(t,["fallback"]);const i=new Map,l=new Map;function s(t,i,l){return(s,a)=>(t.set(a.key,{rect:s.getBoundingClientRect()}),()=>{if(i.has(a.key)){const{rect:t}=i.get(a.key);return i.delete(a.key),function(t,n,i){const{delay:l=0,duration:s=(t=>30*Math.sqrt(t)),easing:a=dt}=e(e({},r),i),c=n.getBoundingClientRect(),u=t.left-c.left,d=t.top-c.top,p=t.width/c.width,h=t.height/c.height,f=Math.sqrt(u*u+d*d),y=getComputedStyle(n),_="none"===y.transform?"":y.transform,g=+y.opacity;return{delay:l,duration:o(s)?s(f):s,easing:a,css:(t,n)=>`\n\t\t\t\topacity: ${t*g};\n\t\t\t\ttransform-origin: top left;\n\t\t\t\ttransform: ${_} translate(${n*u}px,${n*d}px) scale(${t+(1-t)*p}, ${t+(1-t)*h});\n\t\t\t`}}(t,s,a)}return t.delete(a.key),n&&n(s,a,l)})}return[s(l,i,!1),s(i,l,!0)]}const yt={kind:"none",player_id:-1,notable:!1},_t={kind:"ghost",player_id:-1,notable:!1};function gt(t,n){return{kind:"piece",player_id:t,notable:n}}const wt={kind:"unknown"},mt={kind:"pawn"},$t={kind:"vwall"},bt={kind:"hwall"};class vt{constructor(t){this.grid_size=t,this.cell_size=2*t+1}isMargin(t){return 0===t||t===this.cell_size-1}isPath(t){return t%2==0&&!this.isMargin(t)}toGridIndex(t,n){let e=wt;this.isPCell(t,n)?e=mt:this.isVCell(t,n)?e=$t:this.isHCell(t,n)&&(e=bt);return[e,[Math.floor((t-1)/2),Math.floor((n-1)/2)]]}hasPCell(t){return!this.isMargin(t)&&!this.isPath(t)}isPCell(t,n){return this.hasPCell(n)&&this.hasPCell(t)}getPawn(t,n,e){const[r,[i,l]]=this.toGridIndex(n,e);return"pawn"!==r.kind?yt:t[i][l]}isVCell(t,n){return this.hasPCell(t)&&this.isPath(n)}getVerticalWall(t,n,e){const[r,[i,l]]=this.toGridIndex(n,e);return"vwall"!==r.kind||i===this.grid_size-1?yt:t[i][l]}isHCell(t,n){return this.isPath(t)&&this.hasPCell(n)}getHorizontalWall(t,n,e){const[r,[i,l]]=this.toGridIndex(n,e);return"hwall"!==r.kind||l===this.grid_size-1?yt:t[i][l]}}function xt(t,n,e){const r=t.slice();return r[14]=n[e],r}function kt(t,n,e){const r=t.slice();return r[17]=n[e],r[19]=e,r}function zt(t){let n,e,r,i,l,o;const s=[St,Mt],a=[];function c(t,r){return(null==n||4&r)&&(n=!("piece"!==t[5].getHorizontalWall(t[2],t[14],t[19]).kind)),n?0:((null==e||4&r)&&(e=!("ghost"!==t[5].getHorizontalWall(t[2],t[14],t[19]).kind)),e?1:-1)}return~(r=c(t,-1))&&(i=a[r]=s[r](t)),{c(){i&&i.c(),l=k()},m(t,n){~r&&a[r].m(t,n),w(t,l,n),o=!0},p(t,n){let e=r;r=c(t,n),r===e?~r&&a[r].p(t,n):(i&&(tt(),rt(a[e],1,1,(()=>{a[e]=null})),nt()),~r?(i=a[r],i?i.p(t,n):(i=a[r]=s[r](t),i.c()),et(i,1),i.m(l.parentNode,l)):i=null)},i(t){o||(et(i),o=!0)},o(t){rt(i),o=!1},d(t){~r&&a[r].d(t),t&&m(l)}}}function Ct(t){let n,e,r,i,l,o;const s=[At,Ot],a=[];function c(t,r){return(null==n||8&r)&&(n=!("piece"!==t[5].getVerticalWall(t[3],t[14],t[19]).kind)),n?0:((null==e||8&r)&&(e=!("ghost"!==t[5].getVerticalWall(t[3],t[14],t[19]).kind)),e?1:-1)}return~(r=c(t,-1))&&(i=a[r]=s[r](t)),{c(){i&&i.c(),l=k()},m(t,n){~r&&a[r].m(t,n),w(t,l,n),o=!0},p(t,n){let e=r;r=c(t,n),r===e?~r&&a[r].p(t,n):(i&&(tt(),rt(a[e],1,1,(()=>{a[e]=null})),nt()),~r?(i=a[r],i?i.p(t,n):(i=a[r]=s[r](t),i.c()),et(i,1),i.m(l.parentNode,l)):i=null)},i(t){o||(et(i),o=!0)},o(t){rt(i),o=!1},d(t){~r&&a[r].d(t),t&&m(l)}}}function Pt(t){let n,e,r,i,l,o;const s=[Wt,Ht],a=[];function c(t,r){return(null==n||16&r)&&(n=!("piece"!==t[5].getPawn(t[4],t[14],t[19]).kind)),n?0:((null==e||16&r)&&(e=!("ghost"!==t[5].getPawn(t[4],t[14],t[19]).kind)),e?1:-1)}return~(r=c(t,-1))&&(i=a[r]=s[r](t)),{c(){i&&i.c(),l=k()},m(t,n){~r&&a[r].m(t,n),w(t,l,n),o=!0},p(t,n){let e=r;r=c(t,n),r===e?~r&&a[r].p(t,n):(i&&(tt(),rt(a[e],1,1,(()=>{a[e]=null})),nt()),~r?(i=a[r],i?i.p(t,n):(i=a[r]=s[r](t),i.c()),et(i,1),i.m(l.parentNode,l)):i=null)},i(t){o||(et(i),o=!0)},o(t){rt(i),o=!1},d(t){~r&&a[r].d(t),t&&m(l)}}}function Mt(n){let e;return{c(){e=b("div"),C(e,"class","ghost horizontalWall svelte-pic2r5"),M(e,"player0",0===n[0]||n[1]),M(e,"player1",1===n[0]&&!n[1])},m(t,n){w(t,e,n)},p(t,n){3&n&&M(e,"player0",0===t[0]||t[1]),3&n&&M(e,"player1",1===t[0]&&!t[1])},i:t,o:t,d(t){t&&m(e)}}}function St(t){let n,e,r;return{c(){n=b("div"),C(n,"class","horizontalWall svelte-pic2r5"),M(n,"player0",0===t[5].getHorizontalWall(t[2],t[14],t[19]).player_id||t[1]),M(n,"player1",1===t[5].getHorizontalWall(t[2],t[14],t[19]).player_id&&!t[1])},m(t,e){w(t,n,e),r=!0},p(t,e){38&e&&M(n,"player0",0===t[5].getHorizontalWall(t[2],t[14],t[19]).player_id||t[1]),38&e&&M(n,"player1",1===t[5].getHorizontalWall(t[2],t[14],t[19]).player_id&&!t[1])},i(t){r||(B((()=>{e||(e=lt(n,ht,{},!0)),e.run(1)})),r=!0)},o(t){e||(e=lt(n,ht,{},!1)),e.run(0),r=!1},d(t){t&&m(n),t&&e&&e.end()}}}function Ot(n){let e,r;return{c(){e=b("div"),C(e,"class",r="ghost verticalWall player"+n[0]+" svelte-pic2r5"),M(e,"player0",0===n[0]||n[1]),M(e,"player1",1===n[0]&&!n[1])},m(t,n){w(t,e,n)},p(t,n){1&n&&r!==(r="ghost verticalWall player"+t[0]+" svelte-pic2r5")&&C(e,"class",r),3&n&&M(e,"player0",0===t[0]||t[1]),3&n&&M(e,"player1",1===t[0]&&!t[1])},i:t,o:t,d(t){t&&m(e)}}}function At(t){let n,e,r;return{c(){n=b("div"),C(n,"class","verticalWall svelte-pic2r5"),M(n,"player0",0===t[5].getVerticalWall(t[3],t[14],t[19]).player_id||t[1]),M(n,"player1",1===t[5].getVerticalWall(t[3],t[14],t[19]).player_id&&!t[1])},m(t,e){w(t,n,e),r=!0},p(t,e){42&e&&M(n,"player0",0===t[5].getVerticalWall(t[3],t[14],t[19]).player_id||t[1]),42&e&&M(n,"player1",1===t[5].getVerticalWall(t[3],t[14],t[19]).player_id&&!t[1])},i(t){r||(B((()=>{e||(e=lt(n,ht,{},!0)),e.run(1)})),r=!0)},o(t){e||(e=lt(n,ht,{},!1)),e.run(0),r=!1},d(t){t&&m(n),t&&e&&e.end()}}}function Ht(n){let e,r;return{c(){e=b("div"),C(e,"class",r="ghost pawn player"+n[0]+" svelte-pic2r5")},m(t,n){w(t,e,n)},p(t,n){1&n&&r!==(r="ghost pawn player"+t[0]+" svelte-pic2r5")&&C(e,"class",r)},i:t,o:t,d(t){t&&m(e)}}}function Wt(e){let r,i,s,a,c;return{c(){r=b("div"),C(r,"class",i="pawn player"+e[5].getPawn(e[4],e[14],e[19]).player_id+" svelte-pic2r5")},m(t,n){w(t,r,n),c=!0},p(t,n){e=t,(!c||16&n&&i!==(i="pawn player"+e[5].getPawn(e[4],e[14],e[19]).player_id+" svelte-pic2r5"))&&C(r,"class",i)},i(i){c||(B((()=>{a&&a.end(1),s=function(e,r,i){let l,s,a=r(e,i),c=!1,d=0;function p(){l&&N(e,l)}function h(){const{delay:r=0,duration:i=300,easing:o=n,tick:h=t,css:y}=a||it;y&&(l=W(e,0,1,i,r,o,y,d++)),h(0,1);const _=u()+r,g=_+i;s&&s.abort(),c=!0,B((()=>X(e,!0,"start"))),s=f((t=>{if(c){if(t>=g)return h(1,0),X(e,!0,"end"),p(),c=!1;if(t>=_){const n=o((t-_)/i);h(n,1-n)}}return c}))}let y=!1;return{start(){y||(y=!0,N(e),o(a)?(a=a(),Q().then(h)):h())},invalidate(){y=!1},end(){c&&(p(),c=!1)}}}(r,e[9],{key:e[5].getPawn(e[4],e[14],e[19]).player_id}),s.start()})),c=!0)},o(i){s&&s.invalidate(),a=function(e,r,i){let s,a=r(e,i),c=!0;const d=Z;function p(){const{delay:r=0,duration:i=300,easing:o=n,tick:p=t,css:h}=a||it;h&&(s=W(e,1,0,i,r,o,h));const y=u()+r,_=y+i;B((()=>X(e,!1,"start"))),f((t=>{if(c){if(t>=_)return p(0,1),X(e,!1,"end"),--d.r||l(d.c),!1;if(t>=y){const n=o((t-y)/i);p(1-n,n)}}return c}))}return d.r+=1,o(a)?Q().then((()=>{a=a(),p()})):p(),{end(t){t&&a.tick&&a.tick(1,0),c&&(s&&N(e,s),c=!1)}}}(r,e[8],{key:e[5].getPawn(e[4],e[14],e[19]).player_id}),c=!1},d(t){t&&m(r),t&&a&&a.end()}}}function Nt(t){let n,e,r,i,o=!t[5].isMargin(t[14])&&!t[5].isMargin(t[19]),s=o&&function(t){let n,e,r,i;const l=[Pt,Ct,zt],o=[];return~(e=function(t,n){return t[5].isPCell(t[14],t[19])?0:t[5].isVCell(t[14],t[19])?1:t[5].isHCell(t[14],t[19])?2:-1}(t))&&(r=o[e]=l[e](t)),{c(){n=b("div"),r&&r.c(),C(n,"class","cell svelte-pic2r5")},m(t,r){w(t,n,r),~e&&o[e].m(n,null),i=!0},p(t,n){r&&r.p(t,n)},i(t){i||(et(r),i=!0)},o(t){rt(r),i=!1},d(t){t&&m(n),~e&&o[e].d()}}}(t);return{c(){n=b("div"),s&&s.c(),C(n,"class","svelte-pic2r5"),M(n,"columnPCell",t[5].hasPCell(t[19])),M(n,"columnPath",t[5].isPath(t[19])),M(n,"columnMargin",t[5].isMargin(t[19]))},m(l,o){w(l,n,o),s&&s.m(n,null),e=!0,r||(i=[z(n,"mouseenter",t[6](t[14],t[19])),z(n,"click",t[7](t[14],t[19]))],r=!0)},p(n,e){t=n,o&&s.p(t,e)},i(t){e||(et(s),e=!0)},o(t){rt(s),e=!1},d(t){t&&m(n),s&&s.d(),r=!1,l(i)}}}function Et(t){let n,e,r,i=Array.from({length:t[5].cell_size},Jt),l=[];for(let n=0;n<i.length;n+=1)l[n]=Nt(kt(t,i,n));const o=t=>rt(l[t],1,1,(()=>{l[t]=null}));return{c(){n=b("div");for(let t=0;t<l.length;t+=1)l[t].c();e=x(),C(n,"class","columnContainer svelte-pic2r5"),M(n,"rowPCell",t[5].hasPCell(t[14])),M(n,"rowPath",t[5].isPath(t[14])),M(n,"rowMargin",t[5].isMargin(t[14]))},m(t,i){w(t,n,i);for(let t=0;t<l.length;t+=1)l[t].m(n,null);y(n,e),r=!0},p(t,r){if(255&r){let s;for(i=Array.from({length:t[5].cell_size},Jt),s=0;s<i.length;s+=1){const o=kt(t,i,s);l[s]?(l[s].p(o,r),et(l[s],1)):(l[s]=Nt(o),l[s].c(),et(l[s],1),l[s].m(n,e))}for(tt(),s=i.length;s<l.length;s+=1)o(s);nt()}32&r&&M(n,"rowPCell",t[5].hasPCell(t[14])),32&r&&M(n,"rowPath",t[5].isPath(t[14])),32&r&&M(n,"rowMargin",t[5].isMargin(t[14]))},i(t){if(!r){for(let t=0;t<i.length;t+=1)et(l[t]);r=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)rt(l[t]);r=!1},d(t){t&&m(n),$(l,t)}}}function Tt(t){let n,e,r=Array.from({length:t[5].cell_size},t[12]),i=[];for(let n=0;n<r.length;n+=1)i[n]=Et(xt(t,r,n));const l=t=>rt(i[t],1,1,(()=>{i[t]=null}));return{c(){n=b("div");for(let t=0;t<i.length;t+=1)i[t].c();C(n,"class","rowContainer svelte-pic2r5")},m(t,r){w(t,n,r);for(let t=0;t<i.length;t+=1)i[t].m(n,null);e=!0},p(t,[e]){if(255&e){let o;for(r=Array.from({length:t[5].cell_size},t[12]),o=0;o<r.length;o+=1){const l=xt(t,r,o);i[o]?(i[o].p(l,e),et(i[o],1)):(i[o]=Et(l),i[o].c(),et(i[o],1),i[o].m(n,null))}for(tt(),o=r.length;o<i.length;o+=1)l(o);nt()}},i(t){if(!e){for(let t=0;t<r.length;t+=1)et(i[t]);e=!0}},o(t){i=i.filter(Boolean);for(let t=0;t<i.length;t+=1)rt(i[t]);e=!1},d(t){t&&m(n),$(i,t)}}}const Jt=(t,n)=>n;function Vt(t,n,e){let r,i,l,{grid_size:o=9}=n,{current_player_id:s=0}=n,{option_same_wall_color:a=!1}=n;const c=new vt(o);let{board:u}=n;const d=T();const[p,h]=ft({duration:t=>Math.sqrt(700*t),fallback(t){const n=getComputedStyle(t),e="none"===n.transform?"":n.transform;return{duration:6e3,easing:pt,css:t=>`\n\t\t\t\t\ttransform: ${e} scale(${t});\n\t\t\t\t\topacity: ${t}\n\t\t\t\t`}}});return t.$$set=t=>{"grid_size"in t&&e(10,o=t.grid_size),"current_player_id"in t&&e(0,s=t.current_player_id),"option_same_wall_color"in t&&e(1,a=t.option_same_wall_color),"board"in t&&e(11,u=t.board)},t.$$.update=()=>{2048&t.$$.dirty&&e(4,r=u.pawn),2048&t.$$.dirty&&e(3,i=u.vertical_wall),2048&t.$$.dirty&&e(2,l=u.horizontal_wall)},[s,a,l,i,r,c,function(t,n){return()=>{let e,r;[e,r]=c.toGridIndex(t,n),d("hoverCell",{pieceType:e,nextPosition:r,cx:n,cy:t})}},function(t,n){return()=>{let e,r;[e,r]=c.toGridIndex(t,n),d("clickCell",{pieceType:e,nextPosition:r,cx:n,cy:t})}},p,h,o,u,(t,n)=>c.cell_size-n-1]}class jt extends ut{constructor(t){super(),ct(this,t,Vt,Tt,s,{grid_size:10,current_player_id:0,option_same_wall_color:1,board:11})}}function Gt(t){return"piece"===t.kind}function Rt(t,n,e){const r=e.pawn.length;if(t>=r-1)return!1;let i=!0;return n>0&&(i=i&&!Gt(e.horizontal_wall[t][n-1])),n<r-1&&(i=i&&!Gt(e.horizontal_wall[t][n])),i}function It(t,n,e){const r=e.pawn.length;if(0===t)return!1;let i=!0;return n>0&&(i=i&&!Gt(e.horizontal_wall[t-1][n-1])),n<r-1&&(i=i&&!Gt(e.horizontal_wall[t-1][n])),i}function qt(t,n,e){const r=e.pawn.length;if(n===r-1)return!1;let i=!0;return t>0&&(i=i&&!Gt(e.vertical_wall[t-1][n])),t<r-1&&(i=i&&!Gt(e.vertical_wall[t][n])),i}function Bt(t,n,e){const r=e.pawn.length;if(0===n)return!1;let i=!0;return t>0&&(i=i&&!Gt(e.vertical_wall[t-1][n-1])),t<r-1&&(i=i&&!Gt(e.vertical_wall[t][n-1])),i}function Lt(t,n,e){if(t[0]===n[0]&&t[1]===n[1]||Gt(e.pawn[n[0]][n[1]]))return!1;let r=t,i=n;const l=i[0]-r[0],o=i[1]-r[1],s=Math.abs(l)+Math.abs(o);if(1===s)return 0===l?(r[1]<=i[1]||([r,i]=[i,r]),qt(r[0],r[1],e)):(r[0]<=i[0]||([r,i]=[i,r]),Rt(r[0],r[1],e));if(2===s){if(o*l==0)return 0===l?(r[1]<=i[1]||([r,i]=[i,r]),qt(r[0],r[1],e)&&qt(r[0],r[1]+1,e)&&Gt(e.pawn[r[0]][r[1]+1])):(r[0]<=i[0]||([r,i]=[i,r]),Rt(r[0],r[1],e)&&Rt(r[0]+1,r[1],e)&&Gt(e.pawn[r[0]+1][r[1]]));{const t=Rt(r[0],r[1],e)&&!Rt(r[0]+1,r[1],e)&&Gt(e.pawn[r[0]+1][r[1]]),n=It(r[0],r[1],e)&&!It(r[0]-1,r[1],e)&&Gt(e.pawn[r[0]-1][r[1]]),l=qt(r[0],r[1],e)&&!qt(r[0],r[1]+1,e)&&Gt(e.pawn[r[0]][r[1]+1]),o=Bt(r[0],r[1],e)&&!Bt(r[0],r[1]-1,e)&&Gt(e.pawn[r[0]][r[1]-1]);return r[1]<i[1]?r[0]<i[0]?t&&qt(r[0]+1,r[1],e)||l&&Rt(r[0],r[1]+1,e):n&&qt(r[0]-1,r[1],e)||l&&It(r[0],r[1]+1,e):r[0]<i[0]?t&&Bt(r[0]+1,r[1],e)||o&&Rt(r[0],r[1]-1,e):n&&Bt(r[0]-1,r[1],e)||o&&It(r[0],r[1]-1,e)}}return!1}class Dt{constructor(t,n=[],e=0){this.grid_size=t;const r=t,i=[...Array(r)].map((()=>Array(r).fill(_t))),l=Math.floor(r/2);i[0][l]=gt(0,!1),i[r-1][l]=gt(1,!1);const o=[...Array(r-1)].map((()=>Array(r-1).fill(_t))),s=[...Array(r-1)].map((()=>Array(r-1).fill(_t)));this.board={pawn:i,vertical_wall:o,horizontal_wall:s},this.current_pawn=[[0,l],[r-1,l]],this.goal=[[...Array(r)].map(((t,n)=>[r-1,n])),[...Array(r)].map(((t,n)=>[0,n]))],this.current_player=-1,this.nextTurn(),this.history=n,this.history_index=e}nextTurn(){this.current_player=(this.current_player+1)%2,this.updateGhost(this.current_pawn[this.current_player],this.board)}updateGhost(t,n){!function(t,n){const e=n.pawn.length;for(let r=0;r<e;r++)for(let i=0;i<e;i++)"piece"!==n.pawn[r][i].kind&&(n.pawn[r][i]=Lt(t,[r,i],n)?_t:yt)}(this.current_pawn[this.current_player],this.board),function(t,n){const e=n.pawn.length;for(let t=0;t<e-1;t++)for(let r=0;r<e-1;r++)"piece"!==n.vertical_wall[t][r].kind&&(n.vertical_wall[t][r]=_t),"piece"!==n.horizontal_wall[t][r].kind&&(n.horizontal_wall[t][r]=_t)}(this.current_pawn[this.current_player],this.board)}loadHistory(t,n=-1){const e=JSON.parse(JSON.stringify(this.board)),r=e.pawn.length,i=Math.floor(r/2);let l=[[0,i],[r-1,i]],o=t.split(",");const s=-1===n?o.length:n;for(let t=0;t<o.length;t++){const n=o[t],r=t%2,i=[parseInt(n[1])-1,n[0].codePointAt(0)-"a".codePointAt(0)];let a,c;if(2===n.length)a=mt,c=l[r];else if(3===n.length&&"v"===n[2])a=$t,c=[-1,-1];else{if(3!==n.length||"h"!==n[2])return;a=bt,c=[-1,-1]}const u={piece:a,to:i,from:c};this.history.push(u),t>=s?"pawn"===a.kind&&(l[r]=i):("pawn"===a.kind?(e.pawn[c[0]][c[1]]=yt,e.pawn[i[0]][i[1]]=gt(r,!1),this.current_pawn[r]=i,l[r]=i):"vwall"===a.kind?e.vertical_wall[i[0]][i[1]]=gt(r,!1):"hwall"===a.kind&&(e.horizontal_wall[i[0]][i[1]]=gt(r,!1)),this.history_index++)}this.board=e,this.current_player=s%2,this.updateGhost(this.current_pawn[this.current_player],this.board)}handleTurn(t,n){const e=this.current_pawn[this.current_player],[r,i]=n;if("unknown"===t.kind)return!1;if("pawn"===t.kind){if(!Lt(e,n,this.board))return!1;const l=JSON.parse(JSON.stringify(this.board.pawn));this.commitHistory(t,n);const[o,s]=e;return l[o][s]=yt,l[r][i]=gt(this.current_player,!1),this.board.pawn=l,this.current_pawn[this.current_player]=[r,i],!0}const l=JSON.parse(JSON.stringify(this.board));if("vwall"===t.kind){if(r===this.grid_size-1)return!1;if("piece"===this.board.vertical_wall[r][i].kind)return!1;l.vertical_wall[r][i]=gt(this.current_player,!1)}else if("hwall"===t.kind){if(i===this.grid_size-1)return!1;if("piece"===this.board.horizontal_wall[r][i].kind)return!1;l.horizontal_wall[r][i]=gt(this.current_player,!1)}return function(t,n,e){const r=e.pawn.length;for(let t=0;t<r-1;t++)for(let n=0;n<r-1;n++){if(Gt(e.vertical_wall[t][n])&&Gt(e.horizontal_wall[t][n]))return!1;if(t!==r-2&&Gt(e.vertical_wall[t][n])&&Gt(e.vertical_wall[t+1][n]))return!1;if(n!==r-2&&Gt(e.horizontal_wall[t][n])&&Gt(e.horizontal_wall[t][n+1]))return!1}let i;function l(t,n){i[t][n]||(i[t][n]=!0,Rt(t,n,e)&&l(t+1,n),It(t,n,e)&&l(t-1,n),qt(t,n,e)&&l(t,n+1),Bt(t,n,e)&&l(t,n-1))}for(let e=0;e<t.length;e++){let o=!1;const s=t[e],a=n[e];i=[...Array(r)].map((()=>Array(r).fill(!1))),l(s[0],s[1]);for(let t=0;t<a.length;t++){const[n,e]=a[t];!0===i[n][e]&&(o=!0)}if(!o)return!1}return!0}(this.current_pawn,this.goal,l)?(this.commitHistory(t,n),this.board=l,!0):void 0}commitHistory(t,n){const e=this.current_pawn[this.current_player],r=this.history.slice(0,this.history_index);this.history_index++,r.push({piece:t,from:e,to:n}),this.history=r}previousStep(){if(this.history_index-1<0)return!1;this.history_index--;const t=this.history[this.history_index],n=t.piece.kind,[e,r]=t.from,[i,l]=t.to;if("pawn"===n){const t=(this.current_player+1)%2,n=JSON.parse(JSON.stringify(this.board.pawn));n[i][l]=yt,n[e][r]=gt(t,!1),this.board.pawn=n,this.current_pawn[t]=[e,r]}else"vwall"===n?this.board.vertical_wall[i][l]=yt:"hwall"===n&&(this.board.horizontal_wall[i][l]=yt);return!0}nextStep(){if(this.history_index+1>this.history.length)return!1;const t=this.history[this.history_index],n=t.piece.kind,[e,r]=t.from,[i,l]=t.to;if("pawn"===n){const t=JSON.parse(JSON.stringify(this.board.pawn));t[e][r]=yt,t[i][l]=gt(this.current_player,!1),this.board.pawn=t,this.current_pawn[this.current_player]=[i,l]}else"vwall"===n?this.board.vertical_wall[i][l]=gt(this.current_player,!1):"hwall"===n&&(this.board.horizontal_wall[i][l]=gt(this.current_player,!1));return this.history_index++,!0}dumpHistory(){const t=[];for(let n=0;n<this.history.length;n++){const e=this.history[n];let r="";r+=String.fromCharCode("a".charCodeAt(0)+e.to[1]),r+=e.to[0]+1,"vwall"===e.piece.kind?r+="v":"hwall"===e.piece.kind&&(r+="h"),t.push(r)}return t}}const Ft=t=>({}),Ut=t=>({copy:t[2]});function Kt(t){let n,e,r;const i=t[4].default,l=function(t,n,e,r){if(t){const i=a(t,n,e,r);return t[0](i)}}(i,t,t[3],Ut);return{c(){l&&l.c(),n=x(),e=b("textarea"),e.value=t[0],C(e,"class","svelte-w8w2mp")},m(i,o){l&&l.m(i,o),w(i,n,o),w(i,e,o),t[5](e),r=!0},p(t,[n]){l&&l.p&&(!r||8&n)&&function(t,n,e,r,i,l){if(i){const o=a(n,e,r,l);t.p(o,i)}}(l,i,t,t[3],r?function(t,n,e,r){if(t[2]&&r){const i=t[2](r(e));if(void 0===n.dirty)return i;if("object"==typeof i){const t=[],e=Math.max(n.dirty.length,i.length);for(let r=0;r<e;r+=1)t[r]=n.dirty[r]|i[r];return t}return n.dirty|i}return n.dirty}(i,t[3],n,Ft):function(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let t=0;t<e;t++)n[t]=-1;return n}return-1}(t[3]),Ut),(!r||1&n)&&(e.value=t[0])},i(t){r||(et(l,t),r=!0)},o(t){rt(l,t),r=!1},d(r){l&&l.d(r),r&&m(n),r&&m(e),t[5](null)}}}function Qt(t,n,e){let{$$slots:r={},$$scope:i}=n;const l=T();let o,{text:s}=n;return t.$$set=t=>{"text"in t&&e(0,s=t.text),"$$scope"in t&&e(3,i=t.$$scope)},[s,o,async function(){o.select(),document.execCommand("Copy"),await(q(),R),o.blur(),l("copy")},i,r,function(t){V[t?"unshift":"push"]((()=>{o=t,e(1,o)}))}]}class Xt extends ut{constructor(t){super(),ct(this,t,Qt,Kt,s,{text:0})}}function Yt(t){let n,e;return n=new Xt({props:{text:t[6],$$slots:{default:[Zt,({copy:t})=>({16:t}),({copy:t})=>t?65536:0]},$$scope:{ctx:t}}}),{c(){ot(n.$$.fragment)},m(t,r){st(n,t,r),e=!0},p(t,e){const r={};64&e&&(r.text=t[6]),196608&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r)},i(t){e||(et(n.$$.fragment,t),e=!0)},o(t){rt(n.$$.fragment,t),e=!1},d(t){at(n,t)}}}function Zt(t){let n,e,r;return{c(){n=b("button"),n.textContent="Copy",C(n,"class","svelte-lndpb1")},m(i,l){w(i,n,l),e||(r=z(n,"click",(function(){o(t[16])&&t[16].apply(this,arguments)})),e=!0)},p(n,e){t=n},d(t){t&&m(n),e=!1,r()}}}function tn(n){let e,r,i;return{c(){e=b("button"),e.textContent="Clear",C(e,"class","svelte-lndpb1")},m(t,l){w(t,e,l),r||(i=z(e,"click",n[12]),r=!0)},p:t,d(t){t&&m(e),r=!1,i()}}}function nn(t){let n,e,r=t[5].dumpHistory()+"";return{c(){n=b("p"),e=v(r),P(n,"margin-top","0px"),C(n,"class","svelte-lndpb1")},m(t,r){w(t,n,r),y(n,e)},p(t,n){32&n&&r!==(r=t[5].dumpHistory()+"")&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}(e,r)},d(t){t&&m(n)}}}function en(t){let n,e,r,i,o,s,a,c,u,d,p,h,f;e=new jt({props:{grid_size:t[0],current_player_id:t[8],board:t[7]}}),e.$on("clickCell",t[9]);let _=t[2]&&Yt(t),g=t[3]&&tn(t),$=t[4]&&nn(t);return{c(){n=b("div"),ot(e.$$.fragment),r=x(),i=b("div"),o=b("button"),o.textContent="next",s=x(),a=b("button"),a.textContent="previous",c=x(),_&&_.c(),u=x(),g&&g.c(),d=x(),$&&$.c(),P(n,"--board-area",t[1]),C(n,"class","svelte-lndpb1"),C(o,"class","svelte-lndpb1"),C(a,"class","svelte-lndpb1"),P(i,"margin","5px"),P(i,"width",t[1]),C(i,"class","svelte-lndpb1")},m(l,m){w(l,n,m),st(e,n,null),w(l,r,m),w(l,i,m),y(i,o),y(i,s),y(i,a),y(i,c),_&&_.m(i,null),y(i,u),g&&g.m(i,null),y(i,d),$&&$.m(i,null),p=!0,h||(f=[z(o,"click",t[10]),z(a,"click",t[11])],h=!0)},p(t,[r]){const l={};1&r&&(l.grid_size=t[0]),256&r&&(l.current_player_id=t[8]),128&r&&(l.board=t[7]),e.$set(l),(!p||2&r)&&P(n,"--board-area",t[1]),t[2]?_?(_.p(t,r),4&r&&et(_,1)):(_=Yt(t),_.c(),et(_,1),_.m(i,u)):_&&(tt(),rt(_,1,1,(()=>{_=null})),nt()),t[3]?g?g.p(t,r):(g=tn(t),g.c(),g.m(i,d)):g&&(g.d(1),g=null),t[4]?$?$.p(t,r):($=nn(t),$.c(),$.m(i,null)):$&&($.d(1),$=null),(!p||2&r)&&P(i,"width",t[1])},i(t){p||(et(e.$$.fragment,t),et(_),p=!0)},o(t){rt(e.$$.fragment,t),rt(_),p=!1},d(t){t&&m(n),at(e),t&&m(r),t&&m(i),_&&_.d(),g&&g.d(),$&&$.d(),h=!1,l(f)}}}function rn(t,n,e){let r,i,l,{board_size:o="500px"}=n,{grid_size:s=9}=n,{history_:a=null}=n,{step_:c=-1}=n,{showCopy:u=!1}=n,{showClear:d=!1}=n,{showHistory:p=!1}=n,h=new Dt(s);const f=new URLSearchParams(window.location.search);return null!==a?h.loadHistory(a,c):f.has("history"),t.$$set=t=>{"board_size"in t&&e(1,o=t.board_size),"grid_size"in t&&e(0,s=t.grid_size),"history_"in t&&e(13,a=t.history_),"step_"in t&&e(14,c=t.step_),"showCopy"in t&&e(2,u=t.showCopy),"showClear"in t&&e(3,d=t.showClear),"showHistory"in t&&e(4,p=t.showHistory)},t.$$.update=()=>{32&t.$$.dirty&&e(0,s=h.grid_size),32&t.$$.dirty&&e(8,r=h.current_player),32&t.$$.dirty&&e(7,i=h.board),32&t.$$.dirty&&e(6,l=window.location.origin+window.location.pathname+"?history="+h.dumpHistory())},[s,o,u,d,p,h,l,i,r,function(t){const n=t.detail.pieceType,r=t.detail.nextPosition;h.handleTurn(n,r)&&(h.nextTurn(),e(5,h))},function(){h.nextStep()&&(h.nextTurn(),e(5,h))},function(){h.previousStep()&&(h.nextTurn(),e(5,h))},function(){e(5,h=new Dt(s))},a,c]}class ln extends ut{constructor(t){super(),ct(this,t,rn,en,s,{board_size:1,grid_size:0,history_:13,step_:14,showCopy:2,showClear:3,showHistory:4})}}function on(n){let e,r;return e=new ln({props:{grid_size:9,board_size:"60vmin",showCopy:!0,showClear:!0}}),{c(){ot(e.$$.fragment)},m(t,n){st(e,t,n),r=!0},p:t,i(t){r||(et(e.$$.fragment,t),r=!0)},o(t){rt(e.$$.fragment,t),r=!1},d(t){at(e,t)}}}return new class extends ut{constructor(t){super(),ct(this,t,null,on,s,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
