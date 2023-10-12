<template>
    <div>
        <b-modal id="modal-category" size="xl" :title="current_category.name" hide-footer>
            <b-container class="bv-example-row">
                <b-table-simple hover small caption-top responsive class="text-left">
                    <b-tbody>
                        <sortable v-for="(product, index) in current_category.products"
                                  :key="index"
                                  :index="index"
                                  v-model="dragData"
                                  drag-direction="vertical"
                                  replace-direction="vertical"
                                  @sortend="sortend($event, current_category.products)"
                        >
                            <b-tr>
                                <b-th>{{ index+1 }}</b-th>
                                <b-th>{{ product.sub_category }}</b-th>
                                <b-th><ul><li v-for="(item, index) in product.items" :key="index" style="font-weight: normal">{{item.name}}</li></ul></b-th>
                                <b-th>
                                    <b-badge v-if="product.status === 'published'" pill variant="success">Опубликовано</b-badge>
                                    <b-badge v-else pill variant="secondary">Черновик</b-badge>
                                </b-th>
                            </b-tr>
                        </sortable>
                    </b-tbody>
                </b-table-simple>

            </b-container>
        </b-modal>
    </div>
</template>

<script>
  import Sortable from 'vue-drag-sortable';
  import { db } from '../firebase';


  export default {
    name: 'Category',
    data() {
      return {
        sort: false,
        dragData: {},
      };
    },
    components: {
      Sortable
    },
    props: {
      current_category: null,
    },
    methods: {
      sortend(e, list) {
        const { oldIndex, newIndex } = e;
        this.rearrange(list, oldIndex, newIndex);
      },
      rearrange(array, oldIndex, newIndex) {
        if (oldIndex > newIndex) {
          array.splice(newIndex, 0, array[oldIndex]);
          array.splice(oldIndex + 1, 1);
        } else {
          array.splice(newIndex + 1, 0, array[oldIndex]);
          array.splice(oldIndex, 1);
        }

        db.collection('price')
          .doc(this.current_category.id)
          .update(this.current_category)
          .then(() => {
            console.log('sorted');
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
