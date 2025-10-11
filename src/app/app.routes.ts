import { Routes } from '@angular/router';
import { PATHS } from './common/constants/paths';
import { Login } from './auth/login/login';
import { AuthGuard } from './auth/auth.guard';
import { Index } from './index';
import { Supervisors } from './supervisors/supervisors';
import { Home } from './home/home';
import { Members } from './members/members';
import { Pillars } from './pillars/pillars';

export const routes: Routes = [
    { path: PATHS.INDEX(), redirectTo: PATHS.HOME(), pathMatch: 'full' },

    {
        path: PATHS.INDEX(),
        component: Index,
        canActivate: [AuthGuard.canAct],
        children: [
            { path: PATHS.HOME(), component: Home },
            { path: PATHS.SUPERVISORS(), component: Supervisors },
            { path: PATHS.MEMBERS(), component: Members },
            { path: PATHS.PILLARS(), component: Pillars },
        ]
    },

    { path: PATHS.LOGIN(), component: Login, canActivate: [AuthGuard.canLogin] },
];
