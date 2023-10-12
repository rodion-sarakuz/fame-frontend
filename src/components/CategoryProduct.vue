<template>
    <div>
        <CategorySorting :current_category="current_category"></CategorySorting>

        <b-modal id="modal-category" size="xl" :title="current_category.name" hide-footer>
            <b-container class="bv-example-row">
                <b-row>
                    <b-col>
                        <b-table-simple hover small caption-top responsive class="text-left">
                            <b-tbody>
                                <b-tr v-for="(product, index) in current_category.products" :key="index">
                                    <b-th>{{ index+1 }}</b-th>
                                    <b-th>{{ product.sub_category }}</b-th>
                                    <b-th><ul><li v-for="(item, index) in product.items" :key="index" style="font-weight: normal">{{item.name}}</li></ul></b-th>
                                    <b-th>
                                        <b-badge v-if="product.status === 'published'" pill variant="success">Опубликовано</b-badge>
                                        <b-badge v-else pill variant="secondary">Черновик</b-badge>
                                    </b-th>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>
                        <b-row style="margin-top: 36px">
                            <b-col cols="2"><b-button v-on:click="$bvModal.show('modal-category-product')" block>Добавить</b-button></b-col>
                            <b-col cols="2"><b-button v-on:click="$bvModal.show('modal-category-sorting')" block>Сортировать</b-button></b-col>
                            <b-col cols="8"></b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="2">
                        <Status @changeStatus="changeStatus" :cur-status="current_category.status"></Status>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
  import { db } from '../firebase';
  import CategorySorting from '../components/CategorySorting';
  import Status from '../components/Status';


  export default {
    name: 'Category',
    data() {
      return {
      };
    },
    components: {
      CategorySorting,
      Status
    },
    props: {
      current_category: null,
    },
    methods: {
      changeStatus(status) {
        // console.log(status)
        db.collection('price')
          .doc(this.current_category.id)
          .update({status: status})
          .then(() => {
            console.log('Status Changes');
          })
          .catch((e) => {
            console.log(e);
          });
      }

    },
  }
</script>

<style scoped>

</style>
