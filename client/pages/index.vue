<template>
  <div>
    <h1 class="mt-3 mb-5 text-center">
      Заметки
    </h1>

    <div class="text-md-right text-center mb-5">
      <v-btn color="info" @click="dialog = true">
        Добавить заметку
      </v-btn>
    </div>

    <v-row>
      <v-col v-for="note in notes" :key="note.id" :md="4">
        <v-card :loading="loading">
          <v-img
            height="250"
            :src="note.image_url || '/no-image.jpg'"
          />

          <v-card-title>{{ note.title }}</v-card-title>

          <v-card-text>{{ note.text }}</v-card-text>

          <v-card-actions>
            <v-btn
              color="info"
              text
              @click="editNote(note)"
            >
              Редактировать
            </v-btn>

            <v-spacer />

            <v-btn
              color="error"
              text
              @click="removeNote(note)"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-pagination
        :disabled="loading"
        :value="pagination.current_page"
        :length="pagination.total_pages"
        :total-visible="7"
        @input="changePage"
      />
    </div>

    <v-dialog v-model="dialog" max-width="800px" @click:outside="closeDialog">
      <note-form v-model="editedNote" @close="closeDialog" @saved="onSaved" />
    </v-dialog>
  </div>
</template>

<script>
import NoteForm from '@/components/NoteForm'

export default {
  components: {
    NoteForm
  },
  async asyncData ({ store, query }) {
    const { data } = await store.dispatch('notes/index', query)
    return {
      notes: data.data,
      pagination: data.pagination
    }
  },
  data () {
    return {
      loading: false,
      dialog: false,
      editedNote: {}
    }
  },
  methods: {
    changePage (page) {
      this.loading = true
      this.$store.dispatch('notes/index', { page }).then(({ data }) => {
        this.notes = data.data
        this.pagination = data.pagination

        const query = (page > 1) ? { page } : {}
        this.$router.push({ path: this.$route.path, query })
      }).finally(() => {
        this.loading = false
      })
    },
    editNote (note) {
      this.editedNote = note
      this.dialog = true
    },
    removeNote (note) {
      this.$confirm(`Вы действительно хотите удалить заметку ${note.title}?`).then((res) => {
        if (res === true) {
          this.loading = true
          this.$store.dispatch('notes/remove', note.id).then(() => {
            this.changePage(this.pagination.current_page)
            this.$store.dispatch('snackbar/showSuccess', `Заметка ${note.title} успешно удалена!`)
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    closeDialog () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedNote = {}
      })
    },
    onSaved () {
      this.changePage(this.pagination.current_page)
      this.closeDialog()
    }
  }
}
</script>
