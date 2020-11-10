<template>
    <el-container class="home_container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleMenu()">
            <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" :v-if="isCollapse==true"/>
          </div>
          <el-menu background-color="#202B30" text-color="#fff" :collapse="isCollapse" :collapse-transition="false" router>
            <el-menu-item index="/personalFile">
              <i class="el-icon-user"></i>
              <span slot="title">个人文档</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class='el-icon-chat-line-square'></i>
                <span>团队文档</span>
              </template>
              <el-menu-item v-for="item in groupList" :key="item.id" @click="gotoGroup(item.id)">
                {{ item.groupName }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      groupList: [
        {
          id: 0,
          groupName: 'aaa'
        }
      ],
      isCollapse: false
    }
  },

  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    gotoGroup (groupId) {
      this.$router.push('/groupFile?id=' + groupId)
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
  width: 100%;
}

.el-header {
  background-color: #01111E;
  width: 100%;
}

.el-aside {
  background-color: #202B30;
}

.el-menu {
  width: 100%;
  font-size: 100%;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu--collapse  .el-submenu__title span{
  display: none;
}
.toggle-button {
  padding: 10px 20px 10px 5px;
  display: flex;
  justify-content: flex-end;
  color: #fff;
}
</style>
