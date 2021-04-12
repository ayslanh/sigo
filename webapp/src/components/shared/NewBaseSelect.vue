<template>
  <v-autocomplete
    v-model="selected"
    v-bind="$attrs"
    v-on="$listeners"
    loading-text="Carregando... Aguarde"
    no-data-text="Sem dados disponíveis"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item[$attrs["item-text"]] }}</span>
      </v-chip>
      <span v-if="index === 1" class="grey--text caption">
        (+{{ $attrs.items.length - 1 }})
      </span>
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
</template>

<script>
export default {
  name: "NewBaseSelect",

  props: {
    preSelected: [Array, Object]
  },

  computed: {
    selected: {
      get() {
        return { ...this.preSelected };
      },
      set() {}
    }
  }
};
</script>
