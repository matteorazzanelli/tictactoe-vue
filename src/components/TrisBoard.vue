<template>
  <button type="button" @click.once="changeStatus()">{{ buttonStatus }}</button>
</template>

<script>
  export default {
    name: 'TrisBoard',
    data() {
      return {
        buttonStatus: 'Boh'
      }
    },
    methods: {
      changeStatus(){
        console.log('dentro');
        this.$emit('changed', this.buttonStatus);
      }
    }
  }
</script>

<style scoped>

</style>