<template>
  <div>
    <el-form
	  :style='{"width":"90%","padding":"30px","margin":"15px auto","borderRadius":"6px","flexWrap":"wrap","display":"flex"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
    >  
     <el-row>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}'   v-if="flag=='shangjia'"  label="商家账号" prop="shangjiazhanghao">
          <el-input v-model="ruleForm.shangjiazhanghao" readonly              placeholder="商家账号" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}'   v-if="flag=='shangjia'"  label="店铺名" prop="dianpuming">
          <el-input v-model="ruleForm.dianpuming"               placeholder="店铺名" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}'   v-if="flag=='shangjia'"  label="店铺地址" prop="dianpudizhi">
          <el-input v-model="ruleForm.dianpudizhi"               placeholder="店铺地址" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}'   v-if="flag=='shangjia'"  label="联系方式" prop="lianxifangshi">
          <el-input v-model="ruleForm.lianxifangshi"               placeholder="联系方式" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}' v-if="flag=='shangjia'" label="封面图片" prop="fengmiantupian">
          <file-upload
          tip="点击上传封面图片"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.fengmiantupian?ruleForm.fengmiantupian:''"
          @change="shangjiafengmiantupianUploadChange"
          ></file-upload>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}'   v-if="flag=='shangjia'"  label="联系人" prop="lianxiren">
          <el-input v-model="ruleForm.lianxiren"               placeholder="联系人" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}'   v-if="flag=='yonghu'"  label="用户账号" prop="yonghuzhanghao">
          <el-input v-model="ruleForm.yonghuzhanghao" readonly              placeholder="用户账号" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}'   v-if="flag=='yonghu'"  label="用户姓名" prop="yonghuxingming">
          <el-input v-model="ruleForm.yonghuxingming"               placeholder="用户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}' v-if="flag=='yonghu'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie"  placeholder="请选择性别">
            <el-option
                v-for="(item,index) in yonghuxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}'   v-if="flag=='yonghu'"  label="年龄" prop="nianling">
          <el-input v-model="ruleForm.nianling"               placeholder="年龄" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}' v-if="flag=='yonghu'" label="头像" prop="touxiang">
          <file-upload
          tip="点击上传头像"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
          @change="yonghutouxiangUploadChange"
          ></file-upload>
        </el-form-item>
		<el-form-item :style='{"width":"45%","margin":"0 2% 16px 0","background":"none","display":"inline-block"}' v-if="flag=='users'" label="用户名" prop="username">
			<el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
		</el-form-item>
		<el-form-item :style='{"padding":"0","margin":"0"}'>
			<el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"40px","background":"rgba(255, 210, 156, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="primary" @click="onUpdateHandler">修 改</el-button>
		</el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isPhone,isURL,checkIdCard } from "@/utils/validate";

export default {
  data() {
    return {
      ruleForm: {},
      flag: '',
      usersFlag: false,
      yonghuxingbieOptions: [],
      yonghuvipOptions: [],
    };
  },
  mounted() {
    var table = this.$storage.get("sessionTable");
    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
      } else {
        this.$message.error(data.msg);
      }
    });
    this.yonghuxingbieOptions = "男,女".split(',')
    this.yonghuvipOptions = "是,否".split(',')
  },
  methods: {
    shangjiafengmiantupianUploadChange(fileUrls) {
        this.ruleForm.fengmiantupian = fileUrls;
    },
    yonghutouxiangUploadChange(fileUrls) {
        this.ruleForm.touxiang = fileUrls;
    },
    onUpdateHandler() {
      if((!this.ruleForm.shangjiazhanghao)&& 'shangjia'==this.flag){
        this.$message.error('商家账号不能为空');
        return
      }
      if((!this.ruleForm.mima)&& 'shangjia'==this.flag){
        this.$message.error('密码不能为空');
        return
      }
      if( 'shangjia' ==this.flag && this.ruleForm.lianxifangshi&&(!isMobile(this.ruleForm.lianxifangshi))){
        this.$message.error(`联系方式应输入手机格式`);
        return
      }
        if(this.ruleForm.fengmiantupian!=null) {
                this.ruleForm.fengmiantupian = this.ruleForm.fengmiantupian.replace(new RegExp(this.$base.url,"g"),"");
        }
      if( 'shangjia' ==this.flag && this.ruleForm.money&&(!isNumber(this.ruleForm.money))){
        this.$message.error(`余额应输入数字`);
        return
      }
      if((!this.ruleForm.yonghuzhanghao)&& 'yonghu'==this.flag){
        this.$message.error('用户账号不能为空');
        return
      }
      if((!this.ruleForm.mima)&& 'yonghu'==this.flag){
        this.$message.error('密码不能为空');
        return
      }
        if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
        }
      if( 'yonghu' ==this.flag && this.ruleForm.money&&(!isNumber(this.ruleForm.money))){
        this.$message.error(`余额应输入数字`);
        return
      }
      if('users'==this.flag && this.ruleForm.username.trim().length<1) {
	this.$message.error(`用户名不能为空`);
        return	
      }
      this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "修改信息成功",
            type: "success",
            duration: 1500,
            onClose: () => {
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 20px 0 0;
	  	  color: #333;
	  	  font-weight: 500;
	  	  width: 100px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 100px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 2px solid rgba(121, 121, 121, 1);
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  outline: none;
	  	  color: #333;
	  	  width: 250px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 2px solid rgba(121, 121, 121, 1);
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  outline: none;
	  	  color: #333;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 2px solid rgba(121, 121, 121, 1);
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  outline: none;
	  	  color: #333;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 2px dashed rgba(121, 121, 121, 1);
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #666;
	  	  width: 150px;
	  	  font-size: 24px;
	  	  line-height: 60px;
	  	  text-align: center;
	  	  height: 60px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 2px dashed rgba(121, 121, 121, 1);
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #666;
	  	  width: 150px;
	  	  font-size: 24px;
	  	  line-height: 60px;
	  	  text-align: center;
	  	  height: 60px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 2px solid rgba(121, 121, 121, 1);
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  outline: none;
	  	  color: #333;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
</style>
