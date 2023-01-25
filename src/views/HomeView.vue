<template>
  <h1>TIC-TAC-TOE</h1>
  <p>This is a simple implementation of the tic-tac-toe in Vue.js</p>
  <p>Please add 2 feasbile names and press Start</p>
  <InputForm/>
</template>

<script>

import InputForm from '@/components/InputForm.vue'

export default {
  name: 'HomeView',
  components: { InputForm }
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
h1 {
  text-align: center;
  font-size: 24px;
  letter-spacing: 1px;
  padding: 2rem;
  color:rgb(72, 173, 139)
}
body {
  margin: 0;
  background: #eee;
}
p {
  font-size: 12px;
  font-weight: bold;
}
</style>
