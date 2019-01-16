export default {
  header: {
    switch: '切换主题色',
    download: '下载主题',
    help: '帮助'
  },
  menu: [
    {
      'name': '按钮',
      'url': '/simulator/button'
    },
    {
      'name': '图标',
      'url': '/simulator/icon'
    }
  ],
  form: {
    theme: '主题色',
    switch: '切换',
    reset: '重置'
  },
  validate: {
    required: '主题色不能为空',
    format: '请输入 hex 格式的主题色'
  },
  help: {
    title: '帮助',
    content: `
        <p>1、点击顶部栏中的「切换主题色」，在弹出的对话框中选择主题色，并点击「切换」按钮；</p>
        <p>3、点击顶部栏中的「下载主题」，会自动下载应用了新主题色的样式文件；</p>
        <p>注意：本页面仅用来预览主题，页面上的元素不含交互逻辑。</p>
      `,
    ok: '确定'
  }
}
