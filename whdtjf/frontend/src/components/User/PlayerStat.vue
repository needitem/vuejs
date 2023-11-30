<template>
    <div id="player-stat">
        
        
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
            nickname: null,
            platform: null,
        };
    },
    created() {
        //load userData
        this.nickname = this.$route.params.nickname;
        this.platform = this.$route.params.platform;        

    },
    methods: {
        updateUserInfo() {
            axios.get(`https://api.mozambiquehe.re/bridge?auth=${my_api_key}&player=${this.playerName}&platform=${this.platform}`)
                .then((res) => {
                    this.userData = res.data;
                    this.level = res.data.global.level;
                    this.kills = res.data.global.kills;
                    this.damage = res.data.global.damage;
                    this.headshots = res.data.global.headshots;
                    this.matches = res.data.global.matches;
                    this.rankScore = res.data.global.rankScore;
                    this.rankName = res.data.global.rankName;
                    this.rankDiv = res.data.global.rankDiv;
                    this.rankImg = res.data.global.rankImg;
                    this.rankScore = res.data.global.rankScore;
                    this.rankScore = res.data.global.rankScore;
                    this.rankScore = res.data.global.rank;

                })
                .catch((err) => {
                    alert('에러 발생: ' + err); //에러 발생
                });
        },
    },
};


</script>
