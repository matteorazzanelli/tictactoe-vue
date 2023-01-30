

<template>
  <h1>{{ playerOne }} (X) VS. {{ playerTwo }} (O)</h1>
  <!-- Create the board and listen on click events -->
  <TrisBoard @changed="updateVars" :matchEnded="matchEnded" :currentPlayerSymbol="currentPlayerSymbol"/>
  <!-- If there is a winner -->
  <div v-if="matchEnded" class="currentSituation">
    <div v-if="hasWinner">
      <h2>Player {{ currentPlayer }} WINS!</h2>
    </div>
    <div v-else>
      <h2>Match ended in a DRAW!</h2>
    </div>
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
      currentPlayer: '',
      currentPlayerSymbol: '',
      matchEnded: false,
      hasWinner: false,
      playerOne: this.$route.params.player1name,
      playerTwo: this.$route.params.player2name
    }
  },
  components: { TrisBoard },
  mounted(){
    // default playerX is the first to move
    this.currentPlayer = this.playerOne;
    this.currentPlayerSymbol = 'X';
  },
  methods: {
    updateVars(ended, winner){
      this.matchEnded = ended;
      this.hasWinner = winner;
      if(!ended && !winner){
        // match not ended (or restarted), swap players
        if(this.currentPlayer == this.playerOne){
          this.currentPlayer = this.playerTwo;
          this.currentPlayerSymbol = 'O';
        }
        else{
          this.currentPlayer = this.playerOne;
          this.currentPlayerSymbol = 'X';
        }
      }
      // debug
      if(winner){
        console.log(this.currentPlayer + " WINS");
      }
    }
  }
};
</script>

<style>
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