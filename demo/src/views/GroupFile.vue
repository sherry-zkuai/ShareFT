<template>
  <div class="page-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item>团队文档</el-breadcrumb-item>
      <el-breadcrumb-item>{{groupName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="upper">
      <el-col :span="6"><div class="showImage"><img src="@/assets/cloud-icon.png"></div></el-col>
      <el-col :span="12">
        <div class="center">
          <div class="center-text">
            <div class='welcome-text'>Welcome Back to ShareFT</div>
            <div class="subtext">点击下方按钮，分享你的知识吧</div>
          </div>
          <el-button type="primary" class="newBtn" @click="gotoFile(0, true)">新建团队文档</el-button>
        </div>
      </el-col>
      <el-col :span="6"><div class="showImage"><img src="@/assets/folder-icon.png"></div></el-col>
    </el-row>
    <el-row class="middle"><div class="title"><i class="el-icon-s-grid"/>文件列表</div></el-row>
    <el-row class="lower">
      <el-col :span="6" v-if="fileList.length>currentPage*4-4+0">
        <div class="first">
          <div class="file-icon"><img src="@/assets/file-icon.jpeg"/></div>
          <div class="file-title">{{fileList[currentPage*4-4+0].title}}</div>
          <div class="file-editor">
            <span style="float: left; font-size: 13px; color: #ffffff; font-family: 'Microsoft YaHei'; padding-left: 5px; height: 30px; line-height: 30px">
              当前编辑成员
            </span>
            <div class="editor-avatar" style="float: left">
              <el-tooltip :content="item.name" placement="top" v-for="item in fileList[currentPage*4-4+0].editor.slice(0,3)" :key="item.id">
                <span class="avatar" :style="{'background-color':colorlist[Math.floor(Math.random() * colorlist.length)]}">{{item.name.slice(0,1)}}</span>
              </el-tooltip>
              <span class="avatar" v-if="fileList[currentPage*4-4+0].editor.length>3" style="background-color: #ffffff; color: #aaaaaa; font-size: 13px; font-family: 'Arial">{{'+'+(fileList[currentPage*4-4+0].editor.length-3)}}</span>
            </div>
          </div>
          <div><el-divider></el-divider></div>
          <div class="file-describe">
            <div class="describe-title">文档简介</div>
            <div class="describe-content">{{fileList[currentPage*4-4+0].description}}</div>
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+0].keyword[0]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+0].keyword[1]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+0].keyword[2]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="operation">
            <el-button type="text" @click="gotoFile(fileList[currentPage*4-4+0].id, false)">查看</el-button>
            <el-button type="text" @click="gotoFile(fileList[currentPage*4-4+0].id, true)">编辑</el-button>
            <el-button type="text" @click="remove(fileList[currentPage*4-4+0].id)">删除</el-button>
            <el-button type="text" @click="getHistory(fileList[currentPage*4-4+0].id)">溯源</el-button>
          </div>
          <div class="create-time">
            <i class="el-icon-edit-outline"/>
            {{'创建于'+fileList[currentPage*4-4+0].createTime}}
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="fileList.length>currentPage*4-4+1">
        <div class="second">
          <div class="file-icon"><img src="@/assets/file-icon.jpeg"/></div>
          <div class="file-title">{{fileList[currentPage*4-4+1].title}}</div>
          <div class="file-editor">
            <span style="float: left; font-size: 13px; color: #ffffff; font-family: 'Microsoft YaHei'; padding-left: 5px; height: 30px; line-height: 30px">
              当前编辑成员
            </span>
            <div class="editor-avatar" style="float: left">
              <el-tooltip :content="item.name" placement="top" v-for="item in fileList[currentPage*4-4+1].editor.slice(0,3)" :key="item.id">
                <span class="avatar" :style="{'background-color':colorlist[Math.floor(Math.random() * colorlist.length)]}">{{item.name.slice(0,1)}}</span>
              </el-tooltip>
              <span class="avatar" v-if="fileList[currentPage*4-4+1].editor.length>3" style="background-color: #ffffff; color: #aaaaaa; font-size: 13px; font-family: 'Arial">{{'+'+(fileList[currentPage*4-4+1].editor.length-3)}}</span>
            </div>
          </div>
          <div><el-divider></el-divider></div>
          <div class="file-describe">
            <div class="describe-title">文档简介</div>
            <div class="describe-content">{{fileList[currentPage*4-4+1].description}}</div>
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+1].keyword[0]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+1].keyword[1]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+1].keyword[2]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="operation">
            <el-button type="text" @click="gotoFile(fileList[currentPage*4-4+1].id, false)">查看</el-button>
            <el-button type="text" @click="gotoFile(fileList[currentPage*4-4+1].id, true)">编辑</el-button>
            <el-button type="text" @click="remove(fileList[currentPage*4-4+1].id)">删除</el-button>
            <el-button type="text" @click="getHistory(fileList[currentPage*4-4+1].id)">溯源</el-button>
          </div>
          <div class="create-time">
            <i class="el-icon-edit-outline"/>
            {{'创建于'+fileList[currentPage*4-4+1].createTime}}
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="fileList.length>currentPage*4-4+2">
        <div class="third">
          <div class="file-icon"><img src="@/assets/file-icon.jpeg"/></div>
          <div class="file-title">{{fileList[currentPage*4-4+2].title}}</div>
          <div class="file-editor">
            <span style="float: left; font-size: 13px; color: #ffffff; font-family: 'Microsoft YaHei'; padding-left: 5px; height: 30px; line-height: 30px">
              当前编辑成员
            </span>
            <div class="editor-avatar" style="float: left">
              <el-tooltip :content="item.name" placement="top" v-for="item in fileList[currentPage*4-4+2].editor.slice(0,3)" :key="item.id">
                <span class="avatar" :style="{'background-color':colorlist[Math.floor(Math.random() * colorlist.length)]}">{{item.name.slice(0,1)}}</span>
              </el-tooltip>
              <span class="avatar" v-if="fileList[currentPage*4-4+2].editor.length>3" style="background-color: #ffffff; color: #aaaaaa; font-size: 13px; font-family: 'Arial">{{'+'+(fileList[currentPage*4-4+2].editor.length-3)}}</span>
            </div>
          </div>
          <div><el-divider></el-divider></div>
          <div class="file-describe">
            <div class="describe-title">文档简介</div>
            <div class="describe-content">{{fileList[currentPage*4-4+2].description}}</div>
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+2].keyword[0]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+2].keyword[1]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+2].keyword[2]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="operation">
            <el-button type="text" @click="gotoFile(fileList[currentPage*4-4+2].id, false)">查看</el-button>
            <el-button type="text" @click="gotoFile(fileList[currentPage*4-4+2].id, true)">编辑</el-button>
            <el-button type="text" @click="remove(fileList[currentPage*4-4+2].id)">删除</el-button>
            <el-button type="text" @click="getHistory(fileList[currentPage*4-4+2].id)">溯源</el-button>
          </div>
          <div class="create-time">
            <i class="el-icon-edit-outline"/>
            {{'创建于'+fileList[currentPage*4-4+2].createTime}}
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="fileList.length>currentPage*4-4+3">
        <div class="fourth">
          <div class="file-icon"><img src="@/assets/file-icon.jpeg"/></div>
          <div class="file-title">{{fileList[currentPage*4-4+3].title}}</div>
          <div class="file-editor">
            <span style="float: left; font-size: 13px; color: #ffffff; font-family: 'Microsoft YaHei'; padding-left: 5px; height: 30px; line-height: 30px">
              当前编辑成员
            </span>
            <div class="editor-avatar" style="float: left">
              <el-tooltip :content="item.name" placement="top" v-for="item in fileList[currentPage*4-4+3].editor.slice(0,3)" :key="item.id">
                <span class="avatar" :style="{'background-color':colorlist[Math.floor(Math.random() * colorlist.length)]}">{{item.name.slice(0,1)}}</span>
              </el-tooltip>
              <span class="avatar" v-if="fileList[currentPage*4-4+3].editor.length>3" style="background-color: #ffffff; color: #aaaaaa; font-size: 13px; font-family: 'Arial">{{'+'+(fileList[currentPage*4-4+3].editor.length-3)}}</span>
            </div>
          </div>
          <div><el-divider></el-divider></div>
          <div class="file-describe">
            <div class="describe-title">文档简介</div>
            <div class="describe-content">{{fileList[currentPage*4-4+3].description}}</div>
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+3].keyword[0]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+3].keyword[1]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="key-word">
            <i class="el-icon-document"/>
            {{fileList[currentPage*4-4+3].keyword[2]}}
          </div>
          <div><el-divider></el-divider></div>
          <div class="operation">
            <el-button type="text" @click="gotoFile(fileList[currentPage*4-4+3].id, false)">查看</el-button>
            <el-button type="text" @click="gotoFile(fileList[currentPage*4-4+3].id, true)">编辑</el-button>
            <el-button type="text" @click="remove(fileList[currentPage*4-4+3].id)">删除</el-button>
            <el-button type="text" @click="getHistory(fileList[currentPage*4-4+3].id)">溯源</el-button>
          </div>
          <div class="create-time">
            <i class="el-icon-edit-outline"/>
            {{'创建于'+fileList[currentPage*4-4+3].createTime}}
          </div>
        </div>
      </el-col>
      <div class="page">
        <el-pagination :total="totalFile" :current-page.sync="currentPage" :page-size="4" layout="total, prev, pager, next, jumper" background ></el-pagination>
      </div>
    </el-row>
    <!-- <el-row class="page">
      <el-pagination :total="totalFile" :current-page="currentPage" :page-size="4" @current-change="turnPage()" layout="total, prev, pager, next, jumper" background ></el-pagination>
    </el-row> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      groupId: 13,
      groupName: 'aaa',
      totalFile: 8,
      currentPage: 1,
      fileList: [
        {
          id: 1,
          title: 'Title',
          description: 'lolollllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll',
          keyword: [
            'aaa', 'bbb', 'ccc'
          ],
          createTime: '2020-11-11 11:11:11',
          editor: [
            {
              name: 'editor1',
              id: 1
            },
            {
              name: 'editor2',
              id: 2
            },
            {
              name: 'editor3',
              id: 3
            },
            {
              name: 'editor4',
              id: 4
            }
          ]
        },
        {
          id: 2,
          title: 'Title2',
          description: 'description2',
          keyword: [],
          createTime: '2020-11-11 11:11:11',
          editor: []
        },
        {
          id: 3,
          title: 'Title3',
          description: 'description3',
          keyword: [],
          createTime: '2020-11-11 11:11:11',
          editor: []
        },
        {
          id: 4,
          title: 'Title4',
          description: 'description4',
          keyword: [],
          createTime: '2020-11-11 11:11:11',
          editor: []
        }],
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
      ]
    }
  },
  created () {
    // this.groupId = this.$route.query.id || 0
    this.groupId = sessionStorage.getItem('groupId')
    this.getFileList()
  },
  methods: {
    getFileList () {
      var _this = this
      if (Number(_this.groupId) === 0) {
        _this.$message.error('groupId')
        _this.$router.push('/welcome')
      }
    },
    gotoFile (id, edit) {
      this.$router.push('/filePage?' + 'fileId=' + id + '&' + 'edit=' + edit)
    },
    remove (id) {
      var index = 0
      for (var i = 0; i < this.fileList; i++) {
        if (this.fileList[i].id === id) {
          index = i
        }
      }
      this.fileList.splice(index, 1)
    },
    getHistory (id) {
      this.$router.push('/history?id=' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  width: 100%;
  background-color: #eeeeee;
  height: 100%;
}

.breadcrumb {
  padding: 15px 20px;
  font-size: 18px;
  font-family: 'Microsoft YaHei';
  color: black ! important;
  font-weight: 600;
}

.upper {
  width: 97%;
  height: 200px;
  border-radius: 10px;
  background-color: #E4EBFD;
  left: 50%;
  transform: translate(-50%);
  margin: 0px ! important;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.center {
  text-align: center;
}
.newBtn {
  bottom: 20px;
  padding: 10px 40px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.welcome-text {
  padding: 20px 0 10px 0;
  font-family: 'Arial';
  font-size: 30px;
}
.subtext {
  padding: 0 0 15px 0;
  font-size: 17px;
  font-family: 'Microsoft YaHei';
}
.showImage {
  width: 100%;
  height: 100%;
  img {
    position: relative;
    width: 220px;
    height: 180px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
  }
}
.middle {
  .title {
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: 'Arial';
    box-sizing: border-box;
    margin-left: 1.5%;
    color: #343333;
  }
  margin-bottom: 0px;
}
.lower {
  width: 97%;
  height: 470px;
  margin: 0px ! important;
  left: 50%;
  transform: translate(-50%);
  .el-col {
    height: 430px;
  }
}

.first, .second, .third, .fourth {
  border-radius: 10px;
  padding: 10px;
  box-shadow: 5px 5px 5px #cccccc;
  margin-left: 5px;
  margin-right: 5px;
  height: 400px;
}

.first {
  background-color: #EA523F;
}
.second {
  background-color: #5356FB;
}
.third {
  background-color: #F3A93A;
}
.fourth {
  background-color: #45905F;
}

.file-icon {
  background-color: #ffffff;
  opacity: 0.5;
  width: 30px;
  height: 25px;
  padding: 2%;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
.file-title {
  padding: 5px;
  width: 97%;
  height: 30px;
  font-size: 20px;
  font-family: 'Microsoft YaHei';
  color: #eeeeee;
}

.editor-avatar {
  margin-left: 2px;
}
.editor-avatar .avatar {
    margin-right: -7px !important;
}
.avatar {
  width: 30px;
  height: 30px;
  line-height: 30px;
  background-color: #eeeeee;
  display: inline-block;
  position: relative;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  vertical-align: bottom;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 50%;
  box-shadow: 2px 0px 3px #cccccc;
  -webkit-box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  -moz-box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  z-index: 1;
}
.file-editor {
  height: 35px;
}
.el-divider {
  margin-top: 5px;
  margin-bottom: 5px;
}
.describe-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 10px;
  height: 50px;
  word-wrap: break-word;
  line-height: 25px;
  color: #eeeeee;
  font-family: 'Microsoft YaHei';
  font-size: 15px;
  font-weight: 300;
}
.describe-title {
  color: #eeeeee;
  font-family: 'Microsoft YaHei';
  margin-left: 5px;
  margin-top: 10px;
}
.key-word {
  margin-left: 5px;
  color: #eeeeee;
  i {
    color: black;
  }
}
.operation {
  text-align: center;
  .el-button {
    padding: 5px;
    margin: 0px;
    color: #88E8FF;
  }
}
.create-time {
  i {
    color: black;
  }
  color: #eeeeee;
  font-size: 13px;
  position: absolute;
  bottom: 70px;
  box-sizing: border-box;
  margin-left: 5px;
}
.page {
  right: 10px;
  position: absolute;
  bottom: 10px;
}
</style>
