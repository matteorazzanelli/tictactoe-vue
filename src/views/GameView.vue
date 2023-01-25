

<template>
  <h1>{{ playerX }} VS. {{ playerO }}</h1>
  <div class="game_table">
    <!-- Create the board and listen on click events -->
    <TrisBoard @changed="changedFcn"/>
  </div>
</template>

<script>
import TrisBoard from "@/components/TrisBoard.vue";
export default {
  name: 'GameView',
  components: { TrisBoard },
  props: ["playerX", "playerO"],
  methods: {
    changedFcn(changedVar){
      console.log('Arrivato ' + changedVar);
    }
  }
};
</script>

<style>

</style>