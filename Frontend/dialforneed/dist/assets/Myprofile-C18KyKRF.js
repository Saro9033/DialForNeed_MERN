import{k as $,n as d,s as q,X as V,Y as W,z as X,r as n,v as Y,Z,_,$ as J,j as e,a0 as K,a1 as Q,a2 as k,a3 as x,M as ee,G as c,H as a,F as A,a4 as se}from"./index-_oCaa9Py.js";const te=()=>{const{enqueueSnackbar:m}=$(),s=d(q),b=d(V),h=d(W),E=window.innerWidth<850,i=d(X),[P,v]=n.useState(!1),j=()=>v(!1),r=()=>v(!0),[y,L]=n.useState(s==null?void 0:s.name),[g,I]=n.useState(s==null?void 0:s.email),[u,z]=n.useState(s==null?void 0:s.address),[f,F]=n.useState(s==null?void 0:s.phoneNumber),[N,G]=n.useState(s==null?void 0:s.postalCode),[C,U]=n.useState(s==null?void 0:s.city),[w,D]=n.useState(s==null?void 0:s.country),[M,B]=n.useState(null),[R,T]=n.useState(s==null?void 0:s.avatar),o=Y(),H=t=>{const l=new FileReader,p=t.target.files[0];l.onload=()=>{l.readyState===2&&(T(l.result),B(p))},p&&l.readAsDataURL(p)},O=t=>{t.preventDefault();let l=new FormData;l.append("name",y),l.append("email",g),l.append("phoneNumber",f),l.append("address",u),l.append("postalCode",N),l.append("city",C),l.append("country",w),l.append("avatar",M),o(se(l))},S=Z();return n.useEffect(()=>{if(b){m("Profile updated successfully!",{variant:"success",anchorOrigin:{vertical:"top",horizontal:"center"},onExited:()=>{o(_())}});return}if(h){m(h,{variant:"error",anchorOrigin:{vertical:"top",horizontal:"center"},onExited:()=>{o(J())}});return}(!i&&(s==null?void 0:s.role)==="user"||!i&&(s==null?void 0:s.role)==="employee")&&(console.log(i),S("/"))},[b,s,h,i,o,m,S]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"d-block  d-md-none mt-3",children:[e.jsxs("div",{className:"d-flex align-items-center border-bottom pb-4",children:[e.jsxs("div",{children:[" ",e.jsx("div",{className:" border d-inline pt-1 pb-2 px-2",style:{borderRadius:"50%"},children:e.jsx(K,{fontSize:"1.3rem"})})," "]}),"        ",e.jsx("h5",{className:"m-0",children:"Settings"})]}),e.jsxs("div",{className:"pt-4 d-flex align-items-center",children:[e.jsx(Q,{fontSize:"1.3rem"}),"   ",e.jsx("h5",{className:"m-0",children:"Account Setting"})]}),e.jsxs("div",{className:"w-100 d-flex flex-column align-items-center justify-content-center mt-3",children:[e.jsx("img",{src:(s==null?void 0:s.avatar)||k,alt:s==null?void 0:s.name,style:{objectFit:"cover",width:"80px",height:"80px"},class:"border rounded-circle p-1 bg-primary"}),(s==null?void 0:s.role)!=="employee"?e.jsx("div",{className:"d-flex w-100 align-items-center justify-content-around",children:e.jsx(x,{to:"/my-orders",className:"d-inline mt-2 btn border bg-success text-white",children:"Orders"})}):e.jsx("div",{className:"d-flex w-100 align-items-center justify-content-around",children:e.jsx(x,{to:"/my-tasks",className:"w-100 mt-2 btn outline-secondary",children:"Tasks"})})]}),e.jsxs("div",{className:"pt-4 d-flex align-items-center justify-content-between",children:[e.jsxs("div",{children:[e.jsx("h6",{style:{fontSize:"17px"},className:"mb-2",children:"Email"}),e.jsx("span",{className:"m-0",children:s==null?void 0:s.email})]}),e.jsx("button",{onClick:r,className:"btn bg-transparent",style:{border:"1px solid black"},children:e.jsx("b",{children:"Change"})})]}),e.jsxs("div",{className:"pt-4 d-flex align-items-center justify-content-between",children:[e.jsxs("div",{children:[e.jsx("h6",{style:{fontSize:"17px"},className:"mb-2",children:"Phone Number"}),e.jsx("span",{className:"m-0",children:s==null?void 0:s.phoneNumber})]}),e.jsx("button",{onClick:r,className:"btn bg-transparent",style:{border:"1px solid black"},children:e.jsx("b",{children:"Change"})})]}),e.jsxs("div",{className:"pt-4 d-flex align-items-center justify-content-between",children:[e.jsxs("div",{children:[e.jsx("h6",{style:{fontSize:"17px"},className:"mb-2",children:"Address"}),e.jsxs("span",{className:"m-0",children:[s==null?void 0:s.address,", ",s==null?void 0:s.city,", ",s==null?void 0:s.country,", ",s==null?void 0:s.postalCode," "]})]}),e.jsx("button",{onClick:r,className:"btn bg-transparent",style:{border:"1px solid black"},children:e.jsx("b",{children:"Change"})})]})]}),e.jsxs("div",{class:"container ",style:{marginTop:E?"15px":"10px"},children:[e.jsx(ee,{title:"My profile"}),e.jsx("div",{class:"main-body d-none d-md-block",children:e.jsxs("div",{class:"row",children:[e.jsx("div",{class:`${(s==null?void 0:s.role)==="employee"?"col-lg-12":"col-lg-4"}`,children:e.jsx("div",{class:"card",children:e.jsxs("div",{class:"card-body",children:[e.jsxs("div",{class:"d-flex flex-column align-items-center text-center",children:[e.jsx("img",{src:(s==null?void 0:s.avatar)||k,alt:"Admin",style:{objectFit:"cover",width:"100px",height:"100px"},class:"rounded-circle p-1 bg-primary"}),e.jsxs("div",{class:"mt-3",children:[e.jsx("h4",{children:s==null?void 0:s.name}),e.jsx("p",{class:"text-secondary mb-1",children:s==null?void 0:s.email}),(s==null?void 0:s.role)==="employee"&&e.jsx("p",{class:"text-secondary mb-1",children:s==null?void 0:s.phoneNumber}),(s==null?void 0:s.role)!=="employee"?e.jsx("div",{className:"d-flex w-100 align-items-center justify-content-around",children:e.jsx(x,{to:"/my-orders",className:"w-100 mt-2 btn btn-outline-primary",children:"Orders"})}):e.jsx("div",{className:"d-flex w-100 align-items-center justify-content-around",children:e.jsx(x,{to:"/my-tasks",className:"w-100 mt-2 btn btn-outline-primary",children:"Tasks"})})]})]}),e.jsx("hr",{class:"my-4"})]})})}),(s==null?void 0:s.role)!=="employee"&&e.jsx("div",{class:"col-lg-8",children:e.jsx("div",{class:"card",children:e.jsxs("div",{class:"card-body",children:[e.jsxs("div",{class:"row mb-3",children:[e.jsx("div",{class:"col-sm-3",children:e.jsx("h6",{class:"mb-0",children:"Phone"})}),e.jsx("div",{class:"col-sm-9 text-secondary",children:e.jsx("input",{type:"text",class:"form-control",value:s==null?void 0:s.phoneNumber})})]}),e.jsxs("div",{class:"row mb-3",children:[e.jsx("div",{class:"col-sm-3",children:e.jsx("h6",{class:"mb-0",children:"Address"})}),e.jsx("div",{class:"col-sm-9 text-secondary",children:e.jsx("input",{type:"text",class:"form-control",value:s==null?void 0:s.address})})]}),e.jsxs("div",{class:"row mb-3",children:[e.jsx("div",{class:"col-sm-3",children:e.jsx("h6",{class:"mb-0",children:"Postal Code"})}),e.jsx("div",{class:"col-sm-9 text-secondary",children:e.jsx("input",{type:"text",class:"form-control",value:s==null?void 0:s.postalCode})})]}),e.jsxs("div",{class:"row mb-3",children:[e.jsx("div",{class:"col-sm-3",children:e.jsx("h6",{class:"mb-0",children:"City"})}),e.jsx("div",{class:"col-sm-9 text-secondary",children:e.jsx("input",{type:"text",class:"form-control",value:s==null?void 0:s.city})})]}),e.jsxs("div",{class:"row mb-3",children:[e.jsx("div",{class:"col-sm-3",children:e.jsx("h6",{class:"mb-0",children:"Country"})}),e.jsx("div",{class:"col-sm-9 text-secondary",children:e.jsx("input",{type:"text",class:"form-control",value:s==null?void 0:s.country})})]}),e.jsxs("div",{class:"row",children:[e.jsx("div",{class:"col-sm-3"}),e.jsx("div",{class:"col-sm-9 text-secondary",children:e.jsx("button",{onClick:r,class:"btn btn-primary px-4",children:"Edit Profile"})})]})]})})})]})})]}),e.jsxs(c,{show:P,onHide:j,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[e.jsx(c.Header,{closeButton:!0,children:e.jsx(c.Title,{children:"Edit Profile"})}),e.jsxs(a,{onSubmit:O,children:[e.jsxs(c.Body,{children:[e.jsx("div",{className:"personal-image",children:e.jsxs("label",{className:"label",children:[e.jsx("input",{type:"file",name:"avatar",onChange:H}),e.jsxs("figure",{className:"personal-figure",children:[e.jsx("img",{src:R,className:"personal-avatar",alt:"Avatar Preview"}),e.jsx("figcaption",{className:"personal-figcaption",children:e.jsx("img",{src:"https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png",alt:"camera icon"})})]})]})}),e.jsxs(a.Group,{controlId:"formName",children:[e.jsx(a.Label,{children:"Full Name"}),e.jsx(a.Control,{onChange:t=>L(t.target.value),type:"text",value:y})]})," ",e.jsx("br",{}),e.jsxs(a.Group,{controlId:"formEmail",children:[e.jsx(a.Label,{children:"Email address"}),e.jsx(a.Control,{onChange:t=>I(t.target.value),type:"email",value:g})]})," ",e.jsx("br",{}),e.jsxs(a.Group,{controlId:"formPhoneNumber",children:[e.jsx(a.Label,{children:"Phone Number"}),e.jsx(a.Control,{onChange:t=>F(t.target.value),type:"text",value:f})]})," ",e.jsx("br",{}),e.jsxs(a.Group,{controlId:"formAddress",children:[e.jsx(a.Label,{children:"Address"}),e.jsx(a.Control,{onChange:t=>z(t.target.value),type:"text",value:u})]})," ",e.jsx("br",{}),e.jsxs(a.Group,{controlId:"formPostalCode",children:[e.jsx(a.Label,{children:"Postal Code"}),e.jsx(a.Control,{onChange:t=>G(t.target.value),type:"text",value:N})]})," ",e.jsx("br",{}),e.jsxs(a.Group,{controlId:"formCity",children:[e.jsx(a.Label,{children:"City"}),e.jsx(a.Control,{onChange:t=>U(t.target.value),type:"text",value:C})]})," ",e.jsx("br",{}),e.jsxs(a.Group,{controlId:"formCountry",children:[e.jsx(a.Label,{children:"Country"}),e.jsx(a.Control,{onChange:t=>D(t.target.value),type:"text",value:w})]})," ",e.jsx("br",{})]}),e.jsxs(c.Footer,{children:[e.jsx(A,{variant:"danger",onClick:j,children:"Close"}),e.jsx(A,{variant:"primary",type:"submit",onClick:j,children:"Save Changes"})]})]})]})]})};export{te as default};
