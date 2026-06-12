import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // Home page
  { path: '', component: HomeComponent },
  

  // Lazy-loaded group modules
  {
    path: 'grp-a',
    loadChildren: () =>
      import('./grp-a/grp-a.module').then(m => m.GrpAModule)
  },
  {
    path: 'grp-b',
    loadChildren: () =>
      import('./grp-b/grp-b.module').then(m => m.GrpBModule)
  },
  {
    path: 'grp-c',
    loadChildren: () =>
      import('./grp-c/grp-c.module').then(m => m.GrpCModule)
  },
  {
    path: 'grp-d',
    loadChildren: () =>
      import('./grp-d/grp-d.module').then(m => m.GrpDModule)
  },
  {
    path: 'grp-e',
    loadChildren: () =>
      import('./grp-e/grp-e.module').then(m => m.GrpEModule)
  },
  {
    path: 'grp-f',
    loadChildren: () =>
      import('./grp-f/grp-f.module').then(m => m.GrpFModule)
  },
  {
    path: 'grp-g',
    loadChildren: () =>
      import('./grp-g/grp-g.module').then(m => m.GrpGModule)
  },

  // fallback (optional but recommended)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}