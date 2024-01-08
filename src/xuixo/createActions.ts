import { allowedActions } from './consts'

const createActions = ({
  actions,
  rootUrl,
  client,
  only,
  parseList,
  parseSingle,
  parseError,
}: {
  actions: any,
  rootUrl: any,
  client: any,
  only: any,
  parseList: any,
  parseSingle: any,
  parseError: any,
}) => {
  const breadActions = {};
  const isUsingCustomUrlGetter = typeof rootUrl === 'function';

  const urlGetter = ({
    customUrl,
    customUrlFunctionArgs,
    id,
    type,
  }) => {
    if (typeof customUrl === 'string') {
      return customUrl;
    } else if (isUsingCustomUrlGetter) {
      const argsArray = Array.isArray(customUrlFunctionArgs)
        ? customUrlFunctionArgs
        : [customUrlFunctionArgs];
      const args = [id || null, type || null].concat(argsArray);
      return rootUrl(...args);
    }

    return id ? `${rootUrl}/${id}` : rootUrl;
  };

  if (only.includes(allowedActions.BROWSE)) {
    Object.assign(breadActions, {
      browse({ commit }, { config, customUrl, customUrlFunctionArgs = [] }: any = {}) {
        commit('browseStart');

        return client
          .get(urlGetter({ customUrl, customUrlFunctionArgs, id: null, type: allowedActions.BROWSE }), config)
          .then((res) => {
            const parsedResponse = parseList(res);
            commit('browseSuccess', parsedResponse);
            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);
            commit('browseError', err);
            return Promise.reject(parsedError);
          })
          .finally(() => {
            commit('browseComplete');
          });
      }
    });
  }

  if (only.includes(allowedActions.READ)) {
    Object.assign(breadActions, {
      read({ commit }, {
        id,
        config,
        customUrl,
        customUrlFunctionArgs = []
      }: any = {}) {
        commit('readStart');

        return client
          .get(urlGetter({customUrl, customUrlFunctionArgs, id, type: allowedActions.READ}), config)
          .then((res) => {
            const parsedResponse = parseSingle(res);
            commit('readSuccess', parsedResponse);
            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);
            commit('readError', parsedError);
            return Promise.reject(parsedError);
          })
          .finally(() => {
            commit('readComplete');
          });
      }
    });
  }

  if (only.includes(allowedActions.EDIT)) {
    Object.assign(breadActions, {
      edit({ commit }, {
        id, data, config, customUrl, customUrlFunctionArgs = []
      }: any = {}) {
        commit('editStart');

        return client
          .patch(urlGetter({customUrl, customUrlFunctionArgs, id, type: allowedActions.EDIT}), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);
            commit('editSuccess', parsedResponse);
            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);
            commit('editError', parsedError);
            return Promise.reject(parsedError);
          })
          .finally(() => {
            commit('editComplete');
          });
      }
    });
  }

  if (only.includes(allowedActions.ADD)) {
    Object.assign(breadActions, {
      add({ commit }, {
        data,
        config,
        customUrl,
        customUrlFunctionArgs = [],
      }: any = {}) {
        commit('addStart');

        return client
          .post(urlGetter({ customUrl, customUrlFunctionArgs, id: null, type: allowedActions.ADD}), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);
            commit('addSuccess', parsedResponse);
            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);
            commit('addError', parsedError);
            return Promise.reject(parsedError);
          })
          .finally(() => {
            commit('addComplete');
          })
      }
    });
  }

  if (only.includes(allowedActions.DELETE)) {
    Object.assign(breadActions, {
      delete({ commit }, {
        id,
        config,
        customUrl,
        customUrlFunctionArgs = [],
      }: any = {}) {
        commit('deleteStart');

        return client
          .delete(urlGetter({ customUrl, customUrlFunctionArgs, id, type: allowedActions.DELETE}), config)
          .then((res) => {
            const parsedResponse = parseSingle(res);
            commit('deleteSuccess', id, parsedResponse);
            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);
            commit('deleteError', parsedError);
            return Promise.reject(parsedError);
          })
          .finally(() => {
            commit('deleteComplete');
          });
      }
    });
  }

  if (only.includes(allowedActions.REPLACE)) {
    Object.assign(breadActions, {
      replace({ commit }, {
        id,
        data,
        config,
        customUrl,
        customUrlFunctionArgs = []
      }: any = {}) {
        commit('replaceStart');

        return client
          .put(urlGetter({
            customUrl,
            customUrlFunctionArgs,
            id,
            type: allowedActions.REPLACE,
          }), data, config)
          .then((res) => {
            const parsedResponse = parseSingle(res);
            commit('replaceSuccess', parsedResponse);
            return parsedResponse;
          })
          .catch((err) => {
            const parsedError = parseError(err);
            commit('replaceError', parsedError);
            return Promise.reject(parsedError);
          })
          .finally(() => {
            commit('replaceComplete')
          });
      }
    });
  }

  return Object.assign(breadActions, actions);
}

export default createActions;