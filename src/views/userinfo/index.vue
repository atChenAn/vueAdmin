<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 10px" @click="onSubmit">添加管理员</el-button>   
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      size="small">
      <el-table-column prop="date" label="用户名"></el-table-column>
      <el-table-column prop="date" label="密码"></el-table-column>
      <el-table-column prop="date" label="真实姓名"></el-table-column>
      <el-table-column prop="date" label="手机号"></el-table-column>
      <el-table-column prop="date" label="状态"></el-table-column>
      <el-table-column prop="date" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

