<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="100px">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item prop="name" label="登录名：">
              <el-input v-model="searchForm.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="wechat" label="微信：">
              <el-input v-model="searchForm.wechat"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="todayLogin" label="今日登录：">
              <el-select v-model="searchForm.todayLogin" :style="{width: '100%'}" class="filter-item">
                <el-option label="全部" value=""/>
                <el-option :value="true" label="是"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="todayQuery" label="今日请求：">
              <el-select v-model="searchForm.todayQuery" :style="{width: '100%'}" class="filter-item">
                <el-option label="全部" value=""/>
                <el-option :value="true" label="是"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item prop="time" label="申请时间：">
              <el-date-picker
                v-model="searchForm.time"
                style="width: 100%"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="sort" label="排序：">
              <el-select v-model="searchForm.sort" :style="{width: '100%'}" class="filter-item">
                <el-option label="注册" value=""/>
                <el-option value="activeDay" label="活跃天数"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置
            </el-button>
            <el-button
              :loading="searchLoading"
              class="filter-item"
              icon="el-icon-search"
              type="primary"
              @click="handleSearch">搜索
            </el-button>
            <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="登录名">
        <template slot-scope="scope">
          <span>{{ scope.row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="微信">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已试用">
        <template slot-scope="scope">
          <el-tag :type="formatShiFouType(scope.row.if_test)">{{ scope.row.if_test ? '是':'否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品类型">
        <template slot-scope="scope">
          <span>{{ scope.row.buy_type || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余时间">
        <template slot-scope="scope">
          <span>{{ scope.row.can_use_day }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已购买">
        <template slot-scope="scope">
          <el-tag :type="formatShiFouType(scope.row.if_buy)">{{ scope.row.if_buy ? '是':'否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="今日策略请求">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.today_query !== 0" type="warning">{{ scope.row.today_query }}</el-tag>
          <span v-else>{{ scope.row.today_query }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="今日登录">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.today_login !== 0" type="warning">{{ scope.row.today_login }}</el-tag>
          <span v-else>{{ scope.row.today_login }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="密码">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活跃天数">
        <template slot-scope="scope">
          <span>{{ scope.row.active_days }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="上次活跃" width="200">
        <template slot-scope="scope">
          <span :class="{'red-text': ifClose(scope.row.last_active_day)}">{{ formatDateTime(scope.row.last_active_day) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="200">
        <template slot-scope="scope">
          <span>{{ formatDateTime(scope.row.create_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <router-link :to="'/customer/edit/'+scope.row._id">
            <el-button type="primary" size="mini">修改</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="listTotal>0"
      :total="listTotal"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.pageSize"
      @pagination="queryList"/>
    <el-dialog :visible.sync="dialogFormVisible" title="添加客户" @closed="handleCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="120px">
        <el-form-item prop="name" label="微信名">
          <el-input v-model="dialogForm.name"/>
        </el-form-item>
        <el-form-item prop="buy_type" label="产品类型：">
          <el-select v-model="dialogForm.buy_type" :style="{width: '100%'}" class="filter-item">
            <el-option value="定投" label="定投"/>
            <el-option value="波段" label="波段"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="can_use_day" label="购买时间：">
          <el-select v-model="dialogForm.can_use_day" :style="{width: '100%'}" class="filter-item">
            <el-option :value="1" label="1交易日"/>
            <el-option :value="5" label="5交易日"/>
            <el-option :value="10" label="10交易日"/>
            <el-option :value="20" label="20交易日"/>
            <el-option :value="40" label="40交易日"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
const searchFormBase = {
  status: '',
  name: '',
  wechat: '',
  sort: '',
  todayQuery: '',
  todayLogin: '',
  time: ['', '']
}
const dialogFormBase = {
  name: '',
  can_use_day: '',
  buy_type: ''
}
export default {
  name: 'StatisticsCustomer',
  components: { Pagination },
  data() {
    return {
      loading: false,
      searchLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      dialogFormVisible: false,
      dialogForm: Object.assign({}, dialogFormBase),
      dialogFormRules: {
        buy_type: [{ required: true, message: '请产品类型', trigger: 'blur' }],
        name: [{ required: true, message: '请输入微信Id', trigger: 'blur' }],
        can_use_day: [{ required: true, message: '请选择购买时长', trigger: 'blur' }]
      },
      list: null,
      listTotal: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        pageSize: 20
      },
      channelList: []
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    formatSearch() {
      const data = {}
      for (const key in this.searchForm) {
        if (key === 'time') {
          if (this.searchForm['time'][0]) {
            data.beginTime = moment(this.searchForm.time[0]).format('YYYY-MM-DD HH:mm:ss')
            data.endTime = moment(this.searchForm.time[1]).format('YYYY-MM-DD HH:mm:ss')
          }
        } else {
          data[key] = this.searchForm[key]
        }
      }
      return data
    },
    initPage() {
      this.queryList()
    },
    queryList() {
      this.listLoading = true
      this.$http.get('admin/getCustomers', {
        ...this.formatSearch(this.searchForm),
        ...this.listQuery
      }).then(response => {
        this.list = response.data.list
        this.listTotal = response.data.count
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getUsers()
    },
    handleSearch() {
      this.queryList()
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, searchFormBase)
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    closeForm() {
      this.dialogFormVisible = false
      this.dialogForm = Object.assign({}, dialogFormBase)
    },
    handleCancel() {
      this.closeForm()
    },
    handleConfirm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post(
            'admin/addCustomer',
            this.dialogForm
          ).then(() => {
            this.loading = false
            this.closeForm()
            this.initPage()
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    formatPage(page) {
      if (page === 'register') {
        return '注册页'
      } else if (page === 'home') {
        return '首页'
      } else if (page === 'loan') {
        return '借款'
      } else {
        return '-'
      }
    },
    ifClose(time) {
      if (time) {
        return moment(time).diff(moment().format('YYYY-MM-DD') + ' 14:40:00', 'minutes') > 0
      }
      return false
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
