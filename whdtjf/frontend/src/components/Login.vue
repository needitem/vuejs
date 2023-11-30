<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ dialogTitle }}</span>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="closeDialog()" to="/"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="id" v-model="contactInfo.id" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="비밀번호" v-model="contactInfo.pw" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text type="submit" v-on:click="submitForm()">로그인</v-btn>
                    <v-btn color="blue darken-1" text>ID/PW 찾기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    data() {
        return {
            dialog: true,
            dialogTitle: '로그인',
            contactInfo: {
                id: null,
                pw: null
            },
            items: [],
            urlinfo: 'http://localhost:8000'
        }
    },

    methods: {
        submitForm() {
            let saveData = {};
            saveData.id = this.contactInfo.id;
            saveData.pw = this.contactInfo.pw;

            try {
                axios.post(this.urlinfo + '/members', qs.stringify(saveData), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                }).then((response) => {
                    if (response.data == '200') {
                        this.$router.push({ name: 'Home' });
                    } else if (response.data == '1') {
                        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                    } else if (response.data == '2') {
                        alert('접근제한 페이지');
                    } else {
                        alert('로그인 실패');
                    }
                }).catch((error) => {
                    console.log(error);
                })

            }
            catch (err) {
                console.log(err);
            }
        },
    }
}
</script>
<style scoped>
.headline {
    font-size: 20px;
    font-weight: bold;
}
</style>