export interface HeaderState {
    navItems: NavItem[],
    isSidebarVisible: boolean,
    isProfileVisible: boolean,
    isLogoutDialogVisile: boolean,
}

interface NavItem {
  title: string,
  path: string,
}