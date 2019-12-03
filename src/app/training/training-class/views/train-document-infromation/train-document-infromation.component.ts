import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'spk-train-document-infromation',
    templateUrl: './train-document-infromation.component.html',
    styleUrls: ['./train-document-infromation.component.scss']
})
export class TrainDocumentInfromationComponent implements OnInit {
    currentIndexTable = 0;
    constructor() { }

    ngOnInit() {
    }
    changetabselect(event) {
        this.currentIndexTable = event.index;
    }

}
