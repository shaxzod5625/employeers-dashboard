<template>
  <div class="users flex flex-col items-center">
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
        <tr
          v-for="user in usersData"
          :key="user.id"
          class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
        >
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            {{ user.id }}
          </td>
          <router-link
            :to="`/users/${user.id}`"
            tag="td"
            class="cursor-pointer p-2 md:border md:border-grey-500 text-left block md:table-cell"
          >
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
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
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
    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mt-5" aria-label="Pagination">
      <a @click.prevent="getPrevPage" href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
        Previous
      </a>
      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
      <li
        v-for="item in totalPages"
        :key="item"
        class="list-none"
        @click.prevent="getDataPagination(item)"
      >
        <a :class="item === activePage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : ''" href="#" aria-current="page" class="relative inline-flex items-center px-4 py-2 border text-sm font-medium">
          {{ item }}
        </a>
      </li>
      <a @click.prevent="getNexPage" href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
        Next
      </a>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Users",
  data: () => ({
    users: [],
    perPage: 10,
    usersData: [],
    activePage: 1,
    filterPosition: '',
    filterGender: ''
  }),
  async mounted() {
    document.title = "Users";
    await this.$store.dispatch("getEmployees");
    this.users = this.$store.state.employees;
    this.getDataPagination(1);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
  },
  methods: {
    async deleteUser(id) {
      try {
        this.users.splice(id, 1);
        await this.$store.dispatch("deleteEmployeer", id);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    getDataPagination(num) {
      this.activePage = num;
      this.usersData = [];
      let ini = num * this.perPage - this.perPage;
      let fin = num * this.perPage;
      this.usersData = this.users.slice(ini, fin);
    },
    getPrevPage() {
      if (this.activePage > 1) {
        this.activePage--;
      }
      this.getDataPagination(this.activePage);
    },
    getNexPage() {
      if (this.activePage < this.totalPages) {
        this.activePage++;
      }
      this.getDataPagination(this.activePage);
    }
  },
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

/* Pagination */
/* .pagination {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto 30px;
  padding: 0 15px;
  max-width: 1280px;
  background: blue;
}

.pagination__left,
.pagination__right {
  width: 20%;
}

.pagination__left {
  float: left;
}

.pagination__right {
  float: right;
}

.pagination__right a {
  float: right;
}

.pagination a,
.pagination span {
  display: block;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 300;
  line-height: 42px;
  height: 44px;
  color: #fff;
  font-size: 18px;
}

.pagination a {
  padding: 0 20px;
  max-width: 160px;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-decoration: none;
  margin: 0 6px;
  transition: all 0.2s ease-in-out;
}

.pagination a.current {
  border-color: #00f320;
  color: #00f320;
}

.pagination__mid {
  display: flex;
  justify-content: center;
  width: 60%;
}

.pagination__mid ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination__mid li {
  display: inline-block;
} */
</style>
