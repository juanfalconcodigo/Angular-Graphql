import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';

@NgModule({
  declarations: [],
  exports:[
    HttpClientModule,
    HttpLinkModule,
    ApolloModule
  ]
})
export class GraphqlModule { 

  constructor(apollo: Apollo,httpLink: HttpLink){
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:5300/graphql' }),
      cache: new InMemoryCache()
    });

  }
}
