(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b5d49"],{"1b24":function(e,t,n){"use strict";n.r(t);var r=n("00d8"),a=n("fcc2"),o=n("1f64"),c=n("6506"),i=n("ab5b"),s=n.n(i),l=n("90a0"),u=n("4d8c"),f=n.n(u),d=n("5676"),p=n("c3f1"),h=n("2aab"),b=n("8bd7"),v=n("c31d"),y=n("15fd"),g=n("8ae8"),m=n("e402"),w=Object(m["a"])(i["createElement"]("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),O=function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},circular:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}};function j(e){var t=e.src,n=e.srcSet,r=i["useState"](!1),a=r[0],o=r[1];return i["useEffect"]((function(){if(t||n){o(!1);var e=!0,r=new Image;return r.src=t,r.srcSet=n,r.onload=function(){e&&o("loaded")},r.onerror=function(){e&&o("error")},function(){e=!1}}}),[t,n]),a}var C=i["forwardRef"]((function(e,t){var n=e.alt,r=e.children,a=e.classes,o=e.className,c=e.component,s=void 0===c?"div":c,l=e.imgProps,u=e.sizes,f=e.src,d=e.srcSet,p=e.variant,h=void 0===p?"circular":p,b=Object(y["a"])(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),m=null,O=j({src:f,srcSet:d}),C=f||d,x=C&&"error"!==O;return m=x?i["createElement"]("img",Object(v["a"])({alt:n,src:f,srcSet:d,sizes:u,className:a.img},l)):null!=r?r:C&&n?n[0]:i["createElement"](w,{className:a.fallback}),i["createElement"](s,Object(v["a"])({className:Object(g["default"])(a.root,a.system,a[h],o,!x&&a.colorDefault),ref:t},b),m)})),x=Object(o["a"])(O,{name:"MuiAvatar"})(C),I=n("f633"),k=n("bf2f"),E=n.n(k),P=n("9700"),S=n.n(P),R=n("4d26"),A=n.n(R),_=(n("5abe"),n("7da7")),N=n("657f"),D=n("9499");function z(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function T(e,t,n){return t&&q(e.prototype,t),n&&q(e,n),e}function $(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}function K(e,t){return K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},K(e,t)}function B(e){var t=F();return function(){var n,r=H(e);if(t){var a=H(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return V(this,n)}}function V(e,t){if(t&&("object"===typeof t||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return W(e)}function W(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function F(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function H(e){return H=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},H(e)}var M=function(e){$(n,e);var t=B(n);function n(e){var r;return z(this,n),r=t.call(this,e),r.state={requestedAnnotations:!1},r.handleSelect=r.handleSelect.bind(W(r)),r.handleKey=r.handleKey.bind(W(r)),r.handleIntersection=r.handleIntersection.bind(W(r)),r}return T(n,[{key:"handleSelect",value:function(){var e=this.props,t=e.canvas,n=e.selected,r=e.setCanvas,a=e.focusOnCanvas;n?a():r(t.id)}},{key:"handleKey",value:function(e){var t=this.props,n=t.canvas,r=t.setCanvas,a=t.focusOnCanvas;this.keys={enter:"Enter",space:" "},this.chars={enter:13,space:32};var o=e.key===this.keys.enter||e.which===this.chars.enter||e.key===this.keys.space||e.which===this.chars.space;o?a():r(n.id)}},{key:"handleIntersection",value:function(e){var t=e.isIntersecting,n=this.props,r=n.annotationsCount,a=n.requestCanvasAnnotations,o=this.state.requestedAnnotations;!t||void 0===r||r>0||o||(this.setState({requestedAnnotations:!0}),a())}},{key:"render",value:function(){var e=this.props,t=e.annotationsCount,n=e.searchAnnotationsCount,r=e.canvas,a=e.classes,o=e.config,c=e.selected,i=new N["a"](r);return s.a.createElement(_["a"],{onChange:this.handleIntersection},s.a.createElement("div",{key:r.index,className:A()(a.galleryViewItem,c?a.selected:"",n>0?a.hasAnnotations:""),onClick:this.handleSelect,onKeyUp:this.handleKey,role:"button",tabIndex:0},s.a.createElement(D["a"],{resource:r,labelled:!0,variant:"outside",maxWidth:o.width,maxHeight:o.height,style:{margin:"0 auto",maxWidth:"".concat(Math.ceil(o.height*i.aspectRatio),"px")}},s.a.createElement("div",{className:a.chips},n>0&&s.a.createElement(I["a"],{avatar:s.a.createElement(x,{className:a.avatar,classes:{circle:a.avatarIcon}},s.a.createElement(S.a,{fontSize:"small"})),label:n,className:A()(a.searchChip),size:"small"}),(t||0)>0&&s.a.createElement(I["a"],{avatar:s.a.createElement(x,{className:a.avatar,classes:{circle:a.avatarIcon}},s.a.createElement(E.a,{className:a.annotationIcon})),label:t,className:A()(a.annotationsChip),size:"small"})))))}}]),n}(i["Component"]);M.defaultProps={annotationsCount:void 0,config:{height:100,width:null},requestCanvasAnnotations:function(){},searchAnnotationsCount:0,selected:!1};var J=n("db04"),G=n("cc3b"),U=n("64a7"),X=n("8887"),Y=n("a749");function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){Z(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ee=function(e){return{annotationIcon:{height:"1rem",width:"1rem"},annotationsChip:Q({},e.typography.caption),avatar:{backgroundColor:"transparent"},chips:{opacity:.875,position:"absolute",right:0,textAlign:"right",top:0},galleryViewItem:{"&$hasAnnotations":{border:"2px solid ".concat(e.palette.action.selected)},"&$selected,&$selected$hasAnnotations":{border:"2px solid ".concat(e.palette.primary.main)},"&:focus":{outline:"none"},"&:hover":{backgroundColor:e.palette.action.hover},border:"2px solid transparent",cursor:"pointer",display:"inline-block",margin:"".concat(e.spacing(1),"px ").concat(e.spacing(.5),"px"),maxHeight:function(e){return e.config.height+45},minWidth:"60px",overflow:"hidden",padding:e.spacing(.5),position:"relative",width:"min-content"},hasAnnotations:{},searchChip:Q(Q({},e.typography.caption),{},{"&$selected $avatar":{backgroundColor:e.palette.highlights.primary},marginTop:2}),selected:{}}},te=function(e,t){var n=t.canvas,r=t.windowId,a=Object(J["g"])(e,{windowId:r}),o=Object(G["f"])(e,{windowId:r}),c=f()(o.map((function(e){return e.resources}))).filter((function(e){return e.targetId===n.id})),i=Object(U["e"])(e,{content:"annotations",windowId:r}).length>0;return{annotationsCount:function(){if(i){var t=Object(X["d"])(e,{canvasId:n.id});return t.reduce((function(e,t){return e+t.resources.filter((function(e){return e.targetId===n.id})).length}),0)}}(),config:Object(Y["a"])(e).galleryView,searchAnnotationsCount:c.length,selected:a&&a.id===n.id}},ne=function(e,t){var n=t.canvas,r=(t.id,t.windowId);return{focusOnCanvas:function(){return e(d["i"](r,"single"))},requestCanvasAnnotations:function(){return e(p["f"](r,n.id))},setCanvas:function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return e(h["a"].apply(b,[r].concat(n)))}}},re=Object(r["compose"])(Object(a["b"])(te,ne),Object(o["a"])(ee)),ae=re(M);function oe(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ce(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ie(e,t,n){return t&&ce(e.prototype,t),n&&ce(e,n),e}function se(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&le(e,t)}function le(e,t){return le=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},le(e,t)}function ue(e){var t=pe();return function(){var n,r=he(e);if(t){var a=he(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return fe(this,n)}}function fe(e,t){if(t&&("object"===typeof t||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return de(e)}function de(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function pe(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function he(e){return he=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},he(e)}var be=function(e){se(n,e);var t=ue(n);function n(){return oe(this,n),t.apply(this,arguments)}return ie(n,[{key:"render",value:function(){var e=this.props,t=e.canvases,n=e.classes,r=e.viewingDirection,a=e.windowId,o="right-to-left"===r?"rtl":"ltr";return s.a.createElement(l["a"],{component:"section",dir:o,square:!0,elevation:0,className:n.galleryContainer,id:"".concat(a,"-gallery")},t.map((function(e){return s.a.createElement(ae,{key:e.id,windowId:a,canvas:e})})))}}]),n}(i["Component"]);be.defaultProps={classes:{},viewingDirection:""};var ve=n("a281"),ye=function(e,t){var n=t.windowId;return{canvases:Object(J["f"])(e,{windowId:n}),viewingDirection:Object(ve["e"])(e,{windowId:n})}},ge=function(e){return{galleryContainer:{alignItems:"flex-start",display:"flex",flexDirection:"row",flexWrap:"wrap",overflowX:"hidden",overflowY:"scroll",padding:"50px 0 50px 20px",width:"100%"}}},me=Object(r["compose"])(Object(o["a"])(ge),Object(a["b"])(ye),Object(c["a"])("GalleryView"));t["default"]=me(be)}}]);
//# sourceMappingURL=chunk-2d0b5d49.1fbec5e5.js.map