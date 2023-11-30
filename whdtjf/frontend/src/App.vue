<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click.stop="bDrawer=!bDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title>DAK</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer absolute temporary v-model="bDrawer">
            <v-toolbar flat height="100px">
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-avatar>
                                <img src="http://randomuser.me/api/portraits/men/44.jpg">
                            </v-list-item-avatar>
                            <v-list-item-title class="title">관리자 페이지</v-list-item-title>
                            <v-list-item-subtitle></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list class="pt-3">
                <v-list-item v-for="item in items" :key="item.text" :href="item.to">
                    <v-list-item-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{item.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {     
      return {
      bDrawer: false,
      items: [
        { text: 'About character', icon: 'mdi-star' , to:'/home'},
        { text: 'User info', icon: 'mdi-account-multiple', to:'/about' },
      ],
      }
  },
  created(){
    this.$socket.emit('rint',{data:"First Request"});
  }
};
</script>
