import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartProduct } from 'src/app/interfaces/cart.interfaces';
import { Store } from "@ngrx/store";
import { AppState } from 'src/app/app.reducer';

import * as uiActions from '../../../../shared/ui.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  showModal: boolean;
  uiSubscription: Subscription;

  @Input() public product: ICartProduct;

  constructor(private store: Store<AppState>,){}

  ngOnInit(){
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.showModal = ui.openModal);
  }

  closeModal(){
    this.showModal = false;
    this.store.dispatch(uiActions.closeModal());
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
