<template>
    <div id="current-weather">
        <div class="location">{{location}}</div>
        <div class="weather">{{weather}}</div>
        <div class="temperature">{{temperature}}℃</div>
    </div>
</template>

<script>
    import EventBus from '../EvenBus.js'
    import axios from 'axios';
    export default {
        name: 'current-weather',
        data(){
            return{
                location:'',
                weather:'',
                temperature:0,
                lat:37.566535,
                lng:126.977969
            }
        },

        mounted(){
                axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=b7f18f122d051e5d8951a7c3b59d8f41`)
            .then((response)=>{
                let data = response.data
                this.location = data.name
                this.weather = data.weather.main
                this.temperature = (data.main.temp-273.15).toFixed(1)
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        created() {
            EventBus.$on('centerChanged', (center) => {
                this.lat = center.lat();
                this.lng = center.lng();
                this.updateWeather(this.lat, this.lng);
            })

            EventBus.$on('sendData', (data) => {
                axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=b7f18f122d051e5d8951a7c3b59d8f41`)
                    .then((response) => {
                        let data = response.data
                        EventBus.$emit('receiveInfo2', {
                            location: data.name,
                            temperature: (data.main.temp - 273.15).toFixed(1)
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })

        },
        methods: {
            updateWeather(lat, lon) {
                axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b7f18f122d051e5d8951a7c3b59d8f41`)
                    .then((response) => {
                        let data = response.data
                        this.location = data.name
                        this.weather = data.weather.main
                        this.temperature = (data.main.temp - 273.15).toFixed(1)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            
        },
    }
</script>

<style scoped>
	.location {
		text-align : center;
		font-size : 40pt;
		color : white;
	}
	.weather{
		text-align : center;
		font-size : 20pt;
		font-weight : 100;
		color : white;
	}
	.temperature{
		text-align : center;
		font-size : 50pt;
		font-weight : 100;
		color : white;
	}
</style>