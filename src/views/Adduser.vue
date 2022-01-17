<template>
  <div>
    <form action="" @submit.prevent="submit">
      <div class="px-4 py-6 flex justify-center items-center gap-x-6 max-w-4xl mx-auto">
        <div class="mb-8">
          <h2 class="text-center text-2xl font-bold text-blue-800">
            Add User
          </h2>
          <div class="mt-6">
            <div class="flex-col space-y-4">
              <input
                type="text"
                placeholder="Fullname"
                class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none"
                v-model.trim="fullname"
                :class="{error: ($v.fullname.$dirty && !$v.fullname.required)}"
              />
              <select
                type="text"
                class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none"
                v-model="position"
                :class="{error: ($v.position.$dirty && !$v.position.required)}"
              >
                <option value="" selected disabled>Choose position</option>
                <option v-for="pos in department" :key="pos">
                  {{ pos }}
                </option>
              </select>
              <input
                type="date"
                placeholder="Birthdate"
                class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none"
                v-model="datetime"
                :class="{error: ($v.datetime.$dirty && !$v.datetime.required)}"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="mb-1 text-gray-700 font-semibold text-sm">Gender</p>
            <div class="flex space-x-4 my-2 items-center">
              <div class="flex items-center space-x-1">
                <input type="radio" id="Male" v-model="gender" :value="'Male'" class="cursor-pointer" />
                <label for="Male" class="cursor-pointer">
                  Male
                </label>
                <input type="radio" id="Female" v-model="gender" :value="'Female'" class="cursor-pointer" />
                <label for="Female" class="cursor-pointer">
                  Female
                </label>
              </div>
            </div>
          </div>
          <button type="submit" class="w-full mt-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white py-2 rounded-md text-lg font-semibold">
            Add User
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: "Adduser",
  data: () => ({
    fullname: '',
    datetime: null,
    position: null,
    gender: undefined,
    department: ["accounting", "IT", "marketing"]
  }),
  mounted() {
    document.title = "Adduser";
  },
  validations: {
    fullname: { required },
    datetime: { required },
    position: { required },
    gender: { required }
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
        }
      let newDate = new Date(this.datetime)
      let year = newDate.getFullYear()
      let day = newDate.getDate().toString()
      let month = (1 + newDate.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
      let formattedDate = month + '/' + day + '/' + year
      const form = {
        fullname: this.fullname,
        birthdate: formattedDate,
        position: this.position,
        department: this.department,
        gender: this.gender
      }
      try {
        await this.$store.dispatch('addEmploteer', form)
        this.fullname = ''
        this.datetime = null
        this.position = null
        this.gender = undefined
      } catch (e) {
        console.log(e);
        throw e
      }
    }
  }
};
</script>
<style>
.error {
  border-color: red;
}
</style>