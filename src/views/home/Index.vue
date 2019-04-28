<template>
  <div>
    <el-container>
      <el-container>

        <el-main>
          <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in images.url" :key="item">
            <a href="/">  <img    :src="item" alt=""  title="123321"></img></a>
          </el-carousel-item>
        </el-carousel>
          <el-tag>今日推荐</el-tag>
          <ul>
            <li v-for="ob in hot">
              <a :href="ob.url">{{ob.title}}</a>
            </li>
          </ul>

        </el-main>
        <el-aside width="400px">
          <el-tag>今日热点</el-tag>
          <ul>
            <li v-for="ob in hot">
              <router-link :to="ob.url">{{ob.title}}</router-link>
            </li>
          </ul>
        </el-aside>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  export default {
    data() {
      return  {
          images:{
              url:[
                   "http://192.168.186.10:83/img/1.jpg",
                   "http://192.168.186.10:83/img/2.jpg",
                   "http://192.168.186.10:83/img/3.jpg",
                   "http://192.168.186.10:83/img/4.jpg",

              ]
          },
          hot: [  ]
      }
    },
    methods: {
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            });
          }
        });
      }
    },
    mounted: function () {
        //更新每日热点数据
        this.$axios.post("/api/article/getDayHot",{}).then(res=>{
           var data=res.data;
            data.forEach(function (element) {
                element.url="/article_detail?id="+element.id;
            })
            console.log(data)
            this.hot=data;
        })
    }
  }
</script>
<style lang="less" scoped="scoped">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel {
    width: auto;
  }
  img {
    width: auto;
    height: 500px;
  }

  ul li{
    margin: 20px;
  }
</style>