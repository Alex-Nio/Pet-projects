import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, set, onValue, remove, onChildAdded } from "firebase/database";

export default {
  state: {
    user: null,
    notes: [],
    collections: []
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    // setCollections(state, items) {
    //   state.collections = items;
    // },
    setUser(state, user) {
      state.user = user;
    },
    addNote(state, note) {
      state.notes.push(note);
    },
    deleteNote(state, noteIndex) {
      for (let i = 0; i < state.notes.length; i++) {
        if (i === noteIndex) {
          state.notes.splice(i, 1);
        }
      }
    }
  },
  actions: {
    // async setCollections({ commit }, kitsCollection) {
    //   const user = getAuth().currentUser;
    //   if (!user) {
    //     return;
    //   }
    //   const collectionsRef = ref(getDatabase(), `users/${user.uid}/collections`);
    //   const newCollectionRef = push(collectionsRef);
    //   await set(newCollectionRef, kitsCollection);

    //   commit("setCollections", kitsCollection);
    // },
    async addNote({ commit, state }, note) {
      const user = getAuth().currentUser;
      if (!user) {
        return;
      }
      const notesRef = ref(getDatabase(), `users/${user.uid}/notes`);
      const newNoteRef = push(notesRef);
      await set(newNoteRef, note);

      const newNote = {
        id: newNoteRef.key,
        completed: note.completed,
        extra: note.extra,
        image: note.image,
        main: note.main,
        title: note.title,
        type: note.type
      };

      commit("addNote", newNote);
    },
    async Authorization({ commit }) {
      const user = getAuth().currentUser;
      if (!user) {
        return;
      }
      const notesRef = ref(getDatabase(), `users/${user.uid}/notes`);
      onValue(notesRef, snapshot => {
        const notes = [];
        snapshot.forEach(childSnapshot => {
          notes.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        commit("setNotes", notes);
      });

      // const collectionsRef = ref(getDatabase(), `users/${user.uid}/collections`);
      // onChildAdded(collectionsRef, childSnapshot => {
      //   const newCollection = {
      //     id: childSnapshot.key,
      //     ...childSnapshot.val()
      //   };
      //   commit("setCollections", newCollection);
      // });
    },
    async deleteNote({ commit, state }, noteId) {
      const user = getAuth().currentUser;
      if (!user) {
        return;
      }
      const noteDbId = state.notes.filter(note => note.id === noteId);
      const noteRef = ref(getDatabase(), `users/${user.uid}/notes/${noteId}`);
      await remove(noteRef);

      commit("deleteNote", noteDbId);
    }
  },
  getters: {
    getCurrentUser(state) {
      return state.user;
    },
    getNotes(state) {
      return state.notes;
    },
    getCollections(state) {
      return state.collections;
    },
    getNotesByTitle: state => title => {
      return state.notes.filter(note => note.title === title);
    }
  },
  modules: {}
};
