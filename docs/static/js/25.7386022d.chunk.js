(this["webpackJsonpjson-obj-form-generator-docs"]=this["webpackJsonpjson-obj-form-generator-docs"]||[]).push([[25],{111:function(e,a,n){"use strict";var t=n(2),r=n(6),l=n(0),s=n.n(l),o=n(7),c=n.n(o),m=n(34),i=n.n(m),u=n(35),d={className:c.a.string,cssModule:c.a.object,size:c.a.string,bordered:c.a.bool,borderless:c.a.bool,striped:c.a.bool,dark:c.a.bool,hover:c.a.bool,responsive:c.a.oneOfType([c.a.bool,c.a.string]),tag:u.q,responsiveTag:u.q,innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object])},p=function(e){var a=e.className,n=e.cssModule,l=e.size,o=e.bordered,c=e.borderless,m=e.striped,d=e.dark,p=e.hover,f=e.responsive,b=e.tag,g=e.responsiveTag,E=e.innerRef,h=Object(r.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),y=Object(u.m)(i()(a,"table",!!l&&"table-"+l,!!o&&"table-bordered",!!c&&"table-borderless",!!m&&"table-striped",!!d&&"table-dark",!!p&&"table-hover"),n),v=s.a.createElement(b,Object(t.a)({},h,{ref:E,className:y}));if(f){var j=Object(u.m)(!0===f?"table-responsive":"table-responsive-"+f,n);return s.a.createElement(g,{className:j},v)}return v};p.propTypes=d,p.defaultProps={tag:"table",responsiveTag:"div"},a.a=p},137:function(e,a,n){"use strict";n.r(a),n.d(a,"default",(function(){return E}));var t=n(12),r=n(13),l=n(15),s=n(14),o=n(0),c=n.n(o),m=n(55),i=n(111),u=n(37),d=n(39),p=n.n(d),f=n(41),b=n(40),g=['<import>import</import> <classcmd>React</classcmd>, { <classcmd>Component</classcmd>, <classcmd>Fragment</classcmd> } from <path>\'react\'</path>;\n<import>import</import> { <classcmd>JOFGENGenerator</classcmd> } from <path>\'json-obj-form-generator\'</path>;\n<import>import</import> <path>\'bootstrap/dist/css/bootstrap.css\'</path>;\n<import>import</import> <path>\'json-obj-form-generator/dist/css/generator.css\'</path>;\n\n<cmd>export default class</cmd> <classcmd>GeneratorExample1</classcmd> extends <classcmd>Component</classcmd> {\n    <cmd>constructor</cmd>(<prm>props</prm>) {\n        <cmd>super</cmd>(<prm>props</prm>);\n        <cmd>this</cmd>.<prm>state</prm> = {\n            json: [\n                {\n                    "uid":"sections_package",\n                    "design":"stack",\n                    "type":"pack",\n                    "sub": [\n                        {\n                            "uid":"sec1",\n                            "name":"Unicorns",\n                            "type":"sec",\n                            "sub": [\n                                {\n                                    "uid":"favnames",\n                                    "name":"Favorite unicorn names",\n                                    "minLength":1,\n                                    "type":"str_il"\n                                }\n                            ]\n                        },\n                        {\n                            "uid":"sec2",\n                            "name":"Dragons",\n                            "type":"sec",\n                            "sub": [\n                                {\n                                    "uid":"favdragoncolor",\n                                    "name":"What\'s your favorite dragon color?",\n                                    "type":"color"\n                                }\n                            ]\n                        }\n                    ]\n                },\n                {\n                    "uid":"unic_old",\n                    "name":"How old is your unicorn?",\n                    "required":true,\n                    "type":"int"\n                },\n                {\n                    "uid":"unic_color",\n                    "name":"What\'s the best color of unicorn?",\n                    "tip":"Try to use this tip: https://youtu.be/5phx8eycHZ4",\n                    "type":"color"\n                }\n            ]\n        };\n    }\n    \n    <primpt>render</primpt>()\n    {\n        <ret>return</ret> <<classcmd>JOFGENGenerator</classcmd> json={this.state.json} />\n    }\n};\n'],E=function(e){Object(l.a)(n,e);var a=Object(s.a)(n);function n(e){var r;return Object(t.a)(this,n),(r=a.call(this,e)).state={json:[{uid:"sections_package",design:"stack",type:"pack",sub:[{uid:"sec1",name:"Unicorns",type:"sec",sub:[{uid:"favnames",name:"Favorite unicorn names",minLength:1,type:"str_il"}]},{uid:"sec2",name:"Dragons",type:"sec",sub:[{uid:"favdragoncolor",name:"What's your favorite dragon color?",type:"color"}]}]},{uid:"unic_old",name:"How old is your unicorn?",required:!0,type:"int"},{uid:"unic_color",name:"What's the best color of unicorn?",tip:"Try to use this tip: https://youtu.be/5phx8eycHZ4",type:"color"}]},r}return Object(r.a)(n,[{key:"render",value:function(){return c.a.createElement(o.Fragment,null,c.a.createElement("section",null,c.a.createElement("h2",null,"Generator"),c.a.createElement("playground",null,c.a.createElement("code",{dangerouslySetInnerHTML:{__html:g[0]}}),c.a.createElement("compiled",null,c.a.createElement(u.b,{json:this.state.json})))),c.a.createElement("section",{id:"properties"},c.a.createElement("h3",null,"Properties"),c.a.createElement("playground",null,c.a.createElement("code",{className:"norm-border-radius",dangerouslySetInnerHTML:{__html:(e='JOFGENGenerator.propTypes = {\n    onChange: PropTypes.func,\n    isValid: PropTypes.func,\n    \n    <comment>// JSON object used for generating form</comment>\n    json: PropTypes.array,\n    value: PropTypes.object, <comment>// init form value</comment>\n    \n    <comment>// structure of returned value object</comment>\n    mode: PropTypes.oneOf(["tree", "linear", "linear_merge"]),\n    \n    <comment>// this parameter is used only when mode is set to linear_merge</comment>\n    sep: PropTypes.string,\n    size: PropTypes.string,\n    \n    <comment>// parameters of generic id. Generic id is used when unique id is:\n    // - not defined by user\n    // - is lost\n    // - is invalid</comment>\n    jkey: PropTypes.shape({\n        prefix: PropTypes.string.isRequired,\n        sufix: PropTypes.string.isRequired\n    }),\n    sm: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),\n    \n    <comment>// this text and icon shows when json object is not valid</comment>\n    fatal_error: PropTypes.shape({\n        icon: PropTypes.any,\n        text: PropTypes.string\n    })\n};',e.replaceAll("PropTypes","<props>PropTypes</props>").replaceAll("func","<primpt>func</primpt>").replaceAll("object","<primpt>object</primpt>").replaceAll("string","<primpt>string</primpt>").replaceAll("number","<primpt>number</primpt>").replaceAll("any","<objpt>any</objpt>").replaceAll("shape","<objpt>shape</objpt>").replaceAll("oneOf","<objpt>oneOf</objpt>").replaceAll("array","<objpt>array</objpt>").replaceAll('",',"'</string>,").replaceAll('"]',"'</string>]").replaceAll('"',"<string>'"))}}))),c.a.createElement("section",{id:"parameters"},c.a.createElement("h3",null,"Parameters"),c.a.createElement("p",null,"Component ",c.a.createElement("classcmd",null,"JOFGENGenerator")," has several parameters and functions. The most important and most frequently used parameters are ",c.a.createElement("prm",null,"json"),", ",c.a.createElement("prm",null,"value")," and ",c.a.createElement("prm",null,"mode"),"."),c.a.createElement("h4",{id:"parameter-json"},"json"),c.a.createElement("p",null,"This is the most important parameter, because it stores informations about all form elements (like unique ids, names and descriptions, error messages, etc.). It's used for generating form and may be generated by component ",c.a.createElement("classcmd",null,"JOFGENDesigner"),", generate it using playground (",c.a.createElement("a",{href:"".concat(b.a.version_prefix_router,"/playground")},"here"),") or write it by yourself using ",c.a.createElement("a",{href:"".concat(b.a.version_prefix_router,"/codesheet")},"guide"),".",c.a.createElement("br",null),"Rules applied during JSON object creation depends on selected ",c.a.createElement("prm",null,"mode"),".",c.a.createElement(m.a,{color:"warning",className:"mt-3 mb-4"},c.a.createElement("div",{className:"pt-1 pb-2"},c.a.createElement("b",null,c.a.createElement(p.a,{path:f.b,size:.9,color:"#f3a000",className:"mr-1 mb-1"})," Compatibility between modes:"),c.a.createElement("br",null),"Compatibility of object created in designer with generator."),c.a.createElement(i.a,{bordered:!0},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("td",{colSpan:"2",rowSpan:"2",className:"no-border"}),c.a.createElement("td",{colSpan:"3",className:"text-center table-lvl-1"},c.a.createElement("b",null,"Generator mode"))),c.a.createElement("tr",{className:"table-lvl-2"},c.a.createElement("td",{className:"text-center"},"linear"),c.a.createElement("td",{className:"text-center"},"linear_merge"),c.a.createElement("td",{className:"text-center"},"tree"))),c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("td",{rowSpan:"3",className:"text-center vertical-center table-lvl-1"},c.a.createElement("b",null,"Designer mode")),c.a.createElement("td",{className:"text-center table-lvl-2"},"linear"),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.d,size:.9,color:"#8bc34a",className:"mr-1 mb-1"})),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.d,size:.9,color:"#8bc34a",className:"mr-1 mb-1"})),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.d,size:.9,color:"#8bc34a",className:"mr-1 mb-1"}))),c.a.createElement("tr",null,c.a.createElement("td",{className:"text-center table-lvl-2"},"linear_merge"),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.f,size:.9,color:"#ffeb3b",className:"mr-1 mb-1"})),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.d,size:.9,color:"#8bc34a",className:"mr-1 mb-1"})),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.d,size:.9,color:"#8bc34a",className:"mr-1 mb-1"}))),c.a.createElement("tr",null,c.a.createElement("td",{className:"text-center table-lvl-2"},"tree"),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.f,size:.9,color:"#ffeb3b",className:"mr-1 mb-1"})),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.d,size:.9,color:"#8bc34a",className:"mr-1 mb-1"})),c.a.createElement("td",{className:"text-center"},c.a.createElement(p.a,{path:f.d,size:.9,color:"#8bc34a",className:"mr-1 mb-1"}))))),c.a.createElement("div",{style:{color:"#777777"}},c.a.createElement(p.a,{path:f.d,size:.9,color:"#8bc34a",className:"mr-1 mb-1"})," - fully compatible (always generated without errors)",c.a.createElement("br",null),c.a.createElement(p.a,{path:f.f,size:.9,color:"#ffeb3b",className:"mr-1 mb-1"})," -  error occurs in some cases (sometimes may be generated with errors)",c.a.createElement("br",null),c.a.createElement(p.a,{path:f.h,size:.9,color:"#f44336",className:"mr-1 mb-1"})," - error occurs in all cases (always generated with error)",c.a.createElement("br",null)))),c.a.createElement("h4",{id:"parameter-mode"},"mode"),c.a.createElement("p",null,"One of the key parameters is also mode. It is set to ",c.a.createElement("string",null,"'linear'")," by default. Using this parameter you can change structure of value object. Changing value of this parameter will affect validity of ",c.a.createElement("prm",null,"json"),", because each mode uses its own validation logic during checking the uniqueness of the id.",c.a.createElement("br",null),"As first example ",c.a.createElement("prm",null,"json")," we will use this simple object:",c.a.createElement("playground",null,c.a.createElement("code",{dangerouslySetInnerHTML:{__html:'<cmd>const</cmd> <prm>json</prm> = [\n    {\n        "uid": "parent",\n        "name": "Parent",\n        "type": "sec",\n        "sub": [\n            {\n                "uid": "sub",\n                "name": "Sub",\n                "type": "sec",\n                "sub": [\n                    {\n                        "uid": "unicorn",\n                        "name": "unicorn",\n                        "value": "#ffffff",\n                        "type": "color"\n                    }\n                ]\n            }\n        ]\n    },\n    {\n        "uid": "parent1",\n        "name": "Parent1",\n        "type": "sec",\n        "sub": [\n            {\n                "uid": "sub1",\n                "name": "Sub1",\n                "type": "sec",\n                "sub": [\n                    {\n                        "uid": "dragon",\n                        "name": "dragon",\n                        "value": "#ffffff",\n                        "type": "color"\n                    }\n                ]\n            }\n        ]\n    }\n]'}})),"Value returned after filling form will be:",c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement("b",null,c.a.createElement("string",null,"'linear'")),c.a.createElement("br",null),c.a.createElement("playground",null,c.a.createElement("code",{className:"norm-border-radius",dangerouslySetInnerHTML:{__html:"{\n    <string>'unicorn'</string>: <string>'#ffffff'</string>\n    <string>'dragon'</string>: <string>'#ffffff'</string>\n}"}})),"Let's try to change ",c.a.createElement("prm",null,"uid")," from ",c.a.createElement("string",null,"'dragon'")," to ",c.a.createElement("string",null,"'unicorn'"),". Form will generate error alert as you can see here:",c.a.createElement("playground",null,c.a.createElement("code",{dangerouslySetInnerHTML:{__html:"<<classcmd>JOFGENGenerator</classcmd> mode=<string>'linear'</string> json={this.state.json} />"}}),c.a.createElement("compiled",{className:"norm-border-radius"},c.a.createElement(u.b,{mode:"linear",json:[{uid:"parent",name:"Parent",type:"sec",sub:[{uid:"sub",name:"Sub",type:"sec",sub:[{uid:"unicorn",name:"unicorn",value:"#ffffff",type:"color"}]}]},{uid:"parent1",name:"Parent1",type:"sec",sub:[{uid:"sub1",name:"Sub1",type:"sec",sub:[{uid:"unicorn",name:"unicorn",value:"#ffffff",type:"color"}]}]}]}))),"Let's try to change ",c.a.createElement("prm",null,"uid")," from ",c.a.createElement("string",null,"'dragon'")," to ",c.a.createElement("string",null,"'unicorn'"),". Generator will show error alert. Because filling this form, may cause data loss or data corruption in some cases.",c.a.createElement("br",null),c.a.createElement("playground",null,c.a.createElement("code",{className:"norm-border-radius",dangerouslySetInnerHTML:{__html:"{\n    <string class='text-primary'>'unicorn'</string>: <string class='text-primary'>'#ffffff'</string>,\n    <string class='text-danger'>'unicorn'</string>: <string class='text-danger'>'#000000'</string>\n}"}})),c.a.createElement(m.a,{color:"danger"},c.a.createElement("b",null,c.a.createElement(p.a,{path:f.a,size:.9,color:"#ff5252",className:"mr-1 mb-1"})," Data loss"),c.a.createElement("div",null,"As you can see: value will be set to value from last changed input with this id, so another value will be lost.")),"We can make this example little bit more special by changing the ",c.a.createElement("prm",null,"type")," of one variable from ",c.a.createElement("string",null,"'color'")," to for example: ",c.a.createElement("string",null,"'integer'"),". There we can see data corruption and data loss in one case, which can affect your application.",c.a.createElement("playground",null,c.a.createElement("code",{className:"norm-border-radius",dangerouslySetInnerHTML:{__html:"{\n    <string class='text-primary'>'unicorn'</string>: <string class='text-primary'>'#ffffff'</string>,\n    <string class='text-danger'>'unicorn'</string>: <val class='text-danger'>32</val>\n}"}})),c.a.createElement(m.a,{color:"danger"},c.a.createElement("b",null,c.a.createElement(p.a,{path:f.a,size:.9,color:"#ff5252",className:"mr-1 mb-1"})," Data loss and data corruption"),c.a.createElement("div",null,"As you can see in this case, value will be set to value from last changed input with this id, so another value will be lost - like in previous example. But there is also another problem - conflict of data types."))),c.a.createElement("li",null,c.a.createElement("b",null,c.a.createElement("string",null,"'linear_merge'")),c.a.createElement("br",null),c.a.createElement("playground",null,c.a.createElement("code",{className:"norm-border-radius",dangerouslySetInnerHTML:{__html:"{\n    <string>'parent:sub:unicorn'</string>: <string>'#ffffff'</string>\n    <string>'parent1:sub1:dragon'</string>: <string>'#ffffff'</string>\n}"}})),"Let's try to change ",c.a.createElement("prm",null,"uid")," from ",c.a.createElement("string",null,"'dragon'")," to ",c.a.createElement("string",null,"'unicorn'"),". Form will be generated without errors, because keys of values will be different (unique). We can see result here:",c.a.createElement("playground",null,c.a.createElement("code",{dangerouslySetInnerHTML:{__html:"<<classcmd>JOFGENGenerator</classcmd> mode=<string>'linear_merge'</string> json={this.state.json} />"}}),c.a.createElement("compiled",{className:"norm-border-radius"},c.a.createElement(u.b,{mode:"linear_merge",json:[{uid:"parent",name:"Parent",type:"sec",sub:[{uid:"sub",name:"Sub",type:"sec",sub:[{uid:"unicorn",name:"unicorn",value:"#ffffff",type:"color"}]}]},{uid:"parent1",name:"Parent1",type:"sec",sub:[{uid:"sub1",name:"Sub1",type:"sec",sub:[{uid:"unicorn",name:"unicorn",value:"#ffffff",type:"color"}]}]}]})))),c.a.createElement("li",null,c.a.createElement("b",null,c.a.createElement("string",null,"'tree'")),c.a.createElement("br",null),"Let's try to change ",c.a.createElement("prm",null,"uid")," from ",c.a.createElement("string",null,"'dragon'")," to ",c.a.createElement("string",null,"'unicorn'"),". Form will be generated without errors, because keys of values will be different (unique) like in previous case. We can see result here:",c.a.createElement("playground",null,c.a.createElement("code",{className:"norm-border-radius",dangerouslySetInnerHTML:{__html:"{\n    <string>'parent'</string>: {\n        <string>'sub'</string>: {\n            <string>'unicorn'</string>: <string>'#ffffff'</string>\n        }\n    },\n    <string>'parent1'</string>: {\n        <string>'sub1'</string>: {\n            <string>'dragon'</string>: <string>'#ffffff'</string>\n        }\n    }\n}"}})),"As we can see: result object copies structure of input parameter ",c.a.createElement("prm",null,"json"),".",c.a.createElement("br",null),"Let's try to change ",c.a.createElement("prm",null,"uid")," from ",c.a.createElement("string",null,"'dragon'")," to ",c.a.createElement("string",null,"'unicorn'"),". Form will be generated without errors. We can see result here: because keys of values will be different.",c.a.createElement("playground",null,c.a.createElement("code",{dangerouslySetInnerHTML:{__html:"<<classcmd>JOFGENGenerator</classcmd> mode=<string>'tree'</string> json={this.state.json} />"}}),c.a.createElement("compiled",{className:"norm-border-radius"},c.a.createElement(u.b,{mode:"tree",json:[{uid:"parent",name:"Parent",type:"sec",sub:[{uid:"sub",name:"Sub",type:"sec",sub:[{uid:"unicorn",name:"unicorn",value:"#ffffff",type:"color"}]}]},{uid:"parent1",name:"Parent1",type:"sec",sub:[{uid:"sub1",name:"Sub1",type:"sec",sub:[{uid:"unicorn",name:"unicorn",value:"#ffffff",type:"color"}]}]}]})))))),c.a.createElement("h4",{id:"parameter-req_indicator"},"req_indicator"),c.a.createElement("p",null,"Value of this parameter is by default ",c.a.createElement("prm",null,"req_indicator")," = ",c.a.createElement("string",null,"'*'"),". Value of this parameter is showed next to label of each required parameter."),c.a.createElement("h4",{id:"parameter-sep"},"sep"),c.a.createElement("p",null,"This parameter is used only when ",c.a.createElement("prm",null,"mode")," is set to ",c.a.createElement("string",null,"linear_merge"),". It separates unique ids during id merging names between different levels. For example, if ",c.a.createElement("prm",null,"sep")," = ",c.a.createElement("string",null,"'->'"),":",c.a.createElement("playground",null,c.a.createElement("code",{dangerouslySetInnerHTML:{__html:'[\n    {\n        "uid": "parent",\n        "name": "Parent",\n        "type": "sec",\n        "sub": [\n            {\n                "uid": "sub",\n                "name": "Sub",\n                "type": "sec",\n                "sub": [\n                    {\n                        "uid": "unicorn",\n                        "name": "unicorn",\n                        "value": "#ffffff",\n                        "type": "color"\n                    }\n                ]\n            }\n        ]\n    }\n]'}}),c.a.createElement("compiled",{className:"norm-border-radius"},c.a.createElement(u.b,{json:[{uid:"parent",name:"Parent",type:"sec",sub:[{uid:"sub",name:"Sub",type:"sec",sub:[{uid:"unicorn",name:"unicorn",value:"#ffffff",type:"color"}]}]}]}))),"Returned value during filling this form will be:",c.a.createElement("playground",null,c.a.createElement("code",{className:"norm-border-radius",dangerouslySetInnerHTML:{__html:"{\n    <string>'parent->sub->unicorn'</string>: <string>'#ffffff'</string>\n}"}}))),c.a.createElement("h4",{id:"parameter-size"},"size"),c.a.createElement("p",null,"Size of text, inputs, dropdowns and buttons. Value of this parameter can be ",c.a.createElement("string",null,"'sm'")," or ",c.a.createElement("string",null,"'lg'"),"."),c.a.createElement("h4",{id:"parameter-sm"},"sm"),c.a.createElement("p",null,"Global size of element component. Value of this parameter is used if value ",c.a.createElement("prm",null,"sm")," is not defined for concrete element."),c.a.createElement("h4",{id:"parameter-value"},"value"),c.a.createElement("p",null,"This parameter was added for cases when you need to load form with data filled by user. For example, if you stores values from form in database and want to reload it. Object can have different structure depending on selected ",c.a.createElement("prm",null,"mode"),".")),c.a.createElement("section",{id:"methods"},c.a.createElement("h3",null,"Methods"),c.a.createElement("h4",{id:"parameter-json"},"onChange(value, valid)"),c.a.createElement("p",null,"Method takes parameter ",c.a.createElement("prm",null,"value"),", which represents current state of values (input forms). Value of ",c.a.createElement("prm",null,"value")," depends on selected ",c.a.createElement("prm",null,"mode")," and parameter ",c.a.createElement("prm",null,"json"),", that declares structure of generated form. Second parameter ",c.a.createElement("prm",null,"valid")," is ",c.a.createElement("string",null,"true"),", if returned ",c.a.createElement("prm",null,"value")," is valid, otherwise value of ",c.a.createElement("prm",null,"valid")," will be ",c.a.createElement("string",null,"false"),"."),c.a.createElement("h4",{id:"parameter-value"},"isValid(valid)"),c.a.createElement("p",null,"This method returns ",c.a.createElement("string",null,"true"),", if all values in generated form are valid, otherwise value of ",c.a.createElement("prm",null,"valid")," will be ",c.a.createElement("string",null,"false"),".")));var e}}]),n}(o.Component)},55:function(e,a,n){"use strict";var t=n(2),r=n(6),l=n(43),s=n(0),o=n.n(s),c=n(7),m=n.n(c),i=n(34),u=n.n(i),d=n(35),p=n(45),f={children:m.a.node,className:m.a.string,closeClassName:m.a.string,closeAriaLabel:m.a.string,cssModule:m.a.object,color:m.a.string,fade:m.a.bool,isOpen:m.a.bool,toggle:m.a.func,tag:d.q,transition:m.a.shape(p.a.propTypes),innerRef:m.a.oneOfType([m.a.object,m.a.string,m.a.func])},b={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:Object(l.a)({},p.a.defaultProps,{unmountOnExit:!0})};function g(e){var a=e.className,n=e.closeClassName,s=e.closeAriaLabel,c=e.cssModule,m=e.tag,i=e.color,f=e.isOpen,b=e.toggle,g=e.children,E=e.transition,h=e.fade,y=e.innerRef,v=Object(r.a)(e,["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"]),j=Object(d.m)(u()(a,"alert","alert-"+i,{"alert-dismissible":b}),c),N=Object(d.m)(u()("close",n),c),w=Object(l.a)({},p.a.defaultProps,{},E,{baseClass:h?E.baseClass:"",timeout:h?E.timeout:0});return o.a.createElement(p.a,Object(t.a)({},v,w,{tag:m,className:j,in:f,role:"alert",innerRef:y}),b?o.a.createElement("button",{type:"button",className:N,"aria-label":s,onClick:b},o.a.createElement("span",{"aria-hidden":"true"},"\xd7")):null,g)}g.propTypes=f,g.defaultProps=b,a.a=g}}]);
//# sourceMappingURL=25.7386022d.chunk.js.map