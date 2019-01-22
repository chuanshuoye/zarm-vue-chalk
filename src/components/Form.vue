<template>
<div>
      <za-panel>
         <za-panel-header title='CheckBox' ></za-panel-header>
         <za-cell>
          <za-checkbox-group v-model='v1' >
             <za-checkbox label='content'>内容</za-checkbox>
          </za-checkbox-group>
         </za-cell>
         <za-cell>
          <za-checkbox-group v-model='v11' type="button">
             <za-checkbox label='content'>内容</za-checkbox>
          </za-checkbox-group>
         </za-cell>
      </za-panel>
      <za-panel>
         <za-panel-header title='Radio' ></za-panel-header>
         <za-cell>
          <za-radio-group v-model='v2'>
              <za-radio label='1' >内容</za-radio>
              <za-radio label='2' >内容</za-radio>
           </za-radio-group>
         </za-cell>
         <za-cell>
           <za-radio-group v-model='v2' type="button">
              <za-radio label='1' >内容</za-radio>
              <za-radio label='2' >内容</za-radio>
           </za-radio-group>
         </za-cell>
      </za-panel>
      <za-panel>
         <za-panel-header title='Switch' ></za-panel-header>
         <za-cell title="开关">
          <za-switch slot="description" v-model="switch1">
          </za-switch>
        </za-cell>
      </za-panel>

      <za-panel>
         <za-panel-header title='Badge' ></za-panel-header>
         <za-cell title="徽标">
          <za-badge slot="description" theme="primary" shape="dot"></za-badge>
        </za-cell>
      </za-panel>

      <za-panel>
         <za-panel-header title='Progress' ></za-panel-header>
         <za-panel-body>
          <div class="progress" style="padding:20px 0;">
            <za-progress :percent="20" shape="round" weight="normal" theme="primary" >
              10%
            </za-progress>
          </div>
          </za-panel-body>
      </za-panel>

      <za-panel>
         <za-panel-header title='Tabs' ></za-panel-header>
         <za-panel-body>
           <za-tabs v-model="activeName">
             <za-tab-pane label="用户管理" name="first">
               <div class="content">用户管理</div>
             </za-tab-pane>
             <za-tab-pane label="配置管理" name="second">
               <div class="content">配置管理</div>
             </za-tab-pane>
             <za-tab-pane label="角色管理" name="third">
               <div class="content">角色管理</div>
             </za-tab-pane>
           </za-tabs>
         </za-panel-body>
      </za-panel>
</div>
</template>

<script>
export default {
  data () {
    return {
      v1: true,
      v11: false,
      v2: '1',
      switch1: false,
      activeName: 'first'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
