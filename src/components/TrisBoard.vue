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
  export default {
    name: 'TrisBoard',
    emits: ['changed'],
    props: ['matchEnded', 'currentPlayerSymbol'],
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
      }
    },
    mounted(){
      console.log(this.board);
    },
    methods: {
      changeStatus(x,y){
        // check if game not ended and field empty
        if(!this.matchEnded && this.board[x-1][y-1]==''){
          // Sign the board wrt currentPlayer
          this.board[x-1][y-1] = this.currentPlayerSymbol;
          // Check if currentPlayer wins or draw
          if(this.checkWinner()){
            this.$emit('changed',true, true);
          }
          else if(this.checkDraw()){
            this.$emit('changed',true, false);
          }
          else{
            this.$emit('changed',false, false);
          }
        }
      },
      checkWinner(){
        for(let i = 0; i<this.combinations.length; i++){
          const [a, b, c] = this.combinations[i];
          // Check if element not null and if player has won
          if(this.board[a[0]][a[1]] != ''){
            if(this.board[a[0]][a[1]] == this.board[b[0]][b[1]] && this.board[a[0]][a[1]] == this.board[c[0]][c[1]]){
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
        this.$emit('changed',false, false);
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