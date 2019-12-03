import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from 'app/core/http/http-adaptor';
import { Site } from 'app/system/entity/site';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class SiteInfoService {
  private _currentSite: Site;
  private _managesSites: Site[];
  private _subject: Subject<Site>;

  constructor(private httpAdaptor: HttpAdaptor) {
    this._subject = new Subject();
  }

  getManagedSites(): Observable<Site[]> {
    return Observable.of([]);
  }

  currentSite(): Observable<Site> {
    if (this._currentSite) {
      this._subject.next(this._currentSite);
    } else {
      this.loadSiteInfo();
    }

    return this._subject.asObservable();
  }

  getSiteInfo(): Observable<Site> {
    if (this._currentSite) {
      return Observable.of(this._currentSite);
    }
    return this.httpAdaptor.get('/api/sites/currentSite').do(site => this._currentSite = site);
  }

  loadSiteInfo() {
    this.httpAdaptor.get('/api/sites/currentSite').do(site => {
      this._currentSite = site;
      this._subject.next(site);
    }).subscribe();
  }
}
