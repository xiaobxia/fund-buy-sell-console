(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f611"],{A8hf:function(e,t,n){"use strict";var a=n("xX1S");n.n(a).a},QN3y:function(e,t,n){(e.exports=n("7ZtJ")(!1)).push([e.i,"",""])},Qncm:function(e,t,n){"use strict";n.r(t);var a={name:"Schedule",components:{},data:function(){return{tableData:[{name:"验证开盘",url:"schedule/verifyMarketOpening"},{name:"扣减vip天数",url:"schedule/deleteVipDays"},{name:"更新公众号token",url:"schedule/getGzhToken"},{name:"更新指数涨跌幅",url:"schedule/updateIndexRate"}],tableLoading:!1}},computed:{},created:function(){},methods:{doSchedule:function(e){var t=this;this.$http.get("fbsServer/"+e).then(function(e){t.$message({type:"success",message:"操作成功！"})})}}},l=(n("A8hf"),n("ZrdR")),c=Object(l.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-card",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticClass:"box-card-body"},[n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:!0,data:e.tableData,"header-cell-style":{textAlign:"center"},"tooltip-effect":"dark",height:"calc(100vh - 130px)"}},[n("el-table-column",{attrs:{align:"center","min-width":"150",label:"名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",width:"200",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return e.doSchedule(t.row.url)}}},[e._v("手动执行")])]}}])})],1)],1)},[],!1,null,"a5643166",null);c.options.__file="schedule.vue";t.default=c.exports},xX1S:function(e,t,n){var a=n("QN3y");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n("hctG").default)("b1139036",a,!0,{})}}]);