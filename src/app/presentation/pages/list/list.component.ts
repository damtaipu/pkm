import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from '../../components/detail/detail.component';
import { Subject, delay, of, takeUntil } from 'rxjs';
import { RequestPokemonList } from 'src/app/core/usecases/pokemon/list-pokemon.usecase';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterListPipe } from 'src/app/shared/pipes/filter-list.pipe';
import { PkmDataModel } from 'src/app/core/domain/pokeon/pokemon-data.domain';
import { RequestPokemonListPaginate } from 'src/app/core/usecases/pokemon/list-pokemon-paginate.usecase';

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

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private getListPkm: RequestPokemonList,
    private getListPkmPaginate: RequestPokemonListPaginate,
    private fb: FormBuilder
  ) {

    this.route.url.subscribe(e => {
      e.forEach(r => {
        if (r.path === 'detail') {
          this.openDetailRoute()
        }
      })
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

  openDetailRoute() {
    this.currentDialog = this.modalService.open(DetailComponent, { centered: true, ariaLabelledBy: 'modal-basic-title' });

    this.currentDialog.result.then((result: any) => {
      this.router.navigateByUrl('/');
    }, (reason: any) => {
      this.router.navigateByUrl('/');
    });
  }

  callInitialList() {
    this.loading = true;
    this.setformFieldFilter('')

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
    evt.remove()
  }

  loadImg(id: any){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }

  uppercaseTitle(title: string): string{
    const str = title;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }







}
