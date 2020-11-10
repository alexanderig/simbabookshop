import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorsService} from '../../shared/services/authors.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MaterialService} from '../../shared/classes/material.service';
import {Author} from '../../shared/interfaces';

@Component({
  selector: 'app-authors-form',
  templateUrl: './authors-form.component.html',
  styleUrls: ['./authors-form.component.css']
})
export class AuthorsFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview = '';
  isNew = true;
  author: Author;

  constructor(private route: ActivatedRoute,
              private authorsService: AuthorsService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.authorsService.getById(params['id']);
            }

            return of(null);
          }
        )
      )
      .subscribe(
        (author: Author) => {
          if (author) {
            this.author = author;
            this.form.patchValue({
              name: author.name
            });
            this.imagePreview = author.imageSrc;
            MaterialService.updateTextInputs();
          }

          this.form.enable();
        },
        error => MaterialService.toast(error.error.message)
      );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  deleteAuthor() {
    const decision = window.confirm(`Вы уверены, что хотите удалить автора "${this.author.name}"`);

    if (decision) {
      this.authorsService.delete(this.author._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/authors'])
        );
    }
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.authorsService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.authorsService.update(this.author._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      author => {
        this.author = author;
        MaterialService.toast('Изменения сохранены.');
        this.form.enable();
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

}
