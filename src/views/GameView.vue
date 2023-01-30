

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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: 'GameView',
  components: { TrisBoard },
  setup() {

    const route = useRoute();

    const currentPlayer = ref('');
    const currentPlayerSymbol = ref('');
    const matchEnded = ref(false);
    const hasWinner = ref(false);
    const playerOne = ref(route.params.player1name);
    const playerTwo = ref(route.params.player2name);

    onMounted(() => {
      // default playerX is the first to move
      currentPlayer.value = playerOne.value;
      currentPlayerSymbol.value = 'X';
    });

    const updateVars = (ended, winner) => {
      matchEnded.value = ended;
      hasWinner.value = winner;
      if(!ended && !winner){
        // match not ended (or restarted), swap players
        if(currentPlayer.value == playerOne.value){
          currentPlayer.value = playerTwo.value;
          currentPlayerSymbol.value = 'O';
        }
        else{
          currentPlayer.value = playerOne.value;
          currentPlayerSymbol.value = 'X';
        }
      }
      // debug
      if(winner){
        console.log(currentPlayer.value + " WINS");
      }
    }

    return {currentPlayer, currentPlayerSymbol, matchEnded, hasWinner, playerOne, playerTwo, updateVars}
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