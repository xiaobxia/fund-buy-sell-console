<template>
  <el-form ref="form" :model="hsCertTmpDataEntityTemp" :rules="rules" label-width="70px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="hsCertTmpDataEntityTemp.name"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="备注" prop="remark">
          <el-input :maxlength="200" v-model="hsCertTmpDataEntityTemp.remark"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="凭证类型">
          <el-select v-model="certTmpParaVOTemp.certType" class="theme-select">
            <el-option v-for="(item, index) in certTypeList" :key="index" :label="item.certValue" :value="item.phid"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="关联科目">
          <el-select v-model="subMap.subIds" style="width: 100%" multiple placeholder="">
            <el-option
              v-for="item in subjectListLast"
              :key="item.phid"
              :label="`${item.encode} - ${item.name}`"
              :value="item.phid"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { createCertTmpParaVO, createHsCertTmpDataEntity } from '@/common/create'
export default {
  name: 'TopForm',
  props: {
    hsCertTmpDataEntityTemp: {
      type: Object,
      default: function() {
        return createHsCertTmpDataEntity()
      }
    },
    certTmpParaVOTemp: {
      type: Object,
      default: function() {
        return createCertTmpParaVO()
      }
    },
    subMap: {
      type: Object,
      default: function() {
        return {
          subIds: []
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      options: [],
      rules: {
        remark: [
          { max: 200, message: '长度200个字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      // 只能选择末级科目
      'subjectListLast',
      'certTypeList'
    ])
  },
  watch: {
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
