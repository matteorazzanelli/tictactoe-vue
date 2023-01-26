

<template>
  <h1>{{ playerX }} (X) VS. {{ playerO }} (O)</h1>
  <div class="game_table">
    <!-- Create the board and listen on click events -->
    <TrisBoard @changed="changedFcn" :board="board" :hasWinner="hasWinner"/>
  </div>
  <div v-if="hasWinner">
    <h2>Player {{ currentPlayer }} WINS!</h2>
    <button @click="restartGame">Restart</button>
  </div>
  <div v-else>
    <h2>Next move : {{ currentPlayer }}</h2>
  </div>
</template>

<script>
import TrisBoard from "@/components/TrisBoard.vue";
export default {
  name: 'GameView',
  data() {
    return {
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      combinations: [
        [[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],
        [[2,0],[1,1],[0,2]]
      ],
      currentPlayer: '',
      hasWinner: false
    }
  },
  components: { TrisBoard },
  props: ["playerX", "playerO"],
  mounted(){
    // default playerX is the first to move
    this.currentPlayer = this.playerX;
  },
  methods: {
    changedFcn(x,y){
      // Sign the board wrt currentPlayer
      this.board[x-1][y-1] = this.currentPlayer == this.playerX ? 'X' : 'O';
      // Check if currentPlayer wins
      if(this.checkWinner()){
        this.hasWinner = true;
      }
      else{
        this.currentPlayer = this.currentPlayer == this.playerX ? this.playerO : this.playerX;
      }
    },
    checkWinner(){
      for(let i = 0; i<this.combinations.length; i++){
        const [a, b, c] = this.combinations[i];
        // Check if element not null and if player has won
        if(this.board[a[0]][a[1]] != ''){
          if(this.board[a[0]][a[1]] == this.board[b[0]][b[1]] && this.board[a[0]][a[1]] == this.board[c[0]][c[1]]){
            console.log(this.currentPlayer + " WINS");
            return true;
          }
        }
      }
    },
    restartGame(){
      this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
      this.currentPlayer = this.playerX;
      this.hasWinner = false;
    }
  },
};
</script>

<style>
  .game_table {
    display: grid;
    justify-content: center;
    grid-template: 100px 100px 100px / 100px 100px 100px;
  }
  button {
    background-color: rgb(10, 102, 194);
    border: none;
    padding: 15px 0px;
    width: 100px;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 20px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 15px;
    transition: background-color 0.15s;
  }
  button:hover{
    background-color: rgb(2, 70, 138);
  }
</style>