import{d as s,r,j as e,m as ae,k as C,a as T,s as ce,u as le,c as Ce,G as Se,l as $e,g as de,f as Ae,n as pe,o as z,p as Ie,q as Re,t as Te,v as Be,W as Me,I as Le,w as ze,x as Ee,y as De,N as Fe}from"./index-Di7qIAgV.js";const Ne=s.div`
  position: fixed;
  bottom: 0px;
  width: inherit;
  display: flex;
  align-items: stretch;
  height: 40px;
`,Ge=s.textarea`
  flex: 2;
  outline: none;
  border: 1px solid #ff6932;
  background-color: #ff6932ca;
  color: white;
  font-size: 16px;
  scrollbar-width: none;
  resize: none;
  display: flex;
  padding: 10px 5px;
`,Oe=s.button`
  cursor: pointer;
  border: none;
  background-color: #ff6932;
  color: white;
  width: 50px;
  font-size: 16px;
  transition: all 0.2s;

  &:disabled {
    background-color: #ab674e;
  }
`;function He({send:n,blocked:l}){const[t,i]=r.useState("");return e.jsxs(Ne,{children:[e.jsx(Ge,{type:"text",value:l?"You are blocked by this user":t,onChange:u=>i(u.target.value)}),e.jsx(Oe,{disabled:t.trim().length<1||l,onClick:()=>{n(t),i("")},children:"send"})]})}const Pe=s.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 150px;
  width: 100%;
`,Ve=ae`
  0% {
      transform: rotate(0deg);
    }
  100% {
    transform: rotate(360deg);
  }
`,We=s.div`
  border: 6px solid teal;
  border-top: 6px solid orange;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${Ve} 1s linear infinite;
  box-shadow:
    0px -3px 5px 0px rgba(0, 0, 0, 0.5),
    inset 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
`;function K({endRef:n,loading:l,style:t={}}){return e.jsx(Pe,{ref:n,style:t,children:l&&e.jsx(We,{})})}function Ye(n,l=null){const[t,i]=r.useState(!0);return r.useEffect(()=>{if(n.current){const u={root:l,rootMargin:"0px",threshold:0};new IntersectionObserver(m=>{const[x]=m;x.isIntersecting?i(!0):i(!1)},u).observe(n.current)}},[n]),t}const Xe=s.textarea`
  margin-bottom: 5px;
  min-width: 240px;
  height: 58px;
  display: block;
  outline: none;
  background-color: transparent;
  color: inherit;
  border: 1px solid gold;
  scrollbar-width: none;
  resize: none;
  font-size: 14px;
  padding: 4px;
`,Q=s.button`
  border: none;
  border-radius: 3px;
  background-color: gold;
  padding: 2px;
  width: 50px;
  cursor: pointer;
  transition: all 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;function qe({message:n,loggedUser:l,setShowEdit:t,setMessages:i}){const[u,g]=r.useState("");r.useEffect(()=>{g(n.text)},[]);async function m(){if(u!==n.text){const x={headers:{Authorization:`bearer ${l.token}`}};try{const f=await C.patch(`/api/messages/${n.id}`,{text:u},x);i(S=>S.map(j=>f.data.id===j.id?f.data:j))}catch(f){console.log("Error:",f)}}t(!1)}return e.jsxs(e.Fragment,{children:[e.jsx(Xe,{type:"text",value:u,onChange:x=>g(x.target.value)}),e.jsx(Q,{onClick:()=>t(!1),children:"Cancel"}),e.jsx(Q,{style:{marginLeft:10},onClick:m,children:"Edit"})]})}const Je="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2016.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20width='485.219px'%20height='485.22px'%20viewBox='0%200%20485.219%20485.22'%20style='enable-background:new%200%200%20485.219%20485.22;'%20xml:space='preserve'%3e%3cg%3e%3cpath%20d='M467.476,146.438l-21.445,21.455L317.35,39.23l21.445-21.457c23.689-23.692,62.104-23.692,85.795,0l42.886,42.897%20C491.133,84.349,491.133,122.748,467.476,146.438z%20M167.233,403.748c-5.922,5.922-5.922,15.513,0,21.436%20c5.925,5.955,15.521,5.955,21.443,0L424.59,189.335l-21.469-21.457L167.233,403.748z%20M60,296.54c-5.925,5.927-5.925,15.514,0,21.44%20c5.922,5.923,15.518,5.923,21.443,0L317.35,82.113L295.914,60.67L60,296.54z%20M338.767,103.54L102.881,339.421%20c-11.845,11.822-11.815,31.041,0,42.886c11.85,11.846,31.038,11.901,42.914-0.032l235.886-235.837L338.767,103.54z%20M145.734,446.572c-7.253-7.262-10.749-16.465-12.05-25.948c-3.083,0.476-6.188,0.919-9.36,0.919%20c-16.202,0-31.419-6.333-42.881-17.795c-11.462-11.491-17.77-26.687-17.77-42.887c0-2.954,0.443-5.833,0.859-8.703%20c-9.803-1.335-18.864-5.629-25.972-12.737c-0.682-0.677-0.917-1.596-1.538-2.338L0,485.216l147.748-36.986%20C147.097,447.637,146.36,447.193,145.734,446.572z'/%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e",Ze=s.div`
  position: relative;
  background-color: #32cd32cd;
  margin: 10px;
  padding: 10px;
  width: fit-content;
  min-width: 100px;
  max-width: 80%;
  word-wrap: break-word;
  margin-left: ${({$side:n})=>n==="end"?"0px":"30px"};
  border-radius: ${({$side:n})=>n==="end"?"10px 0 10px 10px":"0 10px 10px 10px"};
  align-self: ${({$side:n})=>n};

  &.date {
    margin-top: 30px;
  }

  &.date::before {
    content: attr(data-date);
    position: absolute;
    top: -27px;
    border-radius: 5px;
    box-shadow: 0px -2px 2px -1px gold;
    text-align: center;
    right: ${({$side:n})=>n==="end"?"0px":""};
    left: ${({$side:n})=>n==="start"?"-20px":""};
    height: 12px;
    font-size: 12px;
    line-height: 100%;
    width: ${({$width:n})=>n};
    filter: brightness(0.8);
  }
`,_e=s.img`
  position: absolute;
  top: 0;
  left: -27px;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  background-color: gold;
  border: 2px solid gold;
  opacity: 0;
  object-fit: contain;
  transition: all 1s;
  cursor: pointer;
`,Ke=s.p`
  margin: 5px 10px 5px 0;
`,Qe=s.span`
  margin-top: 5px;
  font-size: 10px;
  float: right;
  filter: brightness(0.8);

  ${({$edited:n})=>n&&`&::before {
    content: "edited";
    position: absolute;
    left: -130%;
    font-style: italic;
  }`}
`,Ue=s.button`
  border: none;
  background-color: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
  transition: all 0.1s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;function et({message:n,parentWidth:l,setMessages:t}){const i=T(ce),[u,g]=r.useState(!1),m=le();return e.jsxs(Ze,{className:"messages",$side:i.id===n.userId?"end":"start","data-date":new Date(n.createdAt).toLocaleString("en-GB").slice(0,10),$width:`${l-20}px`,children:[i.id!==n.userId&&e.jsx(_e,{onClick:()=>m(`/contacts/${n.userId}`),src:`/public/uploads/avatars/${n.userId}.webp`,alt:"user avatar",onLoad:x=>{x.currentTarget.style.opacity=1},onError:x=>{x.currentTarget.onerror=null,x.currentTarget.src=Ce,x.currentTarget.style.opacity=1}}),u?e.jsx(qe,{message:n,loggedUser:i,setShowEdit:g,setMessages:t}):e.jsxs(Ke,{children:[n.userId===i.id&&e.jsx(Ue,{children:e.jsx("img",{src:Je,title:"Edit",onClick:()=>g(!0),style:{width:"12px",height:"12px",filter:"brightness(0) saturate(100%) invert(91%) sepia(17%) saturate(4935%) hue-rotate(357deg) brightness(99%) contrast(105%)"}})}),n.text]}),e.jsx(Qe,{$edited:n.updatedAt!==n.createdAt,children:new Date(n.createdAt).toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit"})})]})}function tt(n){return Se({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"},child:[]}]})(n)}const nt=ae`
  from {
    box-shadow: 0 0 0 0 rgba(50, 205, 50, 0);
  }
  50% {
    box-shadow: 0 0 10px 0 rgba(50, 205, 50, 1);
  }
  to {
    box-shadow: 0 0 20px 0 rgba(50, 205, 50, 0);
  }
`,ot=s.div`
  position: sticky;
  bottom: 50px;
  margin-left: auto;
  margin-right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  background-color: rgb(50, 205, 50);
  color: pink;
  cursor: pointer;
  transition: all 0.2s;
  transform: ${({$show:n})=>n?"":"translateX(150%)"};
  animation: ${({$new:n})=>n?$e`2s ${nt} ease-in-out infinite`:""};

  &:active {
    transform: scale(0.95);
  }
`;function it({unseen:n=0,scrollDown:l}){function t(){const i=document.getElementById("vp");i.scrollTo({top:i.scrollHeight,behavior:"smooth"})}return e.jsx(ot,{onClick:t,$new:n>0,$show:n||l,children:n>0?n:e.jsx(tt,{})})}const ue=s.div`
  position: fixed;
  inset: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8080806e;
  backdrop-filter: blur(2px);
`,xe=s.div`
  width: 160px;
  background-color: teal;
  padding: 10px;
`,ge=s.h4`
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`,fe=s.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`,W=s.button`
  width: 40px;
  border: none;
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 3px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;function st({setShowModal:n,handleRemoveMember:l}){return e.jsx(ue,{children:e.jsxs(xe,{children:[e.jsx(ge,{children:"Remove member?"}),e.jsxs(fe,{children:[e.jsx(W,{onClick:()=>n(!1),children:"No"}),e.jsx(W,{onClick:()=>{n(!1),l()},children:"Yes"})]})]})})}function rt({setShowModal:n,handleRemoveAdmin:l}){return e.jsx(ue,{children:e.jsxs(xe,{children:[e.jsx(ge,{children:"Remove admin?"}),e.jsxs(fe,{children:[e.jsx(W,{onClick:()=>n(!1),children:"No"}),e.jsx(W,{onClick:()=>{n(!1),l()},children:"Yes"})]})]})})}const at=s.div`
  height: calc(100vh - 80px);
  width: 80%;
  background-color: #00ff007d;
  margin-left: auto;
  margin-top: calc(-100vh + 80px);
  position: sticky;
  bottom: 40px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: ${({$show:n})=>n?"translateX(0%)":"translateX(101%)"};
  transition: all 0.4s;
  z-index: 2;
  backdrop-filter: blur(5px);
  overflow: auto;
`,ct=s.h3`
  text-align: center;
`,lt=s.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,P=s.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`,dt=s.input`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 160px;
`,U=s.select`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 160px;
  outline: none;
`,V=s.option``,y=s.button`
  all: unset;
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px;
  cursor: pointer;
  text-align: center;
`,ee=s.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`,te=s.button`
  border: none;
  background-color: teal;
  color: white;
  padding: 3px;
  transition: 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`,ne=s.h4`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
`,pt=s.label`
  font-size: 12px;
  font-weight: 600;
`,oe=s.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  height: 70px;
`,ie=s.img`
  height: 100%;
  display: block;
  object-fit: cover;
`,se=s.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  align-self: flex-start;
  gap: 5px;
  width: 40%;
  height: 100%;
  transition: all 0.2s;
`,re=s.div`
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px;
  cursor: pointer;
  text-align: center;
`,ut=r.forwardRef(function({show:l,chat:t,loggedUser:i,setDeletedBg:u},g){var _;const[m,x]=r.useState("Choose background"),[f,S]=r.useState(null),[j,E]=r.useState("Choose background"),[v,Y]=r.useState(null),[k,D]=r.useState(""),[F,X]=r.useState(""),[q,J]=r.useState(),[$,B]=r.useState(""),[A,N]=r.useState(),[M,I]=r.useState(!1),[h,G]=r.useState(!1),w=de(),a=T(Ae),p=T(pe).filter(o=>t==null?void 0:t.members.includes(o.id)),d=((i==null?void 0:i.admin)||((_=t.admins)==null?void 0:_.includes(i.id)))&&t.group,O=le();r.useEffect(()=>{t&&(t.name?D(t.name):t.group||D(p.find(o=>o!==i.id).name))},[t]);function Z(){d&&k.length>0&&k.length<21&&w(z({token:i.token,updateData:{name:k},id:t.id}))}function L(){d&&w(z({token:i.token,updateData:{members:[...new Set([...t.members,parseInt(F)])]},id:t.id}))}function H(){d&&w(z({token:i.token,updateData:{members:[...new Set([...t.members.filter(o=>o!==q)])]},id:t.id}))}function he(){d&&w(z({token:i.token,updateData:{public:!t.public},id:t.id}))}function me(){d&&w(z({token:i.token,updateData:{admins:[...new Set([...t.admins,parseInt($)])]},id:t.id}))}function be(){d&&t.admins.length>1&&w(z({token:i.token,updateData:{admins:[...new Set([...t.admins.filter(o=>o!==A)])]},id:t.id}))}async function ve(o){o.preventDefault();const b=new FormData;b.append("name",m),b.append("file",f);try{await C.post(`/api/backgrounds/${m}`,b,{headers:{"Content-Type":"multipart/form-data",Authorization:`bearer ${i.token}`}}),window.location.reload()}catch(R){console.log("Error:",R)}}async function we(){try{(await C.delete(`/api/backgrounds/${i.id}-${t.id}`,{headers:{"Content-Type":"multipart/form-data",Authorization:`bearer ${i.token}`}})).status===200&&u(!0)}catch(o){console.log("Error:",o)}}async function je(o){o.preventDefault();const b=new FormData;b.append("name",j),b.append("file",v);try{await C.post(`/api/chatAvatars/${j}`,b,{headers:{"Content-Type":"multipart/form-data",Authorization:`bearer ${i.token}`}})}catch(R){console.log("Error:",R)}}async function ke(){try{const o=await C.delete(`/api/chatAvatars/${t.id}`,{headers:{"Content-Type":"multipart/form-data",Authorization:`bearer ${i.token}`}})}catch(o){console.log("Error:",o)}}async function ye(){const o={headers:{Authorization:`bearer ${i.token}`}},b={members:t.members.filter(R=>R!==i.id)};t.admins.includes(i.id)&&(b.admins=t.admins.filter(R=>R!==i.id)),await C.patch(`/api/chats/${t.id}`,b,o),w(Ie(t.id)),O("/chats")}return e.jsxs(at,{ref:g,$show:l,children:[e.jsx(ct,{children:"Customize chat"}),d&&e.jsxs(lt,{children:[e.jsxs(P,{children:[e.jsx(dt,{type:"text",disabled:!(t!=null&&t.group),value:k,onChange:o=>D(o.target.value)}),e.jsx(y,{disabled:!(t!=null&&t.group),onClick:Z,children:"Change title"})]}),e.jsxs(P,{children:[e.jsxs(U,{value:F,name:"addContact",onChange:o=>X(o.target.value),children:[e.jsx(V,{},0),a==null?void 0:a.map(o=>e.jsx(V,{value:o.id,children:o.name},o.id))]}),e.jsx(y,{disabled:!F,onClick:L,children:"Add contact"})]}),e.jsxs(P,{children:[e.jsxs(U,{value:$,name:"addAdmin",onChange:o=>B(o.target.value),children:[e.jsx(V,{}),p==null?void 0:p.map(o=>e.jsx(V,{value:o.id,children:o.name},o.id))]}),e.jsx(y,{disabled:!$,onClick:me,children:"Add admin"})]}),e.jsxs("div",{children:[e.jsx(ne,{children:"Chat members"}),e.jsx(ee,{children:p.map(o=>e.jsx(te,{title:"Remove member from chat?",onClick:()=>{I(!0),J(o.id)},children:o.name},o.id))})]}),e.jsxs("div",{children:[e.jsx(ne,{children:"Chat admins"}),e.jsx(ee,{children:p.filter(o=>t.admins.includes(o.id)).map(o=>e.jsx(te,{title:"Remove admin privileges?",onClick:()=>{G(!0),N(o.id)},children:o.name},o.id))})]}),e.jsxs(P,{children:[e.jsx(pt,{htmlFor:"public",children:"Set group to private"}),e.jsx("input",{type:"checkbox",id:"public",checked:!(t!=null&&t.public),onChange:he})]})]}),t.group&&e.jsx(y,{onClick:ye,children:"Leave chat"}),e.jsx(y,{onClick:we,style:{textAlign:"center",marginBottom:-10},children:"Remove current background"}),e.jsxs(oe,{children:[e.jsxs(se,{id:"background-form",encType:"multipart/form-data",children:[e.jsxs("label",{htmlFor:"background",children:[e.jsx("input",{style:{display:"none"},id:"background",type:"file",name:"background",onChange:o=>{x(`${i.id}-${t.id}`),S(o.target.files[0])}}),e.jsx(re,{type:"button",children:"Choose image"})]}),e.jsx(y,{type:"submit",disabled:!f,onClick:o=>ve(o),children:"Set image"})]}),f&&e.jsx(ie,{alt:"chosen background",src:f?URL.createObjectURL(f):`/public/uploads/backgrounds/${i==null?void 0:i.id}-${t==null?void 0:t.id}.webp`})]}),e.jsx(y,{onClick:ke,style:{textAlign:"center",marginBottom:-10},children:"Remove current avatar"}),e.jsxs(oe,{children:[e.jsxs(se,{id:"chat-avatar-form",encType:"multipart/form-data",children:[e.jsxs("label",{htmlFor:"chat-avatar",children:[e.jsx("input",{style:{display:"none"},id:"chat-avatar",type:"file",name:"chat-avatar",onChange:o=>{E(t.id),Y(o.target.files[0])}}),e.jsx(re,{type:"button",children:"Choose image"})]}),e.jsx(y,{type:"submit",disabled:!v,onClick:o=>je(o),children:"Set image"})]}),v&&e.jsx(ie,{alt:"chosen background",src:v?URL.createObjectURL(v):`/public/uploads/chats/${t==null?void 0:t.id}.webp`})]}),M&&e.jsx(st,{setShowModal:I,handleRemoveMember:H}),h&&e.jsx(rt,{setShowModal:G,handleRemoveAdmin:be})]})}),xt=s.div`
  min-height: calc(100vh - 35px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: inherit;
  background-image: url(${({$backgroundUrl:n})=>n});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`,gt=s.h2`
  position: sticky;
  top: 0px;
  right: 0px;
  height: 40px;
  margin-top: -45px;
  margin-bottom: 5px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 128, 128, 0.7);
  backdrop-filter: blur(20px);
  font-size: 16px;
`,ft=s(Fe)`
  position: absolute;
  left: 0;
  margin-left: 10px;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`,ht=s.button`
  all: unset;
  position: absolute;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: rotateZ(90deg);
  }
`,mt=s.div`
  flex: 2;
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  padding-bottom: 10px;

  & * {
    overflow-anchor: none;
  }
  ${({$limit:n})=>`
    & .messages:nth-last-child(${n+3}) {
      overflow-anchor: auto;
    }
  `}
`,bt=s.p`
  overflow-anchor: auto;
  height: 1px;
`;function wt(){const{id:n}=Re(),l=T(ce),t=T(a=>Te(a,n)),i=T(pe),[u,g]=r.useState([]),[m,x]=r.useState(!1),f=de(),S=20,[j,E]=r.useState(!1),v=T(a=>Be(a,n)),[Y,k]=r.useState(!1),[D,F]=r.useState(!1),[X,q]=r.useState(!1),J=r.useRef(null),$=r.useRef(0),B=r.useRef(null),A=r.useRef(!1),N=r.useRef(null),M=r.useRef(!0),I=Ye(N,document.getElementById("vp")),h=r.useContext(Me),G=r.useCallback(async a=>{const{token:c,id:p,offset:d,limit:O}=a,Z={headers:{Authorization:`bearer ${c}`}},L=await C.get(`/api/messages/chat/${p}?pagination=${d},${O}`,Z);if(E(!1),L.data.length!==O&&(A.current=!0),!L.data.length){A.current=!0;return}g(H=>H.length?[...H,...L.data]:[...L.data])},[]);if(r.useEffect(()=>{E(!0),I&&!A.current&&(G({token:l.token,id:n,offset:$.current,limit:S}),$.current+=S)},[I,l,n,G]),r.useEffect(()=>{E(!1),B.current&&(B.current.childNodes.forEach(p=>p.classList.remove("date")),Object.keys(Object.groupBy(u,({createdAt:p})=>new Date(p).toLocaleString("en-GB").slice(0,10))).forEach(p=>{const d=document.querySelectorAll(`[data-date="${p}"]`);d[d.length-1].classList.add("date")})),console.log("FIRST",M.current,u.length);let a;if(M.current&&u.length){const c=document.getElementById("vp");console.log("FOO",c.scrollTop,c.scrollHeight),a=setTimeout(()=>c.scrollTop=c.scrollHeight,100),console.log("BAR",c.scrollTop,c.scrollHeight),M.current=!1}return()=>clearTimeout(a)},[u]),r.useEffect(()=>{!M.current&&h&&h.chatId==n&&(g(a=>a.length?a.map(c=>c.id).includes(h.id)?a.map(c=>c.id===h.id?h:c):[h,...a.filter(c=>c.id!==h.id)]:[h]),$.current+=1)},[h,n,l]),r.useLayoutEffect(()=>{const a=document.getElementById("vp");let c=0;function p(d){d.target.scrollTop<100&&(d.target.scrollTop=100),d.target.scrollHeight-d.target.scrollTop<d.target.offsetHeight+50&&f(De({token:l.token,count:0,chatId:n})),d.target.scrollHeight-d.target.scrollTop>d.target.offsetHeight+500?d.target.scrollTop-c>10&&d.target.scrollTop-c<500?k(!0):d.target.scrollTop<c&&k(!1):k(!1),c=d.target.scrollTop}return a.addEventListener("scroll",p),()=>{a.removeEventListener("scroll",p)}},[]),!t||!i||i.find(a=>a.id===t.members.find(c=>c!==l.id))===void 0)return e.jsx(K,{endRef:N,loading:I&&j&&!A.current});async function w(a){const c={headers:{Authorization:`bearer ${l.token}`}};try{await C.post("/api/messages",{chatId:t.id,text:a},c)}catch(p){p.response.data.error==="You are blocked by this user"&&x(!0)}}return e.jsxs(xt,{$backgroundUrl:X?"":`/public/uploads/backgrounds/${l==null?void 0:l.id}-${t==null?void 0:t.id}.webp`,children:[e.jsxs(gt,{children:[e.jsx(Le.Provider,{value:{color:"gold",size:"2em"},children:e.jsx(ft,{to:"/chats",title:"Go back",children:e.jsx(ze,{})})}),t.name||i.find(a=>a.id===t.members.find(c=>c!==l.id)).name,e.jsx(ht,{onClick:()=>F(a=>!a),children:e.jsx("img",{src:Ee,title:"Chat settings",style:{filter:"brightness(0) saturate(100%) invert(91%) sepia(17%) saturate(4935%) hue-rotate(357deg) brightness(99%) contrast(105%)"}})})]}),e.jsxs(mt,{ref:B,$limit:S,children:[e.jsx(bt,{}),u.map(a=>{var c;return e.jsxs(et,{parentWidth:(c=B.current)==null?void 0:c.offsetWidth,message:a,setMessages:g,children:[a.id,": ",a.text]},a.id)}),e.jsx(K,{endRef:N,loading:I&&j&&!A.current,style:{marginBottom:100}})]}),e.jsx(He,{send:w,blocked:m}),e.jsx(it,{unseen:v==null?void 0:v.count,scrollDown:Y}),e.jsx(ut,{ref:J,show:D,chat:t,loggedUser:l,setDeletedBg:q})]})}export{wt as default};
