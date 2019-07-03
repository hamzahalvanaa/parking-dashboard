import { Component, OnInit } from '@angular/core';
import { TableData, DataTableService } from './datatable.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [DataTableService]
})
export class DashboardComponent implements OnInit {

  error: any;
  public data: TableData;
  public filterQuery = '';
  public resData: any;
  public dataParking: any;
  public listParking: any;
  public imgIn = "";
  public imgOut = "";
  public loopList: any = [];
  public base64ImageIn: any;
  public base64ImageOut: any;
  public myModal;

  constructor(
    private dataTableService: DataTableService,
    private sanitizer: DomSanitizer
  ) {
    this.getDataStatus();
  }

  base64convert(buffer) {
    var imgIn = "";
    var chars1 = buffer;
    for (var k = 0; k < chars1.length; k++) {
      var convert = String.fromCharCode(chars1[k]);
      imgIn = imgIn + convert;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + imgIn);
  }

  async getDataStatus() {
    await this.dataTableService.getDataStatus()
      .subscribe((data: any) => {
        setTimeout(() => {
          this.resData = data;
          var merge = data.results.concat(data.results2);
          for (let row of this.resData.results1) {
            this.dataParking = {
              'mMasuk': row.mMasuk, 'mKeluar': row.mKeluar, 'free': row.free,
              'isi': row.isi, 'book': row.book, 'cancel': row.cancel
            };
          }
          this.loopList = merge;
          var dataParkir = merge;
          console.log(dataParkir);
          for (var i = 0; i < dataParkir.length; i++) {
            if (dataParkir[i].pictstart != null && dataParkir[i].pictstart != undefined) {
              this.imgIn = "";
              var chars1 = dataParkir[i].pictstart.data;
              for (var k = 0; k < chars1.length; k++) {
                var convert = String.fromCharCode(chars1[k]);
                this.imgIn = this.imgIn + convert;
              }
              this.base64ImageIn = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.imgIn);
            }
            else if (dataParkir[i].pictend != null && dataParkir[i].pictend != undefined) {
              this.imgOut = "";
              var chars2 = dataParkir[i].pictend.data;
              for (var z = 0; z < chars2.length; z++) {
                var convert = String.fromCharCode(chars2[z]);
                this.imgOut = this.imgOut + convert;
              }
              this.base64ImageOut = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.imgOut);
            }
          }
        }, 1000);
      },
        error => this.error = error
      );
  }

  ngOnInit(): void {
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.usedby.length;
  }

  public getDate(regDate: string) {
    const date = new Date(regDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
  }

}
