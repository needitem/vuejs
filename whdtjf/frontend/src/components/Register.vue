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
                <v-text-field label="name" v-model="contactInfo.name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="비밀번호" v-model="contactInfo.password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="confirm passoword" v-model="passwordConfirm" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text type="submit" v-on:click="submitForm()">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
  
<script>
import axios from 'axios' 
export default {
  data() {
    return {
      dialog: true,
      dialogTitle: '회원가입',
      urlinfo: 'http://localhost:8000/members',
      passwordConfirm: null,
      contactInfo: {
        id: null,
        name: null,
        pw: null,
      },

      // 관리자 페이지에서 user 정보를 보여주기 위한 변수
      headers: [
        { text: '아이디', align: 'left', value: 'id' },
        { text: '이름', align: 'left', value: 'name' },
        { text: '비밀번호', align: 'left', value: 'password' },
      ],

      // DB에서 받아온 데이터를 저장할 배열
      items: []
    }
  },

  computed: {
    passwordMatch() {
      return this.contactInfo.password === this.passwordConfirm;
    }
  },

  created() {

  },

  methods: {
    // 비밀번호 유무 확인 후 DB에 전송
    submitForm() {
      if(this.passwordConfirm)
      {
        axios.post(this.urlinfo, {
          id: this.contactInfo.id,
          name: this.contactInfo.name,
          pw: this.contactInfo.password,
        }).
        then((res) => {
          //console.log(res.data); //성공시
          this.items = res.data;
          console.log(this.items);
          this.$router.push('/home');
          location.reload();
        }).
        catch((err) => {
          alert('에러 발생: ' + err); //에러 발생
        });
      }
      
    },
  }
}
</script>
  
<style scoped>
#logo_title {
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
}

.v-btn {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: rgb(7, 0, 0) !important;
  font-size: 20px !important;
  font-weight: bold !important;
  margin-right: 10px !important;
}

.v-form {
  padding: 0 400px !important;
}
</style>