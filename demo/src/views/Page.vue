<template>
  <div class="page-container">
    <el-row class="title-container">
      <el-col :span="2">标题</el-col>
      <el-col :span="22">
        <el-input v-model="articleTitle" placeholder="请输入标题"></el-input>
      </el-col>
    </el-row>
    <el-row class="description-container">
      <el-col :span="2">简介</el-col>
      <el-col :span="22">
        <el-input type="textarea" v-model="articleDescription" placeholder="请输入简介" :rows="2"></el-input>
      </el-col>
    </el-row>
    <el-row class="editor-container">
      <el-col :span="3" style="font-size: 13px">编辑人员</el-col>
      <el-col :span="21" style="text-align: left;">
        <span class="editor" v-for="item in editors" :key="item" :style="{'background-color':getEditorColor(item),'margin-left': '10px'}">{{item}}</span>
      </el-col>
    </el-row>
    <quill-editor v-model="articleContent" class="editor" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)" :disabled="!editable"></quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Delta from 'quill-delta'
// import Quill from 'quill'

export default {
  components: {
    quillEditor
  },
  created () {
    this.articleId = parseInt(this.$route.query.fileId) || 0
    this.editable = this.$route.query.edit === 'true'
    this.userName = sessionStorage.getItem('userName')
    clearInterval(this.timer)
  },
  mounted () {
    this.$socket.emit('enter', this.userName, this.articleId)
    if (this.timer == null) {
      this.timer = setInterval(() => {
        this.checkChange()
      }, 1000)
    }
  },
  sockets: {
    connect () {
      console.log('connected')
    },
    userEnter (data) {
      var userList = data[0]
      if (this.editors.length === 0) {
        this.editors = userList
        this.editors.splice(this.editors.indexOf(this.userName), 1)
        for (var i = 0; i < this.editors.length; i++) {
          this.editorColor.push({ user: this.editors[i], color: this.colorlist[Math.floor(Math.random() * this.colorlist.length)] })
        }
      } else {
        if (!this.editors.includes(data[1])) {
          this.editors.push(data[1])
        }
        this.editorColor.push({ user: data[1], color: this.colorlist[Math.floor(Math.random() * this.colorlist.length)] })
      }
      console.log(this.editorColor)
    },
    change (data) {
      // this.$refs.myQuillEditor.quill.enable(false)
      this.currentSource = 'silent'
      // console.log(data)
      var delta = data[1]
      console.log(delta)
      var newDelta = new Delta()
      for (var i = 0; i < delta.length; i++) {
        // var newDelta1 = new Delta()
        if (delta[i].retain) {
          newDelta = newDelta.retain(parseInt(delta[i].retain))
        } else if (delta[i].insert) {
          newDelta = newDelta.insert(delta[i].insert, { background: this.getEditorColor(data[0]) })
        } else if (delta[i].delete) {
          newDelta = newDelta.delete(parseInt(delta[i].delete))
        }
        // this.$refs.myQuillEditor.quill.updateContents(newDelta1, 'silent')
        // this.$refs.myQuillEditor.quill.focus()
        // this.articleTitle = this.$refs.myQuillEditor.quill.getText().trim()
      }
      this.$refs.myQuillEditor.quill.updateContents(newDelta, 'silent')
      // this.$refs.myQuillEditor.quill.setSelection(this.$refs.myQuillEditor.quill.getText().length - 1, 0, 'api')
      // console.log(this.$refs.myQuillEditor.quill.getFormat())
      // this.$refs.myQuillEditor.quill.removeFormat(this.$refs.myQuillEditor.quill.getSelection(true), 1, 'silent')
      this.$refs.myQuillEditor.quill.format('background', '', 'api')
      // console.log(this.$refs.myQuillEditor.quill.getFormat())
      // this.$refs.myQuillEditor.quill.focus()
      // this.$refs.myQuillEditor.quill.enable(true)
      // this.$refs.myQuillEditor.quill.setSelection(this.$refs.myQuillEditor.quill.getText().length - 1, 0, 'api')
    }
  },
  data () {
    return {
      articleId: 0,
      articleTitle: '',
      articleDescription: '',
      articleContent: '',
      editors: [],
      lastRecorded: 0,
      changeContent: [],
      changed: false,
      timer: null,
      currentSource: '',
      editorColor: [],
      editable: false,
      colorlist: [
        'hsl(42, 48%, 54%)',
        'hsl(138, 24%, 48%)',
        'rgb(200, 138, 131)',
        'rgb(84, 221, 226)',
        'rgb(178, 199, 168)',
        'rgb(16, 195, 195)',
        'hsl(0, 21%, 68%)',
        'rgb(226, 166, 198)',
        'hsl(278, 17%, 66%)',
        'rgb(153, 199, 235)',
        'blueviolet'
      ],
      editorOption: {
        placeholder: '请输入',
        theme: 'snow',
        modules: {
          history: {
            userOnly: true,
            // delay: 1,
            maxStack: 1
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除字体样式
            ['image', 'video'] // 上传图片、上传视频
          ]
        }
      }
    }
  },
  methods: {
    onEditorChange (e) {
      // this.$refs.myQuillEditor.quill.enable(false)
      this.$refs.myQuillEditor.quill.format('background', '', 'api')
      var history = this.$refs.myQuillEditor.quill.history
      if (history.lastRecorded !== this.lastRecorded) {
        this.lastRecorded = history.lastRecorded
        if (this.changed) {
          // console.log(this.changeContent)
          this.$socket.emit('edit', this.userName, this.changeContent)
          this.changeContent = []
          // this.articleContent = this.$refs.myQuillEditor.quill.getText().trim('\n')
        }
      }
      this.changed = true
      var stack = history.stack
      // console.log(stack)
      this.lastRecorded = history.lastRecorded
      // console.log(this.lastRecorded)
      if (stack.redo.length === 0) {
        // console.log('undo')
        // console.log(stack.undo[0].redo.ops[0])
        var opsInsert = stack.undo[0].redo.ops
        this.changeContent = opsInsert
        // console.log(this.changeContent)
      } else {
        // console.log('redo')
        var opsDelete = stack.redo[0].undo.ops
        this.changeContent = opsDelete
      }
      this.currentSource = 'user'
      // this.$refs.myQuillEditor.quill.enable(true)
      // this.$refs.myQuillEditor.quill.setSelection(this.$refs.myQuillEditor.quill.getText().length - 1, 0, 'api')
    },
    checkChange () {
      if (this.lastRecorded + 1000 < Date.now() && this.currentSource === 'user' && this.changeContent.length !== 0) {
        // console.log(this.changeContent)
        this.$socket.emit('edit', this.userName, this.changeContent)
        this.changeContent = []
        // this.articleContent = this.$refs.myQuillEditor.quill.getText().trim()
      }
    },
    getEditorColor (user) {
      for (var i = 0; i < this.editorColor.length; i++) {
        if (this.editorColor[i].user === user) {
          // console.log(this.editorColor[i].color)
          return this.editorColor[i].color
        }
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>

<style lang="less" scoped>
.title-container, .description-container, .editor-container {
  width: 80%;
  height: 40px;
  margin: 10px;
  text-align: center;
  font-size: 15px;
  font-family: 'Microsoft YaHei';
  line-height: 40px;
}
.description-container {
  height: 60px;
}
</style>
