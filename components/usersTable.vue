<script setup lang="ts">
import { storeToRefs } from "pinia";
import { manageUsers } from "@/stores/store"; // Make sure to import the store

const usersStore = manageUsers(); // Renamed to usersStore
const { users } = storeToRefs(usersStore); // Now clear that it's different from users
</script>
<template>
  <pre>{{ users }}</pre>
</template>
