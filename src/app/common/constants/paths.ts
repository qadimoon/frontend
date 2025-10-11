const getPath = (realtive: boolean, route: string) => `${realtive ? '' : '/'}${route}`

export const PATHS = {
    LOGIN: (relative = true) => getPath(relative, 'login'),

    INDEX: (relative = true) => getPath(relative, ''),
    HOME: (relative = true) => getPath(relative, 'home'),
    SUPERVISORS: (relative = true) => getPath(relative, 'supervisors'),
    MEMBERS: (relative = true) => getPath(relative, 'members'),
    PILLARS: (relative = true) => getPath(relative, 'pillars'),
}