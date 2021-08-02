<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Title msg="testtt"/>
</template>

<script>
import Title from './components/Title';

export default {
  name: 'App',
  components: {
    Title
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
