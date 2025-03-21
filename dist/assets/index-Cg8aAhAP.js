import{d as n,u as y,a as c,s as j,b as C,j as t,c as A,I as S,e as I,r as d,f as m,g as U,h as z,i as B,k as E,S as T}from"./index-CnANVkTc.js";const D=n.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  gap: 10px;
  width: 100%;
  height: 60px;
  position: relative;
  cursor: pointer;
`,M=n.div`
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  box-shadow: 0 0 5px 0 rgba(125, 235, 155, 1);
`,$=n.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
  opacity: 0;
  transition: all 1s;
`,L=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  width: calc(100% - 60px - 5px);
  position: relative;
`,F=n.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(100, 100, 100, 0.2),
    rgba(100, 100, 100, 0.2) 20%,
    transparent
  );
  border-radius: 30px;
  z-index: -1;
`,N=n.h2`
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`,O=n.span`
  padding: 2px;
  background-color: gold;
  color: black;
  font-size: 12px;
  border-radius: 3px;
`;function P({contact:a}){var r;const l=y(),i=c(j),s=c(e=>C(e,i.id));return t.jsxs(D,{onClick:()=>l(`/contacts/${a.id}`),children:[t.jsx(M,{children:t.jsx($,{src:`/public/uploads/avatars/${a.id}.webp`,alt:"user avatar",onLoad:e=>{e.currentTarget.style.opacity=1},onError:e=>{e.currentTarget.onerror=null,e.currentTarget.src=A,e.currentTarget.style.opacity=1},height:"100%",width:"100%"})}),t.jsxs(L,{children:[t.jsx(N,{children:a.name}),((r=s.blockedUsers)==null?void 0:r.includes(a.id))&&t.jsx(O,{children:"Blocked"})]}),t.jsx(F,{})]})}const R=n.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  position: fixed;
  bottom: 46px;
  align-self: end;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: transparent;
  box-shadow: 0 0 10px 0 gold;
  transition: all 0.1s;

  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 gold;
  }
`;function q({setAddContactModal:a}){return t.jsx(R,{onClick:()=>a(!0),title:"Add contact",children:t.jsx(S.Provider,{value:{color:"gold",size:"100%"},children:t.jsx(I,{})})})}const G=n.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
`,H=n.div`
  background-color: #32cd3275;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 10px;
`,J=n.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  align-self: stretch;
`,f=n.button`
  width: 60px;
  border: none;
  background-color: #c43b0a;
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
`,K=n.select`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 160px;
  outline: none;
`,b=n.option``;function Q({setAddContactModal:a}){const[l,i]=d.useState([]),[s,r]=d.useState(-1),e=c(j),x=c(o=>C(o,e.id)),v=c(m),g=U();function w(){var o;s!==-1&&(g(z({token:e.token,updateData:{contacts:[...new Set((o=x.contacts)!=null&&o.length?[...x.contacts,parseInt(s)]:[parseInt(s)])]},id:e.id})),r(-1),i(p=>p.filter(u=>parseInt(s)!==u.id)),setTimeout(()=>g(B({token:e.token})),300))}return d.useEffect(()=>{async function o(){const p={headers:{Authorization:`bearer ${e.token}`}},u=await E.get("/api/users",p);i(()=>u.data.filter(h=>!v.map(k=>k.id).includes(h.id)&&h.id!==e.id))}e&&o()},[e]),t.jsx(G,{children:t.jsxs(H,{children:[t.jsxs(J,{children:[t.jsxs(K,{name:"AddContact",value:s,onChange:o=>r(o.target.value),children:[t.jsx(b,{}),l.sort((o,p)=>o.name.localeCompare(p.name)).map(o=>t.jsx(b,{value:o.id,children:o.name},o.id))]}),t.jsx(f,{disabled:s===-1,onClick:w,children:"Add user"})]}),t.jsx(f,{onClick:()=>a(!1),children:"Close"})]})})}const V=n.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  width: 100%;
  justify-content: start;
`;function X(){const a=c(m),[l,i]=d.useState(!1),[s,r]=d.useState("");return d.useEffect(()=>{document.getElementById("vp").scrollTo({top:0})},[]),t.jsxs(V,{children:[t.jsx(T,{filter:s,setFilter:r}),a.filter(e=>e.name.toLowerCase().includes(s)).map(e=>t.jsx(P,{contact:e},e.id)),t.jsx(q,{setAddContactModal:i}),l&&t.jsx(Q,{setAddContactModal:i})]})}export{X as default};
