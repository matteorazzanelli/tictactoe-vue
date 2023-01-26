

<template>
  <h1>{{ playerX }} (X) VS. {{ playerO }} (O)</h1>
  <div class="game_table">
    <!-- Create the board and listen on click events -->
    <TrisBoard @changed="changedFcn" :board="board" :matchEnded="matchEnded"/>
  </div>
  <!-- If there is a winner -->
  <div v-if="matchEnded" class="currentSituation">
    <div v-if="hasWinner">
      <h2>Player {{ currentPlayer }} WINS!</h2>
    </div>
    <div v-else>
      <h2>Match ended in a DRAW!</h2>
    </div>
    <!-- restart the same game -->
    <button @click="restartGame">Restart</button>
    <!-- Or change the player names -->
    <router-link :to="{name:'home'}">
        Change player names
    </router-link>
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
      hasWinner: false,
      matchEnded: false
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
      // Check if currentPlayer wins or draw
      if(this.checkWinner()){
        this.hasWinner = true;
        this.matchEnded = true;
      }
      else if(this.checkDraw()){
        this.matchEnded = true;
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
    checkDraw(){
      for(let i=0; i<this.board.length; i++){
        for(let j=0; j<this.board[i].length; j++){
          if(this.board[i][j] == ''){
            return false;
          }
        }
      }
      // Match draw!
      console.log('MATCH DRAW');
      return true;
    },
    restartGame(){
      this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
      this.currentPlayer = this.playerX;
      this.hasWinner = false;
      this.matchEnded = false;
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
  button, a {
    background-color: rgb(10, 102, 194);
    border: none;
    padding: 15px 15px;
    width: 200px;
    border-radius: 20px;
    cursor: pointer;
    margin: 20px 20px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 15px;
    transition: background-color 0.15s;
  }
  button:hover, a:hover{
    background-color: rgb(2, 70, 138);
  }
  .currentSituation{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>