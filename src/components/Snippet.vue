<template>
  <p>{{ snippet }}</p>
</template>

<script>
import { computed } from '@vue/reactivity'
export default {
  props: ['post'],
  setup(props){
    const snippet = computed(() => {
      return props.post.body.substring(0, 100) + "..."
    })

    return { snippet }
  }
}
</script>

<style>

</style>