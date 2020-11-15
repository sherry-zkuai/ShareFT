<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card class="box-card1">
            <div class="change-time">
              <i class="el-icon-edit-outline"/>
              修改时间：{{changeTime}}
            </div>
            <div class="file-editor">
              <i class="el-icon-edit-outline"/>
              编辑人：{{user}}
          </div>
          <div class="operation">
            <el-button type="text">查看编辑内容</el-button>
          </div>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card class="box-card2">
          <div class="change-time">
            <i class="el-icon-edit-outline"/>
            修改时间：{{changeTime}}
          </div>
          <div class="file-editor">
            <i class="el-icon-edit-outline"/>
            编辑人：{{user}}
        </div>
        <div class="operation">
          <el-button type="text">查看编辑内容</el-button>
        </div>
      </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card class="box-card3">
          <div class="change-time">
            <i class="el-icon-edit-outline"/>
            修改时间：{{changeTime}}
          </div>
          <div class="file-editor">
            <i class="el-icon-edit-outline"/>
            编辑人：{{user}}
        </div>
        <div class="operation">
          <el-button type="text">查看编辑内容</el-button>
        </div>
      </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card class="box-card4">
          <div class="change-time">
            <i class="el-icon-edit-outline"/>
            修改时间：{{changeTime}}
          </div>
          <div class="file-editor">
            <i class="el-icon-edit-outline"/>
            编辑人：{{user}}
        </div>
        <div class="operation">
          <el-button type="text">查看编辑内容</el-button>
        </div>
      </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileId: 0
    }
  },
  created () {
    this.fileId = this.$route.query.fileId || 0
  }
}
</script>

<style lang="less" scoped>

.block {
  width:300px;
   height:200px;
   position:absolute;
   left:50%;
   top:20%;
   margin:-100px 0 0 -150px
}
.box-card1 {
   background-color: #EA523F;
}
.box-card2 {
   background-color: #5356FB;
}
.box-card3 {
   background-color: #F3A93A;
}
.box-card4 {
   background-color: #45905F;
}
.operation {
  text-align: center;
  .el-button {
    padding: 5px;
    margin: 0px;
    color: #88E8FF;
  }
}
.change-time {
  i {
    color: black;
  }
}
.file-editor {
  i {
    color: black;
  }
}

</style>
