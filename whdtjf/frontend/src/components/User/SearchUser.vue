<template>
    <div id="player-stat">
        <v-card>
            <v-card-title>
                <v-icon>mdi-account</v-icon>
                <span>플레이어 정보</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field label="플레이어 이름" v-model="playerName"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-select :items="platforms" label="플랫폼" v-model="platform"></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text type="submit" v-on:click="updateUserInfo()">검색</v-btn>
            </v-card-actions>
        </v-card>
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
            platform: null,
            platforms: [
                'PC',
                'X1',
                'PS4',
                'SWITCH'
            ],

            playerData:{
                level: null,
                kills: null,
                kdr: null,
                rankScore: null,
                rankName: null,
                rankDiv: null,
                rankImg: null,

            }
        };
    },
    methods: {
        updateUserInfo() {
            axios.get(`https://api.mozambiquehe.re/bridge?auth=${my_api_key}&player=${this.playerName}&platform=${this.platform}`)
                .then((res) => {
                    this.userData = res.data;
                    this.playerData.level = this.userData.global.level;
                    this.playerData.kills = this.userData.total.kills.value;
                    this.playerData.kdr = this.userData.total.kd.value;
                    this.playerData.rankScore = this.userData.global.rank.rankScore;
                    this.playerData.rankName = this.userData.global.rank.rankName;
                    this.playerData.rankDiv = this.userData.global.rank.rankDiv;
                    this.playerData.rankImg = this.userData.global.rank.rankImg;
                
                })
                .catch((err) => {
                    //player not found

                    alert('에러 발생: ' + err); //에러 발생
                });

            
        },
    },
};


</script>
