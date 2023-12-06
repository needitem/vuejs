<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-col>
          <search-user/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <predator/>
        </v-col>
        <v-col>
          <player-stat/>
        </v-col>
      </v-row>
      <v-col>
          <current-map/>
        </v-col>
    </v-container>
  </div>
</template>
<script>
import PlayerStat from '@/components/User/PlayerStat.vue';
import SearchUser from '@/components/User/SearchUser.vue';
import MatchHistory from '@/components/User/MatchHistory.vue';
import CurrentMap from '../components/User/CurrentMap.vue'
import Predator from '@/components/User/Predator.vue';

export default {
  name: 'App',
  components: {
    PlayerStat,
    SearchUser,
    MatchHistory,
    CurrentMap,
    Predator,
    
  },
  data: () => ({
  }),
  created() {
  },
  methods: {
  },
}
</script>

<style scoped>
.about {
  background-color: black;
  color: white;
}

.about .v-btn {
  background-color: black !important;
  color: white !important;
}
</style>