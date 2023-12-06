<template>
    <div id="player-stat">
        <div class="search-bar">
            <input v-model="playerName" type="text" placeholder="Enter player name">
            <v-spacer></v-spacer>
            <button @click="nameToUID">Search</button>
        </div>
        <!-- Rest of your template -->
    </div>
</template>
<script>
const my_api_key = "5bf08b15962418a494ff6a2c40f4c10b";
//https://api.mozambiquehe.re/bridge?auth=YOUR_API_KEY&player=PLAYER_NAME&platform=PLATFORM

import axios from 'axios';

export default {
    name: 'player-stat',

    data() {
        return {
            playerName: null,
            platform: 'PC',
            UID: null,
            PID: null,
            platforms: [
                'PC',
                'X1',
                'PS4'
            ],
        };
    },
    created() {
        //load userData      
        this.$bus.$on('update-platform', (data) => {
            this.platform = data.platform;
        });

    },
    methods: {
        nameToUID() {
            //https://api.mozambiquehe.re/nametouid?auth=YOUR_API_KEY&player=PLAYER_NAME&platform=PLATFORM
            axios.get(`https://api.mozambiquehe.re/nametouid?auth=${my_api_key}&player=${this.playerName}&platform=${this.platform}`)
                .then((res) => {
                    this.UID = res.data.uid;
                    this.PID = res.data.pid;
                    this.playerName = res.data.name;
                    this.$bus.$emit('update-user-info', {
                        UID: this.UID,
                        PID: this.PID,
                        playerName: this.playerName,
                        platform: this.platform,
                    });
                })
                .catch((err) => {
                    alert('에러 발생: ' + err); //에러 발생
                });
        },
    },
};


</script>
<style scoped>
.error {
  color: red;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.search-bar:hover {
  box-shadow: 0 0 10px rgba(0,0,0,0.1); 
}

.search-bar>* {
  margin-right: 2px;
}

.search-bar select {
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>