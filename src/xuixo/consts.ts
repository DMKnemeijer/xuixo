export const enum allowedActions {
  BROWSE = 'BROWSE', // HTTP GET on resource set
  READ = 'READ', // HTTP GET on single resource
  EDIT = 'EDIT', // HTTP PATCH
  ADD = 'ADD', // HTTP POST
  DELETE = 'DELETE', // HTTP DELETE
  REPLACE = 'REPLACE' // HTTP PUT
}

export const ALLOWED_ACTIONS: Array<allowedActions> = [
  allowedActions.BROWSE, allowedActions.READ,
  allowedActions.EDIT, allowedActions.ADD,
  allowedActions.DELETE, allowedActions.REPLACE,
];