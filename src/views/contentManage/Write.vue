<template>
  <div class="edit_container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="标签">
      <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">新标签</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="longding">立即发布</el-button>
        <el-button>存为草稿</el-button>
      </el-form-item>
    </el-form>
    <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
    </quill-editor>
  </div>

</template>

<script>
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

  export default {
      components: {
          quillEditor
      },
    data() {
      return  {
          content:"",
          str: '',
          editorOption: {},
          form: {
              tag:'',
              title: '',
              value5:''
          },
          longding:false,
          dynamicTags: [],
          inputVisible: false,
          inputValue: ''
      }
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器

        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        // 转码
        escapeStringHTML(str) {
            str = str.replace(/</g,'<');
            str = str.replace(/>/g,'>');
            return str;
        },
        onSubmit()
        {
            this.longding=true;
             this.$axios.post("/api/article/add",{content:this.content,title:this.form.title,userID:this.$Config.userID,tags:this.dynamicTags,loaction:this.$Config.city}).then(res=>{
                 let data=res.data;
                if(data!=null&&data)
                {
                    this.$notify({
                        title: '提示',
                        message: '发布文章成功!',
                        type: 'success'
                    })
                    this.longding=false;
                }
                else
                {
                    if(data!=null&&data)
                    {
                        this.$notify({
                            title: '警告',
                            message: '发布文章失败!!',
                            type: 'warning'
                        })
                        this.longding=false;
                    }
                }
            })
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    },
      computed: {
          editor() {
              return this.$refs.myQuillEditor.quill;
          },
      },
      created()
      {
          this.dynamicTags=[this.$Config.city[1]]
      }

  }
</script>

<style scoped="scoped">
  .quill-editor{
    background: white;
  }
  .el-form
  {
    width: 50%;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>