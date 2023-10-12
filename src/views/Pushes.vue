<template>
    <div>
        <b-modal id="modal-add-admin" size="xl" title="Новый администратор" hide-footer>
            <b-overlay :show="sending" rounded="sm">
                <b-form @submit="addAdmin">
                    <b-form-input
                            id="input-1"
                            v-model="form.name"
                            type="text"
                            required
                            placeholder="Имя"
                    ></b-form-input>
                    <b-form-input
                            id="input-2"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Email"
                    ></b-form-input>
                    <b-form-input
                            id="input-3"
                            v-model="form.password"
                            type="password"
                            required
                            placeholder="Пароль"
                    ></b-form-input>
                    <b-button type="submit" variant="primary">Добавить</b-button>
                </b-form>
            </b-overlay>
        </b-modal>


        <b-container fluid="xl">
            <b-row style="margin: 36px 0 36px">
                <b-col cols="10"><h1 style="text-align: left">Администраторы</h1></b-col>
                <b-col cols="2"><b-button variant="primary" v-on:click="openAddAdmin" block>Добавить</b-button></b-col>
            </b-row>


            <div style="overflow: hidden; border-radius: 6px; box-shadow: 0 0 40px rgba(0, 0, 0, 0.18);">
                <b-table-simple hover small caption-top responsive class="text-left">
                    <b-thead head-variant="light">
                        <b-tr>
                            <b-th>#</b-th>
                            <b-th>Имя</b-th>
                            <b-th>Email</b-th>
                            <b-th></b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr v-for="(user, index) in admins" :key="admins.id">
                            <b-th>{{ index+1 }}</b-th>
                            <b-th>{{ user.name }} {{user.surname}}</b-th>
                            <b-th>{{ user.email }}</b-th>
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
        admins: [],
        collection: 'admins',
        sending: false,
        form: {email: '', password: '', name: ''},

      }
    },
    methods: {
      openAddAdmin() {
        this.$bvModal.show('modal-add-admin');
      },
      async addAdmin(evt) {
        evt.preventDefault()
        const formData = this.form;
        try{
          await this.$store.dispatch('register', formData).then((e) => {
            this.$bvModal.hide('modal-add-admin');
          })
        } catch (e) {
        }
      }
    },
    firestore: {
      admins: db.collection('admin')
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
