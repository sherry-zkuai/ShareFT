<template>
  <div>History</div>
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
</style>
