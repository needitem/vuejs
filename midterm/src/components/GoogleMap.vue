<!-- eslint-disable no-undef -->
<template>
<div>
	<div id = "map-canvas"/>
</div>
</template>
    <script>
	export default {
		name: 'map-canvas',
        mounted(){
            this.initMap();
            this.setMarker(this.mapCenter,"ce"); 
        },
        methods: {
            initMap() {
                // eslint-disable-next-line no-undef
                this.map = new google.maps.Map(document.getElementById("map-canvas"), { //getElementById로 map id 속성의 요소를 가져온다.
                    center: this.mapCenter, //center로 할 위도, 경도를 지정한다.
                    zoom: 17, //zoom size를 지정.
                    maxZoom: 20,
                    minZoom: 3,
                    streetViewControl: true,
                    mapTypeControl: true,
                    fuulscreenControl: true,
                    zoomControl: true,
                });
            },
            setMarker(Points, Label) {//지도에 마커를 찍는 함수.
                // eslint-disable-next-line no-undef
                const markers = new google.maps.Marker({
                    position: Points,
                    map: this.map,
                    label: {
                    text: Label,
                    color: "#FFF",
                    },
                });
                this.map.addListener('center_changed', () => {
                    markers.setPosition(this.map.getCenter());
                    this.currentCenter = this.map.getCenter();
                });  
            },
        },
        data() {
            return {
                map: null,
                mapCenter: { lat: 37.5665, lng: 126.9780 },
                currentCenter: null,
            };
        },

        
    };
</script>

<style scoped>
	#map-canvas{
		width: 400px;
		height: 600px;
	}
</style>