<template>
    <div class="event__commentOption shadow">
        <div class="event__commentIcon ml-auto">
            <i data-toggle="tooltip" data-placement="top" title="Editer" class="fas fa-pen fa-xs text-success btn-cursor" v-if="isEdit" v-on:click="updateCommentEvent">&nbsp;</i>
            <i data-toggle="tooltip" data-placement="top" title="Editer" class="fas fa-pen fa-xs text-danger btn-cursor" v-if="isEdit" v-on:click="toggleEdit">&nbsp;</i>
            <i data-toggle="tooltip" data-placement="top" title="Editer" class="fas fa-pen fa-xs text-success btn-cursor" v-if="!isEdit" v-on:click="toggleEdit">&nbsp;</i>
            <i data-toggle="tooltip" data-placement="top" title="Suprimmer" class="fas fa-trash fa-xs text-danger btn-cursor"  v-if="!isEdit" v-on:click="deleteCommentEvent">&nbsp;</i>
        </div>
        <div class="event__commentAvatar">
            <img class="event__commentAvatarLogo"
                src="https://e7.pngegg.com/pngimages/409/621/png-clipart-computer-icons-avatar-male-user-profile-others-logo-monochrome.png"
                alt="">

            <div class="event__commentAvatarDetails">
                <div class="comment__name" v-if="!isEdit "> 
                    {{ commentEvent.author }}
                </div>
                <div class="comment__name" v-if="isEdit"> 
                    <input type="text" placeholder="Author." v-model="commentEvent.author" />
                </div>
                <div class="comment__text" v-if="!isEdit "> 
                    {{ commentEvent.content }}
                </div>
                <div class="comment__text" v-if="isEdit"> 
                    <textarea type="text" placeholder="Content" v-model="commentEvent.content" />
                </div>
            </div>

        </div>
        <div class="event__commentDate ml-auto">
            <span>{{ commentEvent.creationDate }}</span>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'Comment',
  props: ['commentEvent', 'eventId'],
  methods:{
    deleteCommentEvent: function () {
        console.log('this.commentEvent',this.commentEvent, this.eventId);
         this.$store.dispatch('deleteComment',{ eventId: this.eventId, comment: {
            ...this.commentEvent,
        } });
    },
    toggleEdit: function () {
        this.isEdit = !this.isEdit;
    },
    updateCommentEvent: function () {
         this.$store.dispatch('updateComment',{ eventId: this.eventId, comment: {
            ...this.commentEvent,
            creationDate: moment().format(),
        } });
    },
  },
  data: () => ({
    isEdit: false,
  }),
  watch: {
    commentEvent: function () {
      this.isEdit = false;
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
.btn-cursor {
    cursor: pointer;
}
.event__comment{
        display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    max-height:100vh ;
    background-color: #F5F8FD;
   
    overflow-y: scroll;

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