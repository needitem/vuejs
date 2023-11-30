<template>
  <div id="app">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ dialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="lat" v-model="locationInfo.lat" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="lon" v-model="locationInfo.lon" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="btnClick($event)">취소</v-btn>
            <v-btn color="blue darken-1" text @click="btnClick($event)">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-btn color="primary" v-on:click.native="addInfo()">추가</v-btn>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.lat }}</td>
          <td>{{ row.item.lon }}</td>
          <td>{{ row.item.aqi }}</td>
          <td>{{ row.item.forecast }}</td>
          <td class="text-xs-right">
            <v-btn color="primary" v-on:click.native="updateInfo(row.item)">수정</v-btn>
            <v-btn color="primary" v-on:click.native="deleteInfo(row.item)">삭제</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import EventBus from '../EvenBus';
import axios from 'axios';
export default {
  data() {
    return {
      urlinfo: 'http://localhost:8000/contacts',
      locationInfo: {
        _id: null,
        name: null,
        lat: null,
        lon: null,
        aqi: null,
        forecast: null,
      },
      name: null,
      time: null,
      dialog: false,
      dialogTitle: null,

      headers: [
        { text: '이름', align: 'left', value: 'name' },
        { text: 'lat', align: 'left', value: 'lat' },
        { text: 'lon', align: 'left', value: 'lon' },
        { text: 'aqi', align: 'left', value: 'aqi' },
        { text: 'forecast', align: 'left', value: 'forecast' },
      ],
      items: []
    }
  },

  methods: {
    addInfo() {
      this.dialog = true;
      this.dialogTitle = "추가";
    },
    updateInfo(data) {
      this.dialog = true;
      this.dialogTitle = "수정";
      this.locationInfo.Id = data.Id;
      this.locationInfo.lat = data.lat;
      this.locationInfo.lon = data.lon;

    },
    deleteInfo(data) {
      this.dialog = true;
      this.dialogTitle = "삭제";
      this.locationInfo.Id = data.Id;
    },
    sendData() {
      EventBus.$emit('sendData', {
        lat: this.locationInfo.lat,
        lon: this.locationInfo.lon,
      });
    },
    removeEventBus() {
      EventBus.$off('receiveInfo1');
      EventBus.$off('receiveInfo2');
    },
    btnClick($event) {
      this.dialog = false;



      if ($event.target.innerHTML == "확인") {
        if (this.dialogTitle == "추가") {
          //check is there any event not finished
          this.sendData();
          self.lat = this.locationInfo.lat;
          self.lon = this.locationInfo.lon;

          EventBus.$on('receiveInfo1', (data) => {
            this.locationInfo.aqi = data.aqius;
            // console.log(this.locationInfo.aqi);
            EventBus.$on('receiveInfo2', (data) => {
              this.locationInfo.forecast = data.temperature;
              this.locationInfo.name = data.location;
              //   console.log(this.locationInfo.forecast, this.locationInfo.name);

              axios.post(this.urlinfo, {
                name: this.locationInfo.name,
                aqi: this.locationInfo.aqi,
                forecast: this.locationInfo.forecast,
                lat: self.lat,
                lon: self.lon,
              })
                .then(() => {
                  axios.get(this.urlinfo)
                    .then((res) => {
                      this.items = res.data;                    })
                    .catch((err) => {
                      alert('에러 발생: ' + err);
                    });
                })
                .catch((err) => {
                  alert('에러 발생: ' + err);
                
              })
              this.removeEventBus();
            });
          });
        }
        else if (this.dialogTitle == "수정") {
          this.sendData();
          self.lat = this.locationInfo.lat;
          self.lon = this.locationInfo.lon;

          EventBus.$on('receiveInfo1', (data) => {
            this.locationInfo.aqi = data.aqius;
            // console.log(this.locationInfo.aqi);
            EventBus.$on('receiveInfo2', (data) => {
              this.locationInfo.forecast = data.temperature;
              this.locationInfo.name = data.location;
              //   console.log(this.locationInfo.forecast, this.locationInfo.name);

              //check every database, and update the data which has same name. if there is more than 2 data, delete the data which has older date.
              axios.put(this.urlinfo + '/' + this.locationInfo.name, {
                name: this.locationInfo.name,
                aqi: this.locationInfo.aqi,
                forecast: this.locationInfo.forecast,
                lat: self.lat,
                lon: self.lon,
              })
                .then(() => {
                  axios.get(this.urlinfo)
                    .then((res) => {
                      this.items = res.data;
                    })
                    .catch((err) => {
                      alert('에러 발생: ' + err);
                    });
                })
                .catch((err) => {
                  alert('에러 발생: ' + err);
                });
                
              this.removeEventBus();
            });
          });
        }
        else {
          axios.delete(this.urlinfo + '/' + this.locationInfo.name)
            .then(() => {
              axios.get(this.urlinfo)
                .then((res) => {
                  this.items = res.data;
                })
                .catch((err) => {
                  alert('에러 발생: ' + err);
                });
            })
            .catch((err) => {
              alert('에러 발생: ' + err);
            });
        }
      }
      this.locationInfo = {
        name: null,
        lat: null,
        lon: null,
        aqi: null,
        forecast: null,
      };
    }
  },
  created() {

    axios.get(this.urlinfo)
      .then((res) => {
        this.items = res.data;
      })
      .catch((err) => {
        alert('에러 발생: ' + err);
      });
  },
}
</script>
<style scoped>
div {
  margin: 0 5px 0 5px;
}
</style>