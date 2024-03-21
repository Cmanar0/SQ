<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { manageUsers } from '@/stores/store' // Make sure to import the store

const usersStore = manageUsers() // Renamed to usersStore
const { users } = storeToRefs(usersStore) // Now clear that it's different from users

function addUser() {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie']
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'White']
  const id = Math.floor(Math.random() * 1000)
  const age = Math.floor(Math.random() * 100)
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`
  usersStore.addUser({ id: id, name: name, age: age })
}

const usedById = usersStore.getUserById(2)
</script>
<template>
  <button @click="addUser">Add User</button>
  <pre>{{ usedById }}</pre>
</template>
