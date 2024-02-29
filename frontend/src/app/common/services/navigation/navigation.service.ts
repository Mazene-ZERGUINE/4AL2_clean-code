import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, distinctUntilChanged, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  getQueryParamValueFromActivatedRoute$<T extends string = string>(
    activatedRoute: ActivatedRoute,
    queryParam: string,
  ): Observable<T | null> {
    return activatedRoute.queryParams.pipe(
      map((queryParams: Params) => queryParams[queryParam] ?? null),
      distinctUntilChanged(),
    );
  }

  addQueriesToCurrentUrl(queryParams: Record<string, unknown>): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
      preserveFragment: true,
      replaceUrl: false,
    });
  }
}
