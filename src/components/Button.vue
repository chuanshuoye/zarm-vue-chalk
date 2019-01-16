<template>
<div>
      <za-panel>
         <za-panel-header title='基本' ></za-panel-header>
         <za-panel-body>
          <za-button theme="primary">primary</za-button>
         </za-panel-body>
      </za-panel>
      <za-panel>
         <za-panel-header title='块级按钮' ></za-panel-header>
         <za-panel-body>
            <za-button theme="primary" block>幽灵按钮</za-button>
            <za-button theme="primary" block disabled>激活状态的按钮</za-button>
         </za-panel-body>
      </za-panel>
      <za-panel>
         <za-panel-header title='形状' ></za-panel-header>
         <za-panel-body>
           <za-button theme="primary" shape="radius">radius</za-button>
             <za-button theme="primary" shape="round">round</za-button>
            <za-button theme="primary" shape="circle">circle</za-button>
         </za-panel-body>
      </za-panel>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
</style>
