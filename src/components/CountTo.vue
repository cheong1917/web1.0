<script setup>
import gsap from 'gsap'

const d = reactive({num: 0})

const props =defineProps({
  value: {
    type: Number,
    default: 0
  }
})

function AnimaToValue() {
  gsap.to(d, {
    duration: 0.5,
    num:props.value
  })
}
AnimaToValue()

watch(()=>props.value,()=>AnimaToValue())
</script>

<template>
  {{ d.num }}
</template>

<style scoped>

</style>