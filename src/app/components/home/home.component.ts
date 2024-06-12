import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { IListingData } from 'src/app/core/interfaces/listing.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ListingService } from 'src/app/core/services/listing.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {

  displayedColumns: string[] = [
    'nome',
    'cnpj',
    'razaoSocial',
    'nomeFantasia',
    'situacao',
    'CEP',
    'UF',
    'correio_eletronico'
  ];
  dataSource: Array<IListingData> = this._listingService.dataSource;
  public user: string = ''

  constructor(
    private _listingService: ListingService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    console.log('dataSource home component', this.dataSource);
  }

  ngAfterContentChecked() {
    this.user = this._authService.userNameDisplay;
  }
}
