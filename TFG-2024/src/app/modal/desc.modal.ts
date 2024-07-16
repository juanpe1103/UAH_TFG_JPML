import {Component, Input} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-desc-modal',
  imports: [
    IonicModule,
    FormsModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './desc.modal.html'
})
export class DescModalComponent {
  @Input() description: string = '';
  @Input() title: string;
  @Input() editarPunto: boolean;
  @Input() editarDescripcion: boolean;
  @Input() isLastLocation: boolean;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss(null, 'cancel');
  }

  delete() {
    this.modalController.dismiss(null, 'borrar');
  }

  addPoint(){
  this.modalController.dismiss(null, 'addPoint');
  console.log("TEST")
}

  accept() {
    this.modalController.dismiss({ description: this.description }, 'accept');
  }
}
