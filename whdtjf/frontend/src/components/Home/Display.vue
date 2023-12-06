<template>
    <div>
        <div class="card-columns">
            <b-card v-for="item in charInfo" :key="item.CharName" :title="item.CharName" style="max-width: 12%;"
                class="mb-2">
                <v-row justify="end">
                    <b-icon-star ref="starButton" v-on:click="starred(item)"
                        :class="item.IsStarred ? 'starred' : ''"></b-icon-star>
                </v-row>
                <router-link :to="`/detail/${item.CharName}`">
                    <img :src="item.Img" class="card-img-top" alt="Card image cap" width="100%" height="30%">
                </router-link>
                <b-card-text>
                    <br>
                    <div class="char-desc">{{ item.Desc }}</div>
                </b-card-text>
            </b-card>
        </div>

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
            charInfo: [],
            selectedClass: 'all',
        }
    },
    watch:{
    },
    created() {
        this.$bus.$on('update-selected-class', (data) => {
            this.selectedClass = data.selectedClass;
            this.filterCharacters();
        });
        this.updateInfo();
    },
    methods: {
        updateInfo() {
            axios.get(this.urlInfo)
                .then((response) => {
                    this.charInfo = response.data;
                }).
                catch((error) => {
                    //   console.log(error);
                    alert('Login required');
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
        },
        filterCharacters() {
            axios.get(this.urlInfo)
                .then((response) => {
                    this.charInfo = response.data;

                    if (this.selectedClass !== 'all') {
                        this.charInfo = this.charInfo.filter((item) => {
                            console.log(item.Class)
                            return item.Class === this.selectedClass;
                        });
                    }
                })
                .catch((error) => {
                    //   console.log(error);
                    alert('Login required');
                })
        },
    },
}
</script>

<style scoped>
.starred {
  color: red;
}

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