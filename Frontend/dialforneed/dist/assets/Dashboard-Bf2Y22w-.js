import{aD as v,n as l,P as k,v as w,r as C,aM as z,aN as D,aO as R,aP as S,aQ as I,aR as P,aS as O,aT as E,aU as T,aV as F,aW as V,aX as A,aY as B,aw as U,aZ as M,j as s,a_ as H,a3 as r,a$ as L,b0 as W,b1 as _,b2 as Z,b3 as G,b4 as Q,b5 as X,b6 as Y}from"./index-_oCaa9Py.js";function $(t){return v({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"},child:[]}]})(t)}const J=()=>{const t=l(k),e=w();let o=0;t.length>0&&t.forEach(a=>{a.stock===0&&o++}),C.useEffect(()=>{e(z()),e(D()),e(R()),e(S()),e(I()),e(P()),e(O()),e(E())},[e]);const i=l(T),f=l(F),g=l(V),b=l(A),p=l(B),d=l(U),N=l(M);let x=0;i.length>0&&i.forEach(a=>{x+=a.totalPrice});const u=(a,n)=>{const h=new Set(n==null?void 0:n.map(c=>{var j;return(j=c==null?void 0:c.orderItem)==null?void 0:j._id}));console.log(h);let m=0;return a==null||a.forEach(c=>{h.has(c._id)||m++}),m};console.log(d);const y=a=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a);return s.jsxs("div",{children:[s.jsx("h2",{children:"Dashboard"}),s.jsx("div",{className:"row m-0",children:s.jsx("div",{className:"col-xl-12 col-sm-12 mb-3",children:s.jsx("div",{className:"card text-black shadow-sm rounded-2 border o-hidden h-100",children:s.jsxs("div",{className:"card-body",children:[s.jsx("div",{className:"d-flex align-items-center justify-content-center",children:s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(0, 128, 0, 0.2)",border:"15px solid rgba(0, 128, 0, 0.4)"},children:s.jsx("div",{style:{backgroundColor:"rgba(0, 128, 0, 0.8)",padding:"10px",borderRadius:"50%"},children:s.jsx($,{fontSize:"2rem",color:"white",className:"p-0"})})})}),s.jsxs("div",{className:"text-center card-font-size",children:["Total Amount",s.jsx("br",{})," ",s.jsx("b",{children:y(x)})]})]})})})}),s.jsxs("div",{className:"row m-0",children:[s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3",children:s.jsxs("div",{className:"card text-dark shadow-sm rounded-2 border  o-hidden h-100",children:[s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(13,202,240, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(H,{fontSize:"1.8rem",style:{color:"rgba(13,202,240)"},className:"p-0"})})}),s.jsxs("div",{className:"pl-3 card-font-size",children:["Products",s.jsx("br",{})," ",s.jsx("b",{children:t.length})]})]}),s.jsxs(r,{href:"/admin/products",className:"card-footer text-dark clearfix small z-1",to:"/admin/products",children:[s.jsx("span",{className:"float-left",children:"View Details"}),s.jsx("span",{className:"float-right",children:s.jsx("i",{className:"fa fa-angle-right"})})]})]})}),s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3",children:s.jsxs("div",{className:"card text-dark bg-white o-hidden h-100",children:[s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(220,53,69, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(L,{fontSize:"1.8rem",style:{color:"rgb(220,53,69)"},className:"p-0"})})}),s.jsxs("div",{className:"pl-3 card-font-size",children:["Orders",s.jsx("br",{})," ",s.jsx("b",{children:i.length})]})]}),s.jsxs(r,{className:"card-footer  clearfix text-dark small z-1",to:"/admin/orders",children:[s.jsx("span",{className:"float-left",children:"View Details"}),s.jsx("span",{className:"float-right",children:s.jsx("i",{className:"fa fa-angle-right"})})]})]})}),s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3",children:s.jsxs("div",{className:"card text-dark bg-white o-hidden h-100",children:[s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(255,193,7, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(W,{fontSize:"1.8rem",style:{color:"rgb(255,193,7)"},className:"p-0"})})}),s.jsxs("div",{className:" pl-3 card-font-size",children:["Users",s.jsx("br",{})," ",s.jsx("b",{children:f.length})]})]}),s.jsxs(r,{className:"card-footer  text-dark clearfix small z-1",to:"/admin/users",children:[s.jsx("span",{className:"float-left",children:"View Details"}),s.jsx("span",{className:"float-right",children:s.jsx("i",{className:"fa fa-angle-right"})})]})]})})]}),s.jsxs("div",{className:"row m-0",children:[s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3",children:s.jsx("div",{className:"card text-dark shadow-sm rounded-2 border  o-hidden h-100",children:s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(301,100, 38, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(_,{fontSize:"1.8rem",style:{color:"hsl(301,100%,38%)"},className:"p-0"})})}),s.jsxs("div",{className:" pl-3 card-font-size",children:["Out of Stock",s.jsx("br",{})," ",s.jsx("b",{children:o})]})]})})}),s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3",children:s.jsxs("div",{className:"card text-dark bg-white o-hidden h-100",children:[s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(0,237,189, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(Z,{fontSize:"1.8rem",style:{color:"rgb(0,237,189)"},className:"p-0"})})}),s.jsxs("div",{className:"pl-3 card-font-size",children:["Categories",s.jsx("br",{})," ",s.jsx("b",{children:g.length})]})]}),s.jsxs(r,{className:"card-footer  clearfix text-dark small z-1",to:"/admin/categories",children:[s.jsx("span",{className:"float-left",children:"View Details"}),s.jsx("span",{className:"float-right",children:s.jsx("i",{className:"fa fa-angle-right"})})]})]})}),s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3",children:s.jsxs("div",{className:"card text-dark bg-white o-hidden h-100",children:[s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(240,0,255, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(G,{fontSize:"1.8rem",style:{color:"rgb(240,0,255)"},className:"p-0"})})}),s.jsxs("div",{className:" pl-3 card-font-size",children:["Brands",s.jsx("br",{})," ",s.jsx("b",{children:b.length})]})]}),s.jsxs(r,{className:"card-footer  text-dark clearfix small z-1",to:"/admin/brands",children:[s.jsx("span",{className:"float-left",children:"View Details"}),s.jsx("span",{className:"float-right",children:s.jsx("i",{className:"fa fa-angle-right"})})]})]})})]}),s.jsxs("div",{className:"row m-0",children:[s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3",children:s.jsxs("div",{className:"card text-dark shadow-sm rounded-2 border  o-hidden h-100",children:[s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(222,255,0, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(Q,{fontSize:"1.8rem",style:{color:"rgb(222,255,0)"},className:"p-0"})})}),s.jsxs("div",{className:" pl-3 card-font-size",children:["Employees",s.jsx("br",{})," ",s.jsx("b",{children:p.length})]})]}),s.jsxs(r,{className:"card-footer text-dark clearfix small z-1",to:"/admin/employees",children:[s.jsx("span",{className:"float-left",children:"View Details"}),s.jsx("span",{className:"float-right",children:s.jsx("i",{className:"fa fa-angle-right"})})]})]})}),s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3",children:s.jsxs("div",{className:"card text-dark bg-white o-hidden h-100",children:[s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(66,255,0, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(X,{fontSize:"1.8rem",style:{color:"rgb(66,255,0)"},className:"p-0"})})}),s.jsxs("div",{className:"pl-3 card-font-size",children:["Tasks",s.jsx("br",{})," ",s.jsx("b",{children:d.length})]})]}),s.jsxs(r,{className:"card-footer  clearfix text-dark small z-1",to:"/admin/tasks",children:[s.jsx("span",{className:"float-left",children:"View Details"}),s.jsx("span",{className:"float-right",children:s.jsx("i",{className:"fa fa-angle-right"})})]})]})}),s.jsx("div",{className:"col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3",children:s.jsx("div",{className:"card text-dark bg-white o-hidden h-100",children:s.jsxs("div",{className:"card-body d-flex align-items-center justify-content-start",children:[s.jsx("div",{style:{width:"70px",height:"70px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",backgroundColor:"rgba(0,205,24, 0.2)"},children:s.jsx("span",{className:"p-5",children:s.jsx(Y,{fontSize:"1.8rem",style:{color:"rgb(0,205,24)"},className:"p-0"})})}),s.jsxs("div",{className:" pl-3 card-font-size",children:["Pending Tasks",s.jsx("br",{})," ",s.jsx("b",{children:u(N,d)})]})]})})})]})]})};export{J as default};
