<template>
    <div id="predator">
        <v-select v-model="platform" :items="platformList" label="Platform" dense outlined solo item-text="name"
            item-value="value"></v-select>
        <div v-if="platform">
            <div>
                <div>Found Rank: {{ platformData[platform].foundRank }}</div>
                <div>Total Master and Predator: {{ platformData[platform].totalMasterandPredator }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
const my_api_key = "5bf08b15962418a494ff6a2c40f4c10b";

export default {
    name: 'predator',
    data() {
        return {

            platformData: {
                PC: { foundRank: null, totalMasterandPredator: null },
                PS4: { foundRank: null, totalMasterandPredator: null },
                XBOX: { foundRank: null, totalMasterandPredator: null },
                SWITCH: { foundRank: null, totalMasterandPredator: null },
            },
            platform: 'PC',
            platformList: ['PC', 'PS4', 'XBOX', 'SWITCH'],
        }
    },


    created() {
        this.updatePredator();
    },

    methods: {
        updatePredator() {
            axios.get(`https://api.mozambiquehe.re/predator?auth=${my_api_key}`)
                .then((res) => {
                    const data = res.data.RP;
                    this.platformData.PC.foundRank = data.PC.foundRank;
                    this.platformData.PC.totalMasterandPredator = data.PC.totalMastersAndPreds;
                    this.platformData.PS4.foundRank = data.PS4.foundRank;
                    this.platformData.PS4.totalMasterandPredator = data.PS4.totalMastersAndPreds;
                    this.platformData.XBOX.foundRank = data.X1.foundRank;
                    this.platformData.XBOX.totalMasterandPredator = data.X1.totalMastersAndPreds;
                    this.platformData.SWITCH.foundRank = data.SWITCH.foundRank;
                    this.platformData.SWITCH.totalMasterandPredator = data.SWITCH.totalMastersAndPreds;
                })
                .catch((err) => {
                    alert('에러 발생: ' + err); //에러 발생
                })
        },
        sendPlatform() {
            this.$bus.$emit('update-platform', {
                platform: this.platform,
            });
        },
    },
}
</script>

<style scoped>
#predator {
    font-family: Arial, sans-serif;
    color: white;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.predator-select {
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;
    color: white;
}

.predator-loading,
.predator-alert {
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    color: white;
}

.predator-alert {
    color: #f44336;
}
</style>