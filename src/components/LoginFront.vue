<template>
  <div>

    <v-card max-width="344">
      <v-card-title>Vue Router</v-card-title>
      <v-card-text>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">PAGE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ id }}</td>
                <td>{{ page }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-card>
          <v-list>
            <v-subheader class="bg-info">同じコンポーネントへのリンク</v-subheader>
            <v-list-item-group>
              <v-list-item>
                <router-link :to="{ name: 'router2', params: { id: 12345 }, query: { page: 6 } }">
                  /router2/12345?page=6
                </router-link>
              </v-list-item>
              <v-list-item>
                <router-link :to="{ name: 'router2', params: { id: 123456 }, query: { page: 7 } }">
                  /router2/123456?page=7
                </router-link>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

      </v-card-text>

      <v-card-actions>
        <router-link to="/router1">
          <v-btn class="mb-2">router1に戻る</v-btn>
        </router-link>
      </v-card-actions>

    </v-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      page: '',
    }
  },
  created() {
    const id = this.$route.params.id
    if (id) {
      this.id = id
    }
    const page = this.$route.query.page
    if (page) {
      this.page = page
    }
  },
}
</script>