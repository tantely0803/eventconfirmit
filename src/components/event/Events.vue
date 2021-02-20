<template>
  <div class="event__list">
    <div v-for="event in eventList" :key="event.id">
      <div class="event__listOption shadow" v-on:click="editEventSelected(event)">
          <h4> {{ event.title }} </h4>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';

export default {
  name: 'Events',
  computed: {
        ...mapState(['eventList', 'eventSelected'])
  },
  methods: {
      ...mapActions(['editEventSelected'])
  },
  mounted: function () {
    this.$nextTick(function () {
        this.$store.dispatch('editEventSelected',this.eventList[0])  
    })
  }
}
</script>

<style>
.event__list{
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-height:100vh ;
  background-color: #F5F8FD;
  overflow-y: scroll;
}
.event__listOption{
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100px;
  margin: 10px;
  background-color: white;
  font-size: 20px;
  z-index: 10;
  margin-left: auto;
  margin-right: auto;
}

.event__listOption:hover{
  overflow: visible;
  cursor: pointer;
  border: 1px solid green;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}
</style>
