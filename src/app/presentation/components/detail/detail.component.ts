import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestPokemonDetaiUsesCase } from 'src/app/core/usecases/pokemon/detail-pokemon.usecase';

@Component({
  selector: 'pkm-detail',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit, OnDestroy {

  @ViewChild('content', { static: true }) modal!: NgbModal;

  destroy = new Subject<any>();
  closeResult = '';
  detail: any[] = [];
  public pkmId!: number;
  modalReference!: NgbModalRef;
  loading: boolean = false;

  constructor(
    private detailPkm: RequestPokemonDetaiUsesCase,
    public activeModal: NgbActiveModal
  ) {

   }

  ngOnInit(): void {
    this.getDatail(this.pkmId)
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  getDatail(id: number){
    this.detailPkm.execute(id).pipe(takeUntil(this.destroy)).subscribe((e: any) => {
      this.loading = true;
      this.detail = e.effect_entries;
    })
  }

  closeModal(){
    this.activeModal.close()
  }

}
