import { defineStore } from "pinia";

export const manageUsers = defineStore({
  id: "users",
  state: () => {
    return {
      users: [
        { id: 1, name: "Marek" },
        { id: 2, name: "Petra" },
        { id: 3, name: "Karel" },
      ],
    };
  },
  actions: {
    addUsers(id: number, name: string) {
      this.users.push({ id, name });
    },
  },
  getters: {
    getUserById: (state) => (id: number) => {
      return state.users.find((user) => user.id === id);
    },
  },
});
