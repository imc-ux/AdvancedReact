export enum RoleManager {
  GetUserRoleList = 'getUserRoleList',
  GetRoleList = 'getRoleList',
  CreateRoleToUser = 'createRoleToUser',
  CreateRoleInfo = 'createRoleInfo',
  DeleteRoleFromUser = 'deleteRoleFromUser',
  UpdateRoleInfo = 'updateRoleInfo',
  GetUserActivePermission = 'getUserActivePermission',
}

export enum PermissionManager {
  GetRolePermissionList = 'getRolePermissionList',
  GetPermissionList = 'getPermissionList',
  CreatePermissionInfo = 'createPermissionInfo',
  UpdatePermissionInfo = 'updatePermissionInfo',
  CreatePermissionToRole = 'createPermissionToRole',
  DeletePermissionFromRole = 'deletePermissionFromRole',
  GetUserActivePermission = 'getUserActivePermission',
}

export enum ShareManager {
  GetUserList = 'getUserList',
  GetCategoryList = 'getCategoryList',
  GetTitleList = 'getTitleList',
  ClickShareTimes = 'clickShareTimes',
  DeleteMyShare = 'deleteMyShare',
  ToTopShare = 'toTopShare',
  AddMyShare = 'addMyShare',
  MyShareDetail = 'myShareDetail',
  ModifyMyShare = 'modifyMyShare',
  GetUserActivePermission = 'getUserActivePermission',
}
