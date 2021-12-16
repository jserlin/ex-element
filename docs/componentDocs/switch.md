# 扩展switch
## 场景
> 当switch组件切换状态的时候弹出确认框，确认的时候才切换，

## 用法

::: demo 添加了一个beforeChange的hook，返回promise
```html

<template>
    <div>扩展的switch：<ex-switch v-model="show" :beforeChange="handleBeforeChange" ></ex-switch></div>
    <div>默认的switch：<el-switch v-model="show"></el-switch></div>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
      }
    },
    methods: {
      handleBeforeChange() {
        return this.$confirm('确认切换吗？', '提示')
      }
    }
  }
</script>

:::
