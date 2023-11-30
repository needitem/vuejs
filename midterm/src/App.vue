<template>
    <div id="app">
        <div id="information">
            <div id="current-weather">
                <current-weather :weather="weather" />
                <!--현재 날씨 영역-->
            </div>
            <hr>
            <div id="forecast">
                <forecast :forecast="forecast" />
                <!--일기 예보 영역-->        
            </div>
        </div> 
        <div id="map">
            <google-map @center-changed="updateWeather" />
                <!--구글 맵 영역-->   
        </div>
    </div>
</template>

<script>
import CurrentWeather from './components/CurrentWeather'
import GoogleMap from './components/GoogleMap'
import Forecast from './components/Forecast'

	export default{
		name: 'app',
		components:{
			CurrentWeather,
			Forecast,
			GoogleMap
        },
		data() {
			return {
				currentWeather: null,
				forecast: null,
				weather: null
			}
		},
		methods:
		{
			updateWeather(){
			}
		},
	}
 
</script>

<style>
	body{
		background-color: #fafafa;
	}
	#app{
		position:absolute;
		top:50%;
		left:10%;
		width: 1000px;
		height: 600px;
		margin-top: -300px;
		margin-left: -500;
		border-radius: 3px;
		background-color: #444;
		box-shadow: 0px 2px 2px 2px rgba(0,0, 0, 0.1);
	}
	#app:after{
		content: '';
		display: block;
		clear:both;
	}
	#app > #information{
		float: left;
		width: 600px;
	}
	#app >#information>#current-weather{
		margin-top: 100px;
		background-color: blue;
		height: 200px
	}
	#app > #information>#forecast{
		padding-top: 10px;
		background-color: red;
		height: 100px;
	}
	#app> #map{
		float: right;
		width: 400px;
		height: 600;
		border-color: green;
	}
	hr{
		width: 80%;
		margin: 40px auto;
		border: none;
		border-top: 1px soild white;
	}
</style>
