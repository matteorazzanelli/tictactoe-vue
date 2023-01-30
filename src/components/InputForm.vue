<template>
  <p>Please add 2 feasbile names and press Start</p>
  <div class="form">
    <!-- Collect some info from players -->
    <label>First player:</label>
    <input type="text" required v-model="firstPlayer">
    <div v-show="firstNameTooShort" class="error">Name too short</div>
    <div v-show="sameName" class="error">You cannot assing the same name</div>
    
    <label>Second player:</label>
    <input type="text" required v-model="secondPlayer">
    <div v-show="secondNameTooShort" class="error">Name too short</div>
    <div v-show="sameName" class="error">You cannot assing the same name</div>

    <!-- Show the button only if names are ok -->
    <div v-if="!firstNameTooShort && !secondNameTooShort && !sameName" class="start">
      <router-link :to="{name:'match', params:{ player1name: firstPlayer, player2name: secondPlayer }}">
        Start
      </router-link>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'InputForm',
    data () {
      return {
        firstPlayer: '',
        secondPlayer: '',
        firstNameTooShort: true,
        secondNameTooShort: true,
        sameName: true
      }
    },
    watch: {
      // Just 'watch' if variables are ok or not
      firstPlayer: function(value){
        this.firstNameTooShort = value.length < 3 ? true : false;
        this.updateSameName();
      },
      secondPlayer: function(value){
        this.secondNameTooShort = value.length < 3 ? true : false;
        this.updateSameName();
      }
    },
    methods: {
      updateSameName (){
        this.sameName = (this.firstPlayer == this.secondPlayer) ? true : false;
      }
    }
  }
</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
label {
  align-self: flex-start;
  color: grey;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input{
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
.error{
  color: red;
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
}
.start{
  display: flex;
  justify-content: center;
}
a{
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
a:hover{
  background-color: rgb(2, 70, 138);
}
</style>