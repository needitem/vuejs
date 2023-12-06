<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <img :src="charInfo.Img" alt="Character Image" width="100%">
        </v-col>
        <v-col cols="6">
          <h2 @click="updatedialog(charInfo.CharName)">{{ charInfo.CharName }}</h2>
          <p @click="updatedialog(charInfo.Age)">Age: {{ charInfo.Age }}</p>
          <p @click="updatedialog(charInfo.Class)">Class: {{ charInfo.Class }}</p>
          <p @click="updatedialog(charInfo.Desc)">Description: {{ charInfo.Desc }}</p>
          <p @click="updatedialog(charInfo.Story)">Story: {{ charInfo.Story }}</p>
          
          <p @click="updatedialog(charInfo.Realname)">Real Name: {{ charInfo.Realname }}</p>
          <p @click="updatedialog(charInfo.TacticalSkill)">Tactical Skill: {{ charInfo.TacticalSkill }}</p>
          <p @click="updatedialog(charInfo.PassiveSkill)">Passive Skill: {{ charInfo.PassiveSkill }}</p>
          <p @click="updatedialog(charInfo.UltimitSkill)">Ultimate Skill: {{ charInfo.UltimitSkill }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="dialogContent"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closedialog">Close</v-btn>
            <v-btn color="blue darken-1" text @click="savedialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        CharName: '',
        Age: '',
        Img: '',
        Class: '',
        Desc: '',
        IsStarred: '',
        Story: '',
        Realname: '',
        HomeWorld: '',
        TacticalSkill: '',
        PassiveSkill: '',
        UltimitSkill: '',
      },
      dialogContent: '',

      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'CharName',
        },
        { text: 'Age', value: 'Age' },
        { text: 'Img', value: 'Img' },
        { text: 'Class', value: 'Class' },
        { text: 'Desc', value: 'Desc' },
        { text: 'IsStarred', value: 'IsStarred' },
        { text: 'Story', value: 'Story' },
        { text: 'Realname', value: 'Realname' },
        { text: 'HomeWorld', value: 'HomeWorld' },
        { text: 'TacticalSkill', value: 'TacticalSkill' },
        { text: 'PassiveSkill', value: 'PassiveSkill' },
        { text: 'UltimitSkill', value: 'UltimitSkill' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
    }
  },
  created() {
    //load userData
    this.loadData();
    this.dialog = false;

  },
  methods: {
    loadData() {
      axios.get(this.urlinfo + '/' + this.$route.params.id)
        .then((response) => {
          this.charInfo = response.data;
        })
    },
    updatedialog(content){
      this.dialog = true;
      this.dialogContent = content;

    },

    savedialog(){
      this.dialog = false;
      //what is in dialog
      console.log(this.dialogContent);

      axios.put(this.urlinfo + '/' + this.charInfo.CharName, {
        CharName: this.charInfo.CharName,
        Age: this.charInfo.Age,
        Img: this.charInfo.Img,
        Class: this.charInfo.Class,
        Desc: this.charInfo.Desc,
        IsStarred: this.charInfo.IsStarred,
        Story: this.charInfo.Story,
        Realname: this.charInfo.Realname,
        HomeWorld: this.dialogContent,
        TacticalSkill: this.charInfo.TacticalSkill,
        PassiveSkill: this.charInfo.PassiveSkill,
        UltimitSkill: this.charInfo.UltimitSkill,
      })
        .then((response) => {
          console.log(response);
          this.loadData();
        })
    },
    closedialog(){
      this.dialog = false;
    }
  },


}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: black;
  color: white;
}

.charInfo {
  font-size: 1.5em;
  color: white;
}

.charInfo img {
  width: 100%;
  height: auto;
}
</style>