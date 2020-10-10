import { getUsercenterAction,deleteUsercenterAction,putUsercenterAction,postUsercenterAction} from '@/api/manage'
import { getDevareaAction,deleteDevareaAction,putDevareaAction,postDevareaAction} from '@/api/manage'
import { getSwAction,postSwAction} from '@/api/manage'
////根路径
// const doMian = "/jeecg-boot/";
////图片预览请求地址
// const imgView = "http://localhost:8080/jeecg-boot/sys/common/view/";


//角色管理
const addRole = (params)=>postUsercenterAction("/sys/role/add",params);
const editRole = (params)=>putUsercenterAction("/sys/role/edit",params);
// const getRoleList = (params)=>getUsercenterAction("/sys/role/list",params);
// const deleteRole = (params)=>deleteUsercenterAction("/sys/role/delete",params);
// const deleteRoleList = (params)=>deleteUsercenterAction("/sys/role/deleteBatch",params);
const checkRoleCode = (params)=>getUsercenterAction("/sys/role/checkRoleCode",params);
const queryall = (params)=>getUsercenterAction("/sys/role/queryall",params);

//用户管理
const addUser = (params)=>postUsercenterAction("/sys/user/add",params);
const editUser = (params)=>putUsercenterAction("/sys/user/edit",params);
const queryUserRole = (params)=>getUsercenterAction("/sys/user/queryUserRole",params);
const getUserList = (params)=>getUsercenterAction("/sys/user/list",params);
// const deleteUser = (params)=>deleteUsercenterAction("/sys/user/delete",params);
// const deleteUserList = (params)=>deleteUsercenterAction("/sys/user/deleteBatch",params);
const frozenBatch = (params)=>putUsercenterAction("/sys/user/frozenBatch",params);
//验证用户账号是否唯一
const checkUsername = (params)=>getUsercenterAction("/sys/user/checkOnlyUser",params);
//改变用户名
const changUsername = (params)=>putUsercenterAction("/sys/user/changUsername",params);
//改变密码
const changPassword = (params)=>putUsercenterAction("/sys/user/changPassword",params);
//改变openID
const changOpenId = (params)=>putUsercenterAction("/sys/user/changOpenId",params);
const changDdUserId = (params)=>putUsercenterAction("/sys/user/changDdUserId",params);

//权限管理
const addPermission= (params)=>postUsercenterAction("/sys/permission/add",params);
const editPermission= (params)=>putUsercenterAction("/sys/permission/edit",params);
const getPermissionList = (params)=>getUsercenterAction("/sys/permission/list",params);
// const deletePermission = (params)=>deleteUsercenterAction("/sys/permission/delete",params);
// const deletePermissionList = (params)=>deleteUsercenterAction("/sys/permission/deleteBatch",params);
const queryTreeList = (params)=>getUsercenterAction("/sys/permission/queryTreeList",params);
const queryTreeListForRole = (params)=>getUsercenterAction("/sys/role/queryTreeList",params);
const queryTreeListForDepartGroup = (params)=>getUsercenterAction("/sys/departGroup/queryTreeList",params);
// const queryTreeListForLeaderGroup = (params)=>getUsercenterAction("/common/leaderGroup/queryTreeList",params);
const queryTreeListForLeaderGroup = (params)=>getUsercenterAction("/common/leaderGroup/queryallV4",params);
const queryOrgList = (params)=>getSwAction("/filemeeting/org/queryOrgList",params);
const queryTreeListForParamsGroup = (params)=>getDevareaAction("/params/group/queryTreeListForParamsGroup",params);
const queryListAsync = (params)=>getUsercenterAction("/sys/permission/queryListAsync",params);
const queryRolePermission = (params)=>getUsercenterAction("/sys/permission/queryRolePermission",params);
const saveRolePermission = (params)=>postUsercenterAction("/sys/permission/saveRolePermission",params);
const queryDepartGroupDeparts = (params)=>getUsercenterAction("/sys/departGroup/queryDepartGroupDeparts",params);
const queryDepartGroupDepartsName = (params)=>getUsercenterAction("/sys/departGroup/queryDepartGroupDepartsName",params);
const queryLeaderGroupLeadersName = (params)=>getUsercenterAction("/common/leaderGroup/queryLeaderGroupLeadersName",params);
const queryParamsGroupParamsName = (params)=>getDevareaAction("/params/group/queryParamsGroupParamsName",params);
const queryLeaderGroupLeaders = (params)=>getUsercenterAction("/common/leaderGroup/queryLeaderGroupLeaders",params);
const queryLeaderDepartLeaders = (params)=>getUsercenterAction("/common/leaderDepart/queryLeaderDepartLeaders",params);
const queryLeaderServiceDepartLeaders = (params)=>getUsercenterAction("/common/leaderServiceDepart/queryLeaderServiceDepartLeaders",params);
const queryFileMeetingRelationOrgids = (params)=>getSwAction("/filemeeting/relation/queryFileMeetingRelationOrgids",params);

const queryParamsGroupParams = (params)=>getDevareaAction("/params/group/queryParamsGroupParams",params);
const queryDepartIndexGroupInfo = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartIndexGroupInfo",params);
const queryDepartLeaderCommentGroupInfo = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartLeaderCommentGroupInfo",params);
const queryDepartLeaderShowGroupInfo = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartLeaderShowGroupInfo",params);
const queryDepartAssignGroupInfo = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartAssignGroupInfo",params);
const queryDepartSzfAssignGroupInfo = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartSzfAssignGroupInfo",params);
const queryDepartCooperationGroupInfo = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartCooperationGroupInfo",params);
const queryDepartSzfCooperationGroupInfo = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartSzfCooperationGroupInfo",params);
const saveDepartGroupDeparts = (params)=>postUsercenterAction("/sys/departGroup/saveDepartGroupDeparts",params);
const saveLeaderGroupLeaders = (params)=>postUsercenterAction("/common/leaderGroup/saveLeaderGroupLeaders",params);
const saveLeaderDepartLeaders = (params)=>postUsercenterAction("/common/leaderDepart/saveLeaderDepartLeaders",params);
const saveLeaderServiceDepartLeaders = (params)=>postUsercenterAction("/common/leaderServiceDepart/saveLeaderServiceDepartLeaders",params);
const saveSysUserLeader = (params)=>postUsercenterAction("/sys/user/saveSysUserLeader",params);
const saveFileMeetingRelationOrgids = (params)=>postSwAction("/filemeeting/relation/saveFileMeetingRelationOrgids",params);

const saveParamsGroupParams = (params)=>postDevareaAction("/params/group/saveParamsGroupParams",params);
const queryPermissionsByUser = (params)=>getUsercenterAction("/sys/permission/queryByUser",params);
const loadAllRoleIds = (params)=>getUsercenterAction("/sys/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>getUsercenterAction("/sys/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>getUsercenterAction("/sys/permission/queryPermissionRule",params);

// 部门管理
const queryDepartTreeList = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryTreeList",params);
const queryIdTree = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryIdTree",params);
const queryParentName   = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryParentName",params);
const searchByKeywords   = (params)=>getUsercenterAction("/sysdepart/sysDepart/searchBy",params);
const deleteByDepartId   = (params)=>deleteUsercenterAction("/sysdepart/sysDepart/delete",params);
const queryDepartIndexGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartIndexGroup",params); //部门有哪些分组的首页权限
const queryDepartLeaderCommentGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartLeaderCommentGroup",params); //部门有哪些分组的批示权限
const queryDepartLeaderShowGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartLeaderShowGroup",params); //部门有哪些分组的首页权限
const queryDepartAssignGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartAssignGroup",params); //部门有哪些分组的交办权限
const queryDepartSzfAssignGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartSzfAssignGroup",params); //部门有哪些分组的省政府交办权限
const queryDepartCooperationGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartCooperationGroup",params); //部门有哪些分组的协办权限
const queryDepartSzfCooperationGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartSzfCooperationGroup",params); //部门有哪些分组的省政府协办权限
const queryDepartDataRoleGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartDataRoleGroup",params); //部门有哪些分组的协办权限
const queryDepartTaskRoleGroup = (params)=>getUsercenterAction("/sysdepart/sysDepart/queryDepartTaskRoleGroup",params); //部门有哪些分组的任务权限
const queryBasicRegionScreenDataGroup = (params)=>getUsercenterAction("/common/region/queryBasicRegionScreenDataGroup",params); //行政区展示哪些单位的任务量及分数
const editIndexGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editIndexGroups",params);//首页单位权限修改
const editLeaderCommentGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editLeaderCommentGroups",params);//领导批示权限修改
const editLeaderShowGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editLeaderShowGroups",params);//领导显示权限修改

const editAssignGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editAssignGroups",params);//交办单位权限修改
const editSzfAssignGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editSzfAssignGroups",params);//省政府交办单位权限修改
const editCooperationGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editCooperationGroups",params);//协办单位权限修改
const editSzfCooperationGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editSzfCooperationGroups",params);//协办单位权限修改
const editDataRoleGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editDataRoleGroups",params);//协办单位权限修改
const editTaskRoleGroups = (params)=>putUsercenterAction("/sysdepart/sysDepart/editTaskRoleGroups",params);//单位任务权限修改
const editBasicRegionScreenDataGroup = (params)=>putUsercenterAction("/common/region/editBasicRegionScreenDataGroup",params); //行政区展示哪些单位的任务量及分数
const editDataDevareaGroups = (params)=>putUsercenterAction("/sys/devarea/goadd",params);//编辑行政机构管理的开发区
const editDataDDUserGroups = (params)=>putUsercenterAction("/sys/dduser/goadd",params);
//单位分组管理
const addDepartGroup = (params)=>postUsercenterAction("/sys/departGroup/add",params);
const editDepartGroup = (params)=>putUsercenterAction("/sys/departGroup/edit",params);
const checkDepartGroupCode = (params)=>getUsercenterAction("/sys/departGroup/checkGroupCode",params);
const queryallDepartGroup = (params)=>getUsercenterAction("/sys/departGroup/queryallV2",params);
const queryDevAreaRegionGroup = (params)=>getUsercenterAction("/sys/devarea/queryregion",params);
//const queryDevAreaGroup = (params)=>getUsercenterAction("/sys/devarea/querydevarea",params);
const queryDepartDataGroup = (params)=>getUsercenterAction("/sys/devarea/loaddev",params);
const queryDDUserGroups = (params)=>getUsercenterAction("/sys/dduser/treeuser",params);//获取钉钉树列表
const queryDDtreeDataGroup = (params)=>getUsercenterAction("/sys/dduser/loaduser",params);

//领导分组管理
const addLeaderGroup = (params)=>postUsercenterAction("/common/leaderGroup/add",params);
const editLeaderGroup = (params)=>putUsercenterAction("/common/leaderGroup/edit",params);
const checkLeaderGroupCode = (params)=>getUsercenterAction("/common/leaderGroup/checkGroupCode",params);
const queryallLeaderGroup = (params)=>getUsercenterAction("/common/leaderGroup/queryallV3",params);

//日志管理
//const getLogList = (params)=>getUsercenterAction("/sys/log/list",params);
const deleteLog = (params)=>deleteUsercenterAction("/sys/log/delete",params);
const deleteLogList = (params)=>deleteUsercenterAction("/sys/log/deleteBatch",params);

//数据字典
const addDict = (params)=>postUsercenterAction("/sys/dict/add",params);
const editDict = (params)=>putUsercenterAction("/sys/dict/edit",params);
//const getDictList = (params)=>getUsercenterAction("/sys/dict/list",params);
const treeList = (params)=>getUsercenterAction("/sys/dict/treeList",params);
const delDict = (params)=>deleteUsercenterAction("/sys/dict/delete",params);
const getDictItemList = (params)=>getUsercenterAction("/sys/dictItem/list",params);
const addDictItem = (params)=>postUsercenterAction("/sys/dictItem/add",params);
const editDictItem = (params)=>putUsercenterAction("/sys/dictItem/edit",params);
//const delDictItem = (params)=>deleteUsercenterAction("/sys/dictItem/delete",params);
//const delDictItemList = (params)=>deleteUsercenterAction("/sys/dictItem/deleteBatch",params);

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params)=>getUsercenterAction(`/sys/dict/getDictItems/${code}`,params);

//单位标签专用（通过code获取字典数组）
export const ajaxGetDepartItems = (code, params)=>getUsercenterAction(`/sys/departGroup/info/${code}`,params);

//系统通告
const doReleaseData = (params)=>getUsercenterAction("/sys/annountCement/doReleaseData",params);
const doReovkeData = (params)=>getUsercenterAction("/sys/annountCement/doReovkeData",params);
//获取系统访问量
const getLoginfo = (params)=>getUsercenterAction("/sys/loginfo",params);
//数据日志访问
// const getDataLogList = (params)=>getUsercenterAction("/sys/dataLog/list",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>getUsercenterAction("/sys/user/queryUserByDepId",params);

// 查询用户角色表里的所有信息
const queryUserRoleMap = (params)=>getUsercenterAction("/sys/user/queryUserRoleMap",params);
// 重复校验
const duplicateCheck = (params)=>getUsercenterAction("/sys/duplicate/check",params);

export {
  // imgView,
  // doMian,
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  queryDepartIndexGroup,
  queryDepartLeaderCommentGroup,
  queryDepartLeaderShowGroup,
  queryDepartAssignGroup,
  queryDepartSzfAssignGroup,
  queryDepartCooperationGroup,
  queryDepartSzfCooperationGroup,
  queryDepartDataRoleGroup,
  queryDepartTaskRoleGroup,
  getUserList,
  queryall,
  frozenBatch,
  checkUsername,
  changUsername,
  changPassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  delDict,
  getDictItemList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryDepartGroupDeparts,
  queryDepartGroupDepartsName,
  queryLeaderGroupLeadersName,
  queryParamsGroupParamsName,
  queryLeaderGroupLeaders,
  queryLeaderDepartLeaders,
  queryLeaderServiceDepartLeaders,
  queryFileMeetingRelationOrgids,

  queryParamsGroupParams,
  saveDepartGroupDeparts,
  saveLeaderGroupLeaders,
  saveLeaderDepartLeaders,
  saveLeaderServiceDepartLeaders,
  saveSysUserLeader,
  saveFileMeetingRelationOrgids,

  saveParamsGroupParams,
  queryDepartIndexGroupInfo,
  queryDepartLeaderCommentGroupInfo,
  queryDepartLeaderShowGroupInfo,
  queryDepartAssignGroupInfo,
  queryDepartSzfAssignGroupInfo,
  queryDepartCooperationGroupInfo,
  queryDepartSzfCooperationGroupInfo,
  queryBasicRegionScreenDataGroup,
  editIndexGroups,
  editLeaderCommentGroups,
  editLeaderShowGroups,
  editAssignGroups,
  editSzfAssignGroups,
  editCooperationGroups,
  editSzfCooperationGroups,
  editDataRoleGroups,
  editTaskRoleGroups,
  editBasicRegionScreenDataGroup,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  queryUserByDepId,
  queryUserRoleMap,
  duplicateCheck,
  queryTreeListForRole,
  queryTreeListForDepartGroup,
  queryTreeListForLeaderGroup,
  queryOrgList,
  queryTreeListForParamsGroup,
  addDepartGroup,
  editDepartGroup,
  checkDepartGroupCode,
  queryallDepartGroup,
  addLeaderGroup,
  editLeaderGroup,
  checkLeaderGroupCode,
  queryallLeaderGroup,
  queryDevAreaRegionGroup,
  //queryDevAreaGroup,
  editDataDevareaGroups,
  queryDepartDataGroup,
  queryDDUserGroups,
  queryDDtreeDataGroup,
  editDataDDUserGroups,
  changOpenId,
  changDdUserId	
  
}



