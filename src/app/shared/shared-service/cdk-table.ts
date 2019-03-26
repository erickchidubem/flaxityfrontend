import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CdkTableService {

  constructor() { }

  GenerateCDKTable(_tableDataSource$,_currentPage$,_pageSize$,_heros$,_searchFormControl,_sortKey$,_sortDirection$,_dataOnPage$){

  combineLatest(_tableDataSource$,_currentPage$, _pageSize$)
.subscribe(([allSources, currentPage, pageSize]) => {
  const startingIndex = (currentPage - 1) * pageSize;
  const onPage = allSources.slice(startingIndex, startingIndex + pageSize);
  _dataOnPage$.next(onPage);
  });

    _heros$.pipe(take(1)).subscribe(data =>{
      _tableDataSource$.next(Object.values(data));
    })

    combineLatest(_heros$, _searchFormControl.valueChanges, _sortKey$, _sortDirection$)
    .subscribe(([changedHeroData, searchTerm, sortKey, sortDirection]) => {
      const heroesArray = Object.values(changedHeroData);
      let filteredHeroes: any[];

      if (!searchTerm) {
        filteredHeroes = heroesArray;
      } else {
        const filteredResults = heroesArray.filter(hero => {
          return Object.values(hero)
            .reduce((prev, curr) => {
              if(curr===null) curr="";
              return prev || curr.toString().toLowerCase().includes(searchTerm.toLowerCase());
            }, false);
        });
        filteredHeroes = filteredResults;
      }

      const sortedHeroes = filteredHeroes.sort((a, b) => {
        if(a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
        if(a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
        return 0;
      });

     _tableDataSource$.next(sortedHeroes);
    });

   _searchFormControl.setValue('');
  }

  adjustSort(key: string,_sortKey$,_sortDirection$) {
    if (_sortKey$.value === key) {
      if (_sortDirection$.value === 'asc') {
          _sortDirection$.next('desc');
      } else {
        _sortDirection$.next('asc');
      }
      return;
    }

    _sortKey$.next(key);
    _sortDirection$.next('asc');
  }


}
