<template>
<div>
      <za-panel>
         <za-panel-header title='基本' ></za-panel-header>
         <za-panel-body>
          <div v-for='(i, index) in ICONS' class="grid-column" style="width: 33.33%;display: inline-block;padding: 15px;text-align: center;" :key="index">
           <za-icon style="font-size:24px" theme="primary" :type='i' class='icon'></za-icon>
          </div>
         </za-panel-body>
      </za-panel>
      
</div>
</template>

<script>
const ICONS = [
  'right', 'right-round', 'right-round-fill',
  'wrong', 'wrong-round', 'wrong-round-fill',
  'info-round', 'info-round-fill',
  'question-round', 'question-round-fill',
  'warning-round', 'warning-round-fill',
  'arrow-left', 'arrow-right', 'arrow-top', 'arrow-bottom',
  'add', 'add-round', 'add-round-fill',
  'minus', 'minus-round', 'minus-round-fill',
  'broadcast'
].sort()

export default {
  data () {
    return {
      ICONS,
      i: null
    }
  }
}
</script>

<style scoped lang="scss">
</style>
