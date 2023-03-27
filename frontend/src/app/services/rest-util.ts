import { HttpParams } from '@angular/common/http';
import { PageRequest } from '../models/page';

export class RestUtil {
  public static buildParamsFromPageRequest(
    filter: Partial<PageRequest>
  ): HttpParams {
    const { pageIndex, pageSize, sort, direction, term, status } = filter;
    // using let and reassigning params, because httpParams is immutable, so .set() returns new object.
    let params = new HttpParams();
    if (pageIndex != null) {
      params = params.set('page', String(pageIndex));
    }
    if (pageSize != null) {
      params = params.set('size', String(pageSize));
    }
    if (sort != null) {
      params = params.set('sort', sort + ',' + direction ?? '');
    }
    if (term != null) {
      params = params.set('term', term);
    }
    if (status != null) {
      params = params.set('status', status);
    }

    return params;
  }
  public static buildParamsFromPageRequest2(
    title: string,
    filter: Partial<PageRequest>
  ): HttpParams {
    // using let and reassigning params, because httpParams is immutable, so .set() returns new object.

    let params = RestUtil.buildParamsFromPageRequest(filter);

    if (title != null) {
      params = params.set('title', title);
    }

    return params;
  }
}
