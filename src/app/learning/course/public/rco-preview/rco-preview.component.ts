import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rco } from './../../entity/rco';
import { PlayService } from './../../service/play.service';
import { ScormData } from './scorm-data';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-rco-preview',
    templateUrl: './rco-preview.component.html',
    styleUrls: ['./rco-preview.component.scss'],
    providers: [
        PlayService
    ]
})
export class RcoPreviewComponent implements OnInit, OnDestroy {

    @Input() actionBool: boolean = false;
    @Input() mobileBool?: boolean = false;
    @Input() rootRco: Rco;
    @Input() currentRcoId: number;
    openRightBool: boolean = false;
    directoryBool: boolean = true;
    messageBool: boolean = true;

    cmiPath: string = '';
    scormCmiPath: string = '/lmsapi/scorm/cmi.html';
    videoCmiPath: string = '/lmsapi/video/cmi.html';
    pdfCmiPath: string = '/lmsapi/pdf/cmi.html';
    liveCmiPath: string = '/lmsapi/video/cmi-live.html';
    timeString: string;
    currentRco: Rco;
    scormData: ScormData;
    defaultContentServer: string = '';
    playUrl: string = '/lmsapi/common/html/loading.html';
    safePlayUrl: SafeResourceUrl;
    private timer;
    @Input() courseId: number;
    courseDetailId: any;
    courseInfo: any;
    selectId: number;

    playMode: string = 'PREVIEW';

    rcos: Rco[];

    err: any;

    sideFold: boolean = false;

    constructor(
        private playService: PlayService,
        private route: ActivatedRoute,
        public sanitizer: DomSanitizer,
        private router: Router,
    ) {
        this.scormData = new ScormData();
    }

    ngOnInit() {
        console.log('是否是手机播放：', this.mobileBool);
        this.appendEvent()
        this.urlToSafe();
        // this.route.params.subscribe(data => {
        //   this.currentRcoId = +data['rcoId'];
        //   this.courseId = +data['courseId'];
        //   // console.log(this.courseId);
        // });
        // 初始化默认内容服务器，当rco对象的contentServerPath值为空时使用
        this.playService.getDefaultContentServer().subscribe(
            obj => {
                if (obj && obj.fullPath) {
                    this.defaultContentServer = obj.fullPath;
                    // console.log(this.defaultContentServer);
                }
            },
            err => this.err = err
        );
        this.playService.getOutline(this.courseId).subscribe(
            obj => {
                this.rcos = obj;
                let firstAvilableRco: Rco;
                // get default rco to play
                this.rcos.forEach((rco, index) => {
                    if (!firstAvilableRco && rco.isEnabled) {
                        firstAvilableRco = rco;
                    }
                    if (this.currentRcoId) {
                        this.selectId = this.currentRcoId;
                        if (rco.id === this.currentRcoId) {
                            this.currentRco = rco;
                        }
                    } else if (!this.currentRcoId && rco.isCurrent) {
                        this.selectId = rco.id;
                        this.currentRco = rco;
                    }
                });
                if (!this.currentRco) {
                    this.currentRco = firstAvilableRco;
                }

                this.parseOutline();
            },
            err => this.err = err,
            () => {
                // console.log(this.currentRco);
                this.autoPlay(this.currentRco);
            }
        );
    }

    autoPlay(rco: Rco) {
        this.play(rco);
    }
    clickPlay(rco: Rco) {
        if (rco.isCurrent) {
            // this._message.info('视频正在播放');
            return;
        }
        this.play(rco);
    }
    play(rco: Rco) {
        console.log('是否加载视频：', rco.isEnabled);
        if (!rco.isEnabled) {
            return;
        }
        // build playUrl
        // 更新当前章节状态
        this.rcos.forEach((rcoItem, index) => {
            rcoItem.isCurrent = false;
        });
        rco.isCurrent = true;
        this.buildPlayUrl(rco);
        this.urlToSafe();
        // console.log(this.safePlayUrl);
    }
    // // 解决Angular框架中动态修改iframe的src报错问题
    urlToSafe() {
        this.safePlayUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.playUrl);
    }
    buildPlayUrl(rco: Rco) {
        // debugger;
        // let playUrl: string = '';
        let startingUrl: string = rco.startingUrl;
        let contentServerPath: string;
        if (rco.contentServerPath) {
            contentServerPath = rco.contentServerPath;
        } else if (this.defaultContentServer) {
            contentServerPath = this.defaultContentServer;
        } else {
            contentServerPath = '';
        }
        // debugger;
        if (!startingUrl.startsWith('http')) {
            startingUrl = contentServerPath + startingUrl;
        }
        if (rco.trackingType === 'AUTO') {
            this.playUrl = startingUrl;
        } else {
            if (rco.trackingType === 'VIDEO') {
                this.cmiPath = this.videoCmiPath;
            } else if (rco.trackingType === 'CMI') {
                this.cmiPath = this.scormCmiPath;
            } else if (rco.trackingType === 'DOC') {
                this.cmiPath = this.pdfCmiPath;
            } else if (rco.trackingType === 'LIVE') {
                this.cmiPath = this.liveCmiPath;
            }
            this.playService.getPlayInfo(rco.id).subscribe(
                playInfo => {
                    // this.buildPlayUrl(rco, obj);
                    // console.log(this.safePlayUrl);
                    this.playUrl = contentServerPath + this.cmiPath + '?content=' + playInfo.startingUrl;
                    if (rco.trackingType === 'DOC') {
                        if (this.mobileBool) {
                            this.playUrl += '&viewMode=image'
                        } else {
                            this.playUrl += '&viewMode=pdf'
                        }
                        if (playInfo.imageType) {
                            this.playUrl += '&imageType=' + playInfo.imageType;
                        }
                        if (playInfo.number) {
                            this.playUrl += '&number=' + playInfo.number;
                        }
                    }
                    if (rco.trackingType === 'VIDEO') {
                        if (playInfo.sources && playInfo.sources.length > 0) {
                            this.playUrl += '&sources=' + encodeURIComponent(JSON.stringify(playInfo.sources));
                        }
                    }

                    this.urlToSafe();
                },
                err => {
                    // console.log('获取播放信息失败');
                    tipMessage('获取播放信息失败');
                });
        }
    }

    ngOnDestroy() {
        this.removeEvent();
        clearInterval(this.timer);
    }

    handleMessage(event: MessageEvent) {
        if (event.data && event.data.type !== 'webpackOk') {
            let message = JSON.parse(event.data);
            if (message.type === 'init') {
                this.initScormCmi();
            } if (message.type === 'mp4') {
            } if (message.type === 'updateInfo') {
            } else if (message.type === 'loaded') {
                // document.getElementById("loadingDiv").style.display="none";
                // document.getElementById("mobileplayer_page").style.display="";
            }
        }
    }
    appendEvent() {
        if (window.addEventListener) {  // all browsers except IE before version 9
            window.addEventListener('message', (event) => this.handleMessage(event), false);
        }
    }

    removeEvent() {
        window.removeEventListener('message', this.handleMessage, false);
    }

    /**
     * @数据跨域传输部分
     */
    getMathNum() {
        return Math.floor(Math.random() * (1000 + 1));
    }

    // // 播放scorm类型课件时，初始化cmi。
    initScormCmi() {
        let initStr = '{"playType":"preview", "type":"initData","GetParam":' + JSON.stringify(this.scormData) + ',"mathNum":'
            + this.getMathNum() + '}';
        this.send(initStr);
    }

    send(message) {
        let cmiIframe = document.getElementById('cmi-frame');
        let win = (<HTMLIFrameElement>cmiIframe).contentWindow;
        win.postMessage(message, '*');
    }

    // 退出全屏
    exitScreen() {
        let elem = document.documentElement;
        let exitMethod: Function = elem['exitFullscreen'] || elem['webkitExitFullscreen']
            || elem['mozCancelFullScreen'];
        if (exitMethod) {
            exitMethod.call(elem);
            elem.focus();
        }
    }



    toggleSide() {
        this.sideFold = !this.sideFold;
    }

    parseOutline(parent?) {
        if (!parent) {
            parent = this.getRootNode();
        }

        if (parent) {
            const children = this.rcos.filter(it => it['parentId'] == parent.id);
            if (children && children.length > 0) {
                parent['children'] = children;
                children.forEach(it => this.parseOutline(it));
            }
        }
    }

    getRootNode() {
        if (this.rcos) {
            return this.rcos.find(it => !it['parentId']);
        }
    }
}
