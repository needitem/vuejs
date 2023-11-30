<template>
    <div id="about-character">
        <v-card>
            <v-card-title>
                <v-text-field label="Character Name" v-model="charInfo.CharName" required></v-text-field>
                <v-text-field label="Age" v-model="charInfo.Age" required></v-text-field>
                <v-text-field label="Class" v-model="charInfo.Class" required></v-text-field>
                <v-text-field label="Desc" v-model="charInfo.Desc" required></v-text-field>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text type="submit" v-on:click="submitForm()">Add character</v-btn>
            </v-card-actions>
        </v-card>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'about-character',
    data() {
        return {
            dialog: true,
            dialogTitle: 'Add character',
            urlinfo: 'http://localhost:8000/character',
            charInfo: {
                CharName: null,
                Age: null,
                Class: null,
                Desc: null,
            },

            headers: [
                { text: 'Character Name', align: 'left', value: 'CharName' },
                { text: 'Age', align: 'left', value: 'Age' },
                { text: 'Class', align: 'left', value: 'Class' },
                { text: 'Desc', align: 'left', value: 'Desc' },
            ],
        }
    },
    created() {
        //load userData
        this.loadData();

    },
    methods: {
        loadData() {
            axios.get(this.urlinfo)
                .then((response) => {
                    this.items = response.data;
                    //find character name from db, and load data
                    //receive character name from another component
                    if(this.charInfo.CharName != null){
                        axios.get(this.urlinfo + '/' + this.charInfo.CharName)
                        .then((response) => {
                            this.charInfo = response.data;
                            console.log(this.charInfo);
                        })
                        .catch((err) => {
                            //player not found
                            alert('에러 발생: ' + err); //에러 발생
                        });
                    }
                })
                .catch((err) => {
                    //player not found
                    alert('에러 발생: ' + err); //에러 발생
                });
        },
    },


}
</script>
