<template>
  <div id="app">
    <router-view name="blank"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>

    export default {
    name: 'app',
      created:function () {
         //设置值
          sessionStorage.clear();
          this.$Config.userName=sessionStorage.getItem("userName");
          this.$Config.userID=sessionStorage.getItem("userId");
          this.$Config.aliasname=sessionStorage.getItem("aliasname");
          this.$Config.email=sessionStorage.getItem("email");
          this.$Config.phoneNum=sessionStorage.getItem("phoneNum");
          this.$Config.postion=sessionStorage.getItem("postion");
          this.$Config.location=sessionStorage.getItem("location");


      },
  }
</script>

<style lang="less">
  #app {
    background-color: #222d32;
  }

</style>
