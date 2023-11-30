<template>
    <div id="current-aqi">
        <div class="aqi">

            현재 미세먼지 농도 AQIUS<br>
            {{ aqius }} {{ condition }}
        </div>
    </div>
</template>

<script>
import EventBus from "../EvenBus"
import axios from 'axios';
export default {
    name: 'current-aqi',
    data() {
        return {
            lat: 37.566535, //위도
            lng: 126.977969, //경도
            aqius: 50, // 미세먼지 농도 aqi: Air Quality Institude 대기질 지수 us: us기준으로 산정한 값이라고 한다.
            condition: "좋음" //미세먼지 상태 초기값
        }
    },
    mounted() {
        axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${this.lat}&lon=${this.lng}&key=14e05bdc-2c6e-47d2-b561-816846e7d581`)
            .then((response) => {
                const data = response.data.data;
                const pollution = data.current.pollution;

                this.aqius = pollution.aqius;
                if (this.aqius <= 50) {
                    this.condition = "좋음😀";
                } else if (this.aqius <= 100) {
                    this.condition = "보통😐";
                } else {
                    this.condition = "나쁨😡";
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },
    created() {
        EventBus.$on('centerChanged', (center) => {
            this.lat = center.lat();
            this.lng = center.lng();
            this.updateAQI();
        })

        EventBus.$on('sendData', (data) => {
            this.lat = data.lat;
            this.lng = data.lon;
            const my_api_key = "72e4bbad-f67e-41d4-92c3-a07ac7fb2690"
            axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${this.lat}&lon=${this.lng}&key=${my_api_key}`)
                .then((response) => {
                    const data = response.data.data;
                    const pollution = data.current.pollution;

                    EventBus.$emit('receiveInfo1', {
                        aqius: pollution.aqius,
                    })
                });
        })

    },

    methods: {
        updateAQI() { 
            const my_api_key = "72e4bbad-f67e-41d4-92c3-a07ac7fb2690"
            axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${this.lat}&lon=${this.lng}&key=${my_api_key}`)
                .then((response) => {
                    const data = response.data.data;
                    const pollution = data.current.pollution;

                    this.aqius = pollution.aqius;
                    if (this.aqius <= 50) {
                        this.condition = "좋음😀";
                    } else if (this.aqius <= 100) {
                        this.condition = "보통😐";
                    } else {
                        this.condition = "나쁨😡";
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },

}

</script>

<style scoped>
.aqi {
    text-align: center;
    font-size: 20pt;
    font-weight: 10;
    color: white;
}
</style>