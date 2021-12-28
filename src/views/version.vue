<template>
  <div>
    <div><img src=""></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activityInfo: '',
      };
    },
    mounted() {
      console.log(this.$route.query)
      // this.activityInfo = this.$route.query
    },
    methods: {},
  };
</script>

<style>
</style>
