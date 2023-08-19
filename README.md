# NgReusableComponents

## Steps to create

- Run `ng new ng-reusable-components` to create new angular application
- Run `npx storybook@latest init` to install storybook.
  - Select `Yes` for optional Compodocs documentation
- Add a new component `ng g c autocomplete-chips `
- Add a new story file `autocomplete-chips.story.ts` in the folder where the component was created
- Add the following content to the file to create your new story:
```javascript
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
      label: 'AutoComplete w/Chips',
      primary: true,
    },
  }),
};
```
- Run story book `npm run storybook`
