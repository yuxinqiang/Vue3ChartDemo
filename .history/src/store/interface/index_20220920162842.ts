// 变量名对应含义请在 /stores/* 里边找
export interface UserInfo {
  adminToken?: string // 管理后台的token
  screenToken?: string // 大屏的登录token
  token: string
  menuList?: any[] // 菜单列表
  username?: string // 用户名
  name?: string // 姓名、昵称
}

/* MenuState */
export interface MenuState {
  isCollapse: boolean
  menuList: Menu[]
}

export interface Permission {
  buttonAuth: string[]
}
