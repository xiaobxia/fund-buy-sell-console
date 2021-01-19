<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="1000px"
    title="查看申报">
    <div>
      <el-row :gutter="10">
        <el-col :span="5">
          <div style="margin-bottom: 20px;line-height: 20px">
            <span class="s-t">
              <i class="icon-newgrand icon-newgrand-pc-spl"/>
              <span class="v-t">{{ $formatSPStatus(form.midFundAppropVO.approvalStatus) }}</span>
            </span>
            <span class="s-t" style="margin-left: 10px">
              <i class="icon-newgrand icon-newgrand-pc-q"/>
              <span>{{ $formatBondPayStatusExpend(form.midFundAppropVO.paymentStatus) }}</span>
            </span>
          </div>
          <div class="s-box">
            <div class="theme-bg">附件</div>
            <div class="f-box">
              <div style="text-align: center;line-height: 32px">无附件</div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="s-box c-t">
            <div class="theme-bg">资金拨付申报单</div>
            <el-row style="margin: 15px 0">
              <el-col :span="8" style="text-align: left">
                <span>申报单位/部门：</span>
                <span>{{ form.midFundAppropVO.declDeptName }}</span>
              </el-col>
              <el-col :span="8" style="text-align: center">
                <span>申报日期：{{ form.midFundAppropVO.declareTime }}</span>
              </el-col>
              <el-col :span="8" style="text-align: right">
                <span>申请金额(元)：{{ $formatMoney(form.midFundAppropVO.declAmount) }}</span>
              </el-col>
            </el-row>
            <table class="fake-table" style="width: 100%" border="1" cellspacing="0">
              <tbody>
                <tr>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>申报单号</div></td>
                  <td colspan="3" rowspan="1" style="text-align: center"><div>{{ form.midFundAppropVO.declCode }}</div></td>
                </tr>
                <tr>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>申报单位名称</div></td>
                  <td colspan="3" rowspan="1" style="text-align: center"><div>{{ form.midFundAppropVO.declDeptName }}</div></td>
                </tr>
                <tr>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>预算单位名称</div></td>
                  <td colspan="3" rowspan="1" style="text-align: center"><div>{{ budgetDeptMap[form.midFundAppropVO.budgetUnitId] }}</div></td>
                </tr>
                <tr>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>申报说明</div></td>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>{{ form.midFundAppropVO.declareDescription }}</div></td>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>申报金额合计(元)</div></td>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>{{ $formatMoney(form.midFundAppropVO.declAmount) }}</div></td>
                </tr>
              </tbody>
            </table>
            <div class="theme-bg" style="margin-top: 15px">申报拨付明细</div>
            <table class="fake-table" style="width: 100%" border="1" cellspacing="0">
              <thead style="text-align: center">
                <tr>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>项目编号</div></td>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>项目名称</div></td>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>收款单位/部门</div></td>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>明细项目名称</div></td>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>申报金额(元)</div></td>
                  <td colspan="1" rowspan="1" style="text-align: center"><div>备注</div></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in form.newList" :key="index">
                  <td v-if="item.iT === 0" :rowspan="item.rowSpan" colspan="1"><div>{{ item.projectCode }}</div></td>
                  <td v-if="item.iT === 0" :rowspan="item.rowSpan" colspan="1"><div>{{ item.projectName }}</div></td>
                  <td colspan="1" rowspan="1"><div>{{ item.subsidiesUnit }}</div></td>
                  <td colspan="1" rowspan="1"><div>{{ item.budgetDtlName }}</div></td>
                  <td colspan="1" rowspan="1" style="text-align: right"><div>{{ $formatMoney(item.declareAmount) }}</div></td>
                  <td colspan="1" rowspan="1"><div>{{ item.remark }}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ErrorHandler',
  data() {
    return {
      dialogVisible: false,
      radio: 1,
      form: {
        midFundAppropVO: {},
        newList: [],
        projInfoWithDtls: []
      },
      budgetDeptMap: {}
    }
  },
  computed: {},
  created() {
  },
  methods: {
    open(data) {
      data.midFundAppropVO = data.midFundAppropVO || {}
      data.projInfoWithDtls = data.projInfoWithDtls || []
      const newList = []
      data.projInfoWithDtls.forEach((v) => {
        v.midFundAppropDtlVOList = v.midFundAppropDtlVOList || []
        v.midFundAppropDtlVOList.forEach((s, index) => {
          newList.push({
            ...s,
            projectCode: v.projectCode,
            projectName: v.projectName,
            projectid: v.projectid,
            rowSpan: v.midFundAppropDtlVOList.length,
            iT: index
          })
        })
      })
      data.newList = newList
      this.form = data
      this.$http.post('ucenterGh/usersDept/list/budgetDept', {
        chooseUserId: this.$commonQueryParam.phUserId || '',
        orgId: this.$commonQueryParam.orgId || '',
        needPage: 0
      }).then((res) => {
        const budgetDeptMap = {}
        const list = res.data || []
        list.forEach((v) => {
          budgetDeptMap[v.deptId] = `${v.deptName}`
        })
        this.budgetDeptMap = budgetDeptMap
      })
      this.dialogVisible = true
    },
    downLoadFile(item) {
      this.$http.get('ucenterGh/file/download', {
        filePath: item.url.substring(item.url.indexOf('/file'))
      }, { responseType: 'arraybuffer' }).then((res) => {
        this.$downloadFile(res, item.name)
      })
    },
    okHandler() {
      this.$message({
        type: 'success',
        message: '操作成功！'
      })
      this.dialogVisible = false
      this.$emit('ok')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .theme-bg {
    text-align: center;
    line-height: 40px;
    color: #fff;
  }
  .s-box {
    overflow: hidden;
    box-shadow: 0px 0px 5px 0px rgba(144, 144, 144, 0.5);
    border-radius: 4px 4px 0px 0px;
  }
  .f-box {
    height: 352px;
    overflow-y: auto;
  }
  .c-t {
    height: 432px;
    overflow-y: auto;
  }
</style>
