import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from '../../components/detail/detail.component';
import { Observable, Subject, delay, of, takeUntil } from 'rxjs';
import { RequestPokemonListUseCase } from 'src/app/core/usecases/pokemon/list-pokemon.usecase';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterListPipe } from 'src/app/shared/pipes/filter-list.pipe';
import { PkmDataModel } from 'src/app/core/domain/pokeon/pokemon-data.domain';
import { RequestPokemonListPaginateUseCase } from 'src/app/core/usecases/pokemon/list-pokemon-paginate.usecase';
import { Store } from '@ngrx/store';
import { comment, removeComment } from 'src/app/infra/store/action/comment/comment.actions';
import { CommentsComponent } from '../../components/comments/comments.component';
import { favorite, removeFavorite } from 'src/app/infra/store/action/favorite/favorite.actions';

@Component({
  selector: 'pkm-list',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    NgbPaginationModule,
    RouterModule,
    ReactiveFormsModule,
    FilterListPipe
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  currentDialog: any = null;
  pkmList!: any;
  formFilter!: FormGroup;
  page: number = 1;
  collectionSize: number = 0;
  loading: boolean = false;
  showComment$!: Observable<any>
  showFavorite$!: Observable<any>
  commentRepository: Observable<any[]> = new Observable(e => e.next([]));

  constructor(
    private modalService: NgbModal,
    private getListPkm: RequestPokemonListUseCase,
    private getListPkmPaginate: RequestPokemonListPaginateUseCase,
    private fb: FormBuilder,
    private store: Store<{ textcomment: any, favoritePkm: any }>
  ) {

    this.showComment$ = store.select('textcomment');
    this.showFavorite$ = store.select('favoritePkm');

    this.showFavorite$.subscribe(e => {
      console.log(e)
    })
  }

  //---------------------------
  // Controle de ciclo de vida
  //---------------------------
  ngOnInit(): void {
    this.callInitialList();
    this.createFormFilter()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

  //---------------------------
  // Controle de fomulários
  //---------------------------
  createFormFilter(): void {
    this.formFilter = this.fb.group({
      pkmFilterName: [null, Validators.required]
    })
  }

  setformFieldFilter(val: string) {
    this.formFilter?.get('pkmFilterName')?.setValue(val)
  }

  get formFieldFilter() {
    return this.formFilter.get('pkmFilterName')?.value
  }

  //---------------------------
  // Modals
  //---------------------------
  openModalDetail(id: number) {
    this.currentDialog = this.modalService.open(DetailComponent, { centered: true, size: 'lg'});
    this.currentDialog.componentInstance.pkmId = id;
  }

  openModalComment(id: number) {
    this.currentDialog = this.modalService.open(CommentsComponent, { centered: true, size: 'lg'});
    this.currentDialog.componentInstance.pkmId = id;
  }

  callInitialList() {
    this.loading = true;
    this.setformFieldFilter('');

    this.getListPkm.execute().pipe(delay(800), takeUntil(this.destroy$)).subscribe((e: PkmDataModel) => {
      this.loading = false;
      this.collectionSize = e.count;
      this.pkmList = e;
    })
  }

  callPaginateList(event: number){    
    this.loading = true;
    let limit = this.pkmList.next.split('/')[6].split('&')[1].split('=')[1];
    let calcOffSet = event === 1 ? 0 : event * 10;
    
    this.getListPkmPaginate.execute({limit: limit, offSet: calcOffSet}).pipe(takeUntil(this.destroy$)).subscribe((e: PkmDataModel) => {
      this.loading = false;
      this.pkmList = e;
    })
  }

  onLoadImg(evt: HTMLElement){
    evt.remove();
  }

  loadImg(id: any){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  uppercaseTitle(title: string): string{
    const str = title;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  removeComment(id: number) {
    this.store.dispatch(removeComment({id: Number(id)}));
  }

  favorite(id: number) {
    this.store.dispatch(favorite({id: id}));
  }

  removeFavorite(id: number) {
    this.store.dispatch(removeFavorite({id: id}));
  }
}
