import { Component } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contries: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const conceptName = 'countries';
    const inputsName = ['code','name','capital'];
    this.contries = this.apollo
      .watchQuery({
        query: gql`
        {
          ${conceptName} {
            ${inputsName.join(',')}
          }
        }
      `,
      })
      .valueChanges.pipe(map((result) => (result.data as any)[conceptName]));
  }

}
