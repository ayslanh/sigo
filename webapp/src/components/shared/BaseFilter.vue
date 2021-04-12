<template>
  <!-- filtro de empresas -->
  <v-card>
    <v-card-text>
      <v-row class="filter-status">
        <template v-for="(option, key) in options">
          <v-col
            v-if="option.type == 'text-fild'"
            :key="key"
            cols="12"
            :sm="option.col.sm"
            :md="option.col.md"
            :lg="option.col.lg"
          >
            <v-text-field
              :label="option.label"
              v-model="selected[option.service]"
            ></v-text-field>
          </v-col>
          <v-col
            v-else
            :key="key"
            cols="12"
            :sm="option.col.sm"
            :md="option.col.md"
            :lg="option.col.lg"
          >
            <v-autocomplete
              clearable
              @click:clear="$emit(`clear:${option.service}`)"
              @change="
                $emit(`change:${option.service}`, selected[option.service])
              "
              @click="
                $emit(`click:${option.service}`, selected[option.service])
              "
              :prepend-inner-icon="option.prependIcon"
              :label="option.label"
              :disabled="option.disabled"
              :items="items[option.service] || []"
              :item-text="option.itemText || 'text'"
              :item-value="option.itemValue || 'value'"
              :multiple="option.multiple || false"
              v-model="selected[option.service]"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <BaseSegmento v-if="item.id_band" :segmento="item.id_band" />
                  {{ item[option.itemText || "text"] }}
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">
                  (+{{ selected[option.service].length - 1 }}) <br />
                </span>
              </template>

              <template v-slot:item="{ item }">
                <BaseSegmento v-if="item.id_band" :segmento="item.id_band" />
                {{ item[option.itemList || option.itemText || "text"] }}
              </template>
            </v-autocomplete>
          </v-col>
        </template>
        <slot></slot>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import filterService from "../../services/filter";
import BaseSegmento from "@/components/shared/BaseSegmento";

export default {
  name: "base-filter",
  components: {
    BaseSegmento
  },
  props: {
    options: Array
  },

  data() {
    return {
      items: {},
      selected: {}
    };
  },

  computed: {
    itemsComputade() {
      return this.items;
    },

    selectedComputade() {
      return this.selected;
    }
  },

  methods: {
    async initSelected() {
      try {
        for await (let option of this.options) {
          if (option.multiple) {
            this.$set(this.selected, option.service, []);
          } else {
            this.$set(this.selected, option.service, option.value || null);
          }
          this.$set(this.items, option.service, []);
        }
      } catch (error) {
        //console.log("error", error);
      }
    },
    async getFilters() {
      for await (let option of this.options) {
        if (option.service && !option.type && !option.chaining) {
          if (option.items) {
            this.setItems(option.service, option.items);
          } else {
            let response = await filterService[option.service](option?.filter);
            this.$set(this.items, option.service, response.data.data);
          }
        }
      }
    },

    setItems(service, items) {
      this.$set(this.items, service, items);
    },

    async getFilter(service, filter) {
      try {
        let response = await filterService[service](filter);
        this.$set(this.items, service, response.data.data);
      } catch (error) {
        //console.log("error filter", error);
      }
    },

    selectedAll(filter, itemValue) {
      this.selected[filter] = this.items[filter].map(
        element => element[itemValue]
      );
    }
  },
  beforeMount() {
    this.getFilters();
  },
  created() {
    this.initSelected();
  }
};
</script>

<style>
.filter-status {
  align-items: center;
}
</style>
