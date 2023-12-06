<template>
  <div class="profile">
    <Starred />
  </div>
</template>

<script>
import Starred from '../components/Profile/Starred.vue'
export default {
  name: 'App',
  components: {
    Starred,
  },
  data: () => ({
    //
  }),
  methods: {

  },
}
</script>


<style scoped>
.profile {
  background-color: black;
  color: white;
}
</style>