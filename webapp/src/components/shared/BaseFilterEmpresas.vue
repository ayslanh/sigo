<template>
  <!-- filtro de empresas -->
  <v-col v-if="filters.empresa" cols="12" sm="6" md="3" lg="3">
    <BaseComboBox
      label="Empresa"
      :items="items.empresa"
      item-text="apelido"
      item-value="id_empresa"
      :multiple="filters.empresa.multiple"
      v-model="selected.empresa"
      @check="check('empresa')"
      @clear="clear('empresa')"
      :selected="selected.empresa"
      :iconCheckAll="filters.empresa.multiple"
    >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0" small>
          <BaseSegmento :segmento="item.id_band" />
          {{ item.apelido }}
        </v-chip>
        <span v-if="index === 1" class="grey--text caption">
          (+{{ selected.empresa.length - 1 }}) <br />
        </span>
      </template>

      <template v-slot:item="{ item }">
        <BaseSegmento :segmento="item.id_band" />

        {{ item.nome }}
      </template>
    </BaseComboBox>
  </v-col>
</template>
<script>
import BaseSegmento from "@/components/shared/BaseSegmento";

import BaseComboBox from "./BaseComboBox";
import filterService from "../../services/filter";

export default {
  name: "base-filter",
  components: {
    BaseSegmento,
    BaseComboBox
  },
  props: {
    click: Function,
    filters: Object,
    funcoe: Boolean,
    action: Boolean
  },
  data() {
    return {
      items: {
        empresa: []
      },
      selected: {
        empresa: []
      }
    };
  },

  methods: {
    async getFilter() {
      try {
        for await (let filter of Object.keys(this.filters)) {
          let response = await filterService[filter](
            this.filters[filter]?.filter
          );
          Object.assign(this.items, { [filter]: response.data.data });
        }
      } catch (error) {
        //console.log("error filter", error);
      }
    },

    check(filter) {
      this.selected[filter] = this.items[filter];
    },
    clear(filter) {
      this.selected[filter] = [];
    }
  },

  mounted() {
    this.getFilter();
  }
};
</script>

<style></style>
