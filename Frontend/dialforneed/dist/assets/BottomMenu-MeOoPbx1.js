import{R as k,aE as p,n as a,ah as M,j as i,a3 as C,aD as x,z as E,s as F,cf as b,cg as f,ch as l,ci as r,cj as B,ck as O,cl as L,cm as y,aG as s,b0 as c,cn as P,co as T,cp as D,cq as I,cr as N,cs as U,ct as G,b2 as H,cu as w,b3 as z,cv as V,b4 as q,cw as d,b5 as m,cx as W,cy as Z}from"./index-_oCaa9Py.js";const K=({link:t,icon:n,iconActive:h,title:v,cart:j,isAdmin:g})=>{const{pathname:S}=p(),R=S===t,o=a(M);return i.jsxs(C,{style:{textDecoration:"none"},className:`d-flex ${g?"mr-4":""} flex-column align-items-center`,to:t,children:[j&&i.jsx("p",{style:{fontSize:"6px",position:"absolute"},className:"m-0 badge rounded-pill bg-danger",children:o.length!==0?o.length:null}),R?i.jsx(h,{fontSize:"1.5rem",color:"#1BA786"}):i.jsx(n,{fontSize:"1.5rem"}),i.jsx("span",{style:{fontSize:"10px",color:"#4c4F53",fontFamily:"poppins"},children:v})]})},e=k.memo(K);function u(t){return x({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z"},child:[]}]})(t)}function A(t){return x({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12.97 2.59a1.5 1.5 0 0 0-1.94 0l-7.5 6.363A1.5 1.5 0 0 0 3 10.097V19.5A1.5 1.5 0 0 0 4.5 21h4.75a.75.75 0 0 0 .75-.75V14h4v6.25c0 .414.336.75.75.75h4.75a1.5 1.5 0 0 0 1.5-1.5v-9.403a1.5 1.5 0 0 0-.53-1.144l-7.5-6.363Z"},child:[]}]})(t)}const $=()=>{const t=a(E),n=a(F);return i.jsx("div",{className:"d-sm-block d-md-block  d-lg-none",children:i.jsx("div",{className:"bottomMenu ",children:i.jsxs("ul",{id:"menu",className:"p-0 px-2 m-0",children:[(n==null?void 0:n.role)!=="admin"?i.jsx(e,{link:"/",icon:u,iconActive:A,title:"HOME"}):"",t?n.role==="user"?i.jsxs(i.Fragment,{children:[i.jsx(e,{link:"/my-orders",icon:l,iconActive:r,title:"ORDERS"}),i.jsx(e,{link:"/requests",icon:B,iconActive:O,title:"REQUESTS"}),i.jsx(e,{link:"/cart",icon:L,iconActive:y,cart:!0,title:"CART"}),i.jsx(e,{link:"/myprofile",icon:s,iconActive:c,title:"PROFILE"})]}):n.role==="admin"?i.jsxs("div",{className:"w-100 d-flex justify-content-between",style:{overflow:"auto",scrollbarWidth:"none"},children:[i.jsx(e,{isAdmin:!0,link:"/",icon:u,iconActive:A,title:"HOME"}),i.jsx(e,{isAdmin:!0,link:"/admin/dashboard",icon:P,iconActive:T,title:"DASHBOARD"}),i.jsx(e,{isAdmin:!0,link:"/admin/products",icon:D,iconActive:I,title:"PRODUCTS"}),i.jsx(e,{isAdmin:!0,link:"/admin/orders",icon:l,iconActive:r,title:"ORDERS"}),i.jsx(e,{isAdmin:!0,link:"/admin/users",icon:s,iconActive:c,title:"USERS"}),i.jsx(e,{isAdmin:!0,link:"/admin/reviews",icon:N,iconActive:U,title:"COMMENTS"}),i.jsx(e,{isAdmin:!0,link:"/admin/categories",icon:G,iconActive:H,title:"CATEGORIES"}),i.jsx(e,{isAdmin:!0,link:"/admin/brands",icon:w,iconActive:z,title:"BRANDS"}),i.jsx(e,{isAdmin:!0,link:"/admin/employees",icon:V,iconActive:q,title:"EMPLOYEES"}),i.jsx(e,{isAdmin:!0,link:"/admin/tasks",icon:d,iconActive:m,title:"TASKS"}),i.jsx(e,{isAdmin:!0,link:"/admin/carousels",icon:W,iconActive:Z,title:"CAROUSELS"})]}):i.jsxs(i.Fragment,{children:[i.jsx(e,{link:"/my-tasks",icon:d,iconActive:m,title:"MY TASKS"}),i.jsx(e,{link:"/myprofile",icon:s,iconActive:c,title:"PROFILE"})]}):i.jsx(i.Fragment,{children:i.jsx(e,{link:"/login",icon:b,iconActive:f,title:"LOGIN"})})]})})})};export{$ as default};
