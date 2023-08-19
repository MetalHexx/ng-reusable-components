import type { Meta, StoryObj } from '@storybook/angular';
import { AutocompleteChipsComponent } from './autocomplete-chips.component';

const meta: Meta<AutocompleteChipsComponent> = {
  title: 'App/AutoComplete-Chips',
  component: AutocompleteChipsComponent,
};

export default meta;
type Story = StoryObj<AutocompleteChipsComponent>;

export const Primary: Story = {
  render: () => ({
    props: {
      label: 'AutoComplete-Chips',
      primary: true,
    },
  }),
};
