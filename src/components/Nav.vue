<template>
  <nav>
    <div class="flex justify-between px-6 bg-indigo-500 items-center py-4">
      <div class="flex space-x-4 items-center">
        <h1 class="text-white font-bold text-xl tracking-wide cursor-pointer">Logo</h1>
      </div>
      <ul class="flex space-x-6">
        <router-link to="/" exact class="text text-lg font-semibold tracking-normal cursor-pointer">Dashboard</router-link>
        <router-link to="/users" class="text text-lg font-semibold tracking-normal cursor-pointer">Users</router-link>
        <router-link v-if="$route.path == '/users' || $route.path == '/adduser'" to="/adduser" class="text text-lg font-semibold tracking-normal cursor-pointer">Add user</router-link>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
                                                                                                                                                                                                                                                                                 
}
</script>
<style>
.router-link-active {
  color: white !important;;
}
.text {
  color: rgb(148 163 184);
}
</style>