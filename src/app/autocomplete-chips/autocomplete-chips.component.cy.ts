import { MountConfig, createOutputSpy, mount } from "cypress/angular";
import { AutoCompleteOption, AutocompleteChipsComponent } from "./autocomplete-chips.component";
import { MaterialSharedModule } from "../material-shared/material-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Type } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';

declare global {
  namespace Cypress {
    interface Chainable {
      customMount: typeof customMount
    }
  }
}

const imports = [MaterialSharedModule, ReactiveFormsModule, BrowserAnimationsModule, MatIconModule];

function customMount<T>(component: string | Type<T>, config?: MountConfig<T>) {
  if (!config) {
    config = { imports }
  } else {
    config.imports = [...(config?.imports || []), ...imports]
  }
  return mount<T>(component, config);
}

function props(placeholder: string, items: AutoCompleteOption<any>[] = []) {
  return {
    componentProperties: {
      placeholder: placeholder,
      items: items,
      selectedItemsChange: createOutputSpy('selectedItemsChange')
    }
  }
}

Cypress.Commands.add('customMount', customMount);

const sampleItems = [
  { id: '1', display: 'Test1', value: 'Value1' },
  { id: '2', display: 'Test2', value: 'Value2' },
  { id: '3', display: 'Test3', value: 'Value3' }
];

describe('AutoCompleteChipsComponent', () => {

  it('shows the specified placeholder when input is empty', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));
    cy.get('[data-testid="autocomplete-input"]').should('have.attr', 'placeholder', 'Placeholder');
  });

  it('displays all autocomplete options when focusing on input', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));
    cy.get('[data-testid="autocomplete-input"]').focus();
    cy.get('mat-option').should('be.visible');
    cy.get('mat-option').should('have.length', 3);
  });

  it('should hide autocomplete items on blur', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));
    cy.get('[data-testid="autocomplete-input"]').focus();
    cy.get('mat-option').should('be.visible');
    cy.get('mat-option').should('have.length', 3);
    cy.get('body').click();
    cy.get('mat-option').should('not.exist');
  });

  it('filters outitems when matches are found', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));
    cy.get('[data-testid="autocomplete-input"]').type('Test1');
    cy.get('mat-option').should('have.length', 1);
  });

  it('hides auto complete when an item is selected from it', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));

    cy.get('[data-testid="autocomplete-input"]').type('Test');
    cy.get('mat-option:visible').first().click();
    cy.get('mat-option').should('not.exist');
    cy.get('[data-testid="chip-text"]').should('have.text', 'Test1');
  });

  it('removes items from autocomplete when items are selected', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));

    cy.get('[data-testid="autocomplete-input"]').type('Test');
    cy.get('mat-option:visible').first().click();
    cy.get('[data-testid="autocomplete-input"]').type('Test');
    cy.get('mat-option').should('have.length', 2);
  });

  it('removes chips when remove icon is clicked', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));
    cy.get('[data-testid="autocomplete-input"]').type('Test');
    cy.get('mat-option:visible').first().click();
    cy.get('[data-testid="chip-remove"]').click();
    cy.get('[data-testid="chip-text"]').should('not.exist');
  });

  it('removes chips when backspace is entered twice on a blank input', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));
    cy.get('[data-testid="autocomplete-input"]').type('Test');
    cy.get('mat-option:visible').first().click();
    cy.get('[data-testid="autocomplete-input"]').type('{backspace}{backspace}');
    cy.get('[data-testid="chip-text"]').should('not.exist');
  });

  it('emits selected items when an item is selected from the autocomplete list', () => {
    cy.customMount(AutocompleteChipsComponent, props('Placeholder', sampleItems));
    cy.get('[data-testid="autocomplete-input"]').type('Test');
    cy.get('mat-option:visible').first().click();
    cy.get('@selectedItemsChange')
      .should('have.callCount', 1)
      .its('firstCall.args.0')
      .should('deep.equal', [{ id: '1', display: 'Test1', value: 'Value1' }]);
  });
});
