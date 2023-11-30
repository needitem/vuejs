<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-btn to="/AddCharacter"> Add Character </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <display />
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>
<script>
import CurrentMap from '../components/Home/CurrentMap.vue'
import Display from '../components/Home/Display.vue'
import AddCharacter from '@/components/Home/AddCharacter.vue';

export default {
  name: 'App',
  components: {
    CurrentMap,
    Display,
    AddCharacter
  },
  data: () => ({
    //
  }),
  methods: {

  },
}
</script>
