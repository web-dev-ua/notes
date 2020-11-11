<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ editing ? 'Редактировать заметку' : 'Добавить заметку' }}</span>
    </v-card-title>

    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="value.title"
          label="Название"
          type="text"
          :rules="validationRules.title"
          :success="!!value.title"
          :disabled="loading"
          counter="100"
        />

        <v-textarea
          v-model="value.text"
          label="Текст"
          type="text"
          :rules="validationRules.text"
          :success="!!value.text"
          :disabled="loading"
          counter="10000"
          rows="4"
          row-height="30"
        />

        <v-file-input
          v-model="value.image"
          label="Изображение"
          :disabled="loading"
        />

        <div v-if="preview">
          <img :src="preview" alt="Изображение" class="image-preview">
        </div>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn text color="grey" @click="close">
        Отмена
      </v-btn>
      <v-btn text :disabled="loading" @click="save">
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, maxLength, minLength } from '@/services/validation'

export default {
  props: {
    value: {
      type: [Object],
      required: true
    }
  },
  data () {
    return {
      loading: false,
      validationRules: {
        title: [
          required(),
          minLength(2),
          maxLength(100)
        ],
        text: [
          required(),
          minLength(2),
          maxLength(10000)
        ]
      }
    }
  },
  computed: {
    editing () {
      return !!this.value.id
    },
    preview () {
      if (typeof this.value.image === 'object') {
        return URL.createObjectURL(this.value.image)
      }

      return this.value.image_url
    }
  },
  watch: {
    'value.id': {
      handler () {
        this.$refs.form.resetValidation()
      }
    }
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        this.loading = true

        this.$store
          .dispatch(this.editing ? 'notes/update' : 'notes/create', this.value)
          .then(() => {
            this.$store.dispatch('snackbar/showSuccess', `Заметка успешно ${this.editing ? 'обновлена' : 'добавлена'}!`)
            this.$emit('saved')
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    close () {
      this.$refs.form.resetValidation()
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.image-preview {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}
</style>
