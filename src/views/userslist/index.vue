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
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="delUser(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加管理员 -->
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="登录账号" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          123456 (默认)
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择用户角色">
            <el-option label="项目管理员" value="2" v-if="userInfo.userData.rid == 1"></el-option>
            <el-option label="业务员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="ajaxUploadUrl"
            :show-file-list="false"
            :data="token"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="files">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList,ajaxDelUser,ajaxAddUser, ajaxUploadUrl} from '@/api/userlist'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
       username: '',
       name:'',
       role: ''
      },
      ajaxUploadUrl: '',
      imageUrl: '',
      token:{
        token: ''
      },
      formLabelWidth: '90px'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'name',
      'roles'
    ])
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
    delUser(row){
      this.$alert('你确定要删除该账号？', {
        confirmButtonText: '确定',
        callback: action => {
          ajaxDelUser(row.id,row.roleid,0).then(res=>{
            for(let i = 0; i<this.tableData.length; i++){
              if(this.tableData[i].id == row.id){
                this.tableData.splice(i,1);
              }
            }
          })
        }
      });
    },
    addUser(form){
      if(form.username == '' ){
        this.$message("请输入登录账号");
        return;
      }
      if(form.name == '' ){
        this.$message("请输入用户名");
        return;
      }
      if(form.role == '' ){
        this.$message("请选择角色");
        return;
      }
      ajaxAddUser(form.username,form.name,form.role,'').then(res=>{
        this.$message.success(res.data.msg);
        this.dialogFormVisible = false;
        this.form.name = '';
        this.form.username = '';
        setTimeout(()=>{
          this.$router.go(0);
        },1500)
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
  mounted() {
    this.ajaxUploadUrl = ajaxUploadUrl;
    this.token.token = this.userInfo.userData.token;
    // 查询用户列表(这里返回数据为空)
    getUserList('','',1,10,1).then(res=>{
      this.tableData = res.data.data;
    }).catch(error => {
      this.tableData = [];
      this.$message("你尚未登录，请先登录!");
      this.$router.push({path: '/login'});
    });
  },
}
</script>

<style>
.line{
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9!important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>

