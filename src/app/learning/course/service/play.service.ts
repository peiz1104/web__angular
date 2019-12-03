import { Rco } from './../entity/rco';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from '../../../core';
import { FormDataUtil } from 'app/core/utils';

@Injectable()
export class PlayService {
  constructor(private http: Http, private httpAdaptor: HttpAdaptor) { }

  getOutline(courseId: number, param?: any): Observable<any> {
    return this.httpAdaptor.get(`/api/learner/play/course/${courseId}/outline`, { params: param });
  }
  getDefaultContentServer() {
    return this.httpAdaptor.get(`/api/contentServers/default`);
  }
  getPlayInfo(rcoId: number) {
    return this.httpAdaptor.get(`/api/learner/play/rco/${rcoId}/play-info`);
  }
}
