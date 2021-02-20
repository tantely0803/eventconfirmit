<template>
      <div class="event__form">
        <loading :active.sync="isLoading" 
          :can-cancel="true"></loading>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
          <h2> {{ eventComputed.title }} </h2>
          <h5>Créer le {{ eventComputed.creationDate }} à {{ eventComputed.creationHour }} par {{ eventComputed.createdBy}}</h5>

          <form  @submit="checkForm"
                method="post">
              <div class="event__formInputTitre">
                  <label for="Titre">Titre</label>
                  <input type="text" placeholder="Your name.." v-model="eventComputed.title">
              </div>
              <div class="event__formInputDescription">
                  <label for="Description">Description</label>
                  <textarea v-model="eventComputed.description"></textarea>
              </div>

              <div class="event__formInputDateTime">

                  <div class="event__formInputDate">
                      <label>Date</label>
                      <input type="date" v-model="eventComputed.creationDateForm">

                  </div>
                  <div class="event__formInputDate">
                      <label>Heure</label>
                      <input type="time" v-model="eventComputed.creationHour">
                  </div>
              </div>

              <div class="event__formInputStatus mt-2">
                  <label for="country">Nom du Statut</label>
                  <select v-model="eventComputed.statusName">
                    <option v-for="stat in status" v-bind:key="stat.value" v-bind:value="stat.value">
                      {{ stat.text }}
                    </option>
                  </select>
              </div>

              <div class="event__formInput">
                  <label for="country">Employé impliqué</label>
                  <select v-model="eventComputed.involvedEmployee">
                    <option v-for="employe in employees" v-bind:key="employe.id" v-bind:value="employe">
                      {{ employe.firstname }} {{ employe.lastname }}
                    </option>
                  </select>
              </div>

              <div class="event__formInputTemoinParent">
                  <div class="event__formInputTemoin">
                      <label>Temoin</label>
                      <input type="text" v-model="temoin">
                  </div>
                  <div class="event__formInputButton">
                      <button class="btn btn-success"  v-on:click="addTemoin"
                        v-bind:disabled="!temoin || !eventComputed || !eventComputed.id"  >Ajouter</button>
                  </div>
              </div>
              <div class="event__formInputList" v-for="currentTemoin in temoins" v-bind:key="currentTemoin">
                  <label for="Description">{{ currentTemoin }} </label>
                  <i class="fas fa-trash fa-xs text-danger btn-cursor" data-toggle="tooltip" data-placement="top" title="Suprimmer"  v-on:click="deleteTemoin(currentTemoin)"></i>
              </div>
              <input class="btn btn-success"
                    type="submit"
                    value="Enregistrer"
                    v-bind:disabled="!eventComputed || !eventComputed.id"
                  >
          </form>

      </div>
</template>

<script>
import moment from "moment";
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapGetters } from 'vuex';



export default {
  name: 'Home',
  components: {Loading},
  computed: {
        ...mapGetters(['eventComputed']),
  },
  data: () => ({
    status: [
      {text: "Ouvert", value: "Open"},
      {text: "Fermer", value: "Closed"},
      {text: "En progression", value: "InProgress"}
      ],
    employees: [{
            "id": 1868,
            "firstname": "Adelle",
            "lastname": "Thornburg"
        },{
            "id": 8139,
            "firstname": "Amara",
            "lastname": "Ivens"
        },{
            "id": 2532,
            "firstname": "Helena",
            "lastname": "Hewitt"
        }],
    errors: [],
    isLoading: false,
    temoin: null,
    temoins: []
  }),
  methods:{
    checkForm: function (e) {
      e.preventDefault();

      if (this.eventComputed.title) {

        this.isLoading = true;
        const newValue = {
         ...this.eventComputed,
         creationDate: moment(`${this.eventComputed.creationDateForm} ${this.eventComputed.creationHour}`).format(),
         temoins: this.temoins
        }

        delete newValue.creationHour;
        delete newValue.creationDateForm;
        
        this.$store.dispatch('updateEvent',newValue)      
    
        setTimeout(() => {
          this.isLoading = false
        },500)
        return true;
      }

      this.errors = [];

      if (!this.eventComputed.title) {
        this.errors.push('Titre Obligatoire.');
      }
    
    },
    addTemoin: function (e) {
      e.preventDefault();
      this.temoins.push(this.temoin);
      this.temoin = null;
    },
    deleteTemoin: function (currentTemoin) {
      /* e.preventDefault(); */
      if(this.temoins && this.temoins.length) {
        this.temoins = this.temoins.filter(tem => tem !== currentTemoin);
      }
    },
  },
  watch: {
    eventComputed: function(newVal) {
      this.temoins = newVal.temoins;
    },
  },
}
</script>

<style>
.btn-cursor {
    cursor: pointer;
}
.event__formInputDateTime{
    display: flex;
    justify-content: space-between;
}
.event__formInputDate{
    display: flex;
    flex-direction: column;
}
input[type=text], select ,textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
.event__formInputTemoinParent {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
</style>
