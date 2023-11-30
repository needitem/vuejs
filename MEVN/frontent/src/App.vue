<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <h2>연락처 리스트</h2>
      <DataTable/>
    </v-main>
  </v-app>
</template>

<script>
import DataTable from './components/DataTable';
export default {
  name: 'App',
  components: {
    DataTable
  },
  data: () => ({
    //
  }),
}
</script>
<style scoped>
  h2{
    margin-top:20px;
    margin-left: 10px;
    color:blue;
  }
</style>
