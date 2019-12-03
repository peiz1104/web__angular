import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'spk-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.scss']
})
export class VideoPlayComponent implements OnInit, OnChanges {

  videoCmiPath: string = '/lmsapi/video/cmi.html';
  @Input() path: string;
  @Input() autoPlay: boolean = true;
  playUrl: string = '';
  safePlayUrl: SafeResourceUrl;
  constructor(
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.playUrl = this.videoCmiPath + '?content=' + this.path + '&autoPlay=' + this.autoPlay;
    this.urlToSafe()
  }
  ngOnChanges() {
    this.playUrl = this.videoCmiPath + '?content=' + this.path + '&autoPlay=' + this.autoPlay;
    this.urlToSafe()
  }

  // // 解决Angular框架中动态修改iframe的src报错问题
  urlToSafe() {
    this.safePlayUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.playUrl);
  }
}
