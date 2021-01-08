(this["webpackJsonpjson-obj-form-generator-docs"]=this["webpackJsonpjson-obj-form-generator-docs"]||[]).push([[10],{115:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return u}));var n=a(12),c=a(13),o=a(16),i=a(15),r=a(14),l=a(0),s=a.n(l),V=a(154),H=a(166),L=a(139),m=a(150),f=a(37),p=(a(50),a(116),a(36),a(73)),C=a(39),M=a.n(C),g=a(40),h=a(41),d=a(47),u=function(e){Object(i.a)(a,e);var t=Object(r.a)(a);function a(e){var c;return Object(n.a)(this,a),(c=t.call(this,e)).onChange=function(e,t){this.setState({json:e,is_valid:t})}.bind(Object(o.a)(c)),c.generate=function(){this.state.is_valid&&this.setState({genjson:this.state.json})}.bind(Object(o.a)(c)),c.copyToClipboard=function(){var e=this;try{navigator.clipboard.writeText(JSON.stringify(this.state.genjson)),this.setState({copy_notification_message:"Successfully copied to clipboard",copy_notification:!0,copy_notification_icon:s.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-copy-success",viewBox:"0 0 24 24"},s.a.createElement("path",{fill:"#fff",d:"M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"})),copy_notification_color:"jofgen-D-copy-success"}),setTimeout((function(){e.setState({copy_notification:!1})}),2e3)}catch(t){this.setState({copy_notification_message:"Oops .. Something went wrong. Copying to clipboard failed",copy_notification:!0,copy_notification_icon:s.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-copy-failed",viewBox:"0 0 24 24"},s.a.createElement("path",{fill:"#fff",d:"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"})),copy_notification_color:"jofgen-D-copy-failed"}),setTimeout((function(){e.setState({copy_notification:!1})}),2e3)}}.bind(Object(o.a)(c)),c.state={json:{},is_valid:!1,genjson:null},c}return Object(c.a)(a,[{key:"render",value:function(){var e;return this.state.is_valid&&(e=s.a.createElement(V.a,{size:"sm",color:"info",onClick:this.generate},s.a.createElement(M.a,{path:h.i,size:.9,color:"#fff",className:"mr-1"})," Generate translation")),null!==this.state.genjson&&Object.keys(this.state.genjson).length>0?s.a.createElement(l.Fragment,null,s.a.createElement(H.a,{isOpen:this.state.copy_notification,size:"sm",centered:!0},s.a.createElement(L.a,{className:this.state.copy_notification_color},this.state.copy_notification_icon,this.state.copy_notification_message)),s.a.createElement("section",null,s.a.createElement("h2",null,"Translation generator"),s.a.createElement("div",{className:"card mt-3"},s.a.createElement("div",{className:"card-body"},s.a.createElement("div",{className:"pb-2"},s.a.createElement("table",{className:"w-100"},s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement(d.HashLink,{className:"btn btn-light btn-sm",to:"".concat(g.a.version_prefix,"/components/designer/translation-generator")},s.a.createElement(M.a,{path:h.e,size:.9,color:"#212529",className:"pb-1"})," Create another translation")),s.a.createElement("td",{className:"text-right"},s.a.createElement(V.a,{onClick:this.copyToClipboard,size:"sm",color:"secondary"},s.a.createElement(M.a,{path:h.j,size:.9,color:"#fff",className:"pb-1"})," Copy to clipboard"))))),s.a.createElement(m.a,{type:"textarea",value:JSON.stringify(this.state.genjson)}))))):s.a.createElement(l.Fragment,null,s.a.createElement("section",null,s.a.createElement("h2",null,"Translation generator"),s.a.createElement("div",{className:"mt-3"},s.a.createElement("div",{className:""},s.a.createElement(f.b,{mode:"tree",json:p.a,onChange:this.onChange}),s.a.createElement("div",{className:"text-center"},e,s.a.createElement(d.HashLink,{className:"btn btn-light btn-sm",to:"".concat(g.a.version_prefix,"/components/designer/translation-generator")},"Clear"))))))}}]),a}(l.Component)},116:function(e,t,a){},36:function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"f",(function(){return i})),a.d(t,"h",(function(){return r})),a.d(t,"g",(function(){return l})),a.d(t,"c",(function(){return s})),a.d(t,"m",(function(){return V})),a.d(t,"n",(function(){return H})),a.d(t,"J",(function(){return L})),a.d(t,"I",(function(){return m})),a.d(t,"G",(function(){return f})),a.d(t,"k",(function(){return p})),a.d(t,"a",(function(){return C})),a.d(t,"B",(function(){return M})),a.d(t,"b",(function(){return g})),a.d(t,"E",(function(){return h})),a.d(t,"r",(function(){return d})),a.d(t,"p",(function(){return u})),a.d(t,"i",(function(){return v})),a.d(t,"e",(function(){return E})),a.d(t,"q",(function(){return A})),a.d(t,"D",(function(){return j})),a.d(t,"y",(function(){return x})),a.d(t,"s",(function(){return w})),a.d(t,"A",(function(){return N})),a.d(t,"x",(function(){return b})),a.d(t,"v",(function(){return y})),a.d(t,"u",(function(){return D})),a.d(t,"t",(function(){return B})),a.d(t,"w",(function(){return Z})),a.d(t,"z",(function(){return _})),a.d(t,"H",(function(){return O})),a.d(t,"F",(function(){return z})),a.d(t,"l",(function(){return S})),a.d(t,"j",(function(){return k})),a.d(t,"C",(function(){return T})),a.d(t,"o",(function(){return J}));var n=a(0),c=a.n(n),o=function(e){return e.replaceAll("PropTypes","<props>PropTypes</props>").replaceAll("func","<primpt>func</primpt>").replaceAll("object","<primpt>object</primpt>").replaceAll("string","<primpt>string</primpt>").replaceAll("number","<primpt>number</primpt>").replaceAll("any","<objpt>any</objpt>").replaceAll("shape","<objpt>shape</objpt>").replaceAll("oneOf","<objpt>oneOf</objpt>").replaceAll("array","<objpt>array</objpt>").replaceAll('",',"'</string>,").replaceAll('"\n',"'</string>\n").replaceAll('"]',"'</string>]").replaceAll('"',"<string>'")},i=c.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-copy",viewBox:"0 0 24 24"},c.a.createElement("path",{fill:"#fff",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),r=c.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-copy-success",viewBox:"0 0 24 24"},c.a.createElement("path",{fill:"#fff",d:"M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"})),l=c.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-copy-failed",viewBox:"0 0 24 24"},c.a.createElement("path",{fill:"#fff",d:"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"})),s=c.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-close",viewBox:"0 0 24 24"},c.a.createElement("path",{fill:"#fff",d:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"})),V=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{fill:"#000",d:"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"})),H=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{fill:"#856404",d:"M13,2V4C17.39,4.54 20.5,8.53 19.96,12.92C19.5,16.56 16.64,19.43 13,19.88V21.88C18.5,21.28 22.45,16.34 21.85,10.85C21.33,6.19 17.66,2.5 13,2M11,2C9.04,2.18 7.19,2.95 5.67,4.2L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.24,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.06,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37H7.06M13,13V7H11V13H13M13,17V15H11V17H13Z"})),L=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{fill:"#000",d:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"})),m=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{fill:"#856404",d:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"})),f=c.a.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"})),p=c.a.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"})),C=c.a.createElement("svg",{viewBox:"-2 -2 28 28",className:"jofgen-D-icon-sm"},c.a.createElement("path",{fill:"#ffab00",d:"M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"})),M=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M4,5H20V7H4V5M4,9H20V11H4V9M4,13H20V15H4V13M4,17H14V19H4V17Z"})),g=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,5V19H5V5H19M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9"})),h=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20Z"})),d=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z"})),u=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M3.1,17V9h-2V7h4v10H3.1 M23,15c0,1.1-0.9,2-2,2h-4v-2h4v-2h-2v-2h2V9h-4V7h4c1.1,0,2,0.9,2,2v1.5c0,0.8-0.7,1.5-1.5,1.5c0.8,0,1.5,0.7,1.5,1.5V15 M15,15v2H9v-4c0-1.1,0.9-2,2-2h2V9H9V7h4c1.1,0,2,0.9,2,2v2c0,1.1-0.9,2-2,2h-2v2H15z M8.1,17h-2v-2h2V17z"})),v=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M16,16.92C15.67,16.97 15.34,17 15,17C14.66,17 14.33,16.97 14,16.92V13.41L11.5,15.89C11,15.5 10.5,15 10.11,14.5L12.59,12H9.08C9.03,11.67 9,11.34 9,11C9,10.66 9.03,10.33 9.08,10H12.59L10.11,7.5C10.3,7.25 10.5,7 10.76,6.76V6.76C11,6.5 11.25,6.3 11.5,6.11L14,8.59V5.08C14.33,5.03 14.66,5 15,5C15.34,5 15.67,5.03 16,5.08V8.59L18.5,6.11C19,6.5 19.5,7 19.89,7.5L17.41,10H20.92C20.97,10.33 21,10.66 21,11C21,11.34 20.97,11.67 20.92,12H17.41L19.89,14.5C19.7,14.75 19.5,15 19.24,15.24V15.24C19,15.5 18.75,15.7 18.5,15.89L16,13.41V16.92H16V16.92M5,19A2,2 0 0,1 7,17A2,2 0 0,1 9,19A2,2 0 0,1 7,21A2,2 0 0,1 5,19H5Z"})),E=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M6.92,19L5,17.08L13.06,9L15,10.94M20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L13.84,6.41L11.91,4.5L10.5,5.91L11.92,7.33L3,16.25V21H7.75L16.67,12.08L18.09,13.5L19.5,12.09L17.58,10.17L20.7,7.05C21.1,6.65 21.1,6 20.71,5.63Z"})),A=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M2,6V8H14V6H2M2,10V12H14V10H2M20.04,10.13C19.9,10.13 19.76,10.19 19.65,10.3L18.65,11.3L20.7,13.35L21.7,12.35C21.92,12.14 21.92,11.79 21.7,11.58L20.42,10.3C20.31,10.19 20.18,10.13 20.04,10.13M18.07,11.88L12,17.94V20H14.06L20.12,13.93L18.07,11.88M2,14V16H10V14H2Z"})),j=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M5 12C5 13.11 4.11 14 3 14C1.9 14 1 13.11 1 12C1 10.9 1.9 10 3 10C4.11 10 5 10.9 5 12M4 2V8H2V2H4M2 22V16H4V22H2M24 6V18C24 19.11 23.11 20 22 20H10C8.9 20 8 19.11 8 18V14L6 12L8 10V6C8 4.89 8.9 4 10 4H22C23.11 4 24 4.89 24 6M22 6H10V10.83L8.83 12L10 13.17V18H22V6M12 9H20V11H12V9M12 13H18V15H12V13Z"})),x=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M4,5H20V7H4V5M4,9H20V11H4V9M4,13H20V15H4V13M4,17H14V19H4V17Z"})),w=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,5V19H5V5H19M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9"})),N=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20Z"})),b=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z"})),y=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M3.1,17V9h-2V7h4v10H3.1 M23,15c0,1.1-0.9,2-2,2h-4v-2h4v-2h-2v-2h2V9h-4V7h4c1.1,0,2,0.9,2,2v1.5c0,0.8-0.7,1.5-1.5,1.5c0.8,0,1.5,0.7,1.5,1.5V15 M15,15v2H9v-4c0-1.1,0.9-2,2-2h2V9H9V7h4c1.1,0,2,0.9,2,2v2c0,1.1-0.9,2-2,2h-2v2H15z M8.1,17h-2v-2h2V17z"})),D=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M16,16.92C15.67,16.97 15.34,17 15,17C14.66,17 14.33,16.97 14,16.92V13.41L11.5,15.89C11,15.5 10.5,15 10.11,14.5L12.59,12H9.08C9.03,11.67 9,11.34 9,11C9,10.66 9.03,10.33 9.08,10H12.59L10.11,7.5C10.3,7.25 10.5,7 10.76,6.76V6.76C11,6.5 11.25,6.3 11.5,6.11L14,8.59V5.08C14.33,5.03 14.66,5 15,5C15.34,5 15.67,5.03 16,5.08V8.59L18.5,6.11C19,6.5 19.5,7 19.89,7.5L17.41,10H20.92C20.97,10.33 21,10.66 21,11C21,11.34 20.97,11.67 20.92,12H17.41L19.89,14.5C19.7,14.75 19.5,15 19.24,15.24V15.24C19,15.5 18.75,15.7 18.5,15.89L16,13.41V16.92H16V16.92M5,19A2,2 0 0,1 7,17A2,2 0 0,1 9,19A2,2 0 0,1 7,21A2,2 0 0,1 5,19H5Z"})),B=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M6.92,19L5,17.08L13.06,9L15,10.94M20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L13.84,6.41L11.91,4.5L10.5,5.91L11.92,7.33L3,16.25V21H7.75L16.67,12.08L18.09,13.5L19.5,12.09L17.58,10.17L20.7,7.05C21.1,6.65 21.1,6 20.71,5.63Z"})),Z=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M2,6V8H14V6H2M2,10V12H14V10H2M20.04,10.13C19.9,10.13 19.76,10.19 19.65,10.3L18.65,11.3L20.7,13.35L21.7,12.35C21.92,12.14 21.92,11.79 21.7,11.58L20.42,10.3C20.31,10.19 20.18,10.13 20.04,10.13M18.07,11.88L12,17.94V20H14.06L20.12,13.93L18.07,11.88M2,14V16H10V14H2Z"})),_=c.a.createElement("svg",{className:"jofgen-D-icon",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M5 12C5 13.11 4.11 14 3 14C1.9 14 1 13.11 1 12C1 10.9 1.9 10 3 10C4.11 10 5 10.9 5 12M4 2V8H2V2H4M2 22V16H4V22H2M24 6V18C24 19.11 23.11 20 22 20H10C8.9 20 8 19.11 8 18V14L6 12L8 10V6C8 4.89 8.9 4 10 4H22C23.11 4 24 4.89 24 6M22 6H10V10.83L8.83 12L10 13.17V18H22V6M12 9H20V11H12V9M12 13H18V15H12V13Z"})),O=c.a.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"})),z=c.a.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"})),S=c.a.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M15,16H19V18H15V16M15,8H22V10H15V8M15,12H21V14H15V12M11,10V18H5V10H11M13,8H3V18A2,2 0 0,0 5,20H11A2,2 0 0,0 13,18V8M14,5H11L10,4H6L5,5H2V7H14V5Z"})),k=c.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-designer",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25M22.61 18.36L18.36 22.61L13.16 17.41L14.93 15.64L15.93 16.64L18.4 14.16L19.82 15.58L18.36 17L19.42 18L20.84 16.6L22.61 18.36M6.61 10.83L1.39 5.64L5.64 1.39L7.4 3.16L4.93 5.64L6 6.7L8.46 4.22L9.88 5.64L8.46 7.05L9.46 8.05L6.61 10.83M20.71 7C21.1 6.61 21.1 6 20.71 5.59L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87L20.71 7Z"})),T=c.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-preview",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M17,18C17.56,18 18,18.44 18,19C18,19.56 17.56,20 17,20C16.44,20 16,19.56 16,19C16,18.44 16.44,18 17,18M17,15C14.27,15 11.94,16.66 11,19C11.94,21.34 14.27,23 17,23C19.73,23 22.06,21.34 23,19C22.06,16.66 19.73,15 17,15M17,21.5A2.5,2.5 0 0,1 14.5,19A2.5,2.5 0 0,1 17,16.5A2.5,2.5 0 0,1 19.5,19A2.5,2.5 0 0,1 17,21.5M9.27,20H6V4H13V9H18V13.07C18.7,13.15 19.36,13.32 20,13.56V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10.5C10,21.41 9.59,20.73 9.27,20Z"})),J=c.a.createElement("svg",{className:"jofgen-D-icon jofgen-D-icon-export",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z"}))}}]);
//# sourceMappingURL=10.f9506c88.chunk.js.map