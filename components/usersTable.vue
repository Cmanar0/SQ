<script setup lang="ts">
import userPlus from '../assets/svg/user-plus.vue'
import userMinus from '../assets/svg/user-minus.vue'
import edit from '../assets/svg/edit.vue'
import close from '../assets/svg/close.vue'
import { manageUsers } from '../stores/store.js'
import { computed, ref, reactive } from 'vue'
import { usersComposable } from '../composables/manageUsers/usersComposable'
const { users, addUserToStoreCOMP, editUserInStoreCOMP, deleteUserFromStoreCOMP } = usersComposable()
console.log('users :>> ', users)
// ---------------------- REACTIVE START ------------------------
const userInfo = reactive({
  id: 0,
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})
const isModalOpen = ref(false)
// ---------------------- REACTIVE END --------------------------
// -------------------- COMPUTED START-----------------------
const isValidEmail = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(userInfo.email)
})
const isPasswordMatch = computed(() => {
  return userInfo.password === userInfo.passwordConfirmation
})
const isPassworGoodEnough = computed(() => {
  // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const passwordPattern = /^.{6,}$/
  return passwordPattern.test(userInfo.password)
})
// -------------------- COMPUTED END-------------------------
// -------------------- FUNCTIONS START ---------------------

function addUser() {
  // userInfo.id = usersStore.users.length + 1
  addUserToStoreCOMP({ id: userInfo.id, username: userInfo.username, email: userInfo.email, password: userInfo.password })
  resetUserInfo()
  isModalOpen.value = false
}
function resetUserInfo() {
  userInfo.username = ''
  userInfo.email = ''
  userInfo.password = ''
  userInfo.passwordConfirmation = ''
}
function editUser(id: number) {
  editUserInStoreCOMP(id)
  // const user = usersStore.getUserById(id)
  // console.log('user :>> ', user)
}

function deleteUser(id: number) {
  deleteUserFromStoreCOMP(id)
  // const user = usersStore.deleteUser(id)
  // console.log('user :>> ', user)
}
// -------------------- FUNCTIONS END ---------------------
</script>
<template>
  <div>
    <div class="main-header">
      <h1>List of users</h1>
      <button @click="isModalOpen = true" class="btn-content mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><user-plus class="icon" /> Add User</button>
    </div>

    <div class="overflow-auto">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="bg-white border-b hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.username }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-5 py-2 text-right text-sm font-medium">
              <div class="actions">
                <span class="btn-content" @click="editUser(user.id)">
                  <edit class="icon" />
                  Edit
                </span>
                <span class="btn-content" @click="deleteUser(user.id)">
                  <user-minus class="icon" />
                  Delete
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <pre class="mt-4">{{ usedById }}</pre> -->
    <!-- -------------- Modal START -------------- -->
    <div>
      <div v-if="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" @click.self="isModalOpen = false">
        <!-- Modal content, now centered -->
        <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md m-auto" @click.stop>
          <div class="modal-header flex justify-between items-start mb-4">
            <h2 class="text-xl font-semibold">Add New User</h2>
            <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600">
              <span class="sr-only">Close</span>
              <close class="icon-close" />
            </button>
          </div>
          <div class="modal-body flex flex-col gap-4">
            <input v-model="userInfo.username" type="text" placeholder="Name" class="p-2 border border-gray-200 rounded w-full" />
            <div>
              <label for="email" class="sr-only">Email</label>
              <input
                v-model="userInfo.email"
                type="email"
                name="email"
                placeholder="Email"
                class="p-2 border border-gray-200 rounded w-full"
                :class="{ 'border-red-500': userInfo.email && !isValidEmail }"
                required
              />
              <p v-if="userInfo.email && !isValidEmail" class="mt-1 text-sm text-red-500">Please enter a valid email address.</p>
            </div>
            <div>
              <label for="email" class="sr-only">Password</label>
              <input
                v-model="userInfo.password"
                type="password"
                name="password"
                placeholder="Password"
                class="p-2 border border-gray-200 rounded w-full"
                :class="{ 'border-red-500': userInfo.email && !isValidEmail }"
                required
              />
              <p v-if="userInfo.password && !isPassworGoodEnough" class="mt-1 text-sm text-red-500">
                Password must be at least 6 characters long.
                <!-- Must contain at least one uppercase letter, one
                lowercase letter, one number and one special character. -->
              </p>
            </div>
            <div>
              <label for="email" class="sr-only">Password</label>
              <input
                v-model="userInfo.passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                class="p-2 border border-gray-200 rounded w-full"
                :class="{ 'border-red-500': userInfo.passwordConfirmation && !isPasswordMatch }"
                required
              />
              <p v-if="userInfo.passwordConfirmation && !isPasswordMatch" class="mt-1 text-sm text-red-500">Password does not match.</p>
            </div>
          </div>

          <div class="modal-footer flex justify-end mt-4">
            <button @click="addUser" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
    <!-- -------------- Modal END -------------- -->
  </div>
</template>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
}
h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}
h2 {
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
}
.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
.actions span {
  display: flex;
  cursor: pointer;
  color: #777;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0.4rem;
  border-radius: 0.25rem;
}
.actions span:hover {
  background-color: #e6e6e6;
  color: #555;
}
.actions span:active {
  background-color: #d9d9d9;
  color: #444;
}
.overflow-auto {
  overflow-x: auto;
  scrollbar-width: auto;
}

.overflow-auto::-webkit-scrollbar {
  height: 8px;
  background: #f1f1f1;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #888;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.icon-close {
  width: 1.5rem;
  height: 1.5rem;
  color: #666;
}
.icon-close:hover {
  color: #333;
}
</style>
