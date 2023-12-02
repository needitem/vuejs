<template>
    <div id="about-character">
        <v-card>
            <v-card-title>
                
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

        },
    },


}
</script>
