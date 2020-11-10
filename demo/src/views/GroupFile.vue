<template>
  <div>
    Group
  </div>
</template>

<script>
export default {
  data () {
    return {
      groupId: 13
    }
  },
  created () {
    this.groupId = this.$route.query.id || 0
    this.getFileList()
  },
  methods: {
    getFileList () {
      var _this = this
      if (Number(_this.groupId) === 0) {
        _this.$message.error('groupId')
        _this.$router.push('/welcome')
      }
    }
  }
}
</script>
