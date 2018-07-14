<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 10px" @click="dialogFormVisible = true">添加管理员</el-button>   
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      size="small">
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="roleid" label="权限">
        <template slot-scope="scope">
          {{scope.row.roleid == 1 ? '超级管理员' : scope.row.roleid == 2 ? '管理员': '业务员'}}
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="注册时间"></el-table-column>
      <el-table-column prop="date" label="操作"></el-table-column>
    </el-table>
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户账号" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          123456 (默认)
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择用户权限">
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="商家" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/userlist'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '90px'
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
  },
  mounted() {
    // 查询用户列表(这里返回数据为空)
    getUserList('','',1,10,1).then(res=>{
      console.log(res)
      this.tableData = res.data.data;
    }).catch(error => {

    });
  },
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

