import { Component } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  PIECEvalue: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const conceptName = 'persons';
    const inputsName = 'name,color';
    this.PIECEvalue = this.apollo
      .watchQuery({
        query: gql`
        {
          ${conceptName} {
            ${inputsName.split(',').join(',')}
          }
        }
      `,
      })
      .valueChanges.pipe(map((result) => (result.data as any)[conceptName]));
  }

}