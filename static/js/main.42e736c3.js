/*! For license information please see main.42e736c3.js.LICENSE.txt */
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Oc=dc`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Tc=dc`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Pc=pc("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${xc} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Oc} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Tc} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,jc=dc`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Rc=pc("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${jc} 1s linear infinite;
`,Nc=dc`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Cc=dc`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,zc=pc("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Nc} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Cc} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Bc=pc("div")`
  position: absolute;
`,Lc=pc("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Dc=dc`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Uc=pc("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Dc} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Fc=({toast:e})=>{let{icon:r,type:n,iconTheme:i}=e;return void 0!==r?"string"==typeof r?t.createElement(Uc,null,r):r:"blank"===n?null:t.createElement(Lc,null,t.createElement(Rc,{...i}),"loading"!==n&&t.createElement(Bc,null,"error"===n?t.createElement(Pc,{...i}):t.createElement(zc,{...i})))},qc=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,Kc=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,Wc=pc("div",t.forwardRef)`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Vc=pc("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Hc=t.memo((({toast:e,position:r,style:n,children:i})=>{let o=null!=e&&e.height?((e,t)=>{let r=e.includes("top")?1:-1,[n,i]=yc()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[qc(r),Kc(r)];return{animation:t?`${dc(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${dc(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||r||"top-center",e.visible):{opacity:0},a=t.createElement(Fc,{toast:e}),s=t.createElement(Vc,{...e.ariaProps},mc(e.message,e));return t.createElement(Wc,{className:e.className,style:{...o,...n,...e.style}},"function"==typeof i?i({icon:a,message:s}):t.createElement(t.Fragment,null,a,s))}));!function(e,t,r,n){ic.p=t,lc=e,hc=r,fc=n}(t.createElement);var $c=cc`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Gc=({reverseOrder:e,position:r="top-center",toastOptions:n,gutter:i,children:o,containerStyle:a,containerClassName:s})=>{let{toasts:u,handlers:c}=Ic(n);return t.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...a},className:s,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map((n=>{let a=n.position||r,s=((e,t)=>{let r=e.includes("top"),n=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:yc()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...n,...i}})(a,c.calculateOffset(n,{reverseOrder:e,gutter:i,defaultPosition:r})),u=n.height?void 0:(e=>t=>{t&&setTimeout((()=>{let r=t.getBoundingClientRect();e(r)}))})((e=>{c.updateHeight(n.id,e.height)}));return t.createElement("div",{ref:u,className:n.visible?$c:"",key:n.id,style:s},"custom"===n.type?mc(n.message,n):o?o(n):t.createElement(Hc,{toast:n,position:a}))})))},Zc=Ac;const Yc=hu({key:"balance",default:null});function Jc(){var e,r;const[n,i]=fu(Yc),o=P(),a=async()=>{if(!o||!o.connected)return;const e=await te.KU.getBalances(el,o);i(e)};return function(e,r){const n=(0,t.useRef)(e);(0,t.useEffect)((()=>{if(!r&&0!==r)return;const e=setInterval((()=>n.current()),r);return()=>clearInterval(e)}),[r])}(a,1e4),(0,t.useEffect)((()=>{a()}),[o]),null===n?(0,Yu.jsx)("div",{children:(0,Yu.jsxs)("h1",{className:"text-sm text-monospace text-white font-mono",children:[(0,Yu.jsx)("strong",{children:"\xa0"}),"\xa0",(0,Yu.jsx)("strong",{children:"\xa0"}),"\xa0"]})}):(0,Yu.jsx)("div",{children:(0,Yu.jsxs)("h1",{className:"text-sm text-monospace text-white font-mono",children:[(0,Yu.jsx)("strong",{children:null===(e=n.SOL)||void 0===e?void 0:e.toFixed(2)})," SOL\xa0\xa0",(0,Yu.jsx)("strong",{children:null===(r=n.SHDW)||void 0===r?void 0:r.toFixed(2)})," SHDW"]})})}function Xc(e){return(0,Yu.jsxs)("label",{className:"w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-gray-700",children:[(0,Yu.jsx)("svg",{className:"w-8 h-8",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:(0,Yu.jsx)("path",{d:"M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"})}),(0,Yu.jsx)("span",{className:"mt-2 text-base leading-normal",children:"Select a file"}),(0,Yu.jsx)("input",{type:"file",className:"hidden",onChange:t=>{if(!t.target.files)return;const r=t.target.files[0];e.onUpload(r)}})]})}function Qc(e){return`/icons/defaultAvatars/${e.toLowerCase().replace(/[^a-z0-9]/g,"").replace(/\s/g,"").substring(0,2).toUpperCase()}.png`}__webpack_require__(63407);const el=new n.Connection("https://ssc-dao.genesysgo.net/",{commitment:"max"}),tl=()=>(0,Yu.jsxs)(rl,{children:[(0,Yu.jsx)(Gc,{position:"bottom-left"}),(0,Yu.jsx)(Ju,{RightElement:(0,Yu.jsxs)(Yu.Fragment,{children:[(0,Yu.jsx)(q,{}),(0,Yu.jsx)("br",{}),(0,Yu.jsx)(Jc,{})]})}),(0,Yu.jsxs)(Gu,{children:[(0,Yu.jsx)(Hu,{path:"/",element:(0,Yu.jsx)(il,{})}),(0,Yu.jsx)(Hu,{path:"/register",element:(0,Yu.jsx)(nl,{})})]})]}),rl=({children:r})=>{const i=e.Devnet,a=(0,t.useMemo)((()=>(0,n.clusterApiUrl)(i)),[i]),s=(0,t.useMemo)((()=>[new J,new X,new ee]),[]);return(0,Yu.jsx)(o,{endpoint:a,children:(0,Yu.jsx)(R,{wallets:s,autoConnect:!0,children:(0,Yu.jsx)(G,{children:r})})})},nl=()=>{const e=P(),[,r]=fu(du),n=Wu(),[i,o]=(0,t.useState)(!1),[a]=fu(Yc);return(0,Yu.jsx)(Yu.Fragment,{children:a&&(0,Yu.jsxs)("div",{className:"Aligner",style:{height:"80vh"},children:[(0,Yu.jsx)("div",{className:"Aligner-item Aligner-item--top"}),(0,Yu.jsxs)("div",{className:"Aligner-item bg-gray-100 rounded p-10",children:[(0,Yu.jsx)("h1",{className:"text-2xl font-bold",children:"Account Setup"}),a&&(0===a.SHDW||0===a.SOL)&&(0,Yu.jsxs)("p",{className:"mt-5 text-red-700",children:["You need both SOL and SHDW tokens to use this application. You will not be able to continue until you have some. Purchase some SHDW tokens"," ",(0,Yu.jsx)("a",{className:"font-medium text-blue-600 underline pointer",href:"https://jup.ag/swap/SOL-SHDW",target:"__blank",children:"here."})," ","A few dollars is enough."]}),a&&a.SHDW>0&&a.SOL>0&&(0,Yu.jsx)("h1",{className:"text-xl mt-5",children:"Welcome to dspace. Let's set up your account. This will take two transactions."}),a&&a.SHDW>0&&a.SOL>0&&(0,Yu.jsx)("form",{onSubmit:t=>{t.preventDefault(),0!==a.SOL&&0!==a.SHDW&&(async()=>{if(!e||!e.connected)return;const t=Zc.loading("Setting up dspace account...");o(!0);try{const i=await te.KU.create(el,e),o=await i.getUserInfo();Zc.success("Account set up successfully!",{id:t}),r(o),n("/")}catch(i){Zc.error("Error setting up dspace account: "+i.toString(),{id:t})}})()},children:(0,Yu.jsx)("button",{type:"submit",style:{float:"right"},className:"loading bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-5 "+(i?"cursor-not-allowed":""),children:i?"Creating...":"Create Account"})})]}),(0,Yu.jsx)("div",{className:"Aligner-item Aligner-item--bottom"})]})})},il=()=>{const e=P(),[r,n]=fu(du),[i,o]=(0,t.useState)(!1),[a,s]=(0,t.useState)(""),[u,c]=(0,t.useState)(!1),[l,h]=(0,t.useState)(!1),f=Wu(),d=(0,te.Mv)();return(0,t.useEffect)((()=>{(async()=>{if(e&&e.connected&&null===r){const r=Zc.loading("Logging in to dspace...");try{if(!await te.KU.isRegistered(el,e))return console.warn("Not registered, send to registration page"),Zc.error("You aren't registered for dspace yet. Please make an account.",{id:r}),void f("/register")}catch(t){Zc.error("Error occured when searching for account: "+t.toString(),{id:r})}try{const t=await te.KU.create(el,e),i=await t.getUserInfo();Zc.success("Logged in successfully!",{id:r}),n(i)}catch(t){Zc.error("Error occured when logging in: "+t.toString(),{id:r})}}})()}),[e,r,n,f]),(0,Yu.jsxs)("div",{className:"App",children:[(0,Yu.jsx)(Xu,{open:l,close:()=>h(!1),title:"Change Profile Picture",form:(0,Yu.jsxs)("div",{className:"inline-flex justify-center content-center mx-auto",children:[(0,Yu.jsx)(Xc,{onUpload:async t=>{const i=Zc.loading("Uploading profile picture...");try{if(!r)return void Zc.error("User is not logged in, try refreshing the page",{id:i});const o=await te.KU.create(el,e);await o.setPFP(t),Zc.success("Profile picture uploaded successfully!",{id:i});const a={...r};n(a),h(!1)}catch(o){Zc.error("Error occured when uploading profile picture: "+o.toString(),{id:i})}}}),(0,Yu.jsx)("br",{})]})}),(0,Yu.jsx)(Xu,{open:i,close:()=>o(!1),title:"Change Username",form:(0,Yu.jsxs)("form",{onSubmit:async t=>{if(t.preventDefault(),u)return;c(!0);const i=Zc.loading("Changing username to "+a+"...");try{const t=await te.KU.create(el,e);if(await t.setUsername(a),r){const e={...r};e.username=a,n(e)}c(!1),o(!1),Zc.success("Username changed successfully!",{id:i})}catch(s){c(!1),Zc.error("Error changing username: "+s.toString(),{id:i})}},children:[(0,Yu.jsx)("label",{htmlFor:"helper-text",className:"block mb-2 text-sm font-medium text-gray-900",children:"New username"}),(0,Yu.jsx)("input",{type:"username",id:"helper-text",value:a,onChange:e=>s(e.target.value),"aria-describedby":"helper-text-explanation",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",placeholder:d}),(0,Yu.jsxs)("p",{id:"helper-text-explanation",className:"mt-2 text-sm text-gray-500 dark:text-gray-400",children:["You can change your username for dspace to whatever you desire. Usernames over 32 characters will be truncated when displayed. This can take a little while to propagate through the network."," "]}),(0,Yu.jsxs)("div",{className:"px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse",children:[(0,Yu.jsx)("button",{type:"submit",className:(u?"cursor-not-allowed":"")+" disabled w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm",children:u?"Submitting...":"Submit"}),(0,Yu.jsx)("button",{onClick:()=>{o(!1)},type:"button",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",children:"Cancel"})]})]})}),(0,Yu.jsxs)("div",{className:"container mx-auto mt-6",children:[r&&(0,Yu.jsxs)("div",{className:"text-xl text-center",children:[(0,Yu.jsx)("img",{onClick:()=>{h(!0)},style:{display:"inline-block",marginRight:"0.5rem"},className:"pointer rounded-full h-12 hover:opacity-90",src:r.pfp?r.pfp:Qc(r.username),alt:r.username}),(0,Yu.jsxs)("strong",{children:["@",r.username]}),(0,Yu.jsx)("svg",{style:{display:"inline-block",marginLeft:"2px"},xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"text-gray-700 pointer w-5 h-5",onClick:()=>{o(!0)},children:(0,Yu.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"})})]}),!r&&e.connected&&(0,Yu.jsx)("div",{}),!r&&!e.connected&&(0,Yu.jsx)("p",{className:"text-xl text-center",children:(0,Yu.jsx)("strong",{children:"Please connect your wallet to continue."})})]})]})},ol=e=>{e&&e instanceof Function&&__webpack_require__.e(853).then(__webpack_require__.bind(__webpack_require__,46853)).then((({getCLS:t,getFID:r,getFCP:n,getLCP:i,getTTFB:o})=>{t(e),r(e),n(e),i(e),o(e)}))};function al(e){let{basename:r,children:n,window:i}=e,o=(0,t.useRef)();null==o.current&&(o.current=vu({window:i}));let a=o.current,[s,u]=(0,t.useState)({action:a.action,location:a.location});return(0,t.useLayoutEffect)((()=>a.listen(u)),[a]),(0,t.createElement)($u,{basename:r,children:n,location:s.location,navigationType:s.action,navigator:a})}r.createRoot(document.getElementById("root")).render((0,Yu.jsx)(t.StrictMode,{children:(0,Yu.jsx)(al,{children:(0,Yu.jsx)(lu,{children:(0,Yu.jsx)(tl,{})})})})),ol()})()})();
//# sourceMappingURL=main.42e736c3.js.map