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
- Add Angular Material to the project `ng add @angular/material@14`
- Add a new Shared Module for angular material `ng generate module MaterialShared `
```javascript
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
  ]
})
export class MaterialSharedModule { }
```
- Update your app.module.ts file to include the new MaterialSharedModule
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AutocompleteChipsComponent } from './autocomplete-chips/autocomplete-chips.component';
import { MaterialSharedModule } from './material-shared/material-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteChipsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

- Update your /.storybook/preview.ts file to include the new MaterialSharedModule
```javascript
import { moduleMetadata, type Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { MaterialSharedModule } from "src/app/material-shared/material-shared.module";

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MaterialSharedModule],
    })
  ],
};

export default preview;
```

- Update your autocomplete-chips.component.html with some chips to verify everything works
```html
<mat-chip-list aria-label="Fruit selection">
  <mat-chip>Apple</mat-chip>
  <mat-chip>Orange</mat-chip>
  <mat-chip>Banana</mat-chip>
</mat-chip-list>
```
- Re-run `npm run storybook` to make sure the component renders properly in Storybook
- Add cypress to the angular application `npm install cypress --save-dev`
- Run cypress to initialize it `npx cypress open`
  - When the cypress setup screen pops up, set up both component and e2e tests
- 
