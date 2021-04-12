<template>
  <v-container fluid>
    <v-autocomplete clearable v-bind="$attrs" v-on="$listeners">
      <template v-slot:default>
        <v-tooltip v-if="iconCheckAll" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="$emit('check')"
              icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="success"> mdi mdi-check</v-icon>
            </v-btn>
          </template>
          <span>Marcas todos</span>
        </v-tooltip>
      </template>
      <!-- passa slots comuns -->
      <template v-for="(_, slotName) in $slots" v-slot:[slotName]>
        <slot :name="slotName" />
      </template>

      <!-- passa slots com escopo -->
      <template
        v-for="(_, scopedSlotName) in $scopedSlots"
        v-slot:[scopedSlotName]="slotData"
      >
        <slot :name="scopedSlotName" v-bind="slotData" />
      </template>
    </v-autocomplete>
  </v-container>
</template>
<script>
//import BaseSegmento from "./BaseSegmento";
export default {
  props: {
    iconCheckAll: Boolean
  },
  components: {
    // BaseSegmento,
  },
  data: () => ({
    search: null
  }),

  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    }
  }
};
</script>
