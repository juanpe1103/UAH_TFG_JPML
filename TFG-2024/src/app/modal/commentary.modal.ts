import {Component, Input} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CommentaryDto} from "../model/rest";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-commentary-modal',
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    NgForOf
  ],
  standalone: true,
  templateUrl: './commentary.modal.html'
})
export class CommentaryModalComponent {
  description: string = '';
  score: number = 0;
  @Input() title: string;
  @Input() commentaries: Array<CommentaryDto>;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss(null, 'cancel');
  }

  delete() {
    this.modalController.dismiss(null, 'borrar');
  }

  accept() {
    this.modalController.dismiss({ description: this.description, score: this.score}, 'accept');
  }
}
