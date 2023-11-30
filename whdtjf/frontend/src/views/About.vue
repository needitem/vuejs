<template>
  <div class="about">
    <v-container fluid>
      <v-col>
        <v-btn v-on:click="login()" to="/Login"> Sign In </v-btn>
        <v-btn v-on:click="register()" to="/Register"> Sign Up </v-btn>
      </v-col>
        <v-row>
            <v-col>
                <player-stat/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <search-user/>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>
<script>
import PlayerStat from '@/components/User/PlayerStat.vue';
import SearchUser from '@/components/User/SearchUser.vue';
export default {
  name: 'App',
  components: {
    PlayerStat,
    SearchUser
    
  },
  data: () => ({
    //
  }),
  methods:{

  }
}
</script>
