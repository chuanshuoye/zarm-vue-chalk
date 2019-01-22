<template>
  <div class="simulator">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.simulator {
  position: absolute;
  top: 105px;
  left: 50%;
  margin-left: - 188px;
  width: 375px;
  height: 750px;
  border: 1px solid #999;
  z-index: 10;
  background-color: #f2f2f2;
  overflow-y: auto;
}
</style>
