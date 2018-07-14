<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h2>尊敬的{{userInfo.userData.name}}用户,欢迎您回来!</h2>
    </div>
    <!-- <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <p>登录次数： {{userInfo.count}}</p>
    <p>上次登录IP： {{userInfo.strIp}} 上次登录时间： {{ userInfo.date}}</p>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
         {{name}}
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" style="width: 250px"></el-input>          
        </el-form-item>
        <el-form-item label="权限">
         {{userInfo.userData.rid == 1 ? '超级管理员': '项目管理员' }}
        </el-form-item>
        <!-- <el-form-item label="所属项目">
         {{form.xuan}} 123456
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'userInfo',
      'name',
      'roles'
    ])
  },
  data() {
    return {
      form: {
        name: '',
        nickname: '',
        password: ''

      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  },
  mounted() {
    console.log(this.userInfo)
    this.form.nickname = this.userInfo.userData.name;
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
