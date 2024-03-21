import { defineStore } from 'pinia'

export const manageUsers = defineStore({
  id: 'users',
  state: () => {
    return {
      users: [
        { id: 1, name: 'Marek Sommer', email: 'marek.test@gmail.com', age: 25 },
        { id: 2, name: 'Petra Nováková', email: 'petra.test@email.cz', age: 30 },
        { id: 3, name: 'Karel Dobrovský', email: 'karel.test@centrum.cz', age: 35 }
      ]
    }
  },
  actions: {
    addUser(id: number, name: string, email: string, age: number) {
      this.users.push({ id, name, email, age })
    }
  },
  getters: {
    getUserById: state => (id: number) => {
      return state.users.find(user => user.id === id)
    }
  }
})
