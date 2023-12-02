<template>
  <div class="about">
    <v-container fluid>
      <v-col>
        <v-btn v-if="status != 200" v-on:click="login()" to="/Login"> Sign In </v-btn>
        <v-btn v-if="status != 200" v-on:click="register()" to="/Register"> Sign Up </v-btn>
        <v-btn v-else v-on:click="logout()"> Sign Out </v-btn>
      </v-col>
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
import axios from 'axios';
export default {
  name: 'App',
  components: {
    PlayerStat,
    SearchUser
    
  },
  data: () => ({
    status: undefined,
  }),
  created() {
    this.checkAuth();
  },
  return:
  {
  },
  methods:{
    checkAuth() {
      try {
        axios.get('http://localhost:8000/Auth', {
          withCredentials: true
        }).then((response) => {
          this.status = response.status;
        })
      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      try {
        axios.get('http://localhost:8000/Logout', {
          withCredentials: true
        }).then((response) => {
          if (response.status == 200){
            alert("로그아웃 성공");
            this.status = undefined;
          }
        })
      } catch (error) {
        console.log(error);
      }
    },

  }
}
</script>
