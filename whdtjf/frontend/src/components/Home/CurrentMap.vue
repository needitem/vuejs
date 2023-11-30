<template>
    <div id="current-map">
        <v-card class="mx-auto" max-width="500">
            <v-card-title>현재 맵</v-card-title>

            <v-card>
                <v-card-title>
                    {{ currentMap }}
                </v-card-title>
                <v-card-text>
                    <v-img :src="asset" height="200px"></v-img>
                    <v-card-subtitle>시작 날짜: {{ start_date }}</v-card-subtitle>
                    <v-card-subtitle>종료 날짜: {{ end_date }}</v-card-subtitle>
                    <v-card-subtitle>남은 시간: {{ remaining }}</v-card-subtitle>
                </v-card-text>
            </v-card>

        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
const my_api_key = "5bf08b15962418a494ff6a2c40f4c10b"

export default {
    //https://api.mozambiquehe.re/maprotation?auth=5bf08b15962418a494ff6a2c40f4c10b

    name: 'current-map',
    data() {
        return {
            asset: null,
            start_date: null,
            end_date: null,
            remaining: null,

        }
    },
    created() {
        //load Data
        this.currentMap();


    },
    methods: {
        currentMap() {
            axios.get(`https://api.mozambiquehe.re/maprotation?auth=${my_api_key}`)
                .then((res) => {
                    this.currentMap = res.data.current.map;
                    this.asset = res.data.current.asset;
                    this.start_date = res.data.current.readableDate_start;
                    this.end_date = res.data.current.readableDate_end;
                    this.remaining = res.data.current.remainingTimer;
                })
                .catch((err) => {
                    alert('에러 발생: ' + err); //에러 발생
                });
        },
        nextMap() {
            axios.get(`https://api.mozambiquehe.re/maprotation?auth=${my_api_key}`)
                .then((res) => {
                    this.nextMap = res.data.next.map;
                    this.asset = res.data.next.asset;
                    this.start_date = res.data.next.readableDate_start;
                    this.end_date = res.data.next.readableDate_end;
                })
                .catch((err) => {
                    alert('에러 발생: ' + err); //에러 발생
                });
        },
    },


}
</script>
