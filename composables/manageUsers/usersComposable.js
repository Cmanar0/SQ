import { storeToRefs } from 'pinia'
import { manageUsers } from '@/stores/store'

export function usersComposable() {
  const usersStore = manageUsers()
  const addUserToStoreCOMP = user => {
    console.log('user :>> ', user)
    usersStore.addUser(user)
  }

  const editUserInStoreCOMP = (id, user) => {
    usersStore.editUser(id, user)
  }

  const deleteUserFromStoreCOMP = id => {
    usersStore.deleteUser(id)
  }

  return {
    users: usersStore.users,
    addUserToStoreCOMP,
    editUserInStoreCOMP,
    deleteUserFromStoreCOMP
  }
}
