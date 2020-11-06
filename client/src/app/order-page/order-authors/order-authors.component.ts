import {Component, OnInit} from '@angular/core'
import {AuthorsService} from '../../shared/services/authors.service'
import {Observable} from 'rxjs'
import {Author} from '../../shared/interfaces'

@Component({
  selector: 'app-order-authors',
  templateUrl: './order-authors.component.html',
  styleUrls: ['./order-authors.component.css']
})
export class OrderAuthorsComponent implements OnInit {

  authors$: Observable<Author[]>

  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit() {
    this.authors$ = this.authorsService.fetch()
  }

}
