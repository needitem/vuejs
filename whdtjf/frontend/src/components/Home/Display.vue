<template>
    <div class="card-columns">
        <b-card v-for="item in charInfo" :key="item.CharName" :title="item.CharName" style="max-width: 12%;" class="mb-2">
            <v-row justify="end">
                <b-icon-star ref="starButton" v-on:click="starred(item)" :class="item.IsStarred ? 'starred' : ''"></b-icon-star>
            </v-row>
            <img :src="item.Img" class="card-img-top" alt="Card image cap" width="100%" height="30%">
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
    name: 'display',
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
        this.updateInfo();
    },
    methods: {
        updateInfo() {
            axios.get(this.urlInfo)
                .then((response) => {
                    this.charInfo = response.data;
                })
        },

        starred(item) {
            axios.put(this.urlInfo + '/' + item.CharName, {
                CharName: item.CharName,
                Age: item.Age,
                Img: item.Img,
                Class: item.Class,
                Desc: item.Desc,
                IsStarred: !item.IsStarred,
                Story: item.Story,
                Realname: item.Realname,
                Homeworld: item.Homeworld,
                TacticalSkill: item.TacticalSkill,
                PassiveSkill: item.PassiveSkill,
                UltimitSkill: item.UltimitSkill,
            })
                .then((response) => {
                    this.updateInfo();
                })
        }
    },
}
</script>

<style scoped>
.starred {
    color: red;
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