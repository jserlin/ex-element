<template>
  <button :class="['x-button', type ? 'x-button--' + type : '']">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "xButton",
  props: {
    type: { 
      type: String, 
      default: 'default' 
    }
  }
}
</script>

