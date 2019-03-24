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
              <a :href="ob.url">{{ob.title}}</a>
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
          hot:[
              {title:"中国区块链开发者真实现状;1",
                url:"/article/123"
          },
              {title:"中国区块链开发者真实现状;2",
                  url:"/article/123"
              },
              {title:"中国区块链开发者真实现状3:;",
                  url:"/article/123"
              },
              {title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },
              {title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },{title:"中国区块链开发者真实现状:半数只懂皮毛; 数据分析师吃香; Java/Python或成为主流开发语言",
                  url:"/article/123"
              },
          ]
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