import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catFilter'
})
export class CatFilterPipe implements PipeTransform {

  transform(displayProducts: any[], catType: any): any [] {

    return displayProducts.filter((product)=>
    {
      if(catType)
      {
        return product.categories?.name == catType
      }
      return displayProducts;
    });
  }

}



