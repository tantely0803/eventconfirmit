<template>
    <div>
        <div class="comment__name"> 
            <h5 class="ml-5">Nouvelle commentaire</h5>
            <input type="text" placeholder="Author." v-model="formData.author" />
            <textarea type="text" placeholder="Content" v-model="formData.content" />
            <button class="btn btn-success" v-on:click="createComment(eventSelected.id)" v-bind:disabled="!eventSelected.id">Enregistrer</button>
        </div>
         <div class="event__comment ">
            <h5 class="ml-5">Commentaires</h5>
            <!--card comment-->
            <Comment 
                 v-for="comment in eventSelected.comments" 
                 v-bind:key="comment.id"
                 v-bind:commentEvent="comment" 
                 v-bind:event-id="eventSelected.id"  />
            <!--end one card comment-->
        </div>
    </div>
</template>

<script>
import moment from "moment";
import Comment from "./Comment";
import { mapState } from 'vuex';

export default {
  name: 'Comments',
  components: {
      Comment
  },
  computed: {
        ...mapState(['eventSelected']),
  },
  methods:{
    createComment: function (id) {
        this.$store.dispatch('createComment',{ eventId: id, comment: {
            ...this.formData,
            creationDate: moment().format(),
        } });
        
        this.formData = {
            author: null,
            content: '',
            date: null
        }
    },
  },
  data: () => ({
    formData: {
        author: null,
        content: '',
        date: null
    }
  }),
  watch: {
    eventId: function () {
      this.formData = {
        author: null,
        content: '',
        date: null
    };
    },
  }
}
</script>


<style>
.label {
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,
    border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}


.event__commentOption{
  
display: flex;
flex-direction: column;
width: 80%;
height: auto;
margin: 10px;
background-color: white;
font-size: 20px;
margin-left: auto;
margin-right: auto;



}
.event__commentAvatar{
    display: flex;

   
}
.event__commentAvatarLogo{
    object-fit: contain;
    height: 40px;
    margin: 10px;
}
.event__commentAvatarDetails{
    width: 100%;
    margin-left: 20px;
}


.event__commentDate > span{
font-size: 12px;
}

.comment__name{
    font-size: 15px;
    font-weight: 600;
    text-align: left;
    color: #b3b3b3;
}
.comment__text{
    font-size: 13px;
    text-align: left;
    color: #707070;
}
</style>