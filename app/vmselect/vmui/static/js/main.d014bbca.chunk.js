(this.webpackJsonpvmui=this.webpackJsonpvmui||[]).push([[0],{195:function(e,t,n){},210:function(e,t){},215:function(e,t,n){},216:function(e,t,n){},223:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(71),i=n.n(c),o=(n(195),n(10)),s=n(305),l=n(304),u=n(0),d=Object(a.createContext)({showInfoMessage:function(){}}),j=function(){return Object(a.useContext)(d)},b=function(e){var t=e.children,n=Object(a.useState)({}),r=Object(o.a)(n,2),c=r[0],i=r[1],j=Object(a.useState)(!1),b=Object(o.a)(j,2),O=b[0],h=b[1],f=Object(a.useState)(void 0),p=Object(o.a)(f,2),x=p[0],v=p[1];Object(a.useEffect)((function(){x&&(i({message:x,key:(new Date).getTime()}),h(!0))}),[x]);return Object(u.jsxs)(d.Provider,{value:{showInfoMessage:v},children:[Object(u.jsx)(s.a,{open:O,autoHideDuration:4e3,onClose:function(e,t){"clickaway"!==t&&(v(void 0),h(!1))},children:Object(u.jsx)(l.a,{children:c.message})},c.key),t]})},O=n(339),h=n(340),f=n(314),p=n(234),x=n(326),v=n(230),m=n(315),y=n(316),g=n(317),E=n(310),_=n(313),S=n(145),T=n.n(S),A=n(3),C=n(17),w=n(38),I=n.n(w),R=n(141),U=n.n(R),k=n(142),D=n.n(k);I.a.extend(U.a),I.a.extend(D.a);var H,M=window.screen.availWidth/2,L=1e3,N=1578e8,Y="YYYY-MM-DD[T]HH:mm:ss",q=[{long:"days",short:"d",possible:"day"},{long:"weeks",short:"w",possible:"week"},{long:"months",short:"M",possible:"mon"},{long:"years",short:"y",possible:"year"},{long:"hours",short:"h",possible:"hour"},{long:"minutes",short:"m",possible:"min"},{long:"seconds",short:"s",possible:"sec"},{long:"milliseconds",short:"ms",possible:"millisecond"}],B=q.map((function(e){return e.short})),P=function(e){var t=e.match(/\d+/g),n=e.match(/[a-zA-Z]+/g);if(n&&t&&B.includes(n[0]))return Object(A.a)({},n[0],t[0])},z=function(e,t){var n=(t||new Date).valueOf()/1e3,a=e.trim().split(" ").reduce((function(e,t){var n=P(t);return n?Object(C.a)(Object(C.a)({},e),n):Object(C.a)({},e)}),{}),r=I.a.duration(a).asSeconds();return{start:n-r,end:n,step:Math.ceil(r/M),date:F(t||new Date)}},F=function(e){return I()(e).utc().format(Y)},Q=function(e){var t=Math.floor(e%1e3),n=Math.floor(e/1e3%60),a=Math.floor(e/1e3/60%60),r=Math.floor(e/1e3/3600%24),c=Math.floor(e/864e5),i=["d","h","m","s","ms"];return[c,r,a,n,t].map((function(e,t){return e?"".concat(e).concat(i[t]):""})).filter((function(e){return e})).join(" ")},W=function(e){return new Date(1e3*e)},G=function(e,t){t?window.localStorage.setItem(e,JSON.stringify({value:t})):X([e])},V=function(e){var t=window.localStorage.getItem(e);if(null!==t)try{var n;return null===(n=JSON.parse(t))||void 0===n?void 0:n.value}catch(a){return t}},X=function(e){return e.forEach((function(e){return window.localStorage.removeItem(e)}))},J=["BASIC_AUTH_DATA","BEARER_AUTH_DATA"],K=n(143),Z=n.n(K),$=n(127),ee=n.n($),te={query:"g0.expr","time.duration":"g0.range_input","time.period.date":"g0.end_input","time.period.step":"g0.step_input",stacked:"g0.stacked"},ne=function(e){var t=new Map(Object.entries(te)),n=[];t.forEach((function(t,a){var r=ee()(e,a,"");if(r){var c=encodeURIComponent(r);n.push("".concat(t,"=").concat(c))}})),function(e){var t=window;if(t){var n="".concat(t.location.protocol,"//").concat(t.location.host).concat(t.location.pathname,"?").concat(e);t.history.pushState({path:n},"",n)}}(n.join("&"))},ae=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window.location.search,a=Z.a.parse(n,{ignoreQueryPrefix:!0});return ee()(a,e,t||"")},re=ae("g0.range_input","1h"),ce=(H=ae("g0.end_input",new Date(I()().utc().format(Y))),I()(H).utcOffset(0,!0).local().format(Y)),ie=ae("g0.expr",V("LAST_QUERY")||"\n"),oe={serverUrl:window.location.href.replace(/\/(?:prometheus\/)?(?:graph|vmui)\/.*/,"/prometheus/"),displayType:"chart",query:ie,queryHistory:{index:0,values:[ie]},time:{duration:re,period:z(re,new Date(ce))},queryControls:{autoRefresh:!1,autocomplete:V("AUTOCOMPLETE")||!1,nocache:V("NO_CACHE")||!1}};function se(e,t){switch(t.type){case"SET_DISPLAY_TYPE":return Object(C.a)(Object(C.a)({},e),{},{displayType:t.payload});case"SET_SERVER":return Object(C.a)(Object(C.a)({},e),{},{serverUrl:t.payload});case"SET_QUERY":return Object(C.a)(Object(C.a)({},e),{},{query:t.payload});case"SET_QUERY_HISTORY_INDEX":return Object(C.a)(Object(C.a)({},e),{},{queryHistory:Object(C.a)(Object(C.a)({},e.queryHistory),{},{index:t.payload})});case"SET_QUERY_HISTORY_VALUES":return Object(C.a)(Object(C.a)({},e),{},{queryHistory:Object(C.a)(Object(C.a)({},e.queryHistory),{},{values:t.payload})});case"SET_DURATION":return Object(C.a)(Object(C.a)({},e),{},{time:Object(C.a)(Object(C.a)({},e.time),{},{duration:t.payload,period:z(t.payload,W(e.time.period.end))})});case"SET_UNTIL":return Object(C.a)(Object(C.a)({},e),{},{time:Object(C.a)(Object(C.a)({},e.time),{},{period:z(e.time.duration,t.payload)})});case"SET_PERIOD":var n=function(e){var t=e.to.valueOf()-e.from.valueOf();return Q(t)}(t.payload);return Object(C.a)(Object(C.a)({},e),{},{queryControls:Object(C.a)(Object(C.a)({},e.queryControls),{},{autoRefresh:!1}),time:Object(C.a)(Object(C.a)({},e.time),{},{duration:n,period:z(n,t.payload.to)})});case"TOGGLE_AUTOREFRESH":return Object(C.a)(Object(C.a)({},e),{},{queryControls:Object(C.a)(Object(C.a)({},e.queryControls),{},{autoRefresh:!e.queryControls.autoRefresh})});case"TOGGLE_AUTOCOMPLETE":return Object(C.a)(Object(C.a)({},e),{},{queryControls:Object(C.a)(Object(C.a)({},e.queryControls),{},{autocomplete:!e.queryControls.autocomplete})});case"NO_CACHE":return Object(C.a)(Object(C.a)({},e),{},{queryControls:Object(C.a)(Object(C.a)({},e.queryControls),{},{nocache:!e.queryControls.nocache})});case"RUN_QUERY":return Object(C.a)(Object(C.a)({},e),{},{time:Object(C.a)(Object(C.a)({},e.time),{},{period:z(e.time.duration,W(e.time.period.end))})});case"RUN_QUERY_TO_NOW":return Object(C.a)(Object(C.a)({},e),{},{time:Object(C.a)(Object(C.a)({},e.time),{},{period:z(e.time.duration)})});default:throw new Error}}var le=Object(a.createContext)({}),ue=function(){return Object(a.useContext)(le).state},de=function(){return Object(a.useContext)(le).dispatch},je=Object.entries(oe).reduce((function(e,t){var n=Object(o.a)(t,2),a=n[0],r=n[1];return Object(C.a)(Object(C.a)({},e),{},Object(A.a)({},a,ae(a)||r))}),{}),be=function(e){var t=e.children,n=Object(a.useReducer)(se,je),r=Object(o.a)(n,2),c=r[0],i=r[1];Object(a.useEffect)((function(){ne(c)}),[c]);var s=Object(a.useMemo)((function(){return{state:c,dispatch:i}}),[c,i]);return Object(u.jsx)(le.Provider,{value:s,children:t})},Oe=function(e){return Object(u.jsxs)(f.a,{position:"relative",display:"inline-flex",children:[Object(u.jsx)(m.a,Object(C.a)({variant:"determinate"},e)),Object(u.jsx)(f.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",children:Object(u.jsx)(p.a,{variant:"caption",component:"div",children:"".concat(e.label,"s")})})]})},he=n(301),fe=Object(he.a)({colorizing:{color:"white"}}),pe=function(){var e=fe(),t=de(),n=ue().queryControls.autoRefresh,c=Object(a.useState)(5),i=Object(o.a)(c,2),s=i[0],l=i[1],d=Object(a.useState)(),j=Object(o.a)(d,2),b=j[0],O=j[1],h=r.a.useState(100),p=Object(o.a)(h,2),x=p[0],v=p[1];Object(a.useEffect)((function(){var e;return n&&(O((new Date).valueOf()),e=setInterval((function(){O((new Date).valueOf()),t({type:"RUN_QUERY_TO_NOW"})}),1e3*s)),function(){e&&clearInterval(e)}}),[s,n]),Object(a.useEffect)((function(){var e=setInterval((function(){if(n&&b){var e=((new Date).valueOf()-b)/1e3,t=Math.floor(e/s*100);v(t)}}),16);return function(){clearInterval(e)}}),[n,b,s]);var m=function(){l((function(e){switch(e){case 1:return 2;default:return 5;case 5:return 1}}))};return Object(u.jsxs)(f.a,{display:"flex",alignItems:"center",children:[Object(u.jsx)(y.a,{control:Object(u.jsx)(g.a,{size:"small",className:e.colorizing,checked:n,onChange:function(){t({type:"TOGGLE_AUTOREFRESH"})}}),label:"Auto-refresh"}),n&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(Oe,{className:e.colorizing,label:s,value:x,onClick:function(){m()}}),Object(u.jsx)(E.a,{title:"Change delay refresh",children:Object(u.jsx)(f.a,{ml:1,children:Object(u.jsx)(_.a,{onClick:function(){m()},size:"large",children:Object(u.jsx)(T.a,{style:{color:"white"}})})})})]})]})},xe=n(148),ve=n.n(xe),me=n(146),ye=n.n(me),ge=n(147),Ee=n.n(ge),_e=n(319),Se=n(311),Te=n(318),Ae=Object(Te.a)({root:{padding:6,color:"white","&.Mui-selected":{color:"white"}}})(_e.a),Ce=function(){var e=ue().displayType,t=de();return Object(u.jsxs)(Se.a,{value:e,exclusive:!0,onChange:function(n,a){return t({type:"SET_DISPLAY_TYPE",payload:null!==a&&void 0!==a?a:e})},children:[Object(u.jsxs)(Ae,{value:"chart","aria-label":"display as chart",children:[Object(u.jsx)(ye.a,{}),"\xa0Query Range as Chart"]}),Object(u.jsxs)(Ae,{value:"code","aria-label":"display as code",children:[Object(u.jsx)(Ee.a,{}),"\xa0Instant Query as JSON"]}),Object(u.jsxs)(Ae,{value:"table","aria-label":"display as table",children:[Object(u.jsx)(ve.a,{}),"\xa0Instant Query as Table"]})]})},we=n(21),Ie=n(149),Re=n.n(Ie),Ue=(n(214),n(150)),ke=n.n(Ue),De=(n(215),{yaxis:{limits:{enable:!1,range:[0,0]}}});function He(e,t){switch(t.type){case"TOGGLE_ENABLE_YAXIS_LIMITS":return Object(C.a)(Object(C.a)({},e),{},{yaxis:Object(C.a)(Object(C.a)({},e.yaxis),{},{limits:Object(C.a)(Object(C.a)({},e.yaxis.limits),{},{enable:!e.yaxis.limits.enable})})});case"SET_YAXIS_LIMITS":return Object(C.a)(Object(C.a)({},e),{},{yaxis:Object(C.a)(Object(C.a)({},e.yaxis),{},{limits:Object(C.a)(Object(C.a)({},e.yaxis.limits),{},{range:t.payload})})});default:throw new Error}}var Me=Object(a.createContext)({}),Le=function(){return Object(a.useContext)(Me).state},Ne=function(){return Object(a.useContext)(Me).dispatch},Ye=function(e){var t=e.children,n=Object(a.useReducer)(He,De),r=Object(o.a)(n,2),c=r[0],i=r[1],s=Object(a.useMemo)((function(){return{state:c,dispatch:i}}),[c,i]);return Object(u.jsx)(Me.Provider,{value:s,children:t})},qe=function(e){for(var t=0,n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t);for(var a="#",r=0;r<3;r++){a+=("00"+(t>>8*r&255).toString(16)).substr(-2)}return a},Be=function(e){if(7!=e.length)return"0, 0, 0";var t=parseInt(e.slice(1,3),16),n=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16);return"".concat(t,", ").concat(n,", ").concat(a)},Pe=function(e){var t,n=e.u,a=e.tooltipIdx,r=e.metrics,c=e.series,i=e.tooltip,o=e.tooltipOffset,s=a.seriesIdx,l=a.dataIdx,u=n.data[s][l],d=n.data[0][l],j=(null===(t=r[s-1])||void 0===t?void 0:t.metric)||{},b=qe(c[s].label||""),O=n.over.getBoundingClientRect(),h=O.width,f=O.height,p=n.valToPos(u||0,"y"),x=n.valToPos(d,"x"),v=i.getBoundingClientRect(),m=v.width,y=v.height,g=x+m>=h,E=p+y>=f;i.style.display="grid",i.style.top="".concat(o.top+p+10-(E?y+10:0),"px"),i.style.left="".concat(o.left+x+10-(g?m+20:0),"px");var _=I()(new Date(1e3*d)).format("YYYY-MM-DD HH:mm:ss:SSS (Z)"),S=Object.keys(j).filter((function(e){return"__name__"!==e})).map((function(e){return"<div><b>".concat(e,"</b>: ").concat(j[e],"</div>")})).join(""),T='<div class="u-tooltip__marker" style="background: '.concat(b,'"></div>');i.innerHTML="<div>".concat(_,'</div>\n                       <div class="u-tooltip-data">\n                         ').concat(T).concat(j.__name__||"",': <b class="u-tooltip-data__value">').concat(u,'</b>\n                       </div>\n                       <div class="u-tooltip__info">').concat(S,"</div>")},ze=function(e){var t=e.data,n=e.series,r=e.metrics,c=void 0===r?[]:r,i=de(),s=ue().time.period,l=Le().yaxis,d=Object(a.useRef)(null),j=Object(a.useState)(!1),b=Object(o.a)(j,2),O=b[0],h=b[1],f=Object(a.useState)(0),p=Object(o.a)(f,2),x=p[0],v=p[1],m={seriesIdx:1,dataIdx:0},y={left:0,top:0},g=document.createElement("div");g.className="u-tooltip";var E=function(e){var t=e.min,n=e.max;i({type:"SET_PERIOD",payload:{from:new Date(1e3*t),to:new Date(1e3*n)}})},_={width:d.current?d.current.offsetWidth:400,height:500,series:n,plugins:[{hooks:{ready:function(e){var t;y.left=parseFloat(e.over.style.left),y.top=parseFloat(e.over.style.top),null===(t=e.root.querySelector(".u-wrap"))||void 0===t||t.appendChild(g),e.over.addEventListener("mousedown",(function(t){if(0===t.button){h(!0),t.preventDefault();var n=t.clientX,a=function(t){t.preventDefault();var a=(e.posToVal(1,"x")-e.posToVal(0,"x"))*(t.clientX-n),r=(e.scales.x.min||1)-a,c=(e.scales.x.max||1)-a;e.setScale("x",{min:r,max:c}),E({min:r,max:c})};document.addEventListener("mousemove",a),document.addEventListener("mouseup",(function e(){h(!1),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",e)}))}})),e.over.addEventListener("wheel",(function(t){if(t.ctrlKey||t.metaKey){t.preventDefault();var n=e.over.getBoundingClientRect().width;e.cursor.left&&e.cursor.left>0&&v(e.cursor.left);var a=e.posToVal(x,"x"),r=(e.scales.x.max||0)-(e.scales.x.min||0),c=t.deltaY<0?.85*r:r/.85,i=a-x/n*c,o=i+c;e.batch((function(){e.setScale("x",{min:i,max:o}),E({min:i,max:o})}))}}))},setCursor:function(e){m.dataIdx!==e.cursor.idx&&(m.dataIdx=e.cursor.idx||0,m.seriesIdx&&m.dataIdx&&Pe({u:e,tooltipIdx:m,metrics:c,series:n,tooltip:g,tooltipOffset:y}))},setSeries:function(e,t){m.seriesIdx!==t&&(m.seriesIdx=t||0,t&&m.dataIdx?Pe({u:e,tooltipIdx:m,metrics:c,series:n,tooltip:g,tooltipOffset:y}):g.style.display="none")}}}],cursor:{drag:{x:!1,y:!1},focus:{prox:30},bind:{mouseup:function(){return null},mousedown:function(){return null},click:function(){return null},dblclick:function(){return null},mouseenter:function(){return null}}},legend:{show:!1},axes:[{space:80},{show:!0,font:"10px Arial",values:function(e,t){return t.map((function(e){return e>1e3?ke()(e).format("0.0a"):e}))}}],scales:{x:{range:function(){return[s.start,s.end]}},y:{range:function(e,t,n){return l.limits.enable?l.limits.range:[t-.05*t,n+.05*n]}}}};return Object(u.jsx)("div",{ref:d,style:{pointerEvents:O?"none":"auto",height:"500px"},children:Object(u.jsx)(Re.a,{options:_,data:t})})},Fe=(n(216),function(e){var t=e.labels,n=e.onChange;return Object(u.jsx)("div",{className:"legendWrapper",children:t.map((function(e){return Object(u.jsxs)("div",{className:e.checked?"legendItem":"legendItem legendItemHide",onClick:function(t){return n(e.label,t.ctrlKey||t.metaKey)},children:[Object(u.jsx)("div",{className:"legendMarker",style:{borderColor:e.color,backgroundColor:"rgba(".concat(Be(e.color),", 0.1)")}}),Object(u.jsxs)("div",{className:"legendLabel",children:[e.checked," ",e.label]})]},e.label)}))})}),Qe=n(112),We=["__name__"],Ge=function(e){var t=e.data,n=void 0===t?[]:t,r=ue().time.period,c=Le().yaxis,i=Ne(),s=Object(a.useState)([]),l=Object(o.a)(s,2),d=l[0],j=l[1],b=Object(a.useState)([[]]),O=Object(o.a)(b,2),h=O[0],f=O[1],p=Object(a.useState)([]),x=Object(o.a)(p,2),v=x[0],m=x[1],y=Object(a.useState)([]),g=Object(o.a)(y,2),E=g[0],_=g[1],S=Object(a.useState)([]),T=Object(o.a)(S,2),A=T[0],C=T[1],w=function(e){var t=function(e){if(0===Object.keys(e.metric).length)return"Query result";var t=e.metric,n=t.__name__,a=Object(Qe.a)(t,We);return"".concat(n||""," {").concat(Object.entries(a).map((function(e){return"".concat(e[0],": ").concat(e[1])})).join(", "),"}")}(e);return{label:t,width:1.5,stroke:qe(t),show:!A.includes(t)}},I=function(e){return{label:e.label||"",color:e.stroke,checked:e.show||!1}};return Object(a.useEffect)((function(){var e=[],t=[],a=[],o=[];null===n||void 0===n||n.forEach((function(n){var r=w(n);o.push(r),a.push(I(r)),n.values.forEach((function(n){-1===e.indexOf(n[0])&&e.push(n[0]),t.push(+n[1])}))})),function(e){var t=e.sort((function(e,t){return e-t})),n=t[0]||0,a=t[t.length-1]||0,c=r.step||1,i=Math.round((a-n)/c);j(new Array(i).fill(0).map((function(e,t){return n+c*t})))}(e),function(e){if(!c.limits.enable||c.limits.range.every((function(e){return!e}))){var t=e.flat().sort((function(e,t){return e-t}));i({type:"SET_YAXIS_LIMITS",payload:[t[0],t[t.length-1]]})}}(t),m([{}].concat(o)),_(a)}),[n]),Object(a.useEffect)((function(){var e=[],t=[];null===n||void 0===n||n.forEach((function(n){var a=w(n);t.push(a),e.push(I(a))})),m([{}].concat(t)),_(e)}),[A]),Object(a.useEffect)((function(){f([d].concat(Object(we.a)(n.map((function(e){return d.map((function(t){var n=e.values.find((function(e){return e[0]===t}));return n?+n[1]:null}))})))))}),[d]),Object(u.jsx)(u.Fragment,{children:n.length>0?Object(u.jsxs)("div",{children:[Object(u.jsx)(ze,{data:h,series:v,metrics:n}),Object(u.jsx)(Fe,{labels:E,onChange:function(e,t){C(function(e){var t=e.hideSeries,n=e.label,a=e.metaKey,r=e.series,c=t.includes(n),i=r.map((function(e){return e.label||""})).filter((function(e){return e}));return a&&c?Object(we.a)(i.filter((function(e){return e!==n}))):a&&!c?t.length===r.length-2?[]:Object(we.a)(i.filter((function(e){return e!==n}))):c?t.filter((function(e){return e!==n})):[].concat(Object(we.a)(t),[n])}({hideSeries:A,label:e,metaKey:t,series:v}))}})]}):Object(u.jsx)("div",{style:{textAlign:"center"},children:"No data to show"})})},Ve=n(320),Xe=n(169),Je=n(321),Ke=n(322),Ze=n(323),$e=n(324),et=n(325),tt=Object(he.a)({deemphasized:{opacity:.4}}),nt=function(e){var t=e.data,n=tt(),r=function(e){return Object(a.useMemo)((function(){var t={};return e.forEach((function(e){return Object.entries(e.metric).forEach((function(e){return t[e[0]]?t[e[0]].options.add(e[1]):t[e[0]]={options:new Set([e[1]])}}))})),Object.entries(t).map((function(e){return{key:e[0],variations:e[1].options.size}})).sort((function(e,t){return e.variations-t.variations}))}),[e])}(t),c=Object(a.useMemo)((function(){return null===t||void 0===t?void 0:t.map((function(e){return{metadata:r.map((function(t){return e.metric[t.key]||"-"})),value:e.value[1]}}))}),[r,t]);return Object(u.jsx)(u.Fragment,{children:c.length>0?Object(u.jsx)(Ve.a,{component:Xe.a,children:Object(u.jsxs)(Je.a,{"aria-label":"simple table",children:[Object(u.jsx)(Ke.a,{children:Object(u.jsxs)(Ze.a,{children:[r.map((function(e,t){return Object(u.jsx)($e.a,{style:{textTransform:"capitalize"},children:e.key},t)})),Object(u.jsx)($e.a,{align:"right",children:"Value"})]})}),Object(u.jsx)(et.a,{children:c.map((function(e,t){return Object(u.jsxs)(Ze.a,{children:[e.metadata.map((function(e,a){var r=c[t-1]&&c[t-1].metadata[a];return Object(u.jsx)($e.a,{className:r===e?n.deemphasized:void 0,children:e},a)})),Object(u.jsx)($e.a,{align:"right",children:e.value})]},t)}))})]})}):Object(u.jsx)("div",{style:{textAlign:"center"},children:"No data to show"})})},at=n(308),rt=n(337),ct=n(338),it=n(312),ot=n(302),st=n(6),lt=n(12),ut=n(108),dt=n(163),jt=n(165),bt=function(e){var t=e.query,n=e.queryHistory,r=e.setHistoryIndex,c=e.setQuery,i=e.runQuery,s=e.server,l=e.oneLiner,d=void 0!==l&&l,j=e.autocomplete,b=Object(a.useRef)(null),O=Object(a.useState)(),h=Object(o.a)(O,2),f=h[0],p=h[1];Object(a.useEffect)((function(){return b.current&&p(new lt.d({parent:b.current})),function(){return null===f||void 0===f?void 0:f.destroy()}}),[]),Object(a.useEffect)((function(){var e=new dt.a;e.activateCompletion(j),e.setComplete({remote:{url:s}});var n=lt.d.updateListener.of((function(e){e.docChanged&&c(e.state.doc.toJSON().map((function(e){return e.trim()})).join(""))}));null===f||void 0===f||f.setState(st.f.create({doc:t,extensions:[jt.a,lt.k.of(ut.a),n,e.asExtension()]}))}),[s,f,j,n]);return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("div",{ref:b,className:d?"one-line-scroll":"multi-line-scroll",onKeyUp:function(e){var t=e.key,n=e.ctrlKey,a=e.metaKey,c=n||a;"Enter"===t&&c?i():"ArrowUp"===t&&c?r(-1):"ArrowDown"===t&&c&&r(1)}})})},Ot=n(329),ht=n(299),ft=function(){return Object(u.jsx)(Ve.a,{component:Xe.a,children:Object(u.jsxs)(Je.a,{"aria-label":"simple table",size:"small",children:[Object(u.jsx)(Ke.a,{children:Object(u.jsxs)(Ze.a,{children:[Object(u.jsx)($e.a,{children:"Long"}),Object(u.jsx)($e.a,{children:"Short"})]})}),Object(u.jsx)(et.a,{children:q.map((function(e,t){return Object(u.jsxs)(Ze.a,{children:[Object(u.jsx)($e.a,{component:"th",scope:"row",children:e.long}),Object(u.jsx)($e.a,{children:e.short})]},t)}))})]})})},pt=Object(he.a)({inlineBtn:{"&:hover":{cursor:"pointer"}}}),xt=function(e){var t=e.handler,n=e.text,a=pt();return Object(u.jsx)(x.a,{component:"span",className:a.inlineBtn,onClick:t,children:n})},vt=function(e){var t=e.setDuration,n=Object(a.useState)(!1),c=Object(o.a)(n,2),i=c[0],s=c[1],l=r.a.useState(null),d=Object(o.a)(l,2),j=d[0],b=d[1],O=Object(a.useState)(),h=Object(o.a)(O,2),x=h[0],v=h[1],m=ue().time,y=m.period.end,g=m.duration,E=de(),_=Object(a.useState)(g),S=Object(o.a)(_,2),T=S[0],A=S[1];Object(a.useEffect)((function(){A(g)}),[g]),Object(a.useEffect)((function(){v(function(e){return I()(e).format(Y)}(W(y)))}),[y]),Object(a.useEffect)((function(){if(!i){var e=function(e){var t=e.trim().split(" ").reduce((function(e,t){var n=P(t);return n?Object(C.a)(Object(C.a)({},e),n):Object(C.a)({},e)}),{}),n=I.a.duration(t).asMilliseconds();return n<L?Q(L):n>N?Q(N):e}(T);A(e),t(e)}}),[T,i]);var w=function(){b(null)},R=Boolean(j);return Object(u.jsxs)(f.a,{m:1,flexDirection:"row",display:"flex",children:[Object(u.jsxs)(f.a,{px:1,children:[Object(u.jsx)(f.a,{children:Object(u.jsx)(ot.a,{label:"Duration",value:T,onChange:function(e){A(e.target.value)},variant:"standard",fullWidth:!0,onBlur:function(){s(!1)},onFocus:function(){s(!0)}})}),Object(u.jsx)(f.a,{my:2,children:Object(u.jsxs)(p.a,{variant:"body2",children:[Object(u.jsx)("span",{"aria-owns":R?"mouse-over-popover":void 0,"aria-haspopup":"true",style:{cursor:"pointer"},onMouseEnter:function(e){b(e.currentTarget)},onMouseLeave:w,children:"Possible options:\xa0"}),Object(u.jsx)(Ot.a,{open:R,anchorEl:j,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},style:{pointerEvents:"none"},onClose:w,disableRestoreFocus:!0,children:Object(u.jsx)(ft,{})}),Object(u.jsx)(xt,{handler:function(){return A("5m")},text:"5m"}),",\xa0",Object(u.jsx)(xt,{handler:function(){return A("1h")},text:"1h"}),",\xa0",Object(u.jsx)(xt,{handler:function(){return A("1h 30m")},text:"1h 30m"})]})})]}),Object(u.jsxs)(f.a,{px:1,children:[Object(u.jsx)(f.a,{children:Object(u.jsx)(ht.a,{label:"Until",ampm:!1,value:x,onChange:function(e){return E({type:"SET_UNTIL",payload:e})},onError:console.log,inputFormat:"DD/MM/YYYY HH:mm:ss",mask:"__/__/____ __:__:__",renderInput:function(e){return Object(u.jsx)(ot.a,Object(C.a)(Object(C.a)({},e),{},{variant:"standard"}))}})}),Object(u.jsx)(f.a,{my:2,children:Object(u.jsxs)(p.a,{variant:"body2",children:["Will be changed to current time for auto-refresh mode.\xa0",Object(u.jsx)(xt,{handler:function(){return E({type:"RUN_QUERY_TO_NOW"})},text:"Switch to now"})]})})]})]})},mt=n(154),yt=n.n(mt),gt=n(156),Et=n.n(gt),_t=n(296),St=n(294),Tt=n(334),At=n(336),Ct=n(303),wt=n(332),It=n(328),Rt=n(309),Ut=n(327),kt=n(333),Dt=n(307),Ht=n(330),Mt=n(335),Lt=n(331),Nt=n(295),Yt=["children","value","index"],qt=function(e){var t=e.children,n=e.value,a=e.index,r=Object(Qe.a)(e,Yt);return Object(u.jsx)("div",Object(C.a)(Object(C.a)({role:"tabpanel",hidden:n!==a,id:"auth-config-tabpanel-".concat(a),"aria-labelledby":"auth-config-tab-".concat(a)},r),{},{children:n===a&&Object(u.jsx)(f.a,{py:2,children:t})}))},Bt=n(152),Pt=n.n(Bt),zt=n(153),Ft=n.n(zt),Qt={authMethod:"NO_AUTH",saveAuthLocally:!1},Wt=V("AUTH_TYPE"),Gt=V("BASIC_AUTH_DATA"),Vt=V("BEARER_AUTH_DATA"),Xt=Object(C.a)(Object(C.a)({},Qt),{},{authMethod:Wt||Qt.authMethod,basicData:Gt,bearerData:Vt,saveAuthLocally:!(!Gt&&!Vt)}),Jt=function(){X(J)};function Kt(e,t){switch(t.type){case"SET_BASIC_AUTH":return t.payload.checkbox?G("BASIC_AUTH_DATA",t.payload.value):Jt(),G("AUTH_TYPE","BASIC_AUTH"),Object(C.a)(Object(C.a)({},e),{},{authMethod:"BASIC_AUTH",basicData:t.payload.value});case"SET_BEARER_AUTH":return t.payload.checkbox?G("BEARER_AUTH_DATA",t.payload.value):Jt(),G("AUTH_TYPE","BEARER_AUTH"),Object(C.a)(Object(C.a)({},e),{},{authMethod:"BEARER_AUTH",bearerData:t.payload.value});case"SET_NO_AUTH":return!t.payload.checkbox&&Jt(),G("AUTH_TYPE","NO_AUTH"),Object(C.a)(Object(C.a)({},e),{},{authMethod:"NO_AUTH"});default:throw new Error}}var Zt=Object(a.createContext)({}),$t=function(){return Object(a.useContext)(Zt).state},en=function(e){var t=e.children,n=Object(a.useReducer)(Kt,Xt),r=Object(o.a)(n,2),c=r[0],i=r[1],s=Object(a.useMemo)((function(){return{state:c,dispatch:i}}),[c,i]);return Object(u.jsx)(Zt.Provider,{value:s,children:t})},tn=Object(he.a)((function(){return Object(Nt.a)({tabsContent:{height:"200px"}})})),nn="Bearer ",an=[{title:"No auth",id:"NO_AUTH"},{title:"Basic Auth",id:"BASIC_AUTH"},{title:"Bearer Token",id:"BEARER_AUTH"}],rn=function(e){var t=tn(),n=e.onClose,r=e.open,c=$t(),i=c.saveAuthLocally,s=c.basicData,l=c.bearerData,d=c.authMethod,j=Object(a.useContext)(Zt).dispatch,b=Object(a.useState)(i),O=Object(o.a)(b,2),h=O[0],x=O[1],v=Object(a.useState)(s||{password:"",login:""}),m=Object(o.a)(v,2),g=m[0],E=m[1],_=Object(a.useState)((null===l||void 0===l?void 0:l.token)||nn),S=Object(o.a)(_,2),T=S[0],A=S[1],w=Object(a.useState)(an.findIndex((function(e){return e.id===d}))||0),I=Object(o.a)(w,2),R=I[0],U=I[1],k=function(){n()};return Object(u.jsxs)(St.a,{onClose:k,"aria-labelledby":"simple-dialog-title",open:r,children:[Object(u.jsx)(_t.a,{id:"simple-dialog-title",children:"Request Auth Settings"}),Object(u.jsxs)(Tt.a,{children:[Object(u.jsx)(At.a,{children:"This affects Authorization header sent to the server you specify. Not shown in URL and can be optionally stored on a client side"}),Object(u.jsx)(Ct.a,{value:R,onChange:function(e,t){U(t)},indicatorColor:"primary",textColor:"primary",children:an.map((function(e){return Object(u.jsx)(wt.a,{label:e.title},e.id)}))}),Object(u.jsxs)(f.a,{p:0,display:"flex",flexDirection:"column",className:t.tabsContent,children:[Object(u.jsxs)(f.a,{flexGrow:1,children:[Object(u.jsx)(qt,{value:R,index:0,children:Object(u.jsx)(p.a,{style:{fontStyle:"italic"},children:"No Authorization Header"})}),Object(u.jsxs)(qt,{value:R,index:1,children:[Object(u.jsxs)(It.a,{margin:"dense",fullWidth:!0,children:[Object(u.jsx)(Rt.a,{htmlFor:"basic-login",children:"User"}),Object(u.jsx)(Ut.a,{id:"basic-login",startAdornment:Object(u.jsx)(kt.a,{position:"start",children:Object(u.jsx)(Pt.a,{})}),required:!0,onChange:function(e){return E((function(t){return Object(C.a)(Object(C.a)({},t),{},{login:e.target.value||""})}))},value:(null===g||void 0===g?void 0:g.login)||""})]}),Object(u.jsxs)(It.a,{margin:"dense",fullWidth:!0,children:[Object(u.jsx)(Rt.a,{htmlFor:"basic-pass",children:"Password"}),Object(u.jsx)(Ut.a,{id:"basic-pass",startAdornment:Object(u.jsx)(kt.a,{position:"start",children:Object(u.jsx)(Ft.a,{})}),onChange:function(e){return E((function(t){return Object(C.a)(Object(C.a)({},t),{},{password:e.target.value||""})}))},value:(null===g||void 0===g?void 0:g.password)||""})]})]}),Object(u.jsx)(qt,{value:R,index:2,children:Object(u.jsx)(ot.a,{id:"bearer-auth",label:"Bearer token",multiline:!0,fullWidth:!0,value:T,onChange:function(e){var t=e.target.value;t.startsWith(nn)?A(t):A(nn)},InputProps:{onPaste:function(e){var t=e.clipboardData.getData("text/plain");t.startsWith(nn)?A(t):A(nn+t),e.preventDefault()}},maxRows:6})})]}),Object(u.jsxs)(It.a,{children:[Object(u.jsx)(y.a,{control:Object(u.jsx)(Dt.a,{checked:h,onChange:function(){return x((function(e){return!e}))},name:"checkedB",color:"primary"}),label:"Persist Auth Data Locally"}),Object(u.jsx)(Ht.a,{children:h?"Auth Data and the Selected method will be saved to LocalStorage":"Auth Data won't be saved. All previously saved Auth Data will be removed"})]})]})]}),Object(u.jsx)(Mt.a,{children:Object(u.jsx)(Lt.a,{onClick:function(){switch(R){case 0:j({type:"SET_NO_AUTH",payload:{checkbox:h}});break;case 1:j({type:"SET_BASIC_AUTH",payload:{checkbox:h,value:g}});break;case 2:j({type:"SET_BEARER_AUTH",payload:{checkbox:h,value:{token:T}}})}k()},color:"primary",children:"Apply"})})]})},cn=n(155),on=n.n(cn),sn=n(289),ln=n(129),un=n.n(ln),dn=function(){var e=ue(),t=e.serverUrl,n=e.query,r=e.queryHistory,c=e.time.duration,i=e.queryControls,s=i.autocomplete,l=i.nocache,d=de(),j=Le().yaxis,b=Ne(),O=Object(a.useState)(!1),h=Object(o.a)(O,2),x=h[0],v=h[1],m=Object(a.useState)(!0),S=Object(o.a)(m,2),T=S[0],A=S[1],C=Object(a.useRef)(null),w=function(){var e=r.values;d({type:"RUN_QUERY"}),n!==e[e.length-1]&&(d({type:"SET_QUERY_HISTORY_INDEX",payload:e.length}),d({type:"SET_QUERY_HISTORY_VALUES",payload:[].concat(Object(we.a)(e),[n])}))},I=function(e){n!==e&&d({type:"SET_QUERY",payload:e})};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)(at.a,{expanded:T,onChange:function(){return A((function(e){return!e}))},children:[Object(u.jsxs)(rt.a,{expandIcon:Object(u.jsx)(yt.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:[Object(u.jsx)(f.a,{display:"flex",alignItems:"center",mr:2,children:Object(u.jsx)(p.a,{variant:"h6",component:"h2",children:"Query Configuration"})}),Object(u.jsx)(f.a,{flexGrow:1,onClick:function(e){return e.stopPropagation()},onFocusCapture:function(e){return e.stopPropagation()},children:Object(u.jsx)(sn.a,{disablePortal:!T,container:C.current,children:Object(u.jsxs)(f.a,{display:"flex",alignItems:"center",children:[Object(u.jsx)(f.a,{width:"100%",children:Object(u.jsx)(bt,{server:t,query:n,oneLiner:!T,autocomplete:s,queryHistory:r,setHistoryIndex:function(e){var t=r.index+e;t<-1||t>r.values.length||(d({type:"SET_QUERY_HISTORY_INDEX",payload:t}),I(r.values[t]||""))},runQuery:w,setQuery:I})}),Object(u.jsx)(E.a,{title:"Execute Query",children:Object(u.jsx)(_.a,{onClick:w,size:"large",children:Object(u.jsx)(on.a,{})})})]})})})]}),Object(u.jsx)(ct.a,{children:Object(u.jsxs)(it.a,{container:!0,spacing:2,children:[Object(u.jsx)(it.a,{item:!0,xs:12,md:6,children:Object(u.jsxs)(f.a,{display:"grid",gap:2,gridTemplateRows:"auto 1fr",children:[Object(u.jsxs)(f.a,{display:"flex",alignItems:"center",children:[Object(u.jsx)(ot.a,{variant:"outlined",fullWidth:!0,label:"Server URL",value:t,inputProps:{style:{fontFamily:"Monospace"}},onChange:function(e){var t=e.target.value;d({type:"SET_SERVER",payload:t})}}),Object(u.jsx)(f.a,{children:Object(u.jsx)(E.a,{title:"Request Auth Settings",children:Object(u.jsx)(_.a,{onClick:function(){return v(!0)},size:"large",children:Object(u.jsx)(Et.a,{})})})})]}),Object(u.jsx)(f.a,{flexGrow:1,children:Object(u.jsx)("div",{ref:C})})]})}),Object(u.jsx)(it.a,{item:!0,xs:8,md:6,children:Object(u.jsx)(f.a,{style:{minHeight:"128px",padding:"10px 0",borderRadius:"4px",borderColor:"#b9b9b9",borderStyle:"solid",borderWidth:"1px"},children:Object(u.jsx)(vt,{setDuration:function(e){return d({type:"SET_DURATION",payload:e})},duration:c})})}),Object(u.jsx)(it.a,{item:!0,xs:12,children:Object(u.jsxs)(f.a,{px:1,display:"flex",alignItems:"center",minHeight:52,children:[Object(u.jsx)(f.a,{children:Object(u.jsx)(y.a,{label:"Enable autocomplete",control:Object(u.jsx)(g.a,{size:"small",checked:s,onChange:function(){d({type:"TOGGLE_AUTOCOMPLETE"}),G("AUTOCOMPLETE",!s)}})})}),Object(u.jsx)(f.a,{ml:2,children:Object(u.jsx)(y.a,{label:"Enable cache",control:Object(u.jsx)(g.a,{size:"small",checked:!l,onChange:function(){d({type:"NO_CACHE"}),G("NO_CACHE",!l)}})})}),Object(u.jsxs)(f.a,{ml:2,display:"flex",alignItems:"center",children:[Object(u.jsx)(y.a,{control:Object(u.jsx)(g.a,{size:"small",checked:j.limits.enable,onChange:function(){b({type:"TOGGLE_ENABLE_YAXIS_LIMITS"})}}),label:"Fix the limits for y-axis"}),j.limits.enable&&Object(u.jsxs)(f.a,{display:"grid",gridTemplateColumns:"120px 120px",gap:1,children:[Object(u.jsx)(ot.a,{label:"Min",type:"number",size:"small",variant:"outlined",defaultValue:j.limits.range[0],onChange:un()((function(e){var t=e.target.value;b({type:"SET_YAXIS_LIMITS",payload:[+t,j.limits.range[1]]})}),750)}),Object(u.jsx)(ot.a,{label:"Max",type:"number",size:"small",variant:"outlined",defaultValue:j.limits.range[1],onChange:un()((function(e){var t=e.target.value;b({type:"SET_YAXIS_LIMITS",payload:[j.limits.range[0],+t]})}),750)})]})]})]})})]})})]}),Object(u.jsx)(rn,{open:x,onClose:function(){return v(!1)}})]})},jn=n(106),bn=n.n(jn),On=n(157),hn=function(){var e=ue(),t=e.query,n=e.displayType,r=e.serverUrl,c=e.time.period,i=e.queryControls.nocache,s=$t(),l=s.basicData,u=s.bearerData,d=s.authMethod,j=Object(a.useState)(!1),b=Object(o.a)(j,2),O=b[0],h=b[1],f=Object(a.useState)(),p=Object(o.a)(f,2),x=p[0],v=p[1],m=Object(a.useState)(),y=Object(o.a)(m,2),g=y[0],E=y[1],_=Object(a.useState)(),S=Object(o.a)(_,2),T=S[0],A=S[1],w=Object(a.useState)(),I=Object(o.a)(w,2),R=I[0],U=I[1];Object(a.useEffect)((function(){T&&(v(void 0),E(void 0))}),[T]);var k=Object(a.useMemo)((function(){if(!R)return!0;var e=(R.end-R.start)/3,t=e/(c.end-c.start)>=.7,n=c.end>R.end+e,a=c.start<R.start-e;return t||n||a}),[c]),D=function(){var e=Object(On.a)(bn.a.mark((function e(){var a,r,i,o;return bn.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(H){e.next=2;break}return e.abrupt("return");case 2:return h(!0),U(c),a=new Headers,"BASIC_AUTH"===d&&a.set("Authorization","Basic "+btoa("".concat((null===l||void 0===l?void 0:l.login)||"",":").concat((null===l||void 0===l?void 0:l.password)||""))),"BEARER_AUTH"===d&&a.set("Authorization",(null===u||void 0===u?void 0:u.token)||""),e.prev=7,e.next=10,fetch(H,{headers:a});case 10:if(!(r=e.sent).ok){e.next=20;break}return G("LAST_QUERY",t),e.next=15,r.json();case 15:i=e.sent,A(void 0),"chart"===n?v(i.data.result):E(i.data.result),e.next=34;break;case 20:return e.t0=A,e.next=23,r.json();case 23:if(e.t2=o=e.sent,e.t1=null===e.t2,e.t1){e.next=27;break}e.t1=void 0===o;case 27:if(!e.t1){e.next=31;break}e.t3=void 0,e.next=32;break;case 31:e.t3=o.error;case 32:e.t4=e.t3,(0,e.t0)(e.t4);case 34:e.next=39;break;case 36:e.prev=36,e.t5=e.catch(7),e.t5 instanceof Error&&A(e.t5.message);case 39:h(!1);case 40:case"end":return e.stop()}}),e,null,[[7,36]])})));return function(){return e.apply(this,arguments)}}(),H=Object(a.useMemo)((function(){if(c)if(r)if(t.trim()){if(function(e){var t;try{t=new URL(e)}catch(n){return!1}return"http:"===t.protocol||"https:"===t.protocol}(r)){var e=(c.end-c.start)/2,a=Object(C.a)(Object(C.a)({},c),{},{start:c.start-e,end:c.end+e});return"chart"===n?function(e,t,n,a){return"".concat(e,"/api/v1/query_range?query=").concat(encodeURIComponent(t),"&start=").concat(n.start,"&end=").concat(n.end,"&step=").concat(n.step).concat(a?"&nocache=1":"")}(r,t,a,i):function(e,t,n){return"".concat(e,"/api/v1/query?query=").concat(encodeURIComponent(t),"&start=").concat(n.start,"&end=").concat(n.end,"&step=").concat(n.step)}(r,t,c)}A("Please provide a valid URL")}else A("Please enter a valid Query and execute it");else A("Please enter Server URL")}),[r,c,n]);return Object(a.useEffect)((function(){U(void 0)}),[t]),Object(a.useEffect)((function(){D()}),[r,n]),Object(a.useEffect)((function(){k&&D()}),[c]),{fetchUrl:H,isLoading:O,graphData:x,liveData:g,error:T}},fn=function(e){var t=e.data,n=j().showInfoMessage,r=Object(a.useMemo)((function(){return JSON.stringify(t,null,2)}),[t]);return Object(u.jsxs)(f.a,{position:"relative",children:[Object(u.jsx)(f.a,{flexDirection:"column",justifyContent:"flex-end",display:"flex",style:{position:"fixed",right:"16px"},children:Object(u.jsx)(Lt.a,{variant:"outlined",onClick:function(e){navigator.clipboard.writeText(r),n("Formatted JSON has been copied"),e.preventDefault()},children:"Copy JSON"})}),Object(u.jsx)("pre",{children:r})]})},pn=n(158),xn=n.n(pn),vn=function(e){var t=e.url,n=j().showInfoMessage;return Object(u.jsx)(f.a,{pl:2,py:1,flexShrink:0,display:"flex",children:Object(u.jsx)(E.a,{title:"Copy Query URL",children:Object(u.jsx)(_.a,{size:"small",onClick:function(e){t&&(navigator.clipboard.writeText(t),n("Value has been copied"),e.preventDefault())},children:Object(u.jsx)(xn.a,{style:{color:"white"}})})})})},mn=function(){var e=ue(),t=e.displayType,n=e.time.period,a=hn(),r=a.fetchUrl,c=a.isLoading,i=a.liveData,o=a.graphData,s=a.error;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(O.a,{position:"static",children:Object(u.jsxs)(h.a,{children:[Object(u.jsxs)(f.a,{display:"flex",children:[Object(u.jsxs)(p.a,{variant:"h5",children:[Object(u.jsx)("span",{style:{fontWeight:"bolder"},children:"VM"}),Object(u.jsx)("span",{style:{fontWeight:"lighter"},children:"UI"})]}),Object(u.jsx)("div",{style:{fontSize:"10px",marginTop:"-2px"},children:Object(u.jsx)("div",{children:"BETA"})})]}),Object(u.jsx)("div",{style:{fontSize:"10px",position:"absolute",top:"40px",opacity:".4"},children:Object(u.jsx)(x.a,{color:"inherit",href:"https://github.com/VictoriaMetrics/VictoriaMetrics/issues/new",target:"_blank",children:"Create an issue"})}),Object(u.jsx)(f.a,{ml:4,flexGrow:1,children:Object(u.jsx)(pe,{})}),Object(u.jsx)(Ce,{}),Object(u.jsx)(vn,{url:r})]})}),Object(u.jsxs)(f.a,{p:2,display:"grid",gridTemplateRows:"auto 1fr",gap:"20px",style:{minHeight:"calc(100vh - 64px)"},children:[Object(u.jsx)(f.a,{children:Object(u.jsx)(dn,{})}),Object(u.jsxs)(f.a,{height:"100%",children:[c&&Object(u.jsx)(v.a,{in:c,style:{transitionDelay:c?"300ms":"0ms"},children:Object(u.jsx)(f.a,{alignItems:"center",justifyContent:"center",flexDirection:"column",display:"flex",style:{width:"100%",maxWidth:"calc(100vw - 32px)",position:"absolute",height:"50%",background:"linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7), rgba(255,255,255,0))"},children:Object(u.jsx)(m.a,{})})}),Object(u.jsxs)(f.a,{height:"100%",p:3,bgcolor:"#fff",children:[s&&Object(u.jsx)(l.a,{color:"error",severity:"error",style:{fontSize:"14px"},children:s}),o&&n&&"chart"===t&&Object(u.jsx)(Ge,{data:o}),i&&"code"===t&&Object(u.jsx)(fn,{data:i}),i&&"table"===t&&Object(u.jsx)(nt,{data:i})]})]})]})]})},yn=n(164),gn=n(298),En=n(341),_n=n(297),Sn=n(293),Tn=n(159),An=function(){var e=Object(yn.a)({palette:{primary:{main:"#3F51B5"},secondary:{main:"#F50057"}},components:{MuiSwitch:{defaultProps:{color:"secondary"}}},typography:{fontSize:10}});return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(_n.a,{})," ",Object(u.jsxs)(Sn.b,{dateAdapter:Tn.a,children:[" ",Object(u.jsx)(gn.a,{injectFirst:!0,children:Object(u.jsxs)(En.a,{theme:e,children:["  ",Object(u.jsxs)(be,{children:[" ",Object(u.jsxs)(en,{children:[" ",Object(u.jsxs)(Ye,{children:[" ",Object(u.jsxs)(b,{children:[" ",Object(u.jsx)(mn,{})]})]})]})]})]})})]})]})},Cn=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,343)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};i.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(An,{})}),document.getElementById("root")),Cn()}},[[223,1,2]]]);