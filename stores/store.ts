import { defineStore } from "pinia";

export const manageUsers = defineStore({
  id: "users",
  state: () => {
    return {
      users: [
        { id: 1, name: "Marek Sommer", age: 25 },
        { id: 2, name: "Petra Nováková", age: 30 },
        { id: 3, name: "Karel Dobrovský", age: 35 },
      ],
    };
  },
  actions: {
    addUser(id: number, name: string, age: number) {
      this.users.push({ id, name, age });
    },
  },
  getters: {
    getUserById: (state) => (id: number) => {
      return state.users.find((user) => user.id === id);
    },
  },
});
