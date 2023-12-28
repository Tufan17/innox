import{y as n,z as p,B as e,D as x,E as o,S as m,F as g}from"./index-f-2079ob.js";import{F as j}from"./index-Ty0r34uI.js";const f=n("section")`
  position: relative;
  padding: 10rem 0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 4rem;
  }
`,u=n("p")`
  margin: 1.5rem 0 2rem 0;
  color: #000;

`,w=n("div")`
  position: relative;
  max-width: 540px;

  @media only screen and (max-width: 575px) {
    padding-top: 4rem;
  }
`,y=n("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
`,v=n("h6")`
  font-size: 15px;
  line-height: 1rem;
  padding: 0.5rem 0;
  text-transform: uppercase;
  color: #000;
  font-family: "Motiva Sans Light", sans-serif;
`,B=n("p")`
  font-size: 13px;
  color: #000;

`,C=({icon:t,title:a,content:d,section:c,t:i,id:l})=>e.jsx(f,{children:e.jsx(j,{direction:"left",children:e.jsxs(x,{justify:"space-between",align:"middle",id:l,children:[e.jsx(o,{lg:11,md:11,sm:12,xs:24,children:e.jsx(m,{src:t,width:"100%",height:"100%"})}),e.jsx(o,{lg:11,md:11,sm:11,xs:24,children:e.jsxs(w,{children:[e.jsx("h6",{style:{marginTop:"50px",marginBottom:"50px"},children:i(a)}),e.jsx(u,{children:i(d)}),e.jsx(y,{children:e.jsx(x,{justify:"space-between",children:typeof c=="object"&&c.map((r,s)=>e.jsxs(o,{span:11,children:[e.jsx(m,{src:r.icon,width:"60px",height:"60px"}),e.jsx(v,{children:i(r.title)}),e.jsx(B,{children:i(r.content)})]},s))})})]})})]})})}),b=p()(C),k=n("section")`
  position: relative;
  padding:  0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 8rem 0 6rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 4rem 0 3rem;
  }
`,R=n("p")`
  margin: 1.5rem 0 2rem 0;
  color: #000;

`,S=n("div")`
  position: relative;
  max-width: 540px;

  @media only screen and (max-width: 575px) {
    padding-bottom: 4rem;
  }
`,T=n("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;

  @media screen and (min-width: 1024px) {
    max-width: 80%;
  }

  button:last-child {
    margin-left: 20px;
  }
`,W=({title:t,content:a,button:d,icon:c,t:i,id:l})=>{const r=s=>{document.getElementById(s).scrollIntoView({behavior:"smooth"})};return e.jsx(k,{children:e.jsx(j,{direction:"right",children:e.jsxs(x,{justify:"space-between",align:"middle",id:l,children:[e.jsx(o,{lg:11,md:11,sm:11,xs:24,children:e.jsxs(S,{children:[e.jsx("h6",{style:{marginTop:"50px",marginBottom:"50px"},children:i(t)}),e.jsx(R,{children:i(a)}),e.jsx(T,{children:typeof d=="object"&&d.map((s,h)=>e.jsx(g,{color:s.color,fixedWidth:!0,onClick:()=>r("about"),children:i(s.title)},h))})]})}),e.jsx(o,{lg:11,md:11,sm:12,xs:24,children:e.jsx(m,{src:c,width:"100%",height:"100%"})})]})})})},L=p()(W),F=t=>t.type==="left"?e.jsx(b,{...t}):t.type==="right"?e.jsx(L,{...t}):null;export{F as default};
