(function(e){function t(t){for(var a,r,c=t[0],s=t[1],l=t[2],d=0,f=[];d<c.length;d++)r=c[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&f.push(o[r][0]),o[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,c=1;c<n.length;c++){var s=n[c];0!==o[s]&&(a=!1)}a&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},o={app:0},i=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/textwg/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"018e":function(e,t,n){},"176b":function(e,t,n){"use strict";n("48d6")},"377c":function(e,t,n){"use strict";n("3d27")},"3d27":function(e,t,n){},"42b1":function(e,t,n){},"48d6":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),o={id:"app"};function i(e,t){var n=Object(a["D"])("router-view");return Object(a["v"])(),Object(a["h"])("div",o,[Object(a["l"])(n)])}n("377c");var r=n("6b0d"),c=n.n(r);const s={},l=c()(s,[["render",i]]);var u=l,d=n("5502"),f=Object(d["a"])({state:{m3:null,bid:null,selectedText:{},texts:[{provider:"NIJL",items:[{title:"十六夜物語",manifestURI:"https://kotenseki.nijl.ac.jp/biblio/200003074/manifest",xmls:[{label:"上",uri:"https://raw.githubusercontent.com/TEI-EAJ/jpn_classical/master/%E2%91%A1%E6%A0%A1%E8%A8%82%E6%9C%AC%E6%96%87%E3%83%87%E3%83%BC%E3%82%BF%E5%9B%BD%E6%96%87%E5%AD%A6%E7%A0%94%E7%A9%B6%E8%B3%87%E6%96%99%E9%A4%A8%E6%89%80%E8%94%B5%E3%80%8E%E5%8D%81%E5%85%AD%E5%A4%9C%E7%89%A9%E8%AA%9E%E3%80%8F%E4%B8%8A%E5%B7%BB.xml"},{label:"下",uri:"https://raw.githubusercontent.com/TEI-EAJ/jpn_classical/master/%E2%91%A1%E6%A0%A1%E8%A8%82%E6%9C%AC%E6%96%87%E3%83%87%E3%83%BC%E3%82%BF%E5%9B%BD%E6%96%87%E5%AD%A6%E7%A0%94%E7%A9%B6%E8%B3%87%E6%96%99%E9%A4%A8%E6%89%80%E8%94%B5%E3%80%8E%E5%8D%81%E5%85%AD%E5%A4%9C%E7%89%A9%E8%AA%9E%E3%80%8F%E4%B8%8B%E5%B7%BB.xml"}]},{title:"源氏物語",manifestURI:"https://kotenseki.nijl.ac.jp/biblio/200003803/manifest",xmls:[{label:"第1冊",uri:"https://tei-eaj.github.io/parallel_text_viewer/data/pt/01.xml"}]}]},{provider:"NDL",items:[]}]},getters:{},mutations:{setM3:function(e,t){e.m3=t,console.log("store: m: setM3:",t)},setSelectedText:function(e,t){e.selectedText=t,console.log("store: m: setSelectedText:",e.selectedText)},setFrame:function(e,t){e.selectedText.frame=t,console.log("store: m: setFrame:",t)}},actions:{setFrame:function(e,t){var n=e.commit;n("setFrame",t)}}}),m=n("6c02"),p=Object(a["i"])("p",{class:"fixed top-0 right-0"},"v20220104001",-1);function b(e,t,n,o,i,r){var c=Object(a["D"])("ImageViewer");return Object(a["v"])(),Object(a["h"])(a["a"],null,[p,Object(a["l"])(c)],64)}var h={class:"miradorviewer"},v={class:"textviewer"};function j(e,t,n,o,i,r){var c=Object(a["D"])("DropDown"),s=Object(a["D"])("mdicon"),l=Object(a["D"])("SelectButton"),u=Object(a["D"])("Mirador3"),d=Object(a["D"])("SplitterPanel"),f=Object(a["D"])("TextViewer"),m=Object(a["D"])("Splitter");return Object(a["v"])(),Object(a["h"])(a["a"],null,[Object(a["l"])(c,{modelValue:r.selectedText,"onUpdate:modelValue":t[0]||(t[0]=function(e){return r.selectedText=e}),options:r.texts,optionLabel:"title",optionGroupChildren:"items",optionGroupLabel:"provider"},null,8,["modelValue","options"]),Object(a["l"])(l,{modelValue:i.layout,"onUpdate:modelValue":t[1]||(t[1]=function(e){return i.layout=e}),options:i.layoutOptions,optionValue:"value"},{option:Object(a["M"])((function(e){return[Object(a["l"])(s,{name:e.option.icon},null,8,["name"])]})),_:1},8,["modelValue","options"]),Object(a["l"])(m,{layout:i.layout},{default:Object(a["M"])((function(){return[Object(a["l"])(d,null,{default:Object(a["M"])((function(){return[Object(a["i"])("div",h,[Object(a["l"])(u,{"mirador-id":"mirador"})])]})),_:1}),Object(a["l"])(d,null,{default:Object(a["M"])((function(){return[Object(a["i"])("div",v,[Object(a["l"])(f)])]})),_:1})]})),_:1},8,["layout"])],64)}var E=n("3835"),w=n("0100"),O=n("237b"),x=n("1e02"),g=["id"];function T(e,t,n,o,i,r){return Object(a["v"])(),Object(a["h"])("div",{id:this.miradorId,class:"mirador"},null,8,g)}var y={name:"Mirador3",props:["miradorId"],data:function(){return{}},computed:{m3:function(){return this.$store.state.m3},selectedText:function(){return this.$store.state.selectedText},texts:function(){return this.$store.state.texts}},methods:{getM3Window:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"windowDefault";return this.m3.store.getState().windows[e]},getM3ManifestJSON:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"windowDefault",t=this.m3.store.getState();return t.manifests[t.windows[e].manifestId].json},initM3:function(){var e=window.Mirador.viewer({language:"ja",id:this.miradorId,window:{sideBarOpenByDefault:!1}});this.$store.commit("setM3",e),window.m3=e},setM3Text:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"windowDefault";null!==this.getM3Window(t)?this.m3.store.dispatch(window.Mirador.actions.addWindow({id:t,manifestId:e.manifestURI})):this.m3.store.dispatch(window.Mirador.actions.updateWindow(t,{manifestId:e.manifestURI}))},setM3CanvasByFrame:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"windowDefault";this.m3.store.dispatch(window.Mirador.actions.setCanvas(t,this.getM3ManifestJSON(t).sequences[0].canvases[e]["@id"]))}},mounted:function(){this.initM3()},watch:{selectedText:{handler:function(e,t){t.manifestURI&&e.manifestURI===t.manifestURI||this.setM3Text(e),void 0!==e.frame&&this.setM3CanvasByFrame(e.frame)},deep:!0}}};n("176b");const M=c()(y,[["render",T],["__scopeId","data-v-0884c37d"]]);var B=M;function A(e,t,n,o,i,r){var c=Object(a["D"])("ScrollPanel"),s=Object(a["D"])("TabPanel"),l=Object(a["D"])("TabView");return Object(a["v"])(),Object(a["f"])(l,{ref:"tv",onTabChange:r.onTabChanged,onTabClick:r.onTabClicked},{default:Object(a["M"])((function(){return[(Object(a["v"])(!0),Object(a["h"])(a["a"],null,Object(a["B"])(r.selectedText.xmls,(function(e){return Object(a["v"])(),Object(a["f"])(s,{key:e.label,header:e.label},{default:Object(a["M"])((function(){return[Object(a["l"])(c,{ref:"sp"+e.label,style:{width:"100%",height:"100%"}},{default:Object(a["M"])((function(){return[Object(a["i"])("div",{ref:"viewer".concat(e.label),class:"tategaki",onClick:t[0]||(t[0]=function(){return r.onClick&&r.onClick.apply(r,arguments)})},null,512)]})),_:2},1536)]})),_:2},1032,["header"])})),128))]})),_:1},8,["onTabChange","onTabClick"])}n("ac1f"),n("5319");var I=n("bc3a"),C=n.n(I),D=n("c8c8"),k=n("ae1f"),_=n("c982"),S=n("eeae"),$={name:"TextViewer",components:{ScrollPanel:k["a"],TabPanel:_["a"],TabView:S["a"]},data:function(){return{CETEIcean:null,xmlLoaded:null}},computed:{m3:function(){return this.$store.state.m3},selectedText:function(){return this.$store.state.selectedText}},methods:{getCanvasById:function(e){return this.$store.getters.getCanvasById(e)},initCETEIcean:function(){this.CETEIcean=new D["a"]({ignoreFragmentId:!0});var e={tei:{lb:["<br />"],pb:['<a><img class="jumpTo" title="移動" data-facs="$@facs" src="images/book-open-page-variant-outline.svg" /></a><a title="新日本古典籍総合目録DBで開く" target="_blank" href="$@facs"><img src="images/open-in-new.svg" /></a>'],surface:null,graphic:null}};this.CETEIcean.addBehaviors(e)},resetText:function(){var e=this;this.xmlLoaded=[],this.$nextTick((function(){e.$refs.tv.$el.getElementsByClassName("p-tabview-nav-link")[0].click()}))},loadXML:function(e,t){var n=this;this.xmlLoaded[e]||(this.xmlLoaded[e]=!0,C.a.get(t.uri).then((function(e){n.CETEIcean.makeHTML5(e.data,(function(e){var a=n.$refs["viewer".concat(t.label)];a.append(e),a.parentNode.scrollLeft=a.parentNode.scrollWidth}))})).catch((function(e){console.log("TextViewer: axios: ",e)})))},onClick:function(e){if(e.target.classList.contains("jumpTo")){var t=e.target.dataset.facs.replace(/^.*\/(\d+)/,"$1")-1;this.$store.dispatch("setFrame",t),e.preventDefault()}},onTabChanged:function(e){this.loadXML(e.index,this.selectedText.xmls[e.index])},onTabClicked:function(e){this.loadXML(e.index,this.selectedText.xmls[e.index])}},mounted:function(){this.initCETEIcean()},watch:{selectedText:{handler:function(e,t){t.manifestURI&&e.manifestURI===t.manifestURI||this.resetText()},deep:!0}}};n("9e4a");const V=c()($,[["render",A],["__scopeId","data-v-f1aed12a"]]);var L=V,P={name:"ImageViewer",components:{DropDown:w["a"],Splitter:O["a"],SplitterPanel:x["a"],Mirador3:B,TextViewer:L},data:function(){return{layout:"horizontal",layoutOptions:[{icon:"view-split-vertical",value:"horizontal"},{icon:"view-split-horizontal",value:"vertical"}]}},computed:{selectedText:{get:function(){return this.$store.state.selectedText},set:function(e){this.$store.commit("setSelectedText",e)}},texts:function(){return this.$store.state.texts}},mounted:function(){var e=this;this.$nextTick((function(){var t=Object(E["a"])(e.texts[0].items,1);e.selectedText=t[0]}))}};n("bb26");const F=c()(P,[["render",j],["__scopeId","data-v-83f8733e"]]);var N=F,U={name:"Home",components:{ImageViewer:N}};const R=c()(U,[["render",b]]);var J=R,W=[{path:"/",name:"Home",component:J}],H=Object(m["a"])({history:Object(m["b"])("/textwg/"),routes:W}),z=H,X=n("4b99"),G=n("94ed"),q=n("9319"),K=n("bb57"),Q=n("8398"),Y=n("a5af"),Z=(n("c461"),n("e1ae"),n("4121"),n("22a3"),{accept:"はい",reject:"いいえ",choose:"選択",upload:"アップロード",cancel:"キャンセル",dayNames:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],dayNamesShort:["日","月","火","水","木","金","土"],dayNamesMin:["日","月","火","水","木","金","土"],monthNames:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],monthNamesShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],today:"今日",clear:"クリア",weekHeader:"週",firstDayOfWeek:0,dateFormat:"yy/mm/dd",weak:"弱い",medium:"普通",strong:"強い",passwordPrompt:"パスワードを入力"});Object(a["e"])(u).use(f).use(z).use(X["a"],{icons:G}).use(q["a"],{locale:Z}).component("Button",K["a"]).component("InputText",Q["a"]).component("SelectButton",Y["a"]).mount("#app")},"9e4a":function(e,t,n){"use strict";n("42b1")},bb26:function(e,t,n){"use strict";n("018e")}});
//# sourceMappingURL=app.cc14b6ae.js.map