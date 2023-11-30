<template>
    <div id="current-weather">
        <div class="location">{{location}}</div>
        <div class="weather">{{weather}}</div>
        <div class="temperature">{{temperature}}℃</div>
    </div>
</template>

<script>
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
                this.axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=b7f18f122d051e5d8951a7c3b59d8f41`)
            .then((response)=>{
                let data = response.data
                this.location = data.name
                this.weather = data.weather.main
                this.temperature = (data.main.temp-273.15).toFixed(1)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
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