import { SupplierInventory } from './supplier-inventory.model';

import { Pipe ,PipeTransform} from '@angular/core';

@Pipe({
  name: 'supplierInventoryFilter',
  pure: false
})
export class SupplierInventoryFilterPipe implements PipeTransform{

  transform(supplierinventorys: SupplierInventory[], searchTerm: string) :SupplierInventory[] {
    if(!supplierinventorys || !searchTerm){
      return supplierinventorys;
    }

    return supplierinventorys.filter( supplierinventory =>
      supplierinventory.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
