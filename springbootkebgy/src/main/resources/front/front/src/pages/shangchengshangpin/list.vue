<template>
<div>
	<div :style='{"width":"100%","padding":"0px 7%","margin":"0px auto 10px","borderRadius":"0px","background":"#cfa66a","height":"40px"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'Ξ'" :style='{"fontSize":"14px","lineHeight":"40px"}'>
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadcrumbItem" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	
	<div class="list-preview" :style='{"width":"100%","padding":"10px 0","margin":"0px auto","position":"relative","background":"none"}'>
		<div class="category-1" :style='{"padding":"20px 7% 20px","flexWrap":"wrap","background":"#fff","display":"flex","width":"100%","justifyContent":"center","height":"auto"}'>
			<div class="item" :class="swiperIndex == '-1' ? 'active' : ''" @click="getList(1, '全部')" :plain="isPlain">全部</div>
			<div class="item" :class="swiperIndex == index ? 'active' : ''" v-for="(item, index) in fenlei" :key="index" @click="getList(1, item, 'btn' + index)" :ref="'btn' + index" plain>{{item}}</div>
		</div>
		
	
    <el-form :inline="true" :model="formSearch" class="list-form-pv" :style='{"padding":"30px 7% 0","alignItems":"center","background":"none","display":"flex","width":"100%","justifyContent":"flex-end","height":"auto"}'>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>商品名称</div>
        <el-input v-model="formSearch.shangpinmingcheng" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>品牌</div>
        <el-input v-model="formSearch.pinpai" placeholder="品牌" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>价格</div>
        <el-input v-model="formSearch.pricestart" placeholder="最小价格" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
        <el-input v-model="formSearch.priceend" placeholder="最大价格" clearable></el-input>
      </el-form-item>
	  <el-button v-if=" true " :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"4px","background":"#cca162","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="getList(1, curFenlei)"><i v-if="true" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-search"></i>查询</el-button>
	  <el-button v-if="isAuth('shangchengshangpin','新增')" :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"4px","background":"#1e8892","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="add('/index/shangchengshangpinAdd')"><i v-if="true" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-circle-plus-outline"></i>添加</el-button>
    </el-form>

	<div class="list" :style='{"padding":"120px 7% 100px","margin":"20px 0 10px","background":"url(http://codegen.caihongy.cn/20230109/138a4d606eae4a168810cef229969885.png) no-repeat center top,url(http://codegen.caihongy.cn/20230109/b95aeae1c1294f398aefb7c6cd5b16de.png) no-repeat center top,url(http://codegen.caihongy.cn/20230109/5ffc803e6682418eb7f0b09a98e35527.png) no-repeat center bottom,#faf0e6"}'>
		<!-- 样式一 -->
		<div class="list1 index-pv1" :style='{"padding":"0px","margin":"30px 0 0","flexWrap":"wrap","background":"none","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
			<div :style='{"border":"1px solid #ddd","padding":"10px","margin":"0 0 20px","flexWrap":"wrap","background":"#fff","display":"flex","width":"23.5%","position":"relative","justifyContent":"space-between","height":"auto"}' v-for="(item, index) in dataList" :key="index" @click="toDetail(item)" class="list-item animation-box">
				<img :style='{"width":"100%","margin":"0 0 8px","objectFit":"cover","display":"block","height":"275px"}' v-if="item.shangpintupian && item.shangpintupian.substr(0,4)=='http'" :src="item.shangpintupian" class="image" />
				<img :style='{"width":"100%","margin":"0 0 8px","objectFit":"cover","display":"block","height":"275px"}' v-else :src="baseUrl + (item.shangpintupian?item.shangpintupian.split(',')[0]:'')" class="image" />
				<div v-if="item.price" :style='{"width":"100%","padding":"4px 10px","lineHeight":"24px","fontSize":"14px","color":"red","textAlign":"right"}' class="price"><span :style='{"fontSize":"12px"}'>￥</span>{{item.price}}</div>
				<div :style='{"border":"1px solid #eee","padding":"4px 10px","margin":"0 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","borderRadius":"20px","width":"100%","lineHeight":"24px","fontSize":"16px","textOverflow":"ellipsis"}' class="name ">{{item.shangpinmingcheng}}</div>
				<div :style='{"border":"1px solid #eee","padding":"4px 10px","margin":"0 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","borderRadius":"20px","width":"100%","lineHeight":"24px","fontSize":"16px","textOverflow":"ellipsis"}' class="name ">{{item.shangpinzhonglei}}</div>
				<div :style='{"border":"1px solid #eee","padding":"4px 10px","margin":"0 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","borderRadius":"20px","width":"100%","lineHeight":"24px","fontSize":"16px","textOverflow":"ellipsis"}' class="name ">{{item.dianpuming}}</div>
			</div>
		</div>
		
		<!-- 样式二 -->
	</div>

	<!-- 热门信息 -->
	<div class="hot" :style='{"width":"100%","padding":"0 7%","background":"none","height":"auto"}'>
	  <div :style='{"padding":"0 20px","margin":"-40px auto 0","color":"#333","textAlign":"left","background":"url() no-repeat center bottom","width":"100%","lineHeight":"44px","fontSize":"20px"}'>热门信息</div>
	  <div :style='{"width":"100%","padding":"10px 0px","background":"none","justifyContent":"space-between","display":"flex","height":"auto"}'>
	    <div v-for="item in hotList" :key="item" :style='{"width":"23%","background":"#fff","height":"auto"}' @click="toDetail(item)">
	      <img :style='{"border":"1px solid #ddd","padding":"10px","objectFit":"cover","background":"#fff","display":"block","width":"100%","height":"280px"}' :src="baseUrl + (item.shangpintupian?item.shangpintupian.split(',')[0]:'')" alt="">
	      <div :style='{"border":"1px solid #eee","padding":"0 10px","margin":"8px 0 8px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","borderRadius":"20px","lineHeight":"32px","fontSize":"14px","textOverflow":"ellipsis"}'>{{item.shangpinmingcheng}}</div>
	      <div :style='{"border":"1px solid #eee","padding":"0 10px","margin":"8px 0 8px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","borderRadius":"20px","lineHeight":"32px","fontSize":"14px","textOverflow":"ellipsis"}'>{{item.shangpinzhonglei}}</div>
	      <div :style='{"border":"1px solid #eee","padding":"0 10px","margin":"8px 0 8px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","borderRadius":"20px","lineHeight":"32px","fontSize":"14px","textOverflow":"ellipsis"}'>{{item.dianpuming}}</div>
	      <!--<div :style='{"padding":"0 10px","margin":"4px 0 0","lineHeight":"24px","fontSize":"14px","color":"#999","textAlign":"right"}'>2022-02-02</div>-->
	    </div>
	  </div>
	</div>
	
	<el-pagination
	  background
	  class="pagination"
	  :pager-count="7"
	  :page-size="pageSize"
	  :page-sizes="pageSizes"
	  prev-text="<"
	  next-text=">"
	  :hide-on-single-page="true"
	  :layout='["total","prev","pager","next","sizes","jumper"].join()'
	  :total="total"
	  :style='{"padding":"0","margin":"10px auto","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"100%","fontWeight":"500"}'
	  @current-change="curChange"
	  @prev-click="prevClick"
	  @next-click="nextClick"
	></el-pagination>

  </div>
</div>
</template>

<script>
  export default {
    //数据集合
    data() {
      return {
	    layouts: '',
		swiperIndex: -1,
        baseUrl: '',
        breadcrumbItem: [
          {
            name: '商城商品'
          }
        ],
        formSearch: {
          shangpinmingcheng: '',
          pinpai: '',
          price: '',
        },
        fenlei: [],
        hotList: [],
        dataList: [],
        total: 1,
        pageSize: 12,
		pageSizes: [10,20,30,50],
        totalPage: 1,
        curFenlei: '全部',
        isPlain: false,
        indexQueryCondition: '',
        timeRange: []
      }
    },
    created() {
      this.indexQueryCondition = this.$route.query.indexQueryCondition ? this.$route.query.indexQueryCondition : '';
      this.baseUrl = this.$config.baseUrl;
      this.getFenlei();
      this.getList(1, '全部');
      this.getHotList();
    },
    //方法集合
    methods: {
      add(path) {
        this.$router.push({path: path});
      },
      getHotList() {
        let autoSortUrl = "";
        autoSortUrl = "shangchengshangpin/autoSort";
        if(localStorage.getItem('Token')) {
            autoSortUrl = "shangchengshangpin/autoSort2";
        }
          this.$http.get(autoSortUrl, {params: {
              page: 1,
              limit: 4,
          }}).then(res => {
              if (res.data.code == 0) {
                  this.hotList = res.data.data.list;
              }
          })
      },
      getFenlei() {
        this.$http.get('option/shangpinzhonglei/shangpinzhonglei').then(res => {
          if (res.data.code == 0) {
            this.fenlei = res.data.data;
          }
        });
      },
      getList(page, fenlei, ref = '') {
		if(fenlei == '全部') this.swiperIndex = -1;
		for(let i=0;i<this.fenlei.length;i++) {
			if(fenlei == this.fenlei[i]) {
				this.swiperIndex = i;
				break;
			}
		}
        this.curFenlei = fenlei;
        if (this.curFenlei == '全部') {
          this.isPlain = false;
        } else {
          this.isPlain = true;
        }
        let params = {page, limit: this.pageSize};
        let searchWhere = {};
        if (this.formSearch.shangpinmingcheng != '') searchWhere.shangpinmingcheng = '%' + this.formSearch.shangpinmingcheng + '%';
        if (this.formSearch.pinpai != '') searchWhere.pinpai = '%' + this.formSearch.pinpai + '%';
        if(this.formSearch.pricestart!='' && this.formSearch.pricestart!=undefined ){
          searchWhere.pricestart = this.formSearch.pricestart
        }
        if(this.formSearch.priceend!='' && this.formSearch.priceend!=undefined){
          searchWhere.priceend = this.formSearch.priceend
        }
        if (this.curFenlei != '全部') searchWhere.shangpinzhonglei = this.curFenlei;
        this.$http.get('shangchengshangpin/list', {params: Object.assign(params, searchWhere)}).then(res => {
          if (res.data.code == 0) {
            this.dataList = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.totalPage = res.data.data.totalPage;
			
			this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
          }
        });
      },
      curChange(page) {
        this.getList(page,this.curFenlei);
      },
      prevClick(page) {
        this.getList(page,this.curFenlei);
      },
      nextClick(page) {
        this.getList(page,this.curFenlei);
      },
      toDetail(item) {
        this.$router.push({path: '/index/shangchengshangpinDetail', query: {detailObj: JSON.stringify(item)}});
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.list-preview .list-form-pv .el-input {
		width: auto;
	}

	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__separator {
		margin: 0 9px;
		color: #fff;
		font-weight: 500;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner a {
		color: #fff;
		display: inline-block;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner {
		color: #fff;
		display: inline-block;
	}
	
	.category-1 .item {
		cursor: pointer;
		padding: 0 10px;
		margin: 0 8px 0 0;
		color: #666;
		font-size: 16px;
		border-color: #cca162;
		line-height: 50px;
		border-radius: 0;
		background: none;
		width: auto;
		border-width: 0 0 6px;
		border-style: inset;
		text-align: center;
		min-width: 80px;
		height: 58px;
	}
	
	.category-1 .item:hover {
		cursor: pointer;
		border-radius: 0;
		margin: 0 8px 0 0;
		color: #333;
		background: none;
		font-size: 16px;
		border-color: #1e8892;
		border-width: 0 0 6px;
		border-style: solid;
		text-align: center;
	}
	
	.category-1 .item.active {
		cursor: pointer;
		border-radius: 0;
		margin: 0 10px 0 0;
		color: #333;
		background: none;
		font-size: 16px;
		border-color: #1e8892;
		border-width: 0 0 6px;
		line-height: 50px;
		border-style: solid;
		text-align: center;
	}
	
	.category-2 .item {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item:hover {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item.active {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.list-form-pv .el-input /deep/ .el-input__inner {
		border: 0;
		border-radius: 0;
		padding: 0 10px;
		box-shadow: 0px 2px 0px #cca162;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-select /deep/ .el-input__inner {
		border: 0;
		border-radius: 0;
		padding: 0 10px;
		box-shadow: 0px 2px 0px #cca162;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-date-editor /deep/ .el-input__inner {
		border: 0;
		border-radius: 0;
		padding: 0 30px;
		box-shadow: 0px 2px 0px #cca162;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list .index-pv1 .animation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		z-index: initial;
	}
	
	.list .index-pv1 .animation-box:hover {
		transform: translate3d(0px, -10px, 0px);
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
		z-index: 1;
	}
	
	.list .index-pv1 .animation-box img {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
	}
	
	.list .index-pv1 .animation-box img:hover {
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
	}
	
	.el-pagination /deep/ .el-pagination__total {
		margin: 0 10px 0 0;
		color: #666;
		font-weight: 400;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #666;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #666;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager {
		padding: 0;
		margin: 0;
		display: inline-block;
		vertical-align: top;
	}
	
	.el-pagination /deep/ .el-pager .number {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #666;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #f4f4f5;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number:hover {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #cca162;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #f4f4f5;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number.active {
		cursor: default;
		padding: 0 4px;
		margin: 0 5px;
		color: #FFF;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #cca162;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes {
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input {
		margin: 0 5px;
		width: 100px;
		position: relative;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 25px 0 8px;
		color: #606266;
		display: inline-block;
		font-size: 13px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
		top: 0;
		position: absolute;
		right: 0;
		height: 100%;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
		cursor: pointer;
		color: #C0C4CC;
		width: 25px;
		font-size: 14px;
		line-height: 28px;
		text-align: center;
	}
	
	.el-pagination /deep/ .el-pagination__jump {
		margin: 0 0 0 24px;
		color: #606266;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input {
		border-radius: 3px;
		padding: 0 2px;
		margin: 0 2px;
		display: inline-block;
		width: 50px;
		font-size: 14px;
		line-height: 18px;
		position: relative;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 3px;
		color: #606266;
		display: inline-block;
		font-size: 14px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
</style>
