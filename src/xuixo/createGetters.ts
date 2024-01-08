const createGetters = ({ getters }: any = {}) => Object.assign({}, {
  list(state) {
    return state.list.map((id: any) => state.entities[id.toString()]);
  },

  byId(state) {
    return id => state.entities[id.toString()];
  },

  isError(state) {
    const errorList = [
      state.browseError, state.readError,
      state.editError, state.addError,
      state.deleteError, state.replaceError,
    ];
    return errorList.some((x) => x !== null);
  },

  isLoading(state) {
    const loadingList = [
      state.isBrowsing, state.isReading,
      state.isEditing, state.isAdding,
      state.isDeleting, state.isReplacing,
    ];
    return loadingList.some((x) => x);
  },

}, getters);

export default createGetters;