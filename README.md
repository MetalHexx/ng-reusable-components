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
- Create a new component test file `autocomplete-chips.component.cy.ts` in the folder where the component resides
- Write a test to verify that the component mounts
```javascript
import { AutocompleteChipsComponent } from "./autocomplete-chips.component";

describe('AutoCompleteChipsComponent', () => {
  it('can mount', () => {
    cy.mount(AutocompleteChipsComponent)
  });
});
```
- You'll notice the component renders just text instead of using Angular material
- Add a styles.css file to your /.cypress folder with the following contents.  This will reference the styles.scss file from the angular app.
```css
@import "../src/styles.scss";
```
- There are some styles being pulled in from index.html in the angular app.  Let's remove them from index.html and move them to the apps styles.scss file.  Your styles.scss file should have the following content.
```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
```
- Change your test to import the MaterialsSharedModule and add a beforeEach to ensure the module is loaded before each test

```javascript
import { mount } from "cypress/angular";
import { AutocompleteChipsComponent } from "./autocomplete-chips.component";
import { MaterialSharedModule } from "../material-shared/material-shared.module";

describe('AutoCompleteChipsComponent', () => {
  beforeEach(() => {
    mount(AutocompleteChipsComponent, {
      imports: [MaterialSharedModule],
    });
  });

  it('can mount', () => {
    cy.mount(AutocompleteChipsComponent)
  });
});
```

- Add a file `.cypress/webpack.config.js` with the following content
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: [
          'style-loader', // This will inject styles into the DOM
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          { loader: 'url-loader?limit=100000' }
        ]
      }
    ]
  }
};
```
- Add a file `.cypress/plugins/index.js` with the following content
```javascript
const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    ...config,
    webpackOptions: require('../cypress/webpack.config'),
  };

  on('file:preprocessor', webpack(options));

  return config;
};
```
- Add these dependencies to support webpack css file loading `npm install --save-dev style-loader css-loader sass-loader url-loader`
- Run `npx cypress open` again and run the test.  It should pass and render properly with the expected angular material styling
