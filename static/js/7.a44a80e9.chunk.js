(this["webpackJsonpjson-obj-form-generator-docs"]=this["webpackJsonpjson-obj-form-generator-docs"]||[]).push([[7],{166:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return I}));var a=n(12),o=n(13),r=n(16),c=n(15),l=n(14),i=n(0),s=n.n(i),p=n(1),m=(n(19),n(73),n(59),n(49),n(39)),u=n.n(m),h=n(41),d=n(139),f=n(140),b=n(141),y=n(142),v=n(143),g=n(144),E=n(145),_=n(146),x=n(147),j=n(148),z=(n(74),n(60)),P=n(50),O=n(40),k=n(167),N=n(138),w=n(168),S=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(e){var o;return Object(a.a)(this,n),(o=t.call(this,e)).state={},o}return Object(o.a)(n,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h3",null,"Version history"),s.a.createElement("div",{className:"version-list"},s.a.createElement("a",{className:"1.2.2"===this.props.selected?"active":"",href:"./v/1.2.2"},"v. 1.2.2 (latest)")))}}]),n}(i.Component),C=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(e){var o;return Object(a.a)(this,n),(o=t.call(this,e)).onVersionChange=function(e){"older"!==e.target.value?this.props.onRedirect("/v/".concat(e.target.value)):this.setState({modal_history:!0})}.bind(Object(r.a)(o)),o.close=function(){this.setState({modal_history:!1})}.bind(Object(r.a)(o)),o.state={},o}return Object(o.a)(n,[{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(k.a,{isOpen:this.state.modal_history,centered:!0},s.a.createElement(N.a,null,s.a.createElement("a",{className:"close-btn",onClick:this.close},s.a.createElement(u.a,{path:h.g,size:.9})),s.a.createElement(S,{selected:this.props.selected}))),s.a.createElement(w.a,{value:this.props.selected,type:"select",className:"versions",name:"version",onChange:this.onVersionChange},s.a.createElement("option",{value:"1.2.2"},"v. 1.2.2 (latest)"),s.a.createElement("option",{value:"older"},"old versions")))}}]),n}(i.Component),R=n(81),F=n.n(R),I=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(e){var o;return Object(a.a)(this,n),(o=t.call(this,e)).showMenu=function(){this.setState({isOpen:!this.state.isOpen})}.bind(Object(r.a)(o)),o.navigate=function(e){this.props.history.push(e)}.bind(Object(r.a)(o)),o.state={json:[],value:{},isOpen:!1},o}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return s.a.createElement(i.Fragment,null,s.a.createElement(d.a,{color:"light",light:!0,expand:"md",className:"bg-white"},s.a.createElement(f.a,null,s.a.createElement(b.a,{href:".".concat(O.a.version_prefix)},"json-obj-form-generator"),s.a.createElement("button",{className:"navbar-toggler",onClick:this.showMenu},s.a.createElement(u.a,{path:h.n,color:"#77757a",size:1.1})),s.a.createElement(y.a,{isOpen:this.state.isOpen,navbar:!0},s.a.createElement(v.a,{className:"mr-auto",navbar:!0},s.a.createElement(g.a,null,s.a.createElement(E.a,{href:".".concat(O.a.version_prefix,"/components")},"Components"))),s.a.createElement(_.a,null,s.a.createElement(C,{selected:"1.2.2",onRedirect:this.navigate}),s.a.createElement("a",{href:z.b,className:"btn-ico-link btn-github"},s.a.createElement(u.a,{path:h.k,size:1.1})),s.a.createElement("a",{href:z.a,className:"btn-ico-link btn-bugs"},s.a.createElement(u.a,{path:h.c,size:1.1})),s.a.createElement("a",{href:O.a.npm,className:"btn-ico-link btn-npm"},s.a.createElement(u.a,{path:h.o,size:1.6})),s.a.createElement("a",{href:z.c+"/donate",className:"btn-ico-link btn-donate"},s.a.createElement(u.a,{path:h.l,size:1.1})," Donate"))))),s.a.createElement(f.a,null,s.a.createElement(i.Suspense,{fallback:s.a.createElement("div",{class:"loading"},s.a.createElement("img",{src:F.a,alt:"",height:"50",width:"50"}))},s.a.createElement(p.d,null,P.d.map((function(t,n){return t.component?s.a.createElement(p.b,{key:n,path:t.path,exact:t.exact,name:t.name,render:function(n){return s.a.createElement(t.component,Object.assign({},n,{page_loading:e.props.loading,loading:e.props.loading,processing:e.props.processing,onRedirect:e.navigate}))}}):null}))))),s.a.createElement("footer",{className:"mt-5"},s.a.createElement(f.a,null,s.a.createElement(x.a,null,s.a.createElement(j.a,{sm:6,className:"copy-ls"},s.a.createElement("img",{src:"./assets/logo-v1_2-bw.png",className:"logo-footer"})),s.a.createElement(j.a,{sm:6,className:"copy-rs"},s.a.createElement("div",{className:"copy"},"Developed and maintained by ",s.a.createElement("a",{href:"https://radovan-pranda.github.io/"},"Radovan Pranda"))),s.a.createElement(j.a,{sm:12},s.a.createElement("div",{className:"mt-2 text-center"},s.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user=radovan-pranda&repo=json-obj-form-generator&type=star&count=true",frameborder:"0",scrolling:"0",width:"100",height:"20",title:"GitHub Star"}),s.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user=radovan-pranda&repo=json-obj-form-generator&type=watch&count=true&v=2",frameborder:"0",scrolling:"0",width:"100",height:"20",title:"GitHub Watch"})))))))}}]),n}(i.Component)},40:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n(0);var a={version_prefix:"/v/1.2.2",npm:"https://www.npmjs.com/package/json-obj-form-generator/v/1.2.2"}},49:function(e,t,n){},50:function(e,t,n){"use strict";n.d(t,"d",(function(){return g})),n.d(t,"b",(function(){return E})),n.d(t,"c",(function(){return _})),n.d(t,"a",(function(){return j}));var a=n(0),o=n.n(a),r=n(40),c=o.a.lazy((function(){return n.e(26).then(n.bind(null,82))})),l=o.a.lazy((function(){return n.e(8).then(n.bind(null,83))})),i=o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(25)]).then(n.bind(null,136))})),s=o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(9)]).then(n.bind(null,111))})),p=o.a.lazy((function(){return n.e(23).then(n.bind(null,112))})),m=o.a.lazy((function(){return n.e(24).then(n.bind(null,113))})),u=o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(10)]).then(n.bind(null,114))})),h=o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(33)]).then(n.bind(null,116))})),d=o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(31)]).then(n.bind(null,117))})),f=o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(30)]).then(n.bind(null,118))})),b=o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(27)]).then(n.bind(null,119))})),y=o.a.lazy((function(){return n.e(32).then(n.bind(null,120))})),v=o.a.lazy((function(){return n.e(34).then(n.bind(null,121))})),g=[{path:r.a.version_prefix,exact:!0,component:c},{path:"".concat(r.a.version_prefix,"/components"),component:l},{path:"".concat(r.a.version_prefix,"/codesheet"),component:y},{path:"".concat(r.a.version_prefix,"/playground"),component:h}],E=[{path:"".concat(r.a.version_prefix,"/components/generator"),component:i},{path:"".concat(r.a.version_prefix,"/components/designer"),exact:!0,component:s},{path:"".concat(r.a.version_prefix,"/components/designer/icons"),component:p},{path:"".concat(r.a.version_prefix,"/components/designer/translations"),component:m},{path:"".concat(r.a.version_prefix,"/components/designer/translation-generator"),component:u},{path:"".concat(r.a.version_prefix,"/components/validation-methods"),component:b},{path:"".concat(r.a.version_prefix,"/components/whats-new"),component:v}],_=[{path:"".concat(r.a.version_prefix,"/playground/generator"),component:d},{path:"".concat(r.a.version_prefix,"/playground/designer"),component:f}],x={main:o.a.lazy((function(){return n.e(28).then(n.bind(null,122))})),typeBool:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(11)]).then(n.bind(null,123))})),typeColor:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(12)]).then(n.bind(null,124))})),typeFloat:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(13)]).then(n.bind(null,125))})),typeInt:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(15)]).then(n.bind(null,126))})),typeP:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(29)]).then(n.bind(null,127))})),typePack:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(17)]).then(n.bind(null,128))})),typeRgx:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(18)]).then(n.bind(null,129))})),typeSec:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(20)]).then(n.bind(null,130))})),typeStr:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(21)]).then(n.bind(null,131))})),typeFloat_il:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(14)]).then(n.bind(null,132))})),typeInt_il:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(16)]).then(n.bind(null,133))})),typeRgx_il:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(19)]).then(n.bind(null,134))})),typeStr_il:o.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(22)]).then(n.bind(null,135))}))},j=[{path:"".concat(r.a.version_prefix,"/codesheet"),name:"codesheet",component:x.main},{path:"".concat(r.a.version_prefix,"/codesheet/types/bool"),name:"bool",component:x.typeBool},{path:"".concat(r.a.version_prefix,"/codesheet/types/color"),name:"color",component:x.typeColor},{path:"".concat(r.a.version_prefix,"/codesheet/types/float"),name:"float",component:x.typeFloat},{path:"".concat(r.a.version_prefix,"/codesheet/types/float_il"),name:"float_il",component:x.typeFloat_il},{path:"".concat(r.a.version_prefix,"/codesheet/types/int"),name:"int",component:x.typeInt},{path:"".concat(r.a.version_prefix,"/codesheet/types/int_il"),name:"int_il",component:x.typeInt_il},{path:"".concat(r.a.version_prefix,"/codesheet/types/p"),name:"p",component:x.typeP},{path:"".concat(r.a.version_prefix,"/codesheet/types/pack"),name:"pack",component:x.typePack},{path:"".concat(r.a.version_prefix,"/codesheet/types/rgx"),name:"rgx",component:x.typeRgx},{path:"".concat(r.a.version_prefix,"/codesheet/types/rgx_il"),name:"rgx_il",component:x.typeRgx_il},{path:"".concat(r.a.version_prefix,"/codesheet/types/sec"),name:"sec",component:x.typeSec},{path:"".concat(r.a.version_prefix,"/codesheet/types/str"),name:"str",component:x.typeStr},{path:"".concat(r.a.version_prefix,"/codesheet/types/str_il"),name:"str_il",component:x.typeStr_il}]},59:function(e,t,n){},60:function(e){e.exports=JSON.parse('{"b":"https://github.com/radovan-pranda/json-obj-form-generator","c":"https://radovan-pranda.github.io","a":"https://github.com/radovan-pranda/json-obj-form-generator/issues"}')},73:function(e,t,n){},74:function(e,t,n){},81:function(e,t,n){e.exports=n.p+"static/media/loading.6e3e05e2.svg"}}]);
//# sourceMappingURL=7.a44a80e9.chunk.js.map