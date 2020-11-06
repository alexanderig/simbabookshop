import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import {AppComponent} from './app.component'
import {LoginPageComponent} from './login-page/login-page.component'
import {AppRoutingModule} from './app-routing.module'
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component'
import {RegisterPageComponent} from './register-page/register-page.component'
import {TokenInterceptor} from './shared/classes/token.interceptor'
import {HistoryPageComponent} from './history-page/history-page.component'
import {OrderPageComponent} from './order-page/order-page.component'
import {AuthorsPageComponent} from './authors-page/authors-page.component'
import {AuthorsFormComponent} from './authors-page/authors-form/authors-form.component'
import {BooksFormComponent} from './authors-page/authors-form/books-form/books-form.component'
import {OrderAuthorsComponent} from './order-page/order-authors/order-authors.component'
import {OrderBooksComponent} from './order-page/order-books/order-books.component'
import {HistoryListComponent} from './history-page/history-list/history-list.component'
import {HistoryFilterComponent} from './history-page/history-filter/history-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    AuthorsPageComponent,
    AuthorsFormComponent,
    BooksFormComponent,
    OrderAuthorsComponent,
    OrderBooksComponent,
    HistoryListComponent,
    HistoryFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
