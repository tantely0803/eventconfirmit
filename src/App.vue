<template>
   <div class="container-fluid event">
        <h1 class="event__title">Mes evènements</h1>
        <home />
    </div>
</template>

<script>
import home from "./components/Home";

export default {
  name: 'App',
  components: {
    home
  }
}
</script>

<style>

</style>
