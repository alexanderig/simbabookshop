import {Component, OnInit} from '@angular/core'
import {AuthorsService} from '../shared/services/authors.service'
import {Author} from '../shared/interfaces'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-authors-page',
  templateUrl: './authors-page.component.html',
  styleUrls: ['./authors-page.component.css']
})
export class AuthorsPageComponent implements OnInit {

  authors$: Observable<Author[]>

  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit() {
    this.authors$ = this.authorsService.fetch()
  }

}
