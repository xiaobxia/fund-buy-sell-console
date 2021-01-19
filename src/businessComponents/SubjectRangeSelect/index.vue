<template>
  <div class="subject-range-wrap">
    <el-select v-model="startCodeLocal" filterable clearable style="width: 160px" placeholder="开始科目" size="small" @change="subjectChange">
      <el-option
        v-for="item in subjectList"
        :disabled="endCode ? endCodeLocal < item.encode : false"
        :key="item.encode"
        :label="item.encode + ' - ' + item.name"
        :value="item.encode">
        <span :style="{paddingLeft: item.sub ? '2em':''}">{{ item.encode }} - {{ item.name }}</span>
      </el-option>
    </el-select>
    <span>~</span>
    <el-select v-model="endCodeLocal" filterable clearable style="width: 160px" placeholder="结束科目" size="small" @change="subjectChange">
      <el-option
        v-for="item in subjectList"
        :disabled="startCode ? startCodeLocal > item.encode : false"
        :key="item.encode"
        :label="item.encode + ' - ' + item.name"
        :value="item.encode">
        <span :style="{paddingLeft: item.sub ? '2em':''}">{{ item.encode }} - {{ item.name }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SubjectRangeSelect',
  props: {
    startCode: {
      type: String,
      default: ''
    },
    endCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      startCodeLocal: this.startCode,
      endCodeLocal: this.endCode
    }
  },
  computed: {
    ...mapGetters([
      'subjectList'
    ])
  },
  created() {
  },
  methods: {
    subjectChange() {
      this.$emit('update:startCode', this.startCodeLocal)
      this.$emit('update:endCode', this.endCodeLocal)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .subject-range-wrap {
    display: inline-block;
  }
</style>
