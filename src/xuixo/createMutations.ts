import Vue from 'vue';

import { allowedActions } from './consts'

const createMutations = ({
  mutations,
  only,
  idAttribute,
  onBrowseStart,
  onBrowseSuccess,
  onBrowseError,
  onBrowseComplete,
  onReadStart,
  onReadSuccess,
  onReadError,
  onReadComplete,
  onEditStart,
  onEditSuccess,
  onEditError,
  onEditComplete,
  onAddStart,
  onAddSuccess,
  onAddError,
  onAddComplete,
  onDeleteStart,
  onDeleteSuccess,
  onDeleteError,
  onDeleteComplete,
  onReplaceStart,
  onReplaceSuccess,
  onReplaceError,
  onReplaceComplete,
}: {
  mutations: any,
  only: Array<allowedActions>,
  idAttribute: string,
  onBrowseStart: Function,
  onBrowseSuccess: Function,
  onBrowseError: Function,
  onBrowseComplete: Function,
  onReadStart: Function,
  onReadSuccess: Function,
  onReadError: Function,
  onReadComplete: Function,
  onEditStart: Function,
  onEditSuccess: Function,
  onEditError: Function,
  onEditComplete: Function,
  onAddStart: Function,
  onAddSuccess: Function,
  onAddError: Function,
  onAddComplete: Function,
  onDeleteStart: Function,
  onDeleteSuccess: Function,
  onDeleteError: Function,
  onDeleteComplete: Function,
  onReplaceStart: Function,
  onReplaceSuccess: Function,
  onReplaceError: Function,
  onReplaceComplete: Function,
}) => {
  const breadMutations = {};

  if (only.includes(allowedActions.BROWSE)) {
    Object.assign(breadMutations, {
      browseStart(state) {
        state.isBrowsing = true;
        onBrowseStart(state);
      },

      browseSuccess(state, response) {
        const { data } = response;

        data.forEach(m => {
          Vue.set(state.entities, m[idAttribute].toString(), m)
        });
        state.list = data.map((m) => m[idAttribute].toString());
        state.browseError = null;
        onBrowseSuccess(state, response);
      },

      browseError(state, err) {
        state.list = [];
        state.browseError = err;
        onBrowseError(state, err);
      },

      browseComplete(state) {
        state.isBrowsing = false;
        onBrowseComplete(state);
      },
    });
  }

  if (only.includes(allowedActions.READ)) {
    Object.assign(breadMutations, {
      readStart(state) {
        state.isReading = true;
        onReadStart(state);
      },

      readSuccess(state, response) {
        const { data } = response;
        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);
        state.readError = null;
        onReadSuccess(state, response);
      },

      readError(state, err) {
        state.readError = err;
        onReadError(state, err);
      },

      readComplete(state) {
        state.isReading = false;
        onReadComplete(state);
      },
    });
  }

  if (only.includes(allowedActions.EDIT)) {
    Object.assign(breadMutations, {
      editStart(state) {
        state.isEditing = true;
        onEditStart(state);
      },

      editSuccess(state, response) {
        const { data } = response;
        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);

        const listIndex = state.list.indexOf(id);
        if (listIndex >= 0) {
          Vue.set(state.list, listIndex, id);
        }

        state.editError = null;
        onEditSuccess(state, response);
      },

      editError(state, err) {
        state.editError = err;
        onEditError(state, err);
      },

      editComplete(state) {
        state.isEditing = false;
        onEditComplete(state);
      },
    });
  }

  if (only.includes(allowedActions.ADD)) {
    Object.assign(breadMutations, {
      addStart(state) {
        state.isAdding = true;
        onAddStart(state);
      },

      addSuccess(state, response) {
        const { data } = response;
        if (data) {
          const id = data[idAttribute].toString();
          Vue.set(state.entities, id, data);
        } else {
          console.warn ('No valid response received from ADD / CREATE action');
        }
        
        state.addError = null;
        onAddSuccess(state, response);
      },

      addError(state, err) {
        state.addError = err;
        onAddError(state, err);
      },

      addComplete(state) {
        state.isAdding = false;
        onAddComplete(state);
      },
    });
  }

  if (only.includes(allowedActions.DELETE)) {
    Object.assign(breadMutations, {
      deleteStart(state) {
        state.isDeleting = true;
        onDeleteStart(state);
      },

      deleteSuccess(state, id, response) {
        const listIndex = state.list.indexOf(id.toString());

        if (listIndex >= 0) {
          Vue.delete(state.list, listIndex);
        }

        Vue.delete(state.entities, id.toString());
        state.deleteError = null;
        onDeleteSuccess(state, response);
      },

      deleteError(state, err) {
        state.deleteError = err;
        onDeleteError(state, err);
      },

      deleteComplete(state) {
        state.isDeleting = false;
        onDeleteComplete(state);
      },
    });
  }

  if (only.includes(allowedActions.REPLACE)) {
    Object.assign(breadMutations, {
      replaceStart(state) {
        state.isReplacing = true;
        onReplaceStart(state);
      },

      replaceSuccess(state, response) {
        const { data } = response;

        const id = data[idAttribute].toString();

        Vue.set(state.entities, id, data);

        const listIndex = state.list.indexOf(id);

        if (listIndex >= 0) {
          Vue.set(state.list, listIndex, id);
        }

        state.replaceError = null;
        onReplaceSuccess(state, response);
      },

      replaceError(state, err) {
        state.replaceError = err;
        onReplaceError(state, err);
      },

      replaceComplete(state) {
        state.isReplacing = false;
        onReplaceComplete(state);
      },
    });
  }

  return Object.assign (breadMutations, mutations);
};

export default createMutations;