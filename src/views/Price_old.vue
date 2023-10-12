<template>
    <div>
        <b-container fluid="xl">
            <b-row style="margin: 36px 0 36px">
                <b-col cols="8"><h1 style="text-align: left">Цены</h1></b-col>
                <b-col cols="2"><Categories></Categories></b-col>
<!--                <b-col cols="2"><b-button variant="primary" v-on:click="openNewModal" block>Добавить</b-button></b-col>-->
            </b-row>



            <b-modal id="modal-category-items" size="xl" :title="categories[index_category].category" hide-footer>
                <b-col cols="2"><b-button variant="primary" v-on:click="addNewCategoryItems" block>Добавить</b-button></b-col>

                <b-overlay :show="sending" rounded="sm">
<!--                    <b-table-simple hover small caption-top responsive class="text-left">-->
<!--                        <b-tbody>-->
<!--                            <b-tr v-for="(cat, index) in categories" :key="items.id" v-on:click="openCategoryItems(index)">-->
<!--                                <b-th>{{ index+1 }}</b-th>-->
<!--                                <b-th>{{ cat.category }}</b-th>-->
<!--                                <b-td>-->
<!--                                    <b-badge v-if="(new Date(cat.date) > new Date(Date.now())) && cat.status === 'published'" pill variant="success">Будет опубликованно</b-badge>-->
<!--                                    <b-badge v-else-if="cat.status === 'published'" pill variant="success">Опубликовано</b-badge>-->
<!--                                    <b-badge v-else pill variant="secondary">Черновик</b-badge>-->
<!--                                </b-td>-->
<!--                            </b-tr>-->
<!--                        </b-tbody>-->
<!--                    </b-table-simple>-->
                </b-overlay>
            </b-modal>


            <b-modal id="modal-category-item" size="xl" :title="categories[index_category].category" hide-footer>
                <b-overlay :show="sending" rounded="sm">
                    <b-container class="bv-example-row">
                        <b-row>
                            <b-col class="content-edit" cols="10">
                                <b-form-input v-model="edit.sub" placeholder="Подкатегория"></b-form-input>
                                <hr>

                                <div>
                                    <b-row>
                                        <b-col cols="0"><b-badge pill variant="secondary">0</b-badge></b-col>
                                        <b-col><b-form-input v-model="edit.sub" placeholder="Название"></b-form-input></b-col>
                                    </b-row>
                                    <b-form-input v-model="edit.sub" placeholder="Описание"></b-form-input>
                                    <b-row>
                                        <b-col><b-form-input v-model="edit.sub" placeholder="Длительность"></b-form-input></b-col>
                                        <b-col><b-form-input v-model="edit.sub" placeholder="Цена"></b-form-input></b-col>
                                    </b-row>
                                    <hr>
                                </div>
                                <b-button variant="primary" v-on:click="" block>Добавить</b-button>
                            </b-col>
                            <b-col class="content-edit">
                                <status :curStatus="edit.status" @changeStatus="setStatus"></status>
                                <b-button variant="primary" v-on:click="updateData" block>Сохранить</b-button>
                                <b-button variant="outline-danger" v-on:click="deleteItem" v-if="! addNew" block><b-icon icon="trash"></b-icon></b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-overlay>
            </b-modal>




            <div style="overflow: hidden; border-radius: 6px; box-shadow: 0 0 40px rgba(0, 0, 0, 0.18);">
                <b-table-simple hover small caption-top responsive class="text-left">
                    <b-thead head-variant="light">
                        <b-tr>
                            <b-th>#</b-th>
                            <b-th >Заголовок</b-th>
                            <b-th>Статус</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr v-for="(cat, index) in categories" :key="items.id" v-on:click="openCategory(index)">
                            <b-th>{{ index+1 }}</b-th>
                            <b-th>{{ cat.category }}</b-th>
                            <b-td>
                                <b-badge v-if="(new Date(cat.date) > new Date(Date.now())) && cat.status === 'published'" pill variant="success">Будет опубликованно</b-badge>
                                <b-badge v-else-if="cat.status === 'published'" pill variant="success">Опубликовано</b-badge>
                                <b-badge v-else pill variant="secondary">Черновик</b-badge>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </div>
        </b-container>
    </div>
</template>

<script>
    import {db} from '../firebase'
    import Status from '../components/Status'
    import { VueEditor } from "vue2-editor";
    import UploadImage from '../components/UploadImages';
    import Categories from '../components/Categories';


    export default {
        name: "Price",
        data() {
            return {
                items: [],
                edit: [],
                price: [],
                categories: [],
                uploadingImage: null,
                sending: false,
                addNew: false,
                index_category: 0,
                pr: {
                  'ifdf3fef3' : {
                    name: 'Иньекционная косметология',
                    order: 0,
                    products: [
                      {
                        sub_category: 'Контурная пластика',
                        items: [
                          {
                            name: 'Бикини не глубокие',

                          }
                        ]
                      }
                    ]
                  },
                }
            }
        },
        components: {
          UploadImage,
            status: Status,
          VueEditor,
          Categories
        },
        methods: {



          addNewCategoryItems(index) {
          this.addNew = true;
          this.$bvModal.show('modal-category-item');
          this.index_category = index;
          // this.price.category = this.categories[index].category
          //   console.log(this.categories[index].category)
        },
          openCategory(index) {
            this.addNew = true;
            this.$bvModal.show('modal-category-items');
          },


          setStatus(e) {
              this.edit['status'] = e;
          },

        },
        mounted() {
        },
        firestore: {
            items: db.collection('price'),
            categories: db.collection('price-categories').orderBy('order'),
        },
    }
</script>

<style scoped>
    .content-edit > * {
        margin-bottom: 24px!important;
    }
    .image-preview-wrap {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    .image-preview{
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
</style>
