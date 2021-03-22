import { CreatedInstComponent } from './Components/Pages/institutions/created-inst/created-inst.component';
import { InstEditComponent } from './Components/Pages/institutions/inst-edit/inst-edit.component';
import { EditBranchComponent } from './Components/Pages/institutions/edit-branch/edit-branch.component';
import { BranchesComponent } from './Components/Pages/institutions/branches/branches.component';
import { CreateBranchComponent } from './Components/Pages/institutions/create-branch/create-branch.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionsComponent } from './Components/Pages/institutions/institutions.component';
import { CreateInstComponent } from './Components/Pages/institutions/create-inst/create-inst.component';

import { UsersComponent } from './Components/Pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  { path: 'login', component: LoginComponent },

  {
    path: 'institutions',
    component: InstitutionsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'institutions/:id',
    component: CreateInstComponent,
  },

  {
    path: 'institutions/:id/created',
    component: CreatedInstComponent,
  },

  {
    path: 'institutions/:id/edit',
    component: InstEditComponent,
  },

  {
    path: 'institutions/:id/branches/create',
    component: CreateBranchComponent,
  },

  {
    path: 'institutions/:institutionId/branches/:branchId',
    component: BranchesComponent,
  },

  {
    path: 'institutions/:institutionId/branches/:branchId/edit',
    component: EditBranchComponent,
  },

  {
    path: 'institutions/create',
    component: CreateInstComponent,
  },

  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  InstitutionsComponent,
  UsersComponent,
  CreateInstComponent,
  EditBranchComponent,
  BranchesComponent,
  LoginComponent,
  InstEditComponent,
  PageNotFoundComponent,
  CreatedInstComponent,
];
