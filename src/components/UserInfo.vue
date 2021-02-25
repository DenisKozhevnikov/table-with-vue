<template>
  <td class="table__data">{{ index + 1 }}</td>
  <td class="table__data">
    <input
      class="table__input"
      type="text"
      v-model="firstName"
      :disabled="isInputsDisabled"
      minlength="2"
      maxlength="50"
      required
    />
  </td>
  <td class="table__data">
    <input
      class="table__input"
      type="text"
      v-model="lastName"
      :disabled="isInputsDisabled"
      minlength="2"
      maxlength="50"
      required
    />
  </td>
  <td class="table__data">
    <button
      class="table__button table__button_green"
      v-if="isInputsDisabled"
      type="button"
      @click="toggleInputs"
    >
      <font-awesome-icon icon="user-edit" />
    </button>
    <button
      class="table__button table__button_blue"
      type="button"
      v-if="!isInputsDisabled"
      :disabled="isButtonsDisabled"
      @click="onChangeButtonClick"
    >
      <font-awesome-icon icon="save" />
    </button>
  </td>
  <td class="table__data">
    <button
      class="table__button"
      type="button"
      :disabled="isButtonsDisabled"
      @click="onDeleteButtonClick"
    >
      <font-awesome-icon icon="trash-alt" />
    </button>
  </td>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserInfo",
  props: {
    user: Object,
    index: Number
  },
  data() {
    return {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      uuid: this.user.uuid,
      isInputsDisabled: true,
      isButtonsDisabled: false
    };
  },
  methods: {
    ...mapActions(["changeUserInfo", "deleteUser"]),
    toggleInputs() {
      this.isInputsDisabled = !this.isInputsDisabled;
    },
    onChangeButtonClick() {
      this.isButtonsDisabled = true;
      this.changeUserInfo({
        firstName: this.firstName,
        lastName: this.lastName,
        uuid: this.uuid
      })
        .then(() => {
          this.isButtonsDisabled = false;
          this.toggleInputs();
        })
        .catch(err => console.log(err))
        .finally(() => (this.isButtonsDisabled = false));
    },
    onDeleteButtonClick() {
      this.isButtonsDisabled = true;
      this.deleteUser(this.uuid)
        .catch(err => console.log(err))
        .finally(() => (this.isButtonsDisabled = false));
    }
  }
};
</script>

<style scoped lang="scss">
.table__input {
  width: 100%;
  padding: 5px;
}

.table__button {
  outline: 0;
  border: none;
  background: transparent;
  color: darkred;
  cursor: pointer;
  transition: all 0.15s ease;
}

.table__button:hover {
  opacity: 0.5;
}

.table__button:disabled {
  color: grey;
}

.table__button_green {
  color: #2e5a2e;
}

.table__button_blue {
  color: #4a48ce;
}
</style>
