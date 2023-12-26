import{y as d,r as l,B as r,S as f}from"./index-n9U5kex4.js";const u=d("div")`
  padding: 10px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 10;
  cursor: pointer;
  background: rgb(241, 242, 243);
  text-align: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  visibility: ${e=>e.show?"visible":"hidden"};
  opacity: ${e=>e.show?"1":"0"};
  display: flex;

  &:hover,
  &:active,
  &:focus {
    background: rgb(224, 224, 224);
  }

  @media screen and (max-width: 1240px) {
    display: none;
  }
`;function c(e){return e!=null&&e===e.window}const p=(e,s)=>{var t;if(typeof window>"u")return 0;const n=s?"scrollTop":"scrollLeft";let o=0;return c(e)?o=e[s?"pageYOffset":"pageXOffset"]:e instanceof Document?o=e.documentElement[n]:e&&(o=e[n]),e&&!c(e)&&typeof o!="number"&&(o=(t=(e.ownerDocument||e).documentElement)==null?void 0:t[n]),o},m=()=>{const[e,s]=l.useState(!1),n=t=>{const i=p(t.target,!0);!e&&i>350?s(!0):i<=350&&s(!1)};l.useEffect(()=>(window.addEventListener("scroll",n),()=>{window.removeEventListener("scroll",n)}),[]);const o=()=>{document.getElementById("intro").scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})};return r.jsx(u,{onClick:o,show:e,children:r.jsx(f,{src:"scroll-top.svg",width:"20px",height:"20px"})})};export{m as default};
