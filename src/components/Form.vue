<template>
  <div class="container">
    <h2 class="title">Добавьте нового пользователя</h2>
    <form class="form" action="#" method="POST" @submit.prevent="onSubmit">
      <input
        class="form__input"
        type="text"
        placeholder="Имя"
        v-model="firstName"
        minlength="2"
        maxlength="50"
        required
      />
      <input
        class="form__input"
        type="text"
        placeholder="Фамилия"
        v-model="lastName"
        minlength="2"
        maxlength="50"
        required
      />
      <button class="form__button" type="submit" :disabled="isButtonDisabled">
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserInfo",
  props: {
    user: Object
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      isButtonDisabled: false
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    onSubmit() {
      this.isButtonDisabled = true;
      this.setUser({
        firstName: this.firstName,
        lastName: this.lastName
      })
        .then(() => {
          (this.firstName = ""), (this.lastName = "");
        })
        .catch(err => console.log(err))
        .finally(() => (this.isButtonDisabled = false));
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
}

.title {
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
}

.form {
  margin-left: 15px;
}

.form__input {
  margin: 0 5px;
  padding: 5px;
}

.form__button {
  margin-left: 5px;
  padding: 5px;
}
</style>
