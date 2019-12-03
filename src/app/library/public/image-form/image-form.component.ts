import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Image } from '../../entity/image';

@Component({
  selector: 'spk-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {

  @Input() image: Image;
  @Input() isCreate: boolean;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();

  @ViewChild("imageForm") imageForm: HTMLFormElement;
  uploadFile;
  src;

  constructor() { }
  ngOnInit() {
    if (this.isCreate) {
      this.image = new Image();
    }
  }
  onSubmit(f: NgForm) {
    if (this.image && this.image.name) {
      this.doSubmit.emit(this.image);
    }
  }
  onUploadComplete(result) {
    if (result) {
      this.image.imageSize = result["fileSize"];
      this.image.url = result["relativePath"];
    }
    this.src = window.location.origin + result["relativePath"];
  }
}
