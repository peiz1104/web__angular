import { HttpUtils } from './../../../core/http/http-utils';
import { Documentlib } from 'app/library/entity/documentlib';
import { FormDataUtil } from './../../../core/utils/form-data-util';
import { Material } from './../entity/material';
import { BaseService, HttpAdaptor, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MaterialService {
    private url = "/api/materialGroup/{materialGroupId}/materials";

    constructor(protected httpAdaptor: HttpAdaptor) {}

    private getUrl(materialGroupId) {
        return this.url.replace("{materialGroupId}", materialGroupId);
    }

    list(materialGroupId, params?, page?): Observable<Pagination<Material>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }

        return this.httpAdaptor.get(this.getUrl(materialGroupId), {params: params});
    }

    findReferenceDocument(materialGroupId, params?, page?): Observable<Pagination<Documentlib>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }

        return this.httpAdaptor.get(this.getUrl(materialGroupId) + `/document`, {params: params});
    }

    getOne(materialGroupId, materialId): Observable<Material> {
        return this.httpAdaptor.get(this.getUrl(materialGroupId) + `/${materialId}`);
    }

    create(materialGroupId, data): Observable<any> {
        console.log("保存文件信息为：", data);
        let formData = FormDataUtil.covert(data);
        console.log("保存文件信息为：", formData);
        return this.httpAdaptor.post(this.getUrl(materialGroupId) + `/upload`, formData);
    }

    createFromDocument(materialGroupId, materials: Material[]): Observable<any> {
        return this.httpAdaptor.put(this.getUrl(materialGroupId) + `/saveReference`, materials);
    }

    update(materialGroupId, material, materialId): Observable<any> {
        let formData = FormDataUtil.covert(material);
        return this.httpAdaptor.post(this.getUrl(materialGroupId) + `/${materialId}`, formData);
    }

    delete(materialGroupId, ids: number[]) {
        return this.httpAdaptor.delete(this.getUrl(materialGroupId), {params: {ids: ids}});
    }

    download(materialGroupId, materialId): Observable<Blob> {
       // return this.httpAdaptor.get(this.getUrl(materialGroupId) + `/download/${materialId}`);
       let headers = new Headers({ 'Content-Type': 'application/json', 'MyApp-Application' : 'AppName', 'Accept': 'application/pdf' });
       let options = new RequestOptions({headers: headers, responseType: ResponseContentType.Blob});
       return this.httpAdaptor.http.get(this.getUrl(materialGroupId) + `/download/${materialId}`, options)
                .map(res => {console.log(res); res.blob()})
                .catch(HttpUtils.handleError);
     }
}
