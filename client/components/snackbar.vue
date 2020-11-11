<template>
  <v-snackbar
    :value="snackbar.show"
    :top="true"
    :timeout="snackbar.timeout"
    @input="change"
  >
    {{ snackbar.text }}
    <v-btn
      :color="snackbar.buttonColor"
      text
      @click="closeSnackbar"
    >
      Закрыть
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    snackbar: 'snackbar/snackbar'
  }),
  methods: {
    closeSnackbar () {
      this.$store.dispatch('snackbar/close')
    },
    change (val) {
      if (val === false) { this.closeSnackbar() }
    }
  }
}
</script>
