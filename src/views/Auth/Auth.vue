<template>
  <div class="auth d-flex">
    <div class="auth__background flex-1-1" />
    <div class="flex-1-1 d-flex justify-center auth__content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
  @import 'src/styles/_override.scss';
</style>

<style lang="scss" scoped>
  @import './Auth.scss';
</style>