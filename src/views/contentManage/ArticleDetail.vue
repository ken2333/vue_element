<template>
        <el-container>
                <el-header >
                        <p class="title">{{titile}}</p>
                        <p class="tags">标签:<span v-for="tag  in tags">  {{tag}}  </span></p>
                        <p class="arrticleInfo"><span>作者:{{authorID}}</span>   发布时间：{{createTime| formatDate }}  游览量：{{pageview}}</p>
                </el-header>

                <el-main><div v-html="content"></div>
                        <ul class="comments" v-for="data in tableData" >
                                <div  class="personInfo">
                                        <img src="../../assets/tem/1.jpg"/>
                                        <p> {{data.aliasName}}</p>
                                        <p class="time">{{data.time|formatDate}}</p>
                                </div>
                                <div  class="words"  v-html="data.content">
                                </div>
                        </ul>
                        <div class="edit_container">
                                <quill-editor
                                        v-model="content1"
                                        ref="myQuillEditor"
                                        :options="editorOption">
                                </quill-editor>
                                <div class="button"  >
                                        <el-button-group>
                                                <el-button type="success" round  :loading="loading" @click="send" >发送</el-button>
                                                <el-button type="warning" round @click="clearContent">清空</el-button>
                                        </el-button-group>
                                </div>
                        </div>

                </el-main>

        </el-container>

</template>

<script>
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {

        name: "ArticleDetail",
        components:{quillEditor},
        data:function()
        {
            return {
                content:``,
                titile:"",
                articleID:"",
                authorID:"",
                pageview:1,
                createTime:"",
                tags:"",
                tableData:[],
                content1: ``,
                editorOption: {
                    placeholder:"请输入内容",
                    theme:'snow',
                    modules:{
                        toolbar:[['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block'],

                            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                            [{ 'direction': 'rtl' }],                         // text direction

                            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                            [{ 'font': [] }],
                            [{ 'align': [] }],

                            ['clean']         ]
                    }
                },
                loading:false

            }
        },
        created:function () {
            let app=this;
            //获取文章内容
            app.getArticleContent();




        },
        methods:{
            clearContent()
            {
                this.content1="";
            } ,
            send()
            {
                let app=this;
                app.loading=true;
                app.$axios.post("/api/comment/add",{userid:app.$Config.userID,content:this.content1,articleID:app.articleID})
                    .then(res=>{
                        if(res.data) {
                            app.$notify({
                                title: '操作成功！',
                                message: '发送评论成功！',
                                type: 'success'
                            });
                        };
                        app.loading = false;
                        //app.$router.go(0);

                    })
            },
            getArticleContent()
            {
                //获取内容
                let id=this.$router.currentRoute.query.id;
                this.$axios.post("/api/article/getById",{id:id}).then(res=>{
                    let data=res.data;
                    this.createTime= data.createTime;
                    this.pageview=data.pageview;
                    this.authorID=data.author;
                    this.articleID=data.id;
                    this.content=data.content;
                    this.titile=data.titile;
                    this.tags=data.tags.split(",");
                    //加载评论
                    this.getComment();
                }).catch(
                );
            },
            getComment()
            {
                this.$axios.post("/api/comment/list",{articleId:this.articleID}).then(
                    res=>{

                      this.tableData=res.data;
                    }
                )
            },

        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        filters: {
            formatDate(time) {

             var   date = new Date(time);
                return  date.toLocaleString();
            }
        }
    }
</script>

<style scoped>
  .title {
          font-size: 24px;
          word-wrap: break-word;
          text-align: center;
  }
  .tags{
          text-align: left;
  }
   .arrticleInfo{
           text-align: right;
   }
  .comments{
                background: white;
                border: #6c75b8 2px solid;
                border-radius: 4px;
                margin-top: 20px;
                width: 100%;
                overflow:auto;
        }

  .comments   .personInfo
  {
          text-align: center;
          width: 10%;
          float: left;

  }

  .comments   .personInfo img
  {
          margin: 10px;
          width: 70%;
          height: 70%;
  }
  .comments  .words
  {
          width: 85%;
          float: right;
          padding: 20px;
  }
  .time {
          text-align: center;
        font-size: 14px;
  }
.edit_container{
        margin-top: 30px;
        background: white;
}
.button {
        float: right;
        padding: 10px;
}
</style>