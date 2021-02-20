import Vue from 'vue';
import Vuex from 'vuex';
import datas from "../data/events.json";
import moment from "moment";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventSelected: {},
    eventList: datas
  },
  getters: {
    eventComputed: state => {
        return {
          ...state.eventSelected,
          creationDate: moment(state.eventSelected.creationDate).format('DD-MM-YYYY'),
          creationDateForm: moment(state.eventSelected.creationDate).format('YYYY-MM-DD'),
          creationHour: moment(state.eventSelected.creationDate).format('HH:mm'),
        }
    }
  },
  mutations: {
    EDIT_EVENT_SELECTED(state, payload) {
      state.eventSelected = payload;
    },
    EDIT_EVENT(state, payload) {
      state.eventList = state.eventList.map(event => {
        if(event.id === payload.id) {
          return payload;
        }
        return event;
      })
    },
    CREATE_COMMENT(state, payload) {
      state.eventList = state.eventList.map(data => {
        if(data.id === payload.eventId) {
        const maxValueID = Math.max(...data.comments.map(cm => cm.id));
          const newValue =  {
            ...data,
            comments: [
              ...data.comments,
              {
                id: maxValueID + 1,
                ...payload.comment, 
              }
            ]
          };
          state.eventSelected = newValue;
          return newValue;
        }
        return data;
      });
    },
    UPDATE_COMMENT(state, payload) {
      state.eventList = state.eventList.map(data => {
        if(data.id === payload.eventId) {
          const newValue =  {
            ...data,
            comments: [
              ...data.comments.map(com => {
                if(com.id === payload.comment.id) {
                  return payload.comment;
                }
                return com;
              })
            ]
          };
          state.eventSelected = newValue;
          return newValue;
        }
        return data;
      });
    },
    DELETE_COMMENT(state, payload) {
      state.eventList = state.eventList.map(data => {
        if(data.id === payload.eventId) {
          const newValue =  {
            ...data,
            comments: data.comments.filter(commentEvent => commentEvent.id !== payload.comment.id)
          };
          state.eventSelected = newValue;
          return newValue;
        }
        return data;
      });
    },
  },
  actions: {
    editEventSelected(context, event) {
      context.commit('EDIT_EVENT_SELECTED', event);
    },
    updateEvent(context, event) {
      context.commit('EDIT_EVENT', event);
    },
    createComment(context, data) {
      context.commit('CREATE_COMMENT', data);
    },
    updateComment(context, data) {
      context.commit('UPDATE_COMMENT', data);
    },
    deleteComment(context, data) {
      context.commit('DELETE_COMMENT', data);
    },
  }
})
