<template>
  <div>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      class="elevation-1"
      style="white-space: nowrap"
      hide-default-footer
      :items-per-page="15"
      loading-text="Carregando... Aguarde"
      no-data-text="Sem dados disponíveis"
    >
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
    </v-data-table>
    <template v-if="paginate">
      <div class="text-left pt-2" v-if="$attrs.items">
        <v-pagination
          v-model="page"
          :length="lastPage"
          :total-visible="10"
          @input="$emit('pageChange', page)"
        ></v-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "BaseTable",

  props: {
    paginate: {
      type: Boolean,
      default: false
    },
    lastPage: Number,
    actualPage: Number
  },

  data() {
    return {
      page: this.actualPage
    };
  }
};
</script>
