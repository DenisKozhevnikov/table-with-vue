<template>
  <table class="table">
    <thead>
      <tr>
        <th class="table__header">#</th>
        <th class="table__header">Имя</th>
        <th class="table__header">Фамилия</th>
        <th class="table__header table__header_narrow"></th>
        <th class="table__header table__header_narrow"></th>
      </tr>
    </thead>
    <tbody v-if="allUsers.length">
      <tr class="table__row" v-for="(user, i) in allUsers" :key="user.uuid">
        <UserInfo :user="user" :index="i" />
      </tr>
    </tbody>
  </table>
  <div class="no-users" v-if="allUsers.length == 0">
    Пользователи не найдены
  </div>
  <Form />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserInfo from "./components/UserInfo";
import Form from "./components/Form";

export default {
  name: "App",
  components: {
    UserInfo,
    Form
  },
  computed: {
    ...mapGetters(["allUsers"])
  },
  methods: {
    ...mapActions(["getUsers", "changeUserInfo"])
  },
  mounted() {
    // dispatch вызывает action в модуле vuex
    // this.$store.dispatch("getUsers");
    this.getUsers();
  }
};
</script>

<style lang="scss">
@import url("./vendor/normalize.css");

#app {
  min-height: 100vh;
  padding: 50px 20px 0;
  background: #f8f9fd;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}

.table {
  width: 100%;
  border-spacing: 0;
  border: 1px solid #ded9d9;
}

.table__header {
  padding: 10px 10px;
  background: #fff;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  border-bottom: 2px solid #ececec;
}

.table__header_narrow {
  width: 10px;
}

.table__data {
  padding: 5px 10px;
  text-align: center;
  border-bottom: 2px solid #ececec;
}

.table__row:hover {
  background: #ececec;
  border-bottom: 2px solid #ececec;
}

.no-users {
  padding: 20px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}
</style>
