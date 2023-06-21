import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { comment } from 'src/app/infra/store/action/comment/comment.actions';

@Component({
  selector: 'pkm-comments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public pkmId!: number;
  loading: boolean = true;
  formSaveComment!: FormGroup;
  

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private store: Store<{ textcomment: any }>
    ){}

  ngOnInit(): void {
    this.createFormSaveComment();
  }

  //---------------------------
  // Controle de fomulários
  //---------------------------
  createFormSaveComment(): void {
    this.formSaveComment = this.fb.group({
      cmtName: [null, Validators.required],
      cmtComment: [null, Validators.required]
    })
  }

  get formrFieldName() {
    return this.formSaveComment.get('cmtName')?.value;
  }

  get formErrorFieldName() {
    return this.formSaveComment.get('cmtName');
  }

  get formrFieldComment() {
    return this.formSaveComment.get('cmtComment')?.value;
  }

  get formErrorFieldComment() {
    return this.formSaveComment.get('cmtComment');
  }

  get formParams() {
    return this.formSaveComment;
  }


  saveComment(){
    this.store.dispatch(comment({text: this.formrFieldComment, id: this.pkmId, name: this.formrFieldName}));
    this.closeModal();
  }

  closeModal(){
    this.activeModal.close()
  }

}
