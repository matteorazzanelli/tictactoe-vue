

<template>
  <h1>{{ this.$route.params.playerOne }} (X) VS. {{ this.$route.params.playerTwo }} (O)</h1>
  <div class="game_table">
    <!-- Create the board and listen on click events -->
    <TrisBoard @changed="updateVars" :matchEnded="matchEnded" :currentPlayer="currentPlayer"/>
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
      currentPlayer: '',
      matchEnded: false,
      hasWinner: false
    }
  },
  components: { TrisBoard },
  mounted(){
    // default playerX is the first to move
    this.currentPlayer = this.$route.params.playerOne;
  },
  methods: {
    updateVars(ended, winner){
      this.matchEnded = ended;
      this.hasWinner = winner;
      if(!ended && !winner){
        this.currentPlayer = (this.currentPlayer == this.$route.params.playerOne) ? 
          this.$route.params.playerOne : this.$route.params.playerTwo;
      }
    }
  }
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