<template>
    <div id="match-history">
        
    </div>
</template>

<script>
const my_api_key = "e2fd6360-a0cc-4fd4-a253-811e84ebb3fd"

import axios from 'axios'

    export default {
        name: 'match-history',
        data(){
            return{
                matchHistory: null,
                UID: null,
            }
        },
        created() {
            this.$bus.$on('update-user-info', (data) => {
                this.UID = data.UID;
                this.updateMatchHistory();
            });

        },
        methods: {
            updateMatchHistory(){   
                axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/psn/Taamo`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'TRN-Api-Key': my_api_key,
                    },
                })
                    .then((res) => {
                        console.log('matchHistory: ', res)

                    })
                    .catch((err) => {
                        alert('에러 발생: ' + err); //에러 발생
                    })

            },
        },


    }
</script>
