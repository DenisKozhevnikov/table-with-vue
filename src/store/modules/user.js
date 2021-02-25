import {
  getPersons,
  setPerson,
  changePersonInfo,
  deletePerson
} from "../../utils/api";

export default {
  // Хранит в себе данные
  state: {
    users: []
  },
  // Синхронно изменяет данные в state
  mutations: {
    updateUsers(state, users) {
      state.users = users;
    },
    setNewUser(state, ...props) {
      state.users.push(...props);
    },
    changeUserInfo(state, { firstName, lastName, uuid }) {
      state.users.find((item, index) => {
        if (item.uuid === uuid) {
          state.users[index] = {
            firstName,
            lastName,
            uuid
          };
          return true;
        }
      });
    },
    deleteUser(state, uuid) {
      state.users.find((item, index) => {
        if (item.uuid === uuid) {
          state.users.splice(index, 1);
          return true;
        }
      });
    }
  },
  // Возвращает результаты вычислений
  getters: {
    allUsers(state) {
      return state.users;
    }
  },
  // Асинхронные функции которые работают с апи
  actions: {
    getUsers(context) {
      getPersons()
        .then(users => {
          // updateUsers из mutations
          context.commit("updateUsers", users);
        })
        .catch(err => console.log(err));
    },
    setUser(context, { firstName, lastName }) {
      return setPerson({ firstName, lastName }).then(({ uuid }) => {
        context.commit("setNewUser", { firstName, lastName, uuid });
      });
    },
    changeUserInfo(context, ...props) {
      return changePersonInfo(...props).then(() => {
        context.commit("changeUserInfo", ...props);
      });
    },
    deleteUser(context, uuid) {
      return deletePerson(uuid).then(() => {
        context.commit("deleteUser", uuid);
      });
    }
  }
};
