<template>
  <div v-for="x in 3" :key="x">
    <div v-for="y in 3" :key="y">
      <!-- Note that index starts from 1 while boards' first index is 0 -->
      <!-- Note that with nested v-for and grid index are reversed -->
      <div class="grid-elem" @click="changeStatus(y,x)">{{ board[y-1][x-1] }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TrisBoard',
    emits: ['changed'],
    props: ['board', 'hasWinner'],
    mounted(){
      console.log(this.board);
    },
    methods: {
      changeStatus(x,y){
        if(!this.hasWinner){
          this.$emit('changed', x,y);
        }
      }
    }
  }
</script>

<style scoped>
/* *{border:1px solid blue} */
  .grid-elem {
    font-size: 75px;
    border: 2px solid crimson;
    background-color: #3a3a3c;
    color: white;
    cursor: pointer;
    width: 90px;
    height: 90px;
    margin: 5px;
    border-radius: 4px;
    box-shadow: 3px 3px 3px rgb(109, 107, 107);
  }
</style>