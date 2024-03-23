import { defineStore } from 'pinia'

export const manageUsers = defineStore({
  id: 'users',
  state: () => {
    return {
      users: [
        { id: 1, username: 'Marek Sommer', email: 'marek.test@gmail.com', password: 25 },
        { id: 2, username: 'Petra Nováková', email: 'petra.test@email.cz', password: 30 },
        { id: 3, username: 'Karel Dobrovský', email: 'karel.test@centrum.cz', password: 35 }
      ]
    }
  },
  actions: {
    addUser(user: { id: number; username: string; email: string; password: number }) {
      this.users.push(user)
    },
    deleteUser(id: number) {
      const index = this.users.findIndex(user => user.id === id)
      this.users.splice(index, 1)
    },
    editUser(id: number) {
      const index = this.users.findIndex(user => user.id === id)
      this.users.splice(index, 1)
    }
  },
  getters: {
    getUserById: state => (id: number) => {
      return state.users.find(user => user.id === id)
    }
  }
})
