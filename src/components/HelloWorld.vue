<template>
  <div>
    Body
  </div>
</template>

<script>
export default {
  name: "M-Helloword",
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>
