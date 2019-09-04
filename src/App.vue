<template>
  <el-container class="wrapper">
    <el-header
      height="80px">
      <img
        src="./assets/logo.svg"
        alt="element-logo"
        class="header-logo">
      <span style="fontSize: 18px;">ZarmVue</span>
      <ul class="header-operations">
        <li @click="showThemeDialog">{{ langConfig.header.switch }}</li>
        <li
          class="header-download"
          :class="{ 'is-available': canDownload }"
          @click="downloadZip">
          {{ langConfig.header.download }}
        </li>
        <li>
          <el-select v-model="version" placeholder="请选择" @change="changeVer">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
      </ul>
    </el-header>
    <el-container>
      <el-aside class="menu">
        <el-menu @select="handleSelectMenu">
          <el-menu-item :key="index" v-for="(item,index) in langConfig.menu" :index="item.url">{{ item.name }}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="content">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog
      center
      :visible.sync="themeDialogVisible"
      :title="langConfig.header.switch"
      width="400px">
      <el-form
        :model="colors"
        :rules="rules"
        ref="form"
        class="theme-form"
        label-position="top"
        label-width="70px">
        <el-form-item :label="langConfig.form.theme" prop="primary">
          <el-color-picker v-model="colors.primary" ></el-color-picker>
        </el-form-item>
        <el-form-item class="color-buttons">
          <el-button type="primary" @click="submitForm">{{ langConfig.form.switch }}</el-button>
          <el-button @click="resetForm">{{ langConfig.form.reset }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="helpDialogVisible" :title="langConfig.help.title">
      <div v-html="langConfig.help.content" class="help"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="helpDialogVisible = false">{{ langConfig.help.ok }}</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import objectAssign from 'object-assign'
  import blobUtil from 'blob-util'
  import JSZip from 'jszip'
  import langConfig from './lang'
  import FileSaver from 'file-saver'
  import { generateColors } from './utils/color'
  import Simluator from './components/Simulator'

  // 默认主题色
  const primaryDefaultColor = '#12c287'
  const primaryDefaultActiveColor = '#0e9367'

  export default {
    name: 'app',
    components: {
      Simluator
    },
    data () {
      const colorValidator = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.langConfig.validate.required))
        } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
          return callback(new Error(this.langConfig.validate.format))
        } else {
          callback()
        }
      }
      return {
        colors: {
          primary: primaryDefaultColor,
          'darken-1': primaryDefaultActiveColor
        },
        rules: {
          primary: [
            { validator: colorValidator, trigger: 'blur' }
          ]
        },
        options: [{
          value: '1.6.1',
          label: '1.6.1'
        }],
        version: '1.6.1',
        path: '',
        originalStylesheetCount: -1,
        originalStyle: '',
        langConfig,
        primaryColor: '#ffffff',
        themeDialogVisible: false,
        helpDialogVisible: false,
        zip: null,
        styleFiles: [],
        fontFiles: [],
        colorMap: {
          [`${primaryDefaultColor}`]: 'primary',
          [`${primaryDefaultActiveColor}`]: 'darken-1'
        },
        canDownload: false,
        query: {
          name: '',
          date: []
        }
      }
    },

    methods: {
      changeVer (val) {
        // const { origin, hash } = window.location
        // window.location = origin + `?v=${val}` + hash
        this.version = val
        this.getIndexStyle()
      },

      handleSelectMenu (val) {
        this.$router.push(val)
      },

      showThemeDialog () {
        this.themeDialogVisible = true
      },

      resetZip () {
        this.zip = new JSZip()
      },

      writeNewStyle () {
        let cssText = this.originalStyle
        Object.keys(this.colors).forEach(key => {
          cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
        })
        console.log(cssText)
        if (this.originalStylesheetCount === document.styleSheets.length) {
          const style = document.createElement('style')
          style.innerText = cssText
          document.head.appendChild(style)
        } else {
          document.head.lastChild.innerText = cssText
        }
      },

      submitForm () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.themeDialogVisible = false
            this.primaryColor = this.colors.primary
            this.colors = objectAssign({}, this.colors, generateColors(this.colors.primary))

            this.canDownload = true
            this.writeNewStyle()
          } else {
            return false
          }
        })
      },

      downloadZip () {
        if (!this.canDownload) return
        this.resetZip()
        this.styleFiles.forEach(file => {
          let cssText = file.data
          Object.keys(this.colors).forEach(key => {
            cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
          })
          const css = blobUtil.createBlob([cssText], { type: 'text/css' })
          this.zip.file(file.name, css)
        })
        this.zip.generateAsync({ type: 'blob' })
          .then(blob => {
            FileSaver.saveAs(blob, `zarm-vue-${this.primaryColor}.zip`)
          })
      },

      resetForm () {
        this.$refs.form.resetFields()
      },

      getStyleTemplate (data) {
        const { colorMap } = this
        Object.keys(colorMap).forEach(key => {
          const value = colorMap[key]
          data = data.replace(new RegExp(key, 'ig'), value)
        })
        return data
      },

      getFile (url, isBlob = false) {
        return new Promise((resolve, reject) => {
          const client = new XMLHttpRequest()
          client.responseType = isBlob ? 'blob' : ''
          client.onreadystatechange = () => {
            if (client.readyState !== 4) {
              return
            }
            if (client.status === 200) {
              const urlArr = client.responseURL.split('/')
              resolve({
                data: client.response,
                url: urlArr[urlArr.length - 1]
              })
            } else {
              reject(new Error(client.statusText))
            }
          }
          client.open('GET', url)
          client.send()
        })
      },

      getIndexStyle () {
        this.getFile(`//unpkg.com/zarm-vue@${this.version}/zarm-vue.default.css`)
          .then(({ data }) => {
            this.originalStyle = this.getStyleTemplate(data)
            console.log(data)
            this.getSeparatedStyles()
          })
      },

      getSeparatedStyles () {
        this.getFile(`//unpkg.com/zarm-vue@${this.version}/lib/theme/`)
          .then(({ data }) => {
            return data.match(/href="[\w-]+\.css"/g).map(str => str.split('"')[1])
          })
          .then(styleFiles => {
            return Promise.all(styleFiles.map(file => {
              return this.getFile(`//unpkg.com/zarm-vue@${this.version}/lib/theme/${file}`)
            }))
          })
          .then(files => {
            this.styleFiles = files.map(file => {
              return {
                name: file.url,
                data: this.getStyleTemplate(file.data)
              }
            })
            this.styleFiles.push({
              name: 'zarm-vue.default.css',
              data: this.originalStyle
            })
          })
      }

    },

    created () {
      this.getIndexStyle()
    },

    mounted () {
      this.$nextTick(() => {
        this.originalStylesheetCount = document.styleSheets.length
      })
    }
  }
</script>
