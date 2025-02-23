import{d as a,g as f,j as e,c as j,h as x,z as g,i as y,A as k,q as v,a as l,s as w,b as u,r as C,I as U,w as D,N as B}from"./index-CoZiDz3r.js";const I=a.div`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`,E=a.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  opacity: 0;
  border-radius: 10px;
  transition: all 1s;
`,d=a.span`
  opacity: 0.6;
`,p=a.p`
  align-self: start;
  background-color: #00808079;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  font-size: 12px;
`,T=a.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`,h=a.button`
  width: 60px;
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
`;function z({contact:t,user:n,loggedUser:o}){const c=n.blockedUsers!==null?n.blockedUsers.includes(t.id):!1,r=n.contacts.includes(t.id)||!1,s=f();function m(){s(x({token:o.token,updateData:{blockedUsers:n.blockedUsers===null?[t.id]:c?n.blockedUsers.filter(i=>i!==t.id):[...new Set([...n.blockedUsers,t.id])]},id:o.id}))}function b(){n.contacts!==null&&(s(x({token:o.token,updateData:{contacts:r?n.contacts.filter(i=>i!==t.id):[...n.contacts,t.id]},id:o.id})),r?s(g(t.id)):(s(y({token:o.token})),setTimeout(()=>s(k({token:o.token,id:t.id})),300)))}return e.jsxs(I,{children:[e.jsx(E,{src:`/public/uploads/avatars/${t.id}.webp`,alt:"user avatar",onLoad:i=>{i.currentTarget.style.opacity=1},onError:i=>{i.currentTarget.onerror=null,i.currentTarget.src=j,i.currentTarget.style.opacity=1},height:"100%",width:"100%"}),e.jsxs(p,{children:[e.jsx(d,{children:"Name:"})," ",t.name]}),e.jsxs(p,{children:[e.jsx(d,{children:"Username:"})," ",t.username]}),e.jsxs(p,{children:[e.jsx(d,{children:"E-mail:"})," ",t.email]}),e.jsxs(T,{children:[e.jsx(h,{onClick:m,children:c?"Unblock":"Block"}),e.jsx(h,{onClick:b,children:r?"Remove":"Add"})]})]})}const A=a.div`
  display: flex;
  justify-content: center;
`,L=a(B)`
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  margin-top: -40px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gold;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;function R(){const{id:t}=v(),n=l(w),o=f(),c=l(s=>u(s,t)),r=l(s=>u(s,n.id));return C.useEffect(()=>{n&&o(k({token:n.token,id:t}))},[n]),!c||!r?null:e.jsxs(A,{children:[e.jsx(U.Provider,{value:{color:"gold",size:"2em"},children:e.jsx(L,{to:"/contacts",title:"Go back",children:e.jsx(D,{})})}),e.jsx(z,{contact:c,user:r,loggedUser:n})]})}export{R as default};
