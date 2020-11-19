<template>
  <div class="welcome-container">
    <img src="@/assets/welcome.png">
  </div>
</template>

<style lang="less" scoped>
.welcome-container {
  // background-image: url("../assets/welcome.png");
  width: 100% ! important;
  height: 100% ! important;
}
img {
  box-sizing: border-box;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 300px;
}
</style>
