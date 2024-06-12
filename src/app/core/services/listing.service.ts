import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IListingData } from '../interfaces/listing.interface';



@Injectable()
export class ListingService {

  public dataSource: Array<any>;
  public ID_SESSION!: string;
  public SignatureSession!: string;

  constructor(
    private _httpClient: HttpClient,
  ) {
    this.dataSource = []
  }

  public getDataSource(dataSource: Array<IListingData>): Array<IListingData> {
    return this.dataSource = dataSource;
  }

}
