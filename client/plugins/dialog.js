import Vue from 'vue'
import VuetifyConfirm from 'vuetify-confirm/dist/vuetify-confirm.min'

export default ({ app }) => {
  Vue.use(VuetifyConfirm, {
    vuetify: app.vuetify,
    buttonTrueText: 'Да',
    buttonFalseText: 'Нет'
  })
}
