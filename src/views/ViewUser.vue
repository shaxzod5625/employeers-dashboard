<template>
  <div class="flex-grow w-full flex items-center justify-center">
    <div
      class="xl:w-1/4 sm:w-1/2 w-full 2xl:w-1/5 flex flex-col items-center py-16 md:py-12 bg-gradient-to-r from-indigo-700 to-purple-500 rounded-lg"
    >
      <div class="w-full flex items-center justify-center">
        <div class="flex flex-col items-center">
          <p
            tabindex="0"
            class="focus:outline-none mt-2 text-xs sm:text-sm md:text-base font-semibold text-center text-white"
          >
            {{ user.fullname }}
          </p>
        </div>
      </div>
      <div class="flex items-center mt-7">
        <div class="">
          <p tabindex="0" class="focus:outline-none text-xs text-gray-300">
            Position
          </p>
          <p
            tabindex="0"
            class="focus:outline-none mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50"
          >
            {{ user.position }}
          </p>
        </div>
        <div class="ml-12">
          <p tabindex="0" class="focus:outline-none text-xs text-gray-300">
            Gender
          </p>
          <p
            tabindex="0"
            class="focus:outline-none mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50"
          >
            {{ user.gender }}
          </p>
        </div>
        <div class="ml-12">
          <p tabindex="0" class="focus:outline-none text-xs text-gray-300">
            Birthdate
          </p>
          <p
            tabindex="0"
            class="focus:outline-none mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50"
          >
            {{ user.birthdate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ViewUser",
  data: () => ({
    user: {},
  }),
  async mounted() {
    await this.$store.dispatch("oneEmployeer", this.$route.params.id);
    this.user = this.$store.state.oneEmployeer;
  },
};
</script>
<style></style>
