<template>
  <div class="row justify-content-around">
    <div class=" col-sm-4  overflow-auto">
      <Events />
    </div>
      <div class=" col-sm-4">
        <EventInformation />
      </div>
      <div class=" col-sm-4">
        <EventComments />
      </div>
  </div>
</template>

<script>
import Events from "./event/Events";
import EventInformation from './event/EventInformation.vue';
import EventComments from './event/EventComments.vue';

export default {
  name: 'home',
  components: {
    Events,
    EventInformation,
    EventComments 
  },
}
</script>
