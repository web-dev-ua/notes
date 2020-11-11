<template>
  <div>
    <h1 class="mt-3 mb-5 text-center">Заметки</h1>

    <v-row>
      <v-col :md="4" v-for="n in 4" :key="n">
        <v-card>
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>Cafe Badilico</v-card-title>

          <v-card-text>
            Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="info"
              text
            >
              Редактировать
            </v-btn>

            <v-spacer />

            <v-btn
              color="error"
              text
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-pagination
        :value="1"
        :length="15"
        :total-visible="7"
       />
    </div>
  </div>
</template>
