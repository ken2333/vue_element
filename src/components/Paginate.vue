<!--
如何使用？
1.导入并添加components, import ToolBar from '~/components/ToolBar/ToolBar.vue',
2.绑定你的api、参数和数据处理函数，会自动生成分页
<Paginate
    api="postList"
    :params="params"
    :refresh="refresh"
    @val-change="PaginateData"
    >
</Paginate>
3.当你再次改动参数时，执行 refresh=!refresh 即可刷新。用于搜索。

-->

<template>
  <div class="pagination">
    <el-table :data="listData" style="width: 100%" @row-click="articleDetail">
      <el-table-column prop="titile"    width="450" ></el-table-column>
      <el-table-column prop="createtime"  :formatter="todate"  width="250">
      </el-table-column>
      <el-table-column
              prop="pageview" width="250">
      </el-table-column>
    </el-table>
    <div class="total">共{{total}}条数据,当页有{{currentDataLength}}条数据。</div>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="$Config.pageSize"
        @current-change="change"
        :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'Paginate',
    props: {
      api: String,
      params: Object,
      refresh: Boolean,
    },
    data() {
      return {
        total: 0,
        current: 0,
        currentDataLength: 0,
          listData:[]
      }
    },
    methods: {
      paginate: function (pages) {
          if(pages!=0&&pages!=null)
              this.params.start=pages;
        let params = this.params;
        params.pageSize = this.$Config.pageSize;
        params.pageCode = this.current;
        let thisApp = this;
         thisApp.$Api[thisApp.api](params, function (data) {
             thisApp.listData=data.list;
          thisApp.total = data.total;
          thisApp.currentDataLength = (data.list).length
          thisApp.$emit('val-change', data.list);
        })
      },
      change: function (page) {
        this.current = page;
        this.paginate(this.current);
        console.log("change")
      },
     
        todate:function (row,column) {
            return new Date(row.createtime).toLocaleString();
        },
        articleDetail(row)
        {
            let id =row.id;
            this.$router.replace("/article_detail?id="+id);
        }
    }
    ,
    watch: {
      'refresh': {
        handler: function () {
          this.current = 0;
          this.paginate(0);
        },
        // 深度观察
        deep: true
      }
    },
    mounted: function () {
      this.paginate(0);
    },
  }
</script>
<style lang="less" scoped>
  .pagination {
    padding: 7px;
    border: 1px solid #ebeef5;
    background: #fff;
    text-align: right;
  }
  .total {
    float: left;
    margin-top: 8px;
    margin-left: 10px;
    font-size: 13px;
    color: #606266;
  }
</style>