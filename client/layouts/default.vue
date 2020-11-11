<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="true"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/snackbar'

export default {
  components: {
    Snackbar
  }
}
</script>
