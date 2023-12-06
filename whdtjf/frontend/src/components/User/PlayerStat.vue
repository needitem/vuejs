<template>
    <div id="player-stat">
        <center>
            <p>
                {{ playerName }}
            </p>
            <img :src="userData.rankImg" alt="Rank Image" />
            <p>{{ userData.rankName }} {{ userData.rankDiv }}</p>
            <div>
                <p>Level: {{ userData.level }}</p>
                <p>Kills: {{ userData.kills }}</p>
                <p>Rank Score: {{ userData.rankScore }}</p>

            </div>

        </center>
    </div>
</template>

<script>
const my_api_key = "5bf08b15962418a494ff6a2c40f4c10b";
//https://api.mozambiquehe.re/bridge?auth=YOUR_API_KEY&player=PLAYER_NAME&platform=PLATFORM
//https://public-api.tracker.gg/v2/apex/standard/profile/{platform}/{platformUserIdentifier}
import axios from 'axios';

export default {
    name: 'player-stat',
    data() {
        return {
            playerName: null,
            uid: null,
            platform: 'PC',
            userData: {
                level: 0,
                kills: 0,
                rankScore: 0,
                rankName: 0,
                rankDiv: 0,
                rankImg: null,

            }

        };
    },
    created() {
        //load userData      
        this.$bus.$on('update-user-info', (data) => {
            this.playerName = data.playerName;
            this.platform = data.platform;
            this.uid = data.UID;
            this.updateUserInfoUID();
        });

    },
    methods: {
        //https://api.mozambiquehe.re/bridge?auth=YOUR_API_KEY&uid=PLAYER_UID&platform=PLATFORM
        updateUserInfoUID() {
            axios.get(`https://api.mozambiquehe.re/bridge?auth=${my_api_key}&uid=${this.uid}&platform=${this.platform}`)
                .then((res) => {
                    this.userData.level = res.data.global.level;
                    this.userData.kills = res.data.total.kills.value;
                    this.userData.rankScore = res.data.global.rank.rankScore;
                    this.userData.rankName = res.data.global.rank.rankName;
                    this.userData.rankDiv = res.data.global.rank.rankDiv;
                    this.userData.rankImg = res.data.global.rank.rankImg;

                })
                .catch((err) => {

                });
        },
    },
};


</script>

<style scoped>
.player-stat {
  background-color: black;
  color: white;
}
</style>