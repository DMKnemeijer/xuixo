import defaultClient from './xuixo/client';
import createActions from './xuixo/createActions';
import createGetters from './xuixo/createGetters';
import createMutations from './xuixo/createMutations';
import createState from './xuixo/createState';
import { allowedActions, ALLOWED_ACTIONS } from './xuixo/consts';

const createBread = ({
  idAttribute = 'id',
  resource,
  urlRoot,
  customUrlFunction = null,
  state = {},
  actions = {},
  mutations = {},
  getters = {},
  client = defaultClient,
  onBrowseStart = () => {},
  onBrowseSuccess = () => {},
  onBrowseError = () => {},
  onBrowseComplete = () => {},
  onReadStart = () => {},
  onReadSuccess = () => {},
  onReadError = () => {},
  onReadComplete = () => {},
  onEditStart = () => {},
  onEditSuccess = () => {},
  onEditError = () => {},
  onEditComplete = () => {},
  onAddStart = () => {},
  onAddSuccess = () => {},
  onAddError = () => {},
  onAddComplete = () => {},
  onDeleteStart = () => {},
  onDeleteSuccess = () => {},
  onDeleteError = () => {},
  onDeleteComplete = () => {},
  onReplaceStart = () => {},
  onReplaceSuccess = () => {},
  onReplaceError = () => {},
  onReplaceComplete = () => {},
  only = ALLOWED_ACTIONS,
  parseList = res => res,
  parseSingle = res => res,
  parseError = res => res,
}: any = {}) => {
  if (!resource) {
    throw new Error('Resource name must be specified');
  }

  let rootUrl;
  if (typeof customUrlFunction === 'function') {
    rootUrl = customUrlFunction;
  } else if (typeof urlRoot === 'string') {
    rootUrl = ((url) => {
      const lastCharacter = url.slice(-1);

      return lastCharacter === '/' ? url.slice(0, -1) : url;
    })(urlRoot);
  } else {
    rootUrl = `/api/${resource}`;
  }

  return {
    namespaced: true,
    state: createState({ state, only }),
    actions: createActions({
      actions,
      rootUrl,
      only,
      client,
      parseList,
      parseSingle,
      parseError,
    }),
    mutations: createMutations({
      mutations,
      idAttribute,
      only,
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
    }),
    getters: createGetters({ getters }),
  };
};

export default createBread;
export { defaultClient as client };