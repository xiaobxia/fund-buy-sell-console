(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1c0b"],{"3Lf2":function(e,t,i){e.exports=i.p+"gzhQrb.ae79903.png"},"7KqK":function(e,t,i){"use strict";i.r(t);var n=i("Asgo"),a=i.n(n),r=i("bS4n"),o=i.n(r),s=function(e,t){var i=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),a=parseInt(e.slice(4,6),16);return 0===t?[i,n,a].join(","):(i+=Math.round(t*(255-i)),n+=Math.round(t*(255-n)),a+=Math.round(t*(255-a)),"#"+(i=i.toString(16))+(n=n.toString(16))+(a=a.toString(16)))};var d=["chuangye","chuangWL","wulin","sanbai","wubai","yiqian","yiyao","yiliao","shengwu","dianzi","xinxi","jisuanji","shipin","baijiu","yinhang","baoxian","zhengquan","dichan","gangtie","meitan","youse","jungong","huanbao","qiche","chuanmei","jijian"],l={},c={},u={};i("H5ta").a.forEach(function(e){u[e.key]=e.code,l[e.code]=e.realName||e.name,c[e.key]=e.realName||e.name});var h={name:"IndexRisk",components:{},data:function(){return{list:[],listRaw:[],listGreen:[],imgUrl:"",tradeDate:"",nameMap:l,codeKeyMap:u,nameKeyMap:c,bandList:[],position:0,radio:1,text1:"【养基定投波段】提供的任何信息或意见仅供参考，并不构成任何人的投资建议。投资者不得直接据此作出买入或卖出判断，否则自行承担投资风险。",text2:"温馨提示:基金有风险，投资需谨慎。"}},computed:{},watch:{radio:function(e){4===e&&this.$nextTick(function(){!function(e,t){if(t=t||{},e){var i=o()({text1:"水印文本1",text2:"水印文本2",start_x:0,start_y:0,width:200,height:40,fontSize:20,color:"#aaa",alpha:.4,rotate:15},t);i.space_x=i.width/2,i.space_y=i.height;var n=e.scrollWidth,a=e.scrollHeight,r=Math.sqrt(Math.pow(n,2)+Math.pow(a,2)),s=document.createDocumentFragment(),d=i.start_x,l=i.start_y,c=i.start_x;do{do{var u=document.createElement("div");u.className="watermark-item",u.style.position="absolute",u.style.left=d+"px",u.style.top=l+"px",u.style.width=i.width+"px",u.style.height=i.height+"px",u.style.fontSize=i.fontSize+"px",u.style.color=i.color,u.style.textAlign="center";var h=document.createElement("div");h.appendChild(document.createTextNode(i.text1)),u.append(h);var v=document.createElement("div");v.appendChild(document.createTextNode(i.text2)),u.append(v),s.append(u),d=d+i.width+i.space_x}while(n+1.5*(i.width+i.space_x)>d);c=d=c===i.start_x?i.start_x-(i.width+i.space_x)/2:i.start_x,l=l+i.height+i.space_y}while(a+2*(i.height+i.space_y)>l);var L=document.createElement("div");L.style.position="absolute",L.style.zIndex=99999,L.style.left=(n-r)/2+"px",L.style.top=(a-r)/2+"px",L.style.width=r+"px",L.style.height=r+"px",L.style.opacity=i.alpha,L.style.filter="alpha(opacity="+100*i.alpha+")",L.style.webkitTransform="rotate(-"+i.rotate+"deg)",L.style.MozTransform="rotate(-"+i.rotate+"deg)",L.style.msTransform="rotate(-"+i.rotate+"deg)",L.style.OTransform="rotate(-"+i.rotate+"deg)",L.style.transform="rotate(-"+i.rotate+"deg)",L.style.pointerEvents="none",L.append(s),e.append(L)}}(document.getElementById("ww-w"),{text1:"vx：养基定投波段",text2:"",fontSize:20,width:200,height:40})})}},created:function(){this.queryBandFix()},methods:{getBg:function(e){return"background-color: "+e},formatXS:function(e){return Math.abs(e).toFixed(2)},printHandler:function(){var e=this;this.$createImageUrl("i-r-p").then(function(t){e.imgUrl=t})},handleSelectionChange:function(e){this.multipleSelection=e},paginationChange:function(e){this.current=e.page,this.size=e.limit,this.queryList()},reQueryList:function(){this.current=1,this.queryList()},queryList:function(){var e=this;this.$http.get("fbsServer/riskSignal/getLastSignal").then(function(t){var i=t.data,n=[],a=[];(i.record||[]).forEach(function(e){var t=3*Math.abs(e.netChangeRatio)+10;t>90&&(t=90),t<10&&(t=10),t=100-t,e.r=t,e.netChangeRatio>0&&!e.stockIndexPSF?(e.color=s("F56C6C",Number((t/100).toFixed(2))),n.push(e)):(e.color=s("67C23A",Number((t/100).toFixed(2))),a.push(e))}),n.sort(function(e,t){return e.r-t.r}),a.sort(function(e,t){return t.r-e.r}),e.list=n,e.listGreen=a,e.tradeDate=i.trade_date})},setSort:function(e){var t=[];return d.forEach(function(i){for(var n=0;n<e.length;n++){var a=e[n];if(i===a.key)return t.push(a),!1}}),t},sortV:function(){var e=[];return this.listRaw.forEach(function(t){var i=t.qdiff;t.stockIndexPSF&&(i=-Math.abs(i)),e.push(o()({},t,{qdiffG:i}))}),e.sort(function(e,t){return t.qdiffG-e.qdiffG}),e},sortIndex:function(){this.list=this.sortV(this.listRaw)},setColor:function(e){var t=3*Math.abs(e.qdiff)+10;t>90&&(t=90),t<10&&(t=10),t=100-t,e.r=t,e.qdiff>0&&!e.stockIndexPSF?(e.color=s("F56C6C",Number((t/100).toFixed(2))),e.fb="r"):(e.color=s("67C23A",Number((t/100).toFixed(2))),e.fb="g")},mergeFix:function(e,t){t.buyNum=0;for(var i=0;i<e.length;i++){var n=e[i];t.key===n.key&&(t.buyNum=n.buyNum)}},queryBandFix:function(){var e=this;a.a.all([this.$http.get("fbsServer/user/getIndexRate"),this.$http.get("fbsServer/user/getLastBSSignal")]).then(function(t){var i=t[0].data,n=t[1].data;e.tradeDate=n.trade_date,e.position=n.position;var a={};(i.record||[]).forEach(function(e){a[e.code]=e.netChangeRatio});var r=n.band_record||[],o=n.fix_record||[],s=[];r.forEach(function(t){void 0!==t.flag&&(t.rate=a[e.codeKeyMap[t.key]],e.setColor(t),t.name=e.nameKeyMap[t.key],e.mergeFix(o,t),s.push(t))}),e.listRaw=s,e.sortIndex()})}}},v=(i("MUSy"),i("ZrdR")),L=Object(v.a)(h,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-card",{staticClass:"box-card-body"},[n("div",{staticClass:"filter-container"},[n("el-radio-group",{model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[n("el-radio",{attrs:{label:1}},[e._v("公众号")]),e._v(" "),n("el-radio",{attrs:{label:2}},[e._v("微博")]),e._v(" "),n("el-radio",{attrs:{label:3}},[e._v("微博评论风格")]),e._v(" "),n("el-radio",{attrs:{label:4}},[e._v("水印风格")])],1),e._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:e.printHandler}},[e._v("生成图片")])],1),e._v(" "),n("div",{staticClass:"p-e"},[e.imgUrl?n("div",[n("img",{staticClass:"c-i",attrs:{src:e.imgUrl,alt:""}})]):e._e(),e._v(" "),n("div",{staticStyle:{position:"relative"},attrs:{id:"i-r-p"}},[n("div",{staticStyle:{"text-align":"left","margin-bottom":"10px","font-size":"22px"}},[n("span",[e._v("日期("+e._s(e.tradeDate)+")")]),e._v(" "),n("span",{staticStyle:{float:"right"}},[e._v("市场评分："+e._s(e.position))])]),e._v(" "),n("table",{staticClass:"print-table",staticStyle:{width:"100%"},attrs:{border:"1",cellspacing:"0"}},[n("thead",{staticStyle:{"text-align":"center"}},[n("tr",[n("td",{staticStyle:{"text-align":"center"},attrs:{colspan:"1",rowspan:"1"}},[n("div",[e._v("指数名称")])]),e._v(" "),n("td",{staticStyle:{"text-align":"center"},attrs:{colspan:"1",rowspan:"1"}},[n("div",[e._v("涨跌幅")])]),e._v(" "),n("td",{staticStyle:{"text-align":"center"},attrs:{colspan:"1",rowspan:"1"}},[n("div",[e._v("风险分析")])])])]),e._v(" "),n("tbody",e._l(e.list,function(t,i){return n("tr",{key:i},[n("td",{attrs:{colspan:"1",rowspan:"1"}},[n("div",{staticClass:"cell"},[e._v(e._s(t.name))])]),e._v(" "),n("td",{attrs:{colspan:"1",rowspan:"1"}},[n("div",{staticClass:"cell",class:e.$stockNumberClass(t.rate)},[e._v(e._s(t.rate))])]),e._v(" "),n("td",{attrs:{colspan:"1",rowspan:"1"}},[n("div",{staticClass:"cell",style:e.getBg(t.color)},["r"===t.fb?n("span",[e._v("安全系数:"+e._s(e.formatXS(t.qdiff)))]):e._e(),e._v(" "),"g"===t.fb?n("span",[e._v("风险系数:"+e._s(e.formatXS(t.qdiff)))]):e._e()])])])}),0)]),e._v(" "),1===e.radio?n("div",{staticClass:"g-q"},[n("div",{staticClass:"w-t"},[n("div",{staticClass:"disclaimer"},[n("p",{staticStyle:{"margin-top":"10px"}},[e._v(e._s(e.text1))]),e._v(" "),n("p",[e._v(e._s(e.text2))])])]),e._v(" "),n("img",{attrs:{src:i("3Lf2"),alt:""}})]):e._e(),e._v(" "),2===e.radio?n("div",{staticClass:"g-q"},[n("div",{staticClass:"w-t wbs"},[n("div",{staticClass:"disclaimer"},[n("p",{staticStyle:{"margin-top":"10px"}},[e._v(e._s(e.text1))]),e._v(" "),n("p",[e._v(e._s(e.text2))])])]),e._v(" "),n("img",{staticClass:"wbsi",attrs:{src:i("3Lf2"),alt:""}})]):e._e(),e._v(" "),3===e.radio?n("div",{staticClass:"g-q"},[n("div",{staticClass:"m-t"},[e._v("更多指数分析，请看评论区 ↓ ")]),e._v(" "),n("div",{staticClass:"w-p-t"},[n("div",{staticClass:"disclaimer"},[n("p",{staticStyle:{"margin-top":"10px"}},[e._v(e._s(e.text1))]),e._v(" "),n("p",[e._v(e._s(e.text2))])])])]):e._e(),e._v(" "),4===e.radio?[n("div",{staticStyle:{position:"absolute",width:"100%",height:"100%",left:"0",top:"0",overflow:"hidden"},attrs:{id:"ww-w"}}),e._v(" "),n("div",{staticClass:"g-q"},[n("div",{staticClass:"w-p-t"},[n("div",{staticClass:"disclaimer"},[n("p",{staticStyle:{"margin-top":"10px"}},[e._v(e._s(e.text1))]),e._v(" "),n("p",[e._v(e._s(e.text2))])])])])]:e._e()],2)])])},[],!1,null,"3af8db5a",null);L.options.__file="index.vue";t.default=L.exports},Fqko:function(e,t,i){var n=i("ZG0l");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,i("hctG").default)("477bfbb3",n,!0,{})},H5ta:function(e,t,i){"use strict";t.a=[{key:"chuangye",code:"sz399006",name:"创业",realName:"创业板指",threshold:.94,wave:.9002606691919192,rate:.9642803030303041,fixLine:-19,relieveFixLine:5,reduceLine:5,downTrendLine:-3.3,mix:!0,days:1200,topLine:15,cutDownLine:30,quarterHotLine:20,relieveZ45Line:-6},{key:"yiyao",code:"sh000037",name:"医药",realName:"上证医药",attach:"chuangye",threshold:.94,rate:.8515656565656563,wave:.802347727272728,fixLine:-18,relieveFixLine:5,reduceLine:5,downTrendLine:-3.3,days:1200,topLine:10,cutDownLine:19,mix:!1,quarterHotLine:10,relieveZ45Line:0},{key:"jisuanji",code:"sz399363",name:"计算机",realName:"计算机主题",attach:"chuangye",threshold:1.04,rate:1.055176767676768,wave:.9810925505050506,fixLine:-19,relieveFixLine:5,reduceLine:8,downTrendLine:-3.3,days:1200,topLine:20,cutDownLine:30,mix:!1,quarterHotLine:20,relieveZ45Line:-5},{key:"dianzi",code:"sz399811",name:"电子",realName:"电子主题",attach:"chuangye",threshold:.9,rate:1.0889393939393934,wave:1.021961931818182,fixLine:-20.5,relieveFixLine:5,reduceLine:8,downTrendLine:-3.3,days:1200,topLine:20,cutDownLine:40,mix:!1,quarterHotLine:20,relieveZ45Line:0},{key:"wulin",code:"sh000016",name:"50",realName:"上证50",threshold:.73,rate:.6354166666666669,wave:.6254334595959586,fixLine:-10,relieveFixLine:5,reduceLine:4,downTrendLine:-3.3,mix:!0,days:1200,topLine:14,cutDownLine:15,quarterHotLine:20,relieveZ45Line:0},{key:"yinhang",code:"sz399986",name:"银行",realName:"中证银行",attach:"wulin",threshold:.7,rate:.6399696969696967,wave:.617148863636364,fixLine:-10,relieveFixLine:3,reduceLine:4,downTrendLine:-3.3,days:1e3,topLine:7.5,cutDownLine:14,mix:!1,quarterHotLine:10,relieveZ45Line:0},{key:"shipin",code:"sz399396",name:"食品",realName:"国证食品",attach:"wulin",threshold:.85,rate:1.0072348484848483,wave:.9291464646464646,fixLine:-15,relieveFixLine:5,reduceLine:8,downTrendLine:-3.3,days:1200,topLine:24,cutDownLine:30,mix:!1,quarterHotLine:30,relieveZ45Line:0},{key:"jungong",code:"sz399959",name:"军工",realName:"军工主题",attach:"chuangye",threshold:.93,rate:1.0211363636363637,wave:.9531548611111127,fixLine:-15,relieveFixLine:2,reduceLine:5.5,downTrendLine:-3.3,days:1200,topLine:14,cutDownLine:24,mix:!1,quarterHotLine:20,relieveZ45Line:-9},{key:"xinxi",code:"sh000993",name:"信息",realName:"全指信息",attach:"chuangye",threshold:1.03,rate:1.0425378787878792,wave:.9673202020202025,fixLine:-20,relieveFixLine:5,reduceLine:6,downTrendLine:-3.3,days:1200,topLine:18,cutDownLine:27,mix:!1,quarterHotLine:20,relieveZ45Line:-6},{key:"jijian",code:"sz399995",name:"基建",realName:"基建工程",threshold:.62,rate:.7745580808080808,wave:.7197126893939403,fixLine:-20,relieveFixLine:2,reduceLine:5,downTrendLine:0,days:1200,topLine:10,cutDownLine:20,mix:!1,quarterHotLine:13,relieveZ45Line:0},{key:"huanbao",code:"sh000827",name:"环保",realName:"中证环保",threshold:.67,rate:.8022348484848492,wave:.7302115530303033,fixLine:-20,relieveFixLine:4,reduceLine:5,downTrendLine:-3.3,days:1200,topLine:5.5,cutDownLine:7,mix:!1,quarterHotLine:10,relieveZ45Line:0},{key:"qiche",code:"sz399432",name:"汽车",realName:"智能汽车",threshold:.61,rate:.8089267676767666,wave:.7573156565656566,fixLine:-18,relieveFixLine:2,reduceLine:5,downTrendLine:-3.3,days:1200,topLine:5,cutDownLine:7,mix:!1,quarterHotLine:10,relieveZ45Line:-3.5},{key:"yiqian",code:"sh000852",name:"1000",realName:"中证1000",threshold:.81,rate:.8199116161616158,wave:.7346313762626256,fixLine:-19,relieveFixLine:3,reduceLine:5,downTrendLine:-3.3,mix:!0,days:1200,topLine:7.5,cutDownLine:15,quarterHotLine:10,relieveZ45Line:-6},{key:"chuanmei",code:"sz399971",name:"传媒",realName:"中证传媒",attach:"chuangye",threshold:.86,rate:.9281439393939381,wave:.860241729797979,fixLine:-21,relieveFixLine:4,reduceLine:5,downTrendLine:0,days:1200,topLine:12,cutDownLine:15,mix:!1,quarterHotLine:15,relieveZ45Line:-6},{key:"zhengquan",code:"sz399437",name:"证券",realName:"证券主题",threshold:.83,rate:.9511616161616161,wave:.9651361111111111,fixLine:-18,relieveFixLine:5,reduceLine:7,downTrendLine:-3.3,days:1200,topLine:15,cutDownLine:30,mix:!1,quarterHotLine:25,relieveZ45Line:0},{key:"youse",code:"sh000823",name:"有色",realName:"有色主题",threshold:.92,rate:1.0369823232323223,wave:.9256642676767672,fixLine:-22,relieveFixLine:4,reduceLine:5,downTrendLine:0,days:1200,topLine:8.5,cutDownLine:11,mix:!1,quarterHotLine:9,relieveZ45Line:-4},{key:"dichan",code:"sz399393",name:"地产",realName:"国证地产",attach:"wulin",threshold:.94,rate:.8393813131313133,wave:.7930900252525255,fixLine:-18,relieveFixLine:3,reduceLine:5,downTrendLine:-3.3,days:1200,topLine:15,cutDownLine:20,mix:!1,quarterHotLine:15,relieveZ45Line:0},{key:"yiliao",code:"sz399989",name:"医疗",realName:"中证医疗",attach:"chuangye",threshold:.97,rate:1.0185303030303037,wave:.9420663636363635,fixLine:-16,relieveFixLine:5,reduceLine:6,downTrendLine:-3.3,days:1e3,topLine:30,cutDownLine:30,mix:!1,quarterHotLine:15,relieveZ45Line:-5},{key:"shengwu",code:"sz399441",name:"生物",realName:"生物医药",attach:"chuangye",threshold:.89,rate:.9690151515151516,wave:.9054881944444442,fixLine:-15,relieveFixLine:5,reduceLine:5,downTrendLine:-3.3,days:1200,topLine:30,cutDownLine:30,mix:!1,quarterHotLine:15,relieveZ45Line:-4},{key:"wubai",code:"sh000905",name:"500",realName:"中证500",threshold:.75,rate:.7851515151515156,wave:.7155340909090906,fixLine:-17.5,relieveFixLine:2,reduceLine:5,downTrendLine:-3.3,mix:!0,days:1200,topLine:7.5,cutDownLine:9,quarterHotLine:8,relieveZ45Line:-5},{key:"gangtie",code:"sz399440",name:"钢铁",realName:"国证钢铁",threshold:.84,rate:.8957196969696971,wave:.8306392676767681,fixLine:-20,relieveFixLine:2,reduceLine:5,downTrendLine:0,days:1200,topLine:7,cutDownLine:7,mix:!1,quarterHotLine:10,relieveZ45Line:0},{key:"meitan",code:"sz399998",name:"煤炭",realName:"中证煤炭",threshold:.82,rate:1.0090782828282827,wave:.9101950757575756,fixLine:-20,relieveFixLine:1,reduceLine:5,downTrendLine:0,days:1200,topLine:20,cutDownLine:20,mix:!1,quarterHotLine:10,relieveZ45Line:-5},{key:"baoxian",code:"sz399809",name:"保险",realName:"保险主题",attach:"wulin",threshold:1,rate:1.0396801346801339,wave:.9729746632996643,fixLine:-16,relieveFixLine:2,reduceLine:5,downTrendLine:-3.3,days:900,topLine:20,cutDownLine:35,mix:!1,quarterHotLine:18,relieveZ45Line:0},{key:"sanbai",code:"sh000300",name:"300",realName:"沪深300",threshold:.68,rate:.6430303030303028,wave:.6139316919191916,fixLine:-11.5,relieveFixLine:2,reduceLine:5,downTrendLine:-3.3,mix:!0,days:1200,topLine:11,cutDownLine:15,quarterHotLine:15,relieveZ45Line:0},{key:"baijiu",code:"sz399997",name:"白酒",realName:"中证白酒",attach:"wulin",threshold:.85,rate:1.2198358585858582,wave:1.1786441919191923,fixLine:-20,relieveFixLine:5,reduceLine:8,downTrendLine:-3.3,days:1200,topLine:60,cutDownLine:60,mix:!1,quarterHotLine:20,relieveZ45Line:0},{key:"chuangWL",code:"sz399673",name:"创50",realName:"创业板50",threshold:1.21,rate:1.0657060606060613,wave:.9707331060606048,fixLine:-23,relieveFixLine:4,downTrendLine:-11,mix:!0,days:1200,topLine:40,cutDownLine:40,quarterHotLine:20,relieveZ45Line:-6}]},MUSy:function(e,t,i){"use strict";var n=i("Fqko");i.n(n).a},ZG0l:function(e,t,i){(e.exports=i("7ZtJ")(!1)).push([e.i,".ety[data-v-3af8db5a] {\n  width: 100px;\n  height: 50px;\n  float: left;\n  text-align: center;\n  color: #303133;\n  padding: 6px 0;\n}\n.n-t[data-v-3af8db5a] {\n  margin-top: 6px;\n}\n.p-e[data-v-3af8db5a] {\n  height: calc(100vh - 170px);\n  overflow-y: auto;\n}\n.c-i[data-v-3af8db5a] {\n  width: 520px;\n}\n#i-r-p[data-v-3af8db5a] {\n  padding: 20px 10px 20px 10px;\n  width: 520px;\n}\n.t-t[data-v-3af8db5a] {\n  font-size: 22px;\n}\n.g-q[data-v-3af8db5a] {\n  width: 100%;\n  position: relative;\n}\n.g-q img[data-v-3af8db5a] {\n    position: absolute;\n    right: -14px;\n    display: block;\n    width: 256px;\n    top: 0;\n}\n.g-q .w-t[data-v-3af8db5a] {\n    display: inline-block;\n    width: 260px;\n    vertical-align: top;\n    font-size: 12px;\n}\n.g-q .w-t p[data-v-3af8db5a] {\n      margin: 0;\n}\n.print-table[data-v-3af8db5a] {\n  line-height: 30px;\n  border-color: #bbb;\n}\n.print-table td[data-v-3af8db5a] {\n    border-color: #bbb;\n    text-align: center;\n}\n.print-table thead td[data-v-3af8db5a] {\n    font-weight: bold;\n    background-color: #f4f4f4;\n}\n.print-table th[data-v-3af8db5a] {\n    border-color: #bbb;\n}\n.print-table .cell[data-v-3af8db5a] {\n    padding: 0 10px;\n}\n.wbs[data-v-3af8db5a] {\n  position: relative;\n  z-index: 100;\n  background-color: #fff;\n  width: 350px !important;\n  line-height: 1.4em;\n}\n.wbsi[data-v-3af8db5a] {\n  z-index: 1;\n  top: -5px !important;\n}\n.m-t[data-v-3af8db5a] {\n  margin-top: 12px;\n  color: red;\n  font-size: 24px;\n  text-align: center;\n}\n.w-p-t[data-v-3af8db5a] {\n  vertical-align: top;\n  font-size: 12px;\n}\n.w-p-t p[data-v-3af8db5a] {\n    margin: 0;\n}\n",""])}}]);