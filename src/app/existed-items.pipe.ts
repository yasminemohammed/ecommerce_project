import { Pipe, PipeTransform } from '@angular/core';
declare let $:any;
@Pipe({
  name: 'existedItems'
})
export class ExistedItemsPipe implements PipeTransform {

  transform(displayProducts: any[], cartItems:any[]): any {

    if(cartItems && displayProducts)
    {
      $(document).ready(function()
      {
        for (let item of cartItems)
        {
          $(`#addItemBtn_${item.id}`).addClass('disabled btnNone');
          $(`#addItemBtn_${item.id}`).text('Added To Cart');
          $(`#addLinkBtn_${item.id}`).addClass('btnNone');
        }
      })


      return displayProducts


    }
  }

}
