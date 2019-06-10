<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-back" @click="handleBack">返回</el-button>
      <el-button style="float: right" class="filter-item" icon="el-icon-check" type="primary" @click="handleSave">保存</el-button>
    </div>
    <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="100px">
      <div v-for="(item,index) in list" :key="index">
        <el-alert
          :closable="false"
          :title="item.name"
          style="margin-bottom: 20px"
          type="info"/>
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item prop="guzhi" label="估值：">
              <el-select v-model="item.guzhi" :style="{width: '100%'}" class="filter-item">
                <el-option value="偏低" label="偏低"/>
                <el-option value="适中" label="适中"/>
                <el-option value="偏高" label="偏高"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="PE" label="PE">
              <el-input v-model="item.PE"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="PB" label="PB">
              <el-input v-model="item.PB"/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'ValuationDetail',
  data() {
    return {
      list: [{
        code: '',
        PE: 0,
        PB: 0,
        guzhi: ''
      }]
    }
  },
  computed: {},
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.queryDetail()
    },
    queryDetail() {
      this.$http.get('admin/getIndexValuation').then((res) => {
        this.list = res.data
      })
    },
    handleBack() {
      this.$router.history.go(-1)
    },
    handleSave() {
      const newList = []
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i]
        newList.push({
          code: item.code,
          PB: item.PB,
          PE: item.PE,
          guzhi: item.guzhi
        })
      }
      this.$http.post(
        'admin/updateIndexValuation',
        {
          updateJson: JSON.stringify(newList)
        }
      ).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.initPage()
      }).catch(() => {
      })
    }
  }
}
</script>

<style>
</style>

