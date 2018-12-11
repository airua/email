import { ScanData } from './../../models/scan-data.model';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController } from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';
import { EmailComposer } from '@ionic-native/email-composer';




@Injectable()
export class HistorialProvider {

  private historial:ScanData[] = [];
  email = {
    to: 'auriavaci@gmail.com',
    cc: 'erika@mustermann.de',
    bcc: ['john@doe.com'],
    attachments: [         
    ],
    subject: 'Cordova Icons',
    body: 'How are you? Nice greetings from Leipzig',
    isHtml: true
  };;

  constructor(private iab:InAppBrowser,
            private modalCtrl: ModalController,
            public emailComposer: EmailComposer) {
    
              
  }

  agregar_elemento_historial(texto: string){
    let dato = new ScanData(texto);
    //metemo un elemento al principio del array
    this.historial.unshift(dato);

    //despues de crea el elemnot, lo abrimos
    this.abrir_elemento_historial();

  }

  cargar_historial (){
    return this.historial;
  }

  abrir_elemento_historial(index:number = 0){
    let elemento = this.historial[index];
    console.log(elemento);
    switch(elemento.tipo){
      case "web":
        this.iab.create(elemento.info, "_system");
        break;
      case "mapa":
        this.modalCtrl.create(MapaPage,{coord:elemento.info})
              .present();
        break;
      case "correo"://correo
        this.emailComposer.isAvailable().then((available: boolean) =>{
          if(available) {
            this.emailComposer.open(this.email);
          }
         });     
         
         
        break;
      default:
        console.error("Tipo no soportado");



      


    }

  }

}
