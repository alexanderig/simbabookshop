import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {LoginPageComponent} from './login-page/login-page.component'
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component'
import {RegisterPageComponent} from './register-page/register-page.component'
import {AuthGuard} from './shared/classes/auth.guard'
import {HistoryPageComponent} from './history-page/history-page.component'
import {OrderPageComponent} from './order-page/order-page.component'
import {AuthorsPageComponent} from './authors-page/authors-page.component'
import {AuthorsFormComponent} from './authors-page/authors-form/authors-form.component'
import {OrderAuthorsComponent} from './order-page/order-authors/order-authors.component'
import {OrderBooksComponent} from './order-page/order-books/order-books.component'


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'history', component: HistoryPageComponent},
      {path: 'order', component: OrderPageComponent, children: [
          {path: '', component: OrderAuthorsComponent},
          {path: ':id', component: OrderBooksComponent}
      ]},
      {path: 'authors', component: AuthorsPageComponent},
      {path: 'authors/new', component: AuthorsFormComponent},
      {path: 'authors/:id', component: AuthorsFormComponent}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
