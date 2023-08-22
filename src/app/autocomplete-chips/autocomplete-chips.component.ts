import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AutoCompleteOption } from './AutoCompleteOption';

@Component({
  selector: 'app-autocomplete-chips',
  templateUrl: './autocomplete-chips.component.html',
  styleUrls: ['./autocomplete-chips.component.scss']
})
export class AutocompleteChipsComponent<T> {

  @Input() items: AutoCompleteOption<T>[] = [];
  @Input() placeholder: string = "";
  @Output() selectedItemsChange = new EventEmitter<AutoCompleteOption<T>[]>();

  @ViewChild('inputElem') inputElem!: ElementRef;
  itemCtrl = new FormControl();
  selectedItems: AutoCompleteOption<T>[] = [];

  get itemsMatchingUnselectedKeys(): AutoCompleteOption<T>[] {
    const filterValue = this.itemCtrl.value?.toLowerCase() || '';

    return this.items.filter(item =>
      item.display.toLowerCase().includes(filterValue)
        && !this.selectedItems.map(selectedItem => selectedItem.id).includes(item.id)
    );
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    const selectedItem = event.option.value as AutoCompleteOption<T>;
    this.selectedItems.push(selectedItem);
    this.selectedItemsChange.emit(this.selectedItems);
    this.itemCtrl.reset();
    this.inputElem.nativeElement.value = '';
  }

  removeItem(itemValue: AutoCompleteOption<T>) {
    const index = this.selectedItems.indexOf(itemValue);
    this.selectedItems.splice(index, 1);
    this.selectedItemsChange.emit(this.selectedItems);
  }
}
