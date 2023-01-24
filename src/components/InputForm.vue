<template>
  <form @submit.prevent="handleSubmit">
    
    <label>First player:</label>
    <input type="text" required v-model="firstPlayer">
    <div v-if="firstPlayerError" class="error">{{ firstPlayerError }}</div>
    
    <label>Second player:</label>
    <input type="text" required v-model="secondPlayer">
    <div v-if="secondPlayerError" class="error">{{ secondPlayerError }}</div>

    <div class="submit">
      <button>
        Start the match!
      </button>
    </div>

  </form>
</template>

<script>
  export default {
    data () {
      return {
        firstPlayer: '',
        secondPlayer: '',
        firstPlayerError: '',
        secondPlayerError: ''
      }
    },
    methods: {
      handleSubmit(e){
        // validate names
        this.firstPlayerError = this.firstPlayer.length > 2 ? '' : 'Name too short';
        this.secondPlayerError = this.secondPlayer.length > 2 ? '' : 'Name too short';
      }
    }
  }
</script>

<style scoped>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
label {
  color: #aaa;
  text-align: left;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input{
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
button{
  background: #709cdf;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  font-weight: bold;
  border-radius: 20px;
}
button:hover{
  background: #0e52b7;
}
.error{
  color: red;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>