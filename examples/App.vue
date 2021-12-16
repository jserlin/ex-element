<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <el-card>
      <x-button>default</x-button>
      <x-button type="primary">primary</x-button>
      <x-button type="success">success</x-button>
      <x-button type="info">info</x-button>
      <x-button type="warning">warning</x-button>
      <x-button type="danger">danger</x-button>
    </el-card>
    <el-card>
      扩展的switch:<ex-switch v-model="switchFlag" :beforeChange="handleBeforeChange" ></ex-switch>
      默认的switch: <el-switch v-model="switchFlag">
</el-switch>
    </el-card>

  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      switchFlag: true
    }
  },
  methods: {
    handleBeforeChange() {
      return this.$confirm('确认切换吗？', '提示')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
