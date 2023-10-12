<template>
    <div>

        <b-modal id="modal-xl" size="xl" title="Адреса" hide-footer>
            <b-overlay :show="sending" rounded="sm">
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col class="content-edit" cols="10">
                            <b-form-input v-model="edit.title" placeholder="Заголовок"></b-form-input>
                            <vue-editor v-model="edit.content" :editorToolbar="customToolbar"></vue-editor>
                            <div class="image-preview-wrap" style="width: 200px; height: 200px">
                                <img class="image-preview" :src="edit.image"  >
                            </div>
                            <UploadImage @uploadedImageUrl="applyUploadedImage"></UploadImage>
                        </b-col>
                        <b-col class="content-edit">
                            <status :curStatus="edit.status" @changeStatus="setStatus"></status>
                            <b-form-datepicker id="datepicker-sm" size="sm" v-model="edit.date" class="mb-2"></b-form-datepicker>
                            <b-button variant="primary" v-on:click="updateData" block>Сохранить</b-button>
                            <b-button variant="outline-danger" v-on:click="deleteItem" v-if="! addNew" block><b-icon icon="trash"></b-icon></b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-overlay>
        </b-modal>



        <b-table-simple hover fixed small caption-top responsive class="text-left">
            <b-thead head-variant="light">
                <b-tr>
                    <b-th>#</b-th>
                    <b-th >Заголовок</b-th>
                    <b-th>Картинка</b-th>
                    <b-th>Дата</b-th>
                    <b-th>Статус</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(item, index) in items" :key="items.id" v-on:click="openModal(item)">
                    <b-th>{{ index+1 }}</b-th>
                    <b-th>{{ item.title }}</b-th>
                    <b-td>
                        <div class="image-preview-wrap" style="width: 100px; height: 100px">
                            <img class="image-preview" :src="item.image"  >
                        </div>
                    </b-td>
                    <b-td>
                        {{ item.date | moment("D MMMM, YYYY") }}
                    </b-td>
                    <b-td>
                        <b-badge v-if="item.status === 'published'" pill variant="success">Опубликовано</b-badge>
                        <b-badge v-else pill variant="secondary">Черновик</b-badge>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <b-button variant="primary" v-on:click="openNewModal" block>Добавить</b-button>

    </div>
</template>

<script>
    import {db} from '../firebase'
    import Status from '../components/Status'
    import { VueEditor } from "vue2-editor";
    import UploadImage from '../components/UploadImages';


    export default {
        name: "Stock",
        data() {
            return {
                items: [],
                edit: [],
                uploadingImage: null,
                sending: false,
                addNew: false,
                customToolbar: [[{ header: "1" }, { header: "2" }] ,["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link"]],
                dismissSecs: 5,
                dismissCountDown: 0
            }
        },
        components: {
          UploadImage,
            status: Status,
          VueEditor
        },
        methods: {
            openModal(item) {
              this.addNew = false;
              this.edit = Object.assign({}, item);
              this.edit.id = item['id'];
              this.$bvModal.show('modal-xl');
            },
          openNewModal() {
            this.addNew = true;
            this.edit = {date: new Date().toISOString(), status: 'draft'};
            this.$bvModal.show('modal-xl');
          },
          setStatus(e) {
              this.edit['status'] = e;
          },
          updateData() {
            if(this.addNew) {
              this.sending = true;
              db.collection('stock').add(this.edit)
                .then(() => {
                  this.sending = false;
                  this.$forceUpdate();
                  console.log('stock added!')
                }).catch((e) => {
                this.sending = false;
                console.log(e)
              })
              } else {
              this.sending = true;
              let updateData = Object.assign({}, this.edit);
                delete updateData.id;

                db.collection('stock')
                  .doc(this.edit.id)
                  .set(updateData)
                  .then(() => {
                    this.sending = false;
                    this.$forceUpdate();
                    console.log('stock updated!')
                  }).catch((e) => {
                  this.sending = false;
                  console.log(e)
                })
              }
          },
          deleteItem() {
            if (confirm('Удалить навсегда?')) {
              this.sending = true;
              db.collection('stock')
                .doc(this.edit.id)
                .delete()
                .then(() => {
                  this.sending = false;
                  this.$bvModal.hide('modal-xl');
                  console.log('stock deleted!')
                }).catch((e) => {
                this.sending = false;
                console.log(e)
              })
            }
          },
          applyUploadedImage(urlImage) {
              console.log(urlImage);
              this.edit.image = urlImage;
                console.log(this.edit.image);

          },
        },
      computed: {
      },

        mounted() {
        },
        firestore: {
            items: db.collection('stock').orderBy('date'),
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
