<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-btn to="/AddCharacter"> Add Character </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="selectClass('all')"> All </v-btn>
          <v-btn @click="selectClass('Assult')"> Assult </v-btn>
          <v-btn @click="selectClass('Skirmisher')"> Skirmisher </v-btn>
          <v-btn @click="selectClass('Recon')"> Recon </v-btn>
          <v-btn @click="selectClass('Support')"> Support </v-btn>
          <v-btn @click="selectClass('Controller')"> Controller </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <display :selected-class="selectedClass" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Display from '../components/Home/Display.vue'
import AddCharacter from '@/components/Home/AddCharacter.vue';

export default {
  name: 'App',
  components: {
    Display,
    AddCharacter
  },
  props: ['selectedClass'],
  data: () => ({

  }),
  methods: {
    selectClass(classType) {
      this.$bus.$emit('update-selected-class', {
        selectedClass: classType,
      });
    },
  },
  created() {
  },
}
</script>

<style scoped>
.v-btn {
  background-color: black !important;
  color: white !important;
}
.v-col {
  background-color: black;
  color: white;
}
</style>