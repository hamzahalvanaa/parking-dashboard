import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'base64'
})
export class Base64Pipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(value: any, args?: any): any {
    var imgIn = "";
    var chars1 = value;
    for (var k = 0; k < chars1.length; k++) {
      var convert = String.fromCharCode(chars1[k]);
      imgIn = imgIn + convert;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imgIn);
  }

}
