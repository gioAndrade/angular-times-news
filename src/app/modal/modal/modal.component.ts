import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() content: any;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openModal() {
    const initialState = {
      ...this.content
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Fechar';
    console.log(this.content)
  }
}

/* This is a component which we pass in modal*/

@Component({
  selector: 'modal-news-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="news-img">
        <img src="{{multimedia[0].url}}" alt="{{multimedia[0].caption}}" />
        </div>
        <p>{{abstract}}</p>
        <div class="btn-show-more">
        <a href="{{short_url}}" target="_blank" class="btn btn-primary">Ver mais</a>

        </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
})

export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }
}
