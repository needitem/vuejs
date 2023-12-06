<template>
    <div v-if="asset" id="current-map" :style="{ backgroundImage: `url(${asset})` }">
        <div class="content">
            <h1>{{ currentMapname }}</h1>
            <p>남은 시간: {{ remaining }}</p>
            <p>From: {{ start_date_readable }} To: {{ end_date_readable }}</p>
            <p>다음 맵: {{ nextMap }}</p>
        </div>
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
            currentMapname: null,
            remaining: null,
            start_date_readable: null,
            end_date_readable: null,
            nextMap: null,

        }
    },
    created() {
        //load Data
        this.currentMap();
        this.$socket.on('time', (res) => {
            //remaining = enddate - res
            const endDate = new Date(this.end_date * 1000);

            const endDateHour = endDate.getHours();
            const endDateMinute = endDate.getMinutes();
            const endDateSecond = endDate.getSeconds();

            let remainHour = endDateHour - res.hour;
            let remainMinute = endDateMinute - res.minute;
            let remainSecond = endDateSecond - res.second;

            if (remainSecond < 0) {;
                remainMinute = remainMinute - 1;
                remainSecond = remainSecond + 60;
            } 
            if (remainMinute < 0) {
                remainHour = remainHour - 1;
                remainMinute = remainMinute + 60;
            }

            this.remaining = `${remainHour.toString().padStart(2, '0')}:${remainMinute.toString().padStart(2, '0')}:${remainSecond.toString().padStart(2, '0')}`;

        });
    },
    methods: {
        currentMap() {
            axios.get(`https://api.mozambiquehe.re/maprotation?auth=${my_api_key}`)
                .then((res) => {
                    this.currentMapname = res.data.current.map;
                    this.asset = res.data.current.asset;
                    this.start_date = res.data.current.start;
                    this.end_date = res.data.current.end;
                    this.remaining = res.data.current.remainingTimer;
                    // this.start_date_readable = res.data.current.readableDate_start;
                    // this.end_date_readable = res.data.current.readableDate_end;
                    this.nextMap = res.data.next.map;

                    const startDate = new Date(this.start_date * 1000);
                    const endDate = new Date(this.end_date * 1000);

                    const startDateHour = startDate.getHours().toString().padStart(2, '0');
                    const startDateMinute = startDate.getMinutes().toString().padStart(2, '0');

                    const endDateHour = endDate.getHours().toString().padStart(2, '0');
                    const endDateMinute = endDate.getMinutes().toString().padStart(2, '0');

                    this.start_date_readable = `${startDateHour}:${startDateMinute}`;
                    this.end_date_readable = `${endDateHour}:${endDateMinute}`;
                })
                .catch((err) => {
                    alert('에러 발생: ' + err); //에러 발생
                });
        },
    },


}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.data-info {
    font-size: 1.5em;
    color: #333;
}

.data-info img {
    width: 100%;
    height: auto;
}

#current-map {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    text-align: center;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
}
</style>
