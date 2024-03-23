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
    addUser(id: number, username: string, email: string, password: any) {
      this.users.push({ id, username, email, password })
    },
    deleteUser(id: number) {
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
