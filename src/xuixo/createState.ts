import { allowedActions } from './consts';

const createState = ({ state, only }) => {
  const breadState = {
    entities: {},
    list: [],
  };

  if (only.includes(allowedActions.BROWSE)) {
    Object.assign(breadState, {
      isBrowsing: false,
      browseError: null,
    });
  }

  if (only.includes(allowedActions.READ)) {
    Object.assign(breadState, {
      isReading: false,
      readError: null,
    });
  }

  if (only.includes(allowedActions.EDIT)) {
    Object.assign(breadState, {
      isEditing: false,
      editError: null,
    });
  }

  if (only.includes(allowedActions.ADD)) {
    Object.assign(breadState, {
      isAdding: false,
      addError: null,
    });
  }

  if (only.includes(allowedActions.DELETE)) {
    Object.assign(breadState, {
      isDeleting: false,
      deleteError: null,
    });
  }
  
  if (only.includes(allowedActions.REPLACE)) {
    Object.assign(breadState, {
      isReplacing: false,
      replaceError: null,
    });
  }

  return Object.assign(breadState, state);
};

export default createState;