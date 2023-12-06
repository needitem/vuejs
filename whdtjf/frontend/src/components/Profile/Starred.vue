<template>
    <div class="starred">
        <b-card v-for="item in charInfo" :key="item.CharName" :title="item.CharName" style="max-width: 12%;" class="mb-2">
            <router-link :to="`/detail/${item.CharName}`">
                <img :src="item.Img" class="card-img-top" alt="Card image cap" width="100%" height="30%">
            </router-link>
            <b-card-text>
                <br>
                <div class="char-desc">{{ item.Desc }}</div>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'
import { BCard, BButton, BIconStar, BCardText } from 'bootstrap-vue'

export default {
    name: 'starred',
    components: {
        BCard,
        BButton,
        BIconStar,
        BCardText,
    },
    data() {
        return {
            urlInfo: 'http://localhost:8000/character',
            charInfo: []
        }
    },
    created() {
        this.getStarred();
    },
    methods: {
        getStarred() {
            axios.get(this.urlInfo)
                .then((response) => {
                    this.charInfo = response.data;

                    //filter data to get only starred characters
                    this.charInfo = this.charInfo.filter((item) => {
                        return item.IsStarred == true;
                    })
                }).
                catch((error) => {
                    console.log(error);
                })
        },
    },
}
</script>

<style scoped>
.char-name, .char-desc, .card-columns {
  background-color: black;
  color: white;
}

.char-name {
  font-size: 75%;
}

.char-desc {
  font-size: 75%;
}

.card-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 3%;
}
</style>