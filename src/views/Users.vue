<template>
  <div class="users">
    <table class="min-w-full border-collapse block md:table">
      <thead class="block md:table-header-group">
        <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            № ID
          </th>
          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Full Name
          </th>
          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Position
          </th>
          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Gender
          </th>
          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Birthdate
          </th>
          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="block md:table-row-group">
        <tr v-for="user in users" :key="user.id" class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            {{ user.id }}
          </td>
          <router-link :to="`/users/${user.id}`" tag="td" class="cursor-pointer p-2 md:border md:border-grey-500 text-left block md:table-cell">
            {{ user.fullname }}
          </router-link>
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            {{ user.position }}
          </td>
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            {{ user.gender }}
          </td>
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            {{ user.birthdate }}
          </td>
          <td
            class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
            <router-link
              :to="`/edit/${user.id}`"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
            >
              Edit
            </router-link>
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
              @click.prevent="deleteUser(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <jw-pagination :items="employees" @changePage="clickHandler" />
  </div>
</template>
<script>
export default {
  name: "Users",
  data: () => ({
    users: []
  }),
  async mounted() {
    document.title = "Users";
    await this.$store.dispatch('getEmployees')
  },
  methods: {
    clickHandler(users) {
      this.users = users
    },
    async deleteUser(id) {
      this.users.splice(id, 1)
      try {
        await this.$store.dispatch('deleteEmployeer', id)
      } catch (e) {
        console.log(e);
        throw e
      }
    }
  },
  computed: {
    employees() {
      return this.$store.state.employees
    }
  }
};
</script>
<style>
.pagination {
  display: flex !important;
  justify-content: center;
}
.page-item.page-number {
  background-color: rgba(99, 102, 241, 1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding: 0 !important;
}
</style>