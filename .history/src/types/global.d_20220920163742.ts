// * Vite
declare type Recordable<T = any> = Record<string, T>
declare module 'axios'

declare interface ViteEnv {
  VITE_API_URL: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_GLOB_APP_TITLE: string
  VITE_DROP_CONSOLE: boolean
  VITE_PROXY_URL: string
  VITE_BUILD_GZIP: boolean
  VITE_REPORT: boolean
}

/**
 * 菜单和树形接口数据类型
 */
declare interface Menu {
  id?: number | string // 菜单ID
  children?: Menu[] | []
  icon?: string | null // 菜单图标
  url?: string // 菜单地址
  name?: string // 菜单名称
  parentId?: string | null // 父级ID
  sort?: string // 排序
  code?: string // 资源编码
  hasChildren?: boolean //是否有子节点
  description?: string | null // 资源描述
  parentCode?: string
  areaCode?: string
  areaName?: string
  level?: string
  remark?: string
  type?: string
}

declare interface Page {
  current: number
  size: number
  total?: number
}
