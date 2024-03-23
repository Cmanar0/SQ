import { storeToRefs } from 'pinia'
import { manageUsers } from '@/stores/store'

export function usersComposable() {
  const usersStore = manageUsers()
  const { users } = storeToRefs(usersStore)

  const addUserToStoreCOMP = user => {
    usersStore.addUser(user)
  }

  const editUserInStoreCOMP = (id, user) => {
    usersStore.editUser(id, user)
  }

  const deleteUserFromStoreCOMP = id => {
    usersStore.deleteUser(id)
  }

  return { users, addUserToStoreCOMP, editUserInStoreCOMP, deleteUserFromStoreCOMP }
}
