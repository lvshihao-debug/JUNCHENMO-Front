/**
 * 服务器名称
 * SYSTEM: 系统相关接口
 */
enum SERVER_NAME {
  /**
   * 认证相关接口
   */
  AUTH = '/auth',
  /**
   * 系统相关接口
   */
  SYSTEM = '/system',
  /**
   * 生成相关接口
   */
  GEN = '/gen',
  /**
   * 定时任务相关接口
   */
  JOB = '/job',
}

/**
 * 服务器模块名称
 * SYSTEM: 系统角色相关接口
 */
enum SERVER_MODE_NAME {
  /**
   * 系统用户相关接口
   */
  SYSTEM_USER = '/system/user',
  /**
   * 系统角色相关接口
   */
  SYSTEM_ROLE = '/system/role',
  /**
   * 系统菜单相关接口
   */
  SYSTEM_MENU = '/system/menu',
  /**
   * 系统字典项相关接口
   */
  SYSTEM_DICT_TYPE = '/system/dict-type',
  /**
   * 系统字典值相关接口
   */
  SYSTEM_DICT_DATA = '/system/dict-data',
  /**
   * 系统日志相关接口
   */
  OPERACTION_LOG_DATA = '/system/operlog',
  /**
   * 用户设置相关接口
   */
  SYSTEM_USER_SETTING = '/system/sys-user-setting',

  /**
   * 缓存列表管理相关接口
   */
  SYSTEM_CACHE_LIST = '/system/cacheList',

  /**
   * 缓存监控相关接口
   */
  SYSTEM_CACHE_MONITOR = '/system/cacheMonitor',

  /**
   * 系统监控相关接口
   */
  SYSTEM_MONITOR = '/system/systemMonitor',

  /**
   * 生成table相关接口
   */
  GEN_TABLE = '/gen/tableGen',

  /**
   * 生成代码相关接口
   */
  GEN_CODE = '/gen/genCode',

  /**
   * 测试生成
   */
  TX_VIP = '/system/vip',

  /**
   * 用户登录日志
   */
  SYS_LOGININFOR = '/system/logininfor',

  /**
   * 用户任务
   */
  SYS_USER_TASK = '/system/task',

  /**
   * 系统定时任务
   */
  SYS_JOB = '/job/jobTask',

  /**
   * 系统定时任务日志
   */
  SYS_JOB_LOG = '/job/jobTaskLog',
}

export default {
  SERVER_NAME,
  SERVER_MODE_NAME,
}
