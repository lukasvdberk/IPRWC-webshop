import {ActivatedRouteSnapshot} from "@angular/router";

export class GuardUtil {
  static getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
  }
}
