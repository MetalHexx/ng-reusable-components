import { Meta, Story, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AutocompleteChipsComponent } from './autocomplete-chips.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialSharedModule } from '../material-shared/material-shared.module';

const sampleItems = [
  { id: '1', display: 'Test1', value: 'Value1' },
  { id: '2', display: 'Test2', value: 'Value2' },
  { id: '3', display: 'Test3', value: 'Value3' }
];

export default {
  title: 'App/AutoComplete-Chips',
  component: AutocompleteChipsComponent,
  decorators: [
    applicationConfig({
      providers: [...provideAnimations()],

    }),
    moduleMetadata({
      imports: [MaterialSharedModule, ReactiveFormsModule]
  })
  ],
  argTypes: {
    items: {
      name: 'items',
      description: 'Array of items',
      control: {
        type: 'array'
      }
    }
  }
} as Meta;

export const Primary: Story<AutocompleteChipsComponent<string>> = (args: AutocompleteChipsComponent<string>) => ({
  props: {
    //TODO: Getting strange console errors about ToLower() not being available.  Something strange happens when I pass the args here.
    //...args,
    placeholder: 'This is a place holder',
    items: sampleItems
  },
});

Primary.args = {
  placeholder: 'This is a place holder',
  //items: sampleItems
};
