<template>
  <div class="game_table">
    <div v-for="x in 3" :key="x">
      <div v-for="y in 3" :key="y">
        <!-- Note that index starts from 1 while boards' first index is 0 -->
        <!-- Note that with nested v-for and grid index are reversed -->
        <div class="grid-elem" @click="changeStatus(y,x)">{{ board[y-1][x-1] }}</div>
      </div>
    </div>
  </div>
  <!-- restart the same game -->
  <button @click="restartGame">Restart</button>
</template>

<script>

import {ref, onMounted} from "vue"

export default {
  name: 'TrisBoard',
  emits: ['changed'],
  props: ['matchEnded', 'currentPlayerSymbol'],
  setup(props, context) {
    const board = ref([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    const combinations = ref( [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],
      [[0,0],[1,1],[2,2]],
      [[2,0],[1,1],[0,2]]
    ]);

    onMounted(() => {
      console.log(board.value);
    });

    const changeStatus = (x,y) => {
      // check if game not ended and field empty
      if(!props.matchEnded && board.value[x-1][y-1]==''){
        // Sign the board wrt currentPlayer
        board.value[x-1][y-1] = props.currentPlayerSymbol;
        // Check if currentPlayer wins or draw
        if(checkWinner()){
          context.emit('changed',true, true);
        }
        else if(checkDraw()){
          context.emit('changed',true, false);
        }
        else{
          context.emit('changed',false, false);
        }
      }
    };

    const checkWinner = () => {
      for(let i = 0; i < combinations.value.length; i++){
        const [a, b, c] = combinations.value[i];
        // Check if element not null and if player has won
        if(board.value[a[0]][a[1]] != ''){
          if(board.value[a[0]][a[1]] == board.value[b[0]][b[1]] && board.value[a[0]][a[1]] == board.value[c[0]][c[1]]){
            return true;
          }
        }
      }
    };

    const checkDraw = () => {
      for(let i=0; i<board.value.length; i++){
        for(let j=0; j<board.value[i].length; j++){
          if(board.value[i][j] == ''){
            return false;
          }
        }
      }
      // Match draw!
      console.log('MATCH DRAW');
      return true;
    };

    const restartGame = () => {
      board.value = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
      context.emit('changed',false, false);
    };

    return {
      board, combinations, 
      changeStatus, checkWinner, checkDraw, restartGame
    }
  }
}
</script>

<style scoped>
/* *{border:1px solid blue} */
.game_table {
    display: grid;
    justify-content: center;
    grid-template: 100px 100px 100px / 100px 100px 100px;
  }
  .grid-elem {
    font-size: 75px;
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