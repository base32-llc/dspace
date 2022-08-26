/*! For license information please see main.4e506940.js.LICENSE.txt */
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,xc=fc`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Oc=fc`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Tc=dc("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ic} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${xc} 0.15s ease-out forwards;
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
    animation: ${Oc} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Pc=fc`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,jc=dc("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Pc} 1s linear infinite;
`,Rc=fc`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Nc=fc`
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
}`,zc=dc("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Rc} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Nc} 0.2s ease-out forwards;
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
`,Cc=dc("div")`
  position: absolute;
`,Bc=dc("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Lc=fc`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Dc=dc("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Lc} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Uc=({toast:e})=>{let{icon:r,type:n,iconTheme:i}=e;return void 0!==r?"string"==typeof r?t.createElement(Dc,null,r):r:"blank"===n?null:t.createElement(Bc,null,t.createElement(jc,{...i}),"loading"!==n&&t.createElement(Cc,null,"error"===n?t.createElement(Tc,{...i}):t.createElement(zc,{...i})))},Fc=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,qc=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,Kc=dc("div",t.forwardRef)`
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
`,Wc=dc("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Vc=t.memo((({toast:e,position:r,style:n,children:i})=>{let o=null!=e&&e.height?((e,t)=>{let r=e.includes("top")?1:-1,[n,i]=gc()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Fc(r),qc(r)];return{animation:t?`${fc(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${fc(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||r||"top-center",e.visible):{opacity:0},a=t.createElement(Uc,{toast:e}),s=t.createElement(Wc,{...e.ariaProps},pc(e.message,e));return t.createElement(Kc,{className:e.className,style:{...o,...n,...e.style}},"function"==typeof i?i({icon:a,message:s}):t.createElement(t.Fragment,null,a,s))}));!function(e,t,r,n){nc.p=t,cc=e,lc=r,hc=n}(t.createElement);var Hc=uc`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$c=({reverseOrder:e,position:r="top-center",toastOptions:n,gutter:i,children:o,containerStyle:a,containerClassName:s})=>{let{toasts:u,handlers:c}=Ac(n);return t.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...a},className:s,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map((n=>{let a=n.position||r,s=((e,t)=>{let r=e.includes("top"),n=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:gc()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...n,...i}})(a,c.calculateOffset(n,{reverseOrder:e,gutter:i,defaultPosition:r})),u=n.height?void 0:(e=>t=>{t&&setTimeout((()=>{let r=t.getBoundingClientRect();e(r)}))})((e=>{c.updateHeight(n.id,e.height)}));return t.createElement("div",{ref:u,className:n.visible?Hc:"",key:n.id,style:s},"custom"===n.type?pc(n.message,n):o?o(n):t.createElement(Vc,{toast:n,position:a}))})))},Gc=Ec;__webpack_require__(63407);const Zc=new n.Connection("https://ssc-dao.genesysgo.net/",{commitment:"max"}),Yc=()=>(0,Zu.jsxs)(Jc,{children:[(0,Zu.jsx)($c,{position:"bottom-left"}),(0,Zu.jsxs)($u,{children:[(0,Zu.jsx)(Vu,{path:"/",element:(0,Zu.jsx)(Qc,{})}),(0,Zu.jsx)(Vu,{path:"/register",element:(0,Zu.jsx)(Xc,{})})]})]}),Jc=({children:r})=>{const i=e.Devnet,a=(0,t.useMemo)((()=>(0,n.clusterApiUrl)(i)),[i]),s=(0,t.useMemo)((()=>[new J,new X,new ee]),[]);return(0,Zu.jsx)(o,{endpoint:a,children:(0,Zu.jsx)(R,{wallets:s,autoConnect:!0,children:(0,Zu.jsx)(V,{children:r})})})},Xc=()=>{const e=P(),[,r]=hu(fu),n=Ku(),[i,o]=(0,t.useState)(!1),[a,s]=(0,t.useState)(null);return(0,t.useEffect)((()=>{(async()=>{if(!e)return;const t=await te.KU.getBalances(Zc,e);s(t)})()}),[e]),(0,Zu.jsxs)(Zu.Fragment,{children:[(0,Zu.jsx)(Yu,{RightElement:(0,Zu.jsx)(G,{})}),a&&(0,Zu.jsxs)("div",{className:"Aligner",style:{height:"80vh"},children:[(0,Zu.jsx)("div",{className:"Aligner-item Aligner-item--top"}),(0,Zu.jsxs)("div",{className:"Aligner-item bg-gray-100 rounded p-10",children:[a&&(0,Zu.jsxs)("h1",{className:"text-2xl",children:[(0,Zu.jsx)("strong",{children:a.SOL.toFixed(2)})," SOL"," ",(0,Zu.jsx)("strong",{children:a.SHDW.toFixed(2)})," SHDW"]}),a&&0===a.SHDW&&(0,Zu.jsxs)("small",{className:"mb-5 text-red-700",children:["You need both SOL and SHDW tokens to use this application. You will not be able to continue until you have some. Purchase some SHDW tokens"," ",(0,Zu.jsx)("a",{className:"font-medium text-blue-600 underline pointer",href:"https://jup.ag/swap/SOL-SHDW",target:"__blank",children:"here."})," ","A few dollars is enough."]}),(0,Zu.jsx)("h1",{className:"text-xl mt-5",children:"Welcome to dspace! Let's set up your account. This will take two transactions."}),(0,Zu.jsx)("form",{onSubmit:t=>{t.preventDefault(),0!==a.SOL&&0!==a.SHDW&&(async()=>{if(!e)return;const t=Gc.loading("Setting up dspace account...");o(!0);try{const i=await te.KU.create(Zc,e),o=await i.getUserInfo();Gc.success("Account set up successfully!",{id:t}),r(o),n("/")}catch(i){Gc.error("Error setting up dspace account: "+i.toString(),{id:t})}})()},children:(0,Zu.jsx)("button",{type:"submit",style:{float:"right"},className:`${(0===a.SOL||0===a.SHDW)&&"cursor-not-allowed"} loading bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-5 ${i?"cursor-not-allowed":""}`,children:i?"Creating...":"Create Account"})})]}),(0,Zu.jsx)("div",{className:"Aligner-item Aligner-item--bottom"})]})]})},Qc=()=>{const e=P(),[r,n]=hu(fu),[i,o]=(0,t.useState)(!1),[a,s]=(0,t.useState)(""),[u,c]=(0,t.useState)(!1),l=Ku(),h=(0,te.Mv)();return(0,t.useEffect)((()=>{(async()=>{if(e&&null===r){if(!await te.KU.isRegistered(Zc,e))return console.warn("Not registered, send to registration page"),void l("/register");const t=await te.KU.create(Zc,e),r=await t.getUserInfo();n(r)}})()}),[e,r,n,l]),(0,Zu.jsxs)("div",{className:"App",children:[(0,Zu.jsx)(Ju,{open:i,form:(0,Zu.jsxs)("form",{onSubmit:async t=>{if(t.preventDefault(),u)return;c(!0);const r=Gc.loading("Changing username...");try{const t=await te.KU.create(Zc,e);await t.setUsername(a),n(await t.getUserInfo()),c(!1),o(!1),Gc.success("Username changed successfully!",{id:r})}catch(i){c(!1),Gc.error("Error changing username: "+i.toString(),{id:r})}},children:[(0,Zu.jsx)("label",{htmlFor:"helper-text",className:"block mb-2 text-sm font-medium text-gray-900",children:"New username"}),(0,Zu.jsx)("input",{type:"username",id:"helper-text",value:a,onChange:e=>s(e.target.value),"aria-describedby":"helper-text-explanation",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",placeholder:h}),(0,Zu.jsxs)("p",{id:"helper-text-explanation",className:"mt-2 text-sm text-gray-500 dark:text-gray-400",children:["You can change your username for dspace to whatever you desire. Usernames over 32 characters will be truncated when displayed. This can take a little while to propagate through the network."," "]}),(0,Zu.jsxs)("div",{className:"px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse",children:[(0,Zu.jsx)("button",{type:"submit",className:(u?"cursor-not-allowed":"")+" disabled w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm",children:u?"Submitting...":"Submit"}),(0,Zu.jsx)("button",{onClick:()=>{o(!1)},type:"button",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",children:"Cancel"})]})]})}),(0,Zu.jsx)(Yu,{RightElement:(0,Zu.jsx)(G,{})}),(0,Zu.jsxs)("div",{className:"container mx-auto mt-6",children:[r&&(0,Zu.jsxs)("p",{className:"text-xl",children:[(0,Zu.jsxs)("strong",{children:["@",r.username]}),(0,Zu.jsx)("svg",{style:{display:"inline-block",marginLeft:"2px"},xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"text-gray-700 pointer w-5 h-5",onClick:()=>{o(!0)},children:(0,Zu.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"})})]}),!r&&e.connected&&(0,Zu.jsx)("div",{className:"flex",children:(0,Zu.jsx)("div",{className:"spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full",role:"status",children:(0,Zu.jsx)("span",{className:"visually-hidden",children:(0,Zu.jsx)("strong",{style:{fontSize:"22px"},children:"."})})})}),!r&&!e.connected&&(0,Zu.jsx)("p",{className:"text-xl",children:(0,Zu.jsx)("strong",{children:"Please connect your wallet to continue."})})]})]})},el=e=>{e&&e instanceof Function&&__webpack_require__.e(853).then(__webpack_require__.bind(__webpack_require__,46853)).then((({getCLS:t,getFID:r,getFCP:n,getLCP:i,getTTFB:o})=>{t(e),r(e),n(e),i(e),o(e)}))};function tl(e){let{basename:r,children:n,window:i}=e,o=(0,t.useRef)();null==o.current&&(o.current=bu({window:i}));let a=o.current,[s,u]=(0,t.useState)({action:a.action,location:a.location});return(0,t.useLayoutEffect)((()=>a.listen(u)),[a]),(0,t.createElement)(Hu,{basename:r,children:n,location:s.location,navigationType:s.action,navigator:a})}r.createRoot(document.getElementById("root")).render((0,Zu.jsx)(t.StrictMode,{children:(0,Zu.jsx)(tl,{children:(0,Zu.jsx)(lu,{children:(0,Zu.jsx)(Yc,{})})})})),el()})()})();
//# sourceMappingURL=main.4e506940.js.map