<template>
    <v-app>
        <v-app-bar app color="black" dark>
            <v-app-bar-nav-icon @click.stop="bDrawer = !bDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title>DAK</v-toolbar-title>

            <v-col class="text-end">

                <div v-if="status != 200">

                    <v-btn to="/Login"> Sign In </v-btn>
                    <v-btn to="/Register"> Sign Up </v-btn>

                </div>
                <div v-else>
                    Welcome, {{ username }}
                    <v-btn v-on:click="logout()"> Sign Out </v-btn>

                </div>
            </v-col>
        </v-app-bar>


        <v-navigation-drawer absolute temporary v-model="bDrawer">
            <v-toolbar flat height="100px">
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="title">Menu</v-list-item-title>
                            <v-list-item-subtitle></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list class="pt-3">
                <v-list-item v-for="item in items" :key="item.text" :href="item.to">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
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
import axios from 'axios';
export default {
    name: 'App',

    data() {
        return {
            bDrawer: false,
            items: [
                { text: 'About character', icon: 'mdi-star', to: '/home' },
                { text: 'User info', icon: 'mdi-account-multiple', to: '/about' },
                { text: 'profile', icon: 'mdi-account', to: '/profile' }
            ],
            status: undefined,
            username: undefined,
        }
    },
    computed: {
        seatClass() {
            return this.someCondition ? 'seat-black-red' : 'seat-default';
        }
    },
    created() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
            try {
                axios.get('http://localhost:8000/Auth', {
                    withCredentials: true
                }).then((response) => {
                    this.status = response.data.status;
                    this.username = response.data.name;
                })
            } catch (error) {
                //console.log(error);
            }
        },

        logout() {
            try {
                axios.get('http://localhost:8000/Logout', {
                    withCredentials: true
                }).then((response) => {
                    if (response.data.status == 200) {
                        alert("로그아웃 성공");
                        this.status = undefined;
                        location.reload();
                    }
                })
            } catch (error) {
                //console.log(error);
            }
        },
    }
};
</script>

<style scoped>
body {
  background-color: black;
  color: white;
}

.v-app {
  background-color: black;
}

.v-list-item {
  color: white;
  font-size: 1.2em;
}

.v-list-item:hover {
  background-color: #333;
}

.v-icon {
  color: white;
}
</style>
