<template>
  <div class="dashboard flex flex-wrap justify-center items-center flex-grow gap-10">
    <div class="bg-indigo-300 card flex justify-center items-center">
      All employees: {{ employers }}
    </div>
    <div class="bg-indigo-300 card flex justify-center items-center">
      Male: {{ male }}
      <br>
      Female: {{ female }}
    </div>
    <div class="bg-indigo-300 card flex justify-center items-center">
      Accounting: {{ accounting }}
      <br>
      IT: {{ it }}
      <br>
      Marketing: {{ marketing }}
    </div>
    <div class="bg-indigo-300 card flex justify-center items-center">
      Average age: {{ age }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => ({
    users: null,
    employers: 0,
    male: 0,
    female: 0,
    accounting: 0,
    it: 0,
    marketing: 0,
    age: 0
  }),
  async mounted() {
    document.title = 'Dashboard'
    await this.$store.dispatch('getEmployees')
    this.users = this.$store.state.employees
    this.readInformation()
    this.averageAge()
  },
  methods: {
    readInformation() {
      this.employers = this.users.length
      for (let i = 0; i < this.users.length; i++) {
        // gender
        if (this.users[i].gender == 'Male') {
          this.male++
        } else if (this.users[i].gender == 'Female') {
          this.female++
        }
        // position
        if (this.users[i].position == 'accounting') {
          this.accounting++
        } else if (this.users[i].position == 'IT') {
          this.it++
        } else if (this.users[i].position == 'marketing') {
          this.marketing++
        }
      }
    },
    averageAge() {
      let ages = 0
      for (let i = 0; i < this.users.length; i++) {
        let current = new Date().getTime()
        let userDate = new Date(this.users[i].birthdate).getTime()
        let a = current - userDate
        a = a / 365 / 24 / 60 / 60 / 1000
        var currentAge = Math.floor(a);
        ages += currentAge
      }
      this.age = Math.floor(ages / this.users.length)
    }
  }
}
</script>
<style>
.card {
  width: 35%;
  height: 200px;
}
</style>