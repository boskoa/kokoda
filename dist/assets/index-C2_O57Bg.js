import{d as o,L as e,j as n,O as i}from"./index-DsFFpPwm.js";const r=o.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  perspective: 800px;
  perspective-origin: 50%;
`,a=o.div`
  width: 300px;
  min-height: 420px;
  background-color: teal;
  transform: ${({$rotate:t})=>`rotateY(${t})`};
  transition: all 0.5s cubic-bezier(0.69, 0.09, 0.77, 1.38);
`,l=o.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  color: gold;
  padding: 20px 10px;
  opacity: ${({$opacity:t})=>t};
  transform: ${({$rotate:t})=>`rotateY(${t})`};
  transition: opacity 0.5s ease-out;
`,c=o.h2`
  margin-bottom: 0px;
`,d=o.div`
  position: relative;
  width: 90%;
`,p=o.input`
  position: relative;
  border: none;
  color: ${({$color:t})=>t};
  border: 3px solid ${({$color:t})=>t};
  width: 100%;
  background-color: teal;
  outline: none;
  font-size: 16px;
  padding: 0 5px;
  z-index: 3;
  transition: all 0.2s;

  &::placeholder {
    color: #d3d1c5;
  }
`,x=o.p`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  height: 100%;
  color: red;
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  z-index: 2;
  transform: ${({$show:t})=>t?"translateY(105%)":"translateY(0)"};
  transition: all 0.1s;
`,g=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`,u=o.button`
  color: teal;
  background-color: gold;
  border: none;
  padding: 5px 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  ${({$disabled:t})=>t?`
        filter: grayscale(80%);
      `:`
    &:hover {
      box-shadow: 0 0 5px 0 gold;
    }

    &:active {
      transform: rotateX(180deg);
    }
  `}
`,h=o.p`
  color: gold;
  border: 3px solid red;
  padding: 2px;
  width: 90%;
  text-align: center;
  opacity: ${({$show:t})=>t?1:0};
  transition: all 0.3s;
`;function f(){const{pathname:t}=e();return n.jsx(r,{children:n.jsx(a,{$rotate:t==="/authentication/login"?"0deg":"180deg",children:n.jsx(i,{})})})}export{p as AuthInput,u as Button,g as ButtonContainer,x as Error,l as FormContainer,d as InputContainer,h as ReqError,c as Title,f as default};
