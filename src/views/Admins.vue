<template>
    <div>



        <b-container fluid="xl">
            <b-row style="margin: 36px 0 36px">
                <b-col cols="10"><h1 style="text-align: left">Клиенты</h1></b-col>
            </b-row>


            <div style="overflow: hidden; border-radius: 6px; box-shadow: 0 0 40px rgba(0, 0, 0, 0.18);">
                <b-table-simple hover small caption-top responsive class="text-left">
                    <b-thead head-variant="light">
                        <b-tr>
                            <b-th>#</b-th>
                            <b-th>Клиент</b-th>
                            <b-th>Телефон</b-th>
                            <b-th>Дата регистрации</b-th>
                            <b-th>Код</b-th>
                            <b-th></b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr v-for="(user, index) in users" :key="user.id">
                            <b-th>{{ index+1 }}</b-th>
                            <b-th>{{ user.name }} {{user.surname}}</b-th>
                            <b-th>{{ user.phone }}</b-th>
                            <b-th>{{ user.date | moment("D MMMM, YYYY") }}</b-th>
                            <b-th>{{ user.qr }}</b-th>
                            <b-th style="text-align: right"><b-button variant="outline-danger" v-on:click="deleteItem(user.id)"><b-icon icon="trash"></b-icon></b-button></b-th>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </div>
        </b-container>
    </div>
</template>

<script>
  import { db } from '../firebase';

  export default {
    name: 'Users',
    data() {
      return {
        users: [],
        collection: 'brews'

      }
    },
    methods: {
      deleteItem(id){
        if (confirm('Удалить навсегда?')) {
          db.collection(this.collection)
            .doc(id)
            .delete()
            .then(() => {
              console.log('user deleted!')
            }).catch((e) => {
            console.log(e)
          })
        }
      }
    },
    firestore: {
      users: db.collection('brews')
        .orderBy('qr'),
      // categories: db.collection('price-categories').orderBy('order'),
    },
  };
</script>

<style scoped>
    .content-edit > * {
        margin-bottom: 24px !important;
    }

    .image-preview-wrap {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .image-preview {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
</style>
