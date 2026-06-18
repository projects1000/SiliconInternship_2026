import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservableChatComponent } from './observable-chat.component';

const routes: Routes = [
  { path: '', component: ObservableChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservableChatRoutingModule {}
