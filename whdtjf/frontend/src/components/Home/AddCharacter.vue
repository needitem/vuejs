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
                <v-text-field label="char name" v-model="charInfo.CharName" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="age" v-model="charInfo.Age" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="img" v-model="charInfo.Img" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-select :items="classInfo" label="class" v-model="charInfo.Class"></v-select>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="desc" v-model="charInfo.Desc" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="story" v-model="charInfo.Story" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="realname" v-model="charInfo.Realname" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="homeworld" v-model="charInfo.HomeWorld" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="tacticalskill" v-model="charInfo.TacticalSkill" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="passiveskill" v-model="charInfo.PassiveSkill" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="ultimitskill" v-model="charInfo.UltimitSkill" required></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text type="submit" v-on:click="submitForm()">Add character</v-btn>
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
      dialogTitle: 'Add character',
      urlinfo: 'http://localhost:8000/character',
      charInfo: {
        CharName: null,
        Img: null,
        Age: null,
        Class: null,
        Desc: null,
        Story: null,
        Realname: null,
        IsStarred: false,
        HomeWorld: null,
        TacticalSkill: null,
        PassiveSkill: null,
        UltimitSkill: null,
      },
      classInfo: ["Assult", "Skirmisher", "Recon", "Support", "Controller"],
      headers: [
        { text: 'Character Name', align: 'left', value: 'CharName' },
        { text: 'Age', align: 'left', value: 'Age' },
        { text: 'Img', align: 'left', value: 'Img' },
        { text: 'Class', align: 'left', value: 'Class' },
        { text: 'Desc', align: 'left', value: 'Desc' },
      ],
    }
  },

  methods: {
    submitForm() {
      this.dialog = false;
      axios.post(this.urlinfo, {
        CharName: this.charInfo.CharName,
        Age: this.charInfo.Age,
        Img: this.charInfo.Img,
        Class: this.charInfo.Class,
        Desc: this.charInfo.Desc,
        IsStarred: false,
        Story: this.charInfo.Story,
        Realname: this.charInfo.Realname,
        HomeWorld: this.charInfo.HomeWorld,
        TacticalSkill: this.charInfo.TacticalSkill,
        PassiveSkill: this.charInfo.PassiveSkill,
        UltimitSkill: this.charInfo.UltimitSkill,
      }).then((response) => {
        this.items = response.data;
        console.log(this.items);
      }).catch((error) => {
        console.log(error);
      });

      this.$router.push({ name: 'Home' });
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