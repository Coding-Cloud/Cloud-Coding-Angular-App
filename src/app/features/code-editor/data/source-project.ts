import { Folder } from '../types/folder.interface';

export const sourceProject2: {
  appFiles: { [key: string]: Folder };
} = {
  appFiles: {
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app':
      {
        name: 'app',
        type: 'folder',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app',
        lastModified: 1648541447038
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app-routing.module.ts':
      {
        name: 'app-routing.module.ts',
        type: 'file',
        contents:
          "import { NgModule } from '@angular/core';\nimport { RouterModule, Routes } from '@angular/router';\n\nconst routes: Routes = [];\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes)],\n  exports: [RouterModule]\n})\nexport class AppRoutingModule { }\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app-routing.module.ts',
        lastModified: 1648541447038
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.css':
      {
        name: 'app.component.css',
        type: 'file',
        contents: 'p {\n  font-family: Lato;\n}',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.css',
        lastModified: 1648541447038
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.html':
      {
        name: 'app.component.html',
        type: 'file',
        contents:
          '<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * The content below * * * * * * * * * * * -->\n<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * -->\n<!-- * * * * * * * * * * and can be replaced. * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n<!-- * * * * * * * * * Delete the template below * * * * * * * * * * -->\n<!-- * * * * * * * to get started with your project! * * * * * * * * -->\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n\n<style>\n  :host {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin: 8px 0;\n  }\n\n  p {\n    margin: 0;\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .toolbar {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar img {\n    margin: 0 16px;\n  }\n\n  .toolbar #twitter-logo {\n    height: 40px;\n    margin: 0 8px;\n  }\n\n  .toolbar #youtube-logo {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar #twitter-logo:hover,\n  .toolbar #youtube-logo:hover {\n    opacity: 0.8;\n  }\n\n  .content {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card svg.material-icons path {\n    fill: #888;\n  }\n\n  .card-container {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card {\n    all: unset;\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container .card:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container .card:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container .card:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container .card:not(.highlight-card):hover .material-icons path {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card span {\n    margin-left: 60px;\n  }\n\n  svg#rocket {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a,\n  a:visited,\n  a:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a:hover {\n    color: #125699;\n  }\n\n  .terminal {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal pre {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer a {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n  }\n\n  .github-star-badge:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge .material-icons {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n  /* Responsive Styles */\n  @media screen and (max-width: 767px) {\n    .card-container > *:not(.circle-link) ,\n    .terminal {\n      width: 100%;\n    }\n\n    .card:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card span {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke {\n      display: none;\n      visibility: hidden;\n    }\n  }\n</style>\n\n<!-- Toolbar -->\n<div class="toolbar" role="banner">\n  <img\n    width="40"\n    alt="Angular Logo"\n    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="\n  />\n  <span>Welcome</span>\n    <div class="spacer"></div>\n    <a aria-label="Angular on twitter" target="_blank" rel="noopener" href="https://twitter.com/angular" title="Twitter">\n      <svg id="twitter-logo" height="24" data-name="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">\n        <rect width="400" height="400" fill="none"/>\n        <path d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23" fill="#fff"/>\n      </svg>\n    </a>\n    <a aria-label="Angular on YouTube" target="_blank" rel="noopener" href="https://youtube.com/angular" title="YouTube">\n      <svg id="youtube-logo" height="24" width="24" data-name="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff">\n        <path d="M0 0h24v24H0V0z" fill="none"/>\n        <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>\n      </svg>\n    </a>\n</div>\n\n<div class="content" role="main">\n\n  <!-- Highlight Card -->\n  <div class="card highlight-card card-small">\n\n    <svg id="rocket" xmlns="http://www.w3.org/2000/svg" width="101.678" height="101.678" viewBox="0 0 101.678 101.678">\n      <title>Rocket Ship</title>\n      <g id="Group_83" data-name="Group 83" transform="translate(-141 -696)">\n        <circle id="Ellipse_8" data-name="Ellipse 8" cx="50.839" cy="50.839" r="50.839" transform="translate(141 696)" fill="#dd0031"/>\n        <g id="Group_47" data-name="Group 47" transform="translate(165.185 720.185)">\n          <path id="Path_33" data-name="Path 33" d="M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z" transform="translate(0.371 3.363)" fill="#fff"/>\n          <path id="Path_34" data-name="Path 34" d="M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z" transform="translate(0 0.005)" fill="#fff"/>\n        </g>\n      </g>\n    </svg>\n\n    <span>{{ title }} app is running!</span>\n\n    <svg id="rocket-smoke" xmlns="http://www.w3.org/2000/svg" width="516.119" height="1083.632" viewBox="0 0 516.119 1083.632">\n      <title>Rocket Ship Smoke</title>\n      <path id="Path_40" data-name="Path 40" d="M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z" transform="translate(-147.025 -140.939)" fill="#f5f5f5"/>\n    </svg>\n\n  </div>\n\n  <!-- Resources -->\n  <h2>Resources</h2>\n  <p>Here are some links to help you get started:</p>\n\n  <div class="card-container">\n    <a class="card" target="_blank" rel="noopener" href="https://angular.io/tutorial">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>\n      <span>Learn Angular</span>\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>    </a>\n\n    <a class="card" target="_blank" rel="noopener" href="https://angular.io/cli">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>\n      <span>CLI Documentation</span>\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>\n    </a>\n\n    <a class="card" target="_blank" rel="noopener" href="https://material.angular.io">\n      <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px" width="21.813" height="23.453" viewBox="0 0 21.813 23.453"><path d="M4099.584,972.736h0l-10.882,3.9,1.637,14.4,9.245,5.153,9.245-5.153,1.686-14.4Z" transform="translate(-4088.702 -972.736)" fill="#808080"/><path d="M4181.516,972.736v23.453l9.245-5.153,1.686-14.4Z" transform="translate(-4170.633 -972.736)" fill="#808080"/><path d="M4137.529,1076.127l-7.7-3.723,4.417-2.721,7.753,3.723Z" transform="translate(-4125.003 -1058.315)" fill="#ffe0b2"/><path d="M4137.529,1051.705l-7.7-3.723,4.417-2.721,7.753,3.723Z" transform="translate(-4125.003 -1036.757)" fill="#fff3e0"/><path d="M4137.529,1027.283l-7.7-3.723,4.417-2.721,7.753,3.723Z" transform="translate(-4125.003 -1015.199)" fill="#fff"/></svg>\n      <span>Angular Material</span>\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>\n    </a>\n\n    <a class="card" target="_blank" rel="noopener" href="https://blog.angular.io/">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>\n      <span>Angular Blog</span>\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>\n    </a>\n\n    <a class="card" target="_blank" rel="noopener" href="https://angular.io/devtools/">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M14.73,13.31C15.52,12.24,16,10.93,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.43,0,2.74-0.48,3.81-1.27L19.59,21L21,19.59L14.73,13.31z M9.5,14C7.01,14,5,11.99,5,9.5S7.01,5,9.5,5S14,7.01,14,9.5 S11.99,14,9.5,14z"/><polygon points="10.29,8.44 9.5,6 8.71,8.44 6.25,8.44 8.26,10.03 7.49,12.5 9.5,10.97 11.51,12.5 10.74,10.03 12.75,8.44"/></g></g></svg>\n      <span>Angular DevTools</span>\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>\n    </a>\n\n  </div>\n\n  <!-- Next Steps -->\n  <h2>Next Steps</h2>\n  <p>What do you want to do next with your app?</p>\n\n  <input type="hidden" #selection>\n\n  <div class="card-container">\n    <button class="card card-small" (click)="selection.value = \'component\'" tabindex="0">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>\n      <span>New Component</span>\n    </button>\n\n    <button class="card card-small" (click)="selection.value = \'material\'" tabindex="0">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>\n      <span>Angular Material</span>\n    </button>\n\n    <button class="card card-small" (click)="selection.value = \'pwa\'" tabindex="0">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>\n      <span>Add PWA Support</span>\n    </button>\n\n    <button class="card card-small" (click)="selection.value = \'dependency\'" tabindex="0">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>\n      <span>Add Dependency</span>\n    </button>\n\n    <button class="card card-small" (click)="selection.value = \'test\'" tabindex="0">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>\n      <span>Run and Watch Tests</span>\n    </button>\n\n    <button class="card card-small" (click)="selection.value = \'build\'" tabindex="0">\n      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>\n      <span>Build for Production</span>\n    </button>\n  </div>\n\n  <!-- Terminal -->\n  <div class="terminal" [ngSwitch]="selection.value">\n      <pre *ngSwitchDefault>ng generate component xyz</pre>\n      <pre *ngSwitchCase="\'material\'">ng add @angular/material</pre>\n      <pre *ngSwitchCase="\'pwa\'">ng add @angular/pwa</pre>\n      <pre *ngSwitchCase="\'dependency\'">ng add _____</pre>\n      <pre *ngSwitchCase="\'test\'">ng test</pre>\n      <pre *ngSwitchCase="\'build\'">ng build</pre>\n  </div>\n\n  <!-- Links -->\n  <div class="card-container">\n    <a class="circle-link" title="Find a Local Meetup" href="https://www.meetup.com/find/?keywords=angular" target="_blank" rel="noopener">\n      <svg xmlns="http://www.w3.org/2000/svg" width="24.607" height="23.447" viewBox="0 0 24.607 23.447">\n        <title>Meetup Logo</title>\n        <path id="logo--mSwarm" d="M21.221,14.95A4.393,4.393,0,0,1,17.6,19.281a4.452,4.452,0,0,1-.8.069c-.09,0-.125.035-.154.117a2.939,2.939,0,0,1-2.506,2.091,2.868,2.868,0,0,1-2.248-.624.168.168,0,0,0-.245-.005,3.926,3.926,0,0,1-2.589.741,4.015,4.015,0,0,1-3.7-3.347,2.7,2.7,0,0,1-.043-.38c0-.106-.042-.146-.143-.166a3.524,3.524,0,0,1-1.516-.69A3.623,3.623,0,0,1,2.23,14.557a3.66,3.66,0,0,1,1.077-3.085.138.138,0,0,0,.026-.2,3.348,3.348,0,0,1-.451-1.821,3.46,3.46,0,0,1,2.749-3.28.44.44,0,0,0,.355-.281,5.072,5.072,0,0,1,3.863-3,5.028,5.028,0,0,1,3.555.666.31.31,0,0,0,.271.03A4.5,4.5,0,0,1,18.3,4.7a4.4,4.4,0,0,1,1.334,2.751,3.658,3.658,0,0,1,.022.706.131.131,0,0,0,.1.157,2.432,2.432,0,0,1,1.574,1.645,2.464,2.464,0,0,1-.7,2.616c-.065.064-.051.1-.014.166A4.321,4.321,0,0,1,21.221,14.95ZM13.4,14.607a2.09,2.09,0,0,0,1.409,1.982,4.7,4.7,0,0,0,1.275.221,1.807,1.807,0,0,0,.9-.151.542.542,0,0,0,.321-.545.558.558,0,0,0-.359-.534,1.2,1.2,0,0,0-.254-.078c-.262-.047-.526-.086-.787-.138a.674.674,0,0,1-.617-.75,3.394,3.394,0,0,1,.218-1.109c.217-.658.509-1.286.79-1.918a15.609,15.609,0,0,0,.745-1.86,1.95,1.95,0,0,0,.06-1.073,1.286,1.286,0,0,0-1.051-1.033,1.977,1.977,0,0,0-1.521.2.339.339,0,0,1-.446-.042c-.1-.092-.2-.189-.307-.284a1.214,1.214,0,0,0-1.643-.061,7.563,7.563,0,0,1-.614.512A.588.588,0,0,1,10.883,8c-.215-.115-.437-.215-.659-.316a2.153,2.153,0,0,0-.695-.248A2.091,2.091,0,0,0,7.541,8.562a9.915,9.915,0,0,0-.405.986c-.559,1.545-1.015,3.123-1.487,4.7a1.528,1.528,0,0,0,.634,1.777,1.755,1.755,0,0,0,1.5.211,1.35,1.35,0,0,0,.824-.858c.543-1.281,1.032-2.584,1.55-3.875.142-.355.28-.712.432-1.064a.548.548,0,0,1,.851-.24.622.622,0,0,1,.185.539,2.161,2.161,0,0,1-.181.621c-.337.852-.68,1.7-1.018,2.552a2.564,2.564,0,0,0-.173.528.624.624,0,0,0,.333.71,1.073,1.073,0,0,0,.814.034,1.22,1.22,0,0,0,.657-.655q.758-1.488,1.511-2.978.35-.687.709-1.37a1.073,1.073,0,0,1,.357-.434.43.43,0,0,1,.463-.016.373.373,0,0,1,.153.387.7.7,0,0,1-.057.236c-.065.157-.127.316-.2.469-.42.883-.846,1.763-1.262,2.648A2.463,2.463,0,0,0,13.4,14.607Zm5.888,6.508a1.09,1.09,0,0,0-2.179.006,1.09,1.09,0,0,0,2.179-.006ZM1.028,12.139a1.038,1.038,0,1,0,.01-2.075,1.038,1.038,0,0,0-.01,2.075ZM13.782.528a1.027,1.027,0,1,0-.011,2.055A1.027,1.027,0,0,0,13.782.528ZM22.21,6.95a.882.882,0,0,0-1.763.011A.882.882,0,0,0,22.21,6.95ZM4.153,4.439a.785.785,0,1,0,.787-.78A.766.766,0,0,0,4.153,4.439Zm8.221,18.22a.676.676,0,1,0-.677.666A.671.671,0,0,0,12.374,22.658ZM22.872,12.2a.674.674,0,0,0-.665.665.656.656,0,0,0,.655.643.634.634,0,0,0,.655-.644A.654.654,0,0,0,22.872,12.2ZM7.171-.123A.546.546,0,0,0,6.613.43a.553.553,0,1,0,1.106,0A.539.539,0,0,0,7.171-.123ZM24.119,9.234a.507.507,0,0,0-.493.488.494.494,0,0,0,.494.494.48.48,0,0,0,.487-.483A.491.491,0,0,0,24.119,9.234Zm-19.454,9.7a.5.5,0,0,0-.488-.488.491.491,0,0,0-.487.5.483.483,0,0,0,.491.479A.49.49,0,0,0,4.665,18.936Z" transform="translate(0 0.123)" fill="#f64060"/>\n      </svg>\n    </a>\n\n    <a class="circle-link" title="Join the Conversation on Discord" href="https://discord.gg/angular" target="_blank" rel="noopener">\n      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 245 240">\n        <title>Discord Logo</title>\n        <path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/>\n        <path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/>\n      </svg>\n    </a>\n  </div>\n\n  <!-- Footer -->\n  <footer>\n      Love Angular?&nbsp;\n      <a href="https://github.com/angular/angular" target="_blank" rel="noopener"> Give our repo a star.\n        <div class="github-star-badge">\n            <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>\n          Star\n        </div>\n      </a>\n      <a href="https://github.com/angular/angular" target="_blank" rel="noopener">\n        <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#1976d2"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n      </a>\n  </footer>\n\n  <svg id="clouds" xmlns="http://www.w3.org/2000/svg" width="2611.084" height="485.677" viewBox="0 0 2611.084 485.677">\n    <title>Gray Clouds Background</title>\n    <path id="Path_39" data-name="Path 39" d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z" transform="translate(142.69 -634.312)" fill="#eee"/>\n  </svg>\n\n</div>\n\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * The content above * * * * * * * * * * * -->\n<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * -->\n<!-- * * * * * * * * * * and can be replaced. * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n<!-- * * * * * * * * * * End of Placeholder * * * * * * * * * * * -->\n<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->\n\n<router-outlet></router-outlet>\n',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.html',
        lastModified: 1648541447039
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.scss':
      {
        name: 'app.component.scss',
        type: 'file',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.scss',
        lastModified: 1648541447039
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.spec.ts':
      {
        name: 'app.component.spec.ts',
        type: 'file',
        contents:
          "import { TestBed } from '@angular/core/testing';\nimport { RouterTestingModule } from '@angular/router/testing';\nimport { AppComponent } from './app.component';\n\ndescribe('AppComponent', () => {\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      imports: [\n        RouterTestingModule\n      ],\n      declarations: [\n        AppComponent\n      ],\n    }).compileComponents();\n  });\n\n  it('should create the app', () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    const app = fixture.componentInstance;\n    expect(app).toBeTruthy();\n  });\n\n  it(`should have as title 'angular-copy-file'`, () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    const app = fixture.componentInstance;\n    expect(app.title).toEqual('angular-copy-file');\n  });\n\n  it('should render title', () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    fixture.detectChanges();\n    const compiled = fixture.nativeElement as HTMLElement;\n    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-copy-file app is running!');\n  });\n});\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.spec.ts',
        lastModified: 1648541447040
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.ts':
      {
        name: 'app.component.ts',
        type: 'file',
        contents:
          "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n  styleUrls: ['./app.component.scss']\n})\nexport class AppComponent {\n  title = 'angular-copy-file';\n}\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.ts',
        lastModified: 1648541447040
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.module.ts':
      {
        name: 'app.module.ts',
        type: 'file',
        contents:
          "import { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\n\nimport { AppRoutingModule } from './app-routing.module';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule,\n    AppRoutingModule\n  ],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.module.ts',
        lastModified: 1648541447041
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/hello.component.ts':
      {
        name: 'hello.component.ts',
        type: 'file',
        contents:
          "import { Component, Input } from '@angular/core';\n\n@Component({\n  selector: 'hello',\n  template: `<h1>Hello {{name}}!</h1>`,\n  styles: [`h1 { font-family: Lato; }`]\n})\nexport class HelloComponent  {\n  @Input() name: string;\n}\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/hello.component.ts',
        lastModified: 1648541447041
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/assets':
      {
        name: 'assets',
        type: 'folder',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/assets',
        lastModified: 1648541447041
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/assets/.gitkeep':
      {
        name: '.gitkeep',
        type: 'file',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/assets/.gitkeep',
        lastModified: 1648541447042
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments':
      {
        name: 'environments',
        type: 'folder',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments',
        lastModified: 1648541447042
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments/environment.prod.ts':
      {
        name: 'environment.prod.ts',
        type: 'file',
        contents: 'export const environment = {\n  production: true\n};\n',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments/environment.prod.ts',
        lastModified: 1648541447042
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments/environment.ts':
      {
        name: 'environment.ts',
        type: 'file',
        contents:
          "// This file can be replaced during build by using the `fileReplacements` array.\n// `ng build` replaces `environment.ts` with `environment.prod.ts`.\n// The list of file replacements can be found in `angular.json`.\n\nexport const environment = {\n  production: false\n};\n\n/*\n * For easier debugging in development mode, you can import the following file\n * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.\n *\n * This import should be commented out in production mode because it will have a negative impact\n * on performance if an error is thrown.\n */\n// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments/environment.ts',
        lastModified: 1648541447042
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/index.html':
      {
        name: 'index.html',
        type: 'file',
        contents:
          '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>AngularCopyFile</title>\n  <base href="/">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="icon" type="image/x-icon" href="favicon.ico">\n</head>\n<body>\n  <app-root></app-root>\n</body>\n</html>\n',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/index.html',
        lastModified: 1648541447043
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/main.ts':
      {
        name: 'main.ts',
        type: 'file',
        contents:
          "import { enableProdMode } from '@angular/core';\nimport { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\n\nimport { AppModule } from './app/app.module';\nimport { environment } from './environments/environment';\n\nif (environment.production) {\n  enableProdMode();\n}\n\nplatformBrowserDynamic().bootstrapModule(AppModule)\n  .catch(err => console.error(err));\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/main.ts',
        lastModified: 1648541447043
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/polyfills.ts':
      {
        name: 'polyfills.ts',
        type: 'file',
        contents:
          "/**\n * This file includes polyfills needed by Angular and is loaded before the app.\n * You can add your own extra polyfills to this file.\n *\n * This file is divided into 2 sections:\n *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.\n *   2. Application imports. Files imported after ZoneJS that should be loaded before your main\n *      file.\n *\n * The current setup is for so-called \"evergreen\" browsers; the last versions of browsers that\n * automatically update themselves. This includes recent versions of Safari, Chrome (including\n * Opera), Edge on the desktop, and iOS and Chrome on mobile.\n *\n * Learn more in https://angular.io/guide/browser-support\n */\n\n/***************************************************************************************************\n * BROWSER POLYFILLS\n */\n\n/**\n * By default, zone.js will patch all possible macroTask and DomEvents\n * user can disable parts of macroTask/DomEvents patch by setting following flags\n * because those flags need to be set before `zone.js` being loaded, and webpack\n * will put import in the top of bundle, so user need to create a separate file\n * in this directory (for example: zone-flags.ts), and put the following flags\n * into that file, and then add the following code before importing zone.js.\n * import './zone-flags';\n *\n * The flags allowed in zone-flags.ts are listed here.\n *\n * The following flags will work for all browsers.\n *\n * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame\n * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick\n * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames\n *\n *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js\n *  with the following flag, it will bypass `zone.js` patch for IE/Edge\n *\n *  (window as any).__Zone_enable_cross_context_check = true;\n *\n */\n\n/***************************************************************************************************\n * Zone JS is required by default for Angular itself.\n */\nimport 'zone.js';  // Included with Angular CLI.\n\n\n/***************************************************************************************************\n * APPLICATION IMPORTS\n */\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/polyfills.ts',
        lastModified: 1648541447043
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/styles.css':
      {
        name: 'styles.css',
        type: 'file',
        contents: '/* Add application styles & imports to this file! */',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/styles.css',
        lastModified: 1648541447044
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/styles.scss':
      {
        name: 'styles.scss',
        type: 'file',
        contents:
          '/* You can add global styles to this file, and also import other style files */\n',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/styles.scss',
        lastModified: 1648541447045
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/test.ts':
      {
        name: 'test.ts',
        type: 'file',
        contents:
          "// This file is required by karma.conf.js and loads recursively all the .spec and framework files\n\nimport 'zone.js/testing';\nimport { getTestBed } from '@angular/core/testing';\nimport {\n  BrowserDynamicTestingModule,\n  platformBrowserDynamicTesting\n} from '@angular/platform-browser-dynamic/testing';\n\ndeclare const require: {\n  context(path: string, deep?: boolean, filter?: RegExp): {\n    <T>(id: string): T;\n    keys(): string[];\n  };\n};\n\n// First, initialize the Angular testing environment.\ngetTestBed().initTestEnvironment(\n  BrowserDynamicTestingModule,\n  platformBrowserDynamicTesting(),\n);\n\n// Then we find all the tests.\nconst context = require.context('./', true, /\\.spec\\.ts$/);\n// And load the modules.\ncontext.keys().map(context);\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/test.ts',
        lastModified: 1648541447045
      }
  }
};

export const sourceProject: {
  appFiles: { [key: string]: Folder };
} = {
  appFiles: {
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app':
      {
        name: 'app',
        type: 'folder',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app',
        lastModified: 1648541447038
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app-routing.module.ts':
      {
        name: 'app-routing.module.ts',
        type: 'file',
        contents:
          "import { NgModule } from '@angular/core';\nimport { RouterModule, Routes } from '@angular/router';\n\nconst routes: Routes = [];\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes)],\n  exports: [RouterModule]\n})\nexport class AppRoutingModule { }\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app-routing.module.ts',
        lastModified: 1648541447038
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.css':
      {
        name: 'app.component.css',
        type: 'file',
        contents: 'p {\n  font-family: Lato;\n}',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.css',
        lastModified: 1648541447038
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.html':
      {
        name: 'app.component.html',
        type: 'file',
        contents:
          '<div>je suis une courgette 12</div>\n<div>je suis une orange</div>\n<div>je suis une crotte</div>\n<div>encore une pomme</div>',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.html',
        lastModified: 1648541447039
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.scss':
      {
        name: 'app.component.scss',
        type: 'file',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.scss',
        lastModified: 1648541447039
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.spec.ts':
      {
        name: 'app.component.spec.ts',
        type: 'file',
        contents:
          "import { TestBed } from '@angular/core/testing';\nimport { RouterTestingModule } from '@angular/router/testing';\nimport { AppComponent } from './app.component';\n\ndescribe('AppComponent', () => {\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      imports: [\n        RouterTestingModule\n      ],\n      declarations: [\n        AppComponent\n      ],\n    }).compileComponents();\n  });\n\n  it('should create the app', () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    const app = fixture.componentInstance;\n    expect(app).toBeTruthy();\n  });\n\n  it(`should have as title 'angular-copy-file'`, () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    const app = fixture.componentInstance;\n    expect(app.title).toEqual('angular-copy-file');\n  });\n\n  it('should render title', () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    fixture.detectChanges();\n    const compiled = fixture.nativeElement as HTMLElement;\n    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-copy-file app is running!');\n  });\n});\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.spec.ts',
        lastModified: 1648541447040
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.ts':
      {
        name: 'app.component.ts',
        type: 'file',
        contents:
          "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n  styleUrls: ['./app.component.scss']\n})\nexport class AppComponent {\n  title = 'angular-copy-file';\n}\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.component.ts',
        lastModified: 1648541447040
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.module.ts':
      {
        name: 'app.module.ts',
        type: 'file',
        contents:
          "import { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\n\nimport { AppRoutingModule } from './app-routing.module';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule,\n    AppRoutingModule\n  ],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/app.module.ts',
        lastModified: 1648541447041
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/hello.component.ts':
      {
        name: 'hello.component.ts',
        type: 'file',
        contents:
          "import { Component, Input } from '@angular/core';\n\n@Component({\n  selector: 'hello',\n  template: `<h1>Hello {{name}}!</h1>`,\n  styles: [`h1 { font-family: Lato; }`]\n})\nexport class HelloComponent  {\n  @Input() name: string;\n}\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/app/hello.component.ts',
        lastModified: 1648541447041
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/assets':
      {
        name: 'assets',
        type: 'folder',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/assets',
        lastModified: 1648541447041
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/assets/.gitkeep':
      {
        name: '.gitkeep',
        type: 'file',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/assets/.gitkeep',
        lastModified: 1648541447042
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments':
      {
        name: 'environments',
        type: 'folder',
        contents: '',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments',
        lastModified: 1648541447042
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments/environment.prod.ts':
      {
        name: 'environment.prod.ts',
        type: 'file',
        contents: 'export const environment = {\n  production: true\n};\n',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments/environment.prod.ts',
        lastModified: 1648541447042
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments/environment.ts':
      {
        name: 'environment.ts',
        type: 'file',
        contents:
          "// This file can be replaced during build by using the `fileReplacements` array.\n// `ng build` replaces `environment.ts` with `environment.prod.ts`.\n// The list of file replacements can be found in `angular.json`.\n\nexport const environment = {\n  production: false\n};\n\n/*\n * For easier debugging in development mode, you can import the following file\n * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.\n *\n * This import should be commented out in production mode because it will have a negative impact\n * on performance if an error is thrown.\n */\n// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/environments/environment.ts',
        lastModified: 1648541447042
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/index.html':
      {
        name: 'index.html',
        type: 'file',
        contents:
          '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>AngularCopyFile</title>\n  <base href="/">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="icon" type="image/x-icon" href="favicon.ico">\n</head>\n<body>\n  <app-root></app-root>\n</body>\n</html>\n',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/index.html',
        lastModified: 1648541447043
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/main.ts':
      {
        name: 'main.ts',
        type: 'file',
        contents:
          "import { enableProdMode } from '@angular/core';\nimport { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\n\nimport { AppModule } from './app/app.module';\nimport { environment } from './environments/environment';\n\nif (environment.production) {\n  enableProdMode();\n}\n\nplatformBrowserDynamic().bootstrapModule(AppModule)\n  .catch(err => console.error(err));\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/main.ts',
        lastModified: 1648541447043
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/polyfills.ts':
      {
        name: 'polyfills.ts',
        type: 'file',
        contents:
          "/**\n * This file includes polyfills needed by Angular and is loaded before the app.\n * You can add your own extra polyfills to this file.\n *\n * This file is divided into 2 sections:\n *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.\n *   2. Application imports. Files imported after ZoneJS that should be loaded before your main\n *      file.\n *\n * The current setup is for so-called \"evergreen\" browsers; the last versions of browsers that\n * automatically update themselves. This includes recent versions of Safari, Chrome (including\n * Opera), Edge on the desktop, and iOS and Chrome on mobile.\n *\n * Learn more in https://angular.io/guide/browser-support\n */\n\n/***************************************************************************************************\n * BROWSER POLYFILLS\n */\n\n/**\n * By default, zone.js will patch all possible macroTask and DomEvents\n * user can disable parts of macroTask/DomEvents patch by setting following flags\n * because those flags need to be set before `zone.js` being loaded, and webpack\n * will put import in the top of bundle, so user need to create a separate file\n * in this directory (for example: zone-flags.ts), and put the following flags\n * into that file, and then add the following code before importing zone.js.\n * import './zone-flags';\n *\n * The flags allowed in zone-flags.ts are listed here.\n *\n * The following flags will work for all browsers.\n *\n * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame\n * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick\n * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames\n *\n *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js\n *  with the following flag, it will bypass `zone.js` patch for IE/Edge\n *\n *  (window as any).__Zone_enable_cross_context_check = true;\n *\n */\n\n/***************************************************************************************************\n * Zone JS is required by default for Angular itself.\n */\nimport 'zone.js';  // Included with Angular CLI.\n\n\n/***************************************************************************************************\n * APPLICATION IMPORTS\n */\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/polyfills.ts',
        lastModified: 1648541447043
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/styles.css':
      {
        name: 'styles.css',
        type: 'file',
        contents: '/* Add application styles & imports to this file! */',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/styles.css',
        lastModified: 1648541447044
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/styles.scss':
      {
        name: 'styles.scss',
        type: 'file',
        contents:
          '/* You can add global styles to this file, and also import other style files */\n',
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/styles.scss',
        lastModified: 1648541447045
      },
    '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/test.ts':
      {
        name: 'test.ts',
        type: 'file',
        contents:
          "// This file is required by karma.conf.js and loads recursively all the .spec and framework files\n\nimport 'zone.js/testing';\nimport { getTestBed } from '@angular/core/testing';\nimport {\n  BrowserDynamicTestingModule,\n  platformBrowserDynamicTesting\n} from '@angular/platform-browser-dynamic/testing';\n\ndeclare const require: {\n  context(path: string, deep?: boolean, filter?: RegExp): {\n    <T>(id: string): T;\n    keys(): string[];\n  };\n};\n\n// First, initialize the Angular testing environment.\ngetTestBed().initTestEnvironment(\n  BrowserDynamicTestingModule,\n  platformBrowserDynamicTesting(),\n);\n\n// Then we find all the tests.\nconst context = require.context('./', true, /\\.spec\\.ts$/);\n// And load the modules.\ncontext.keys().map(context);\n",
        fullPath:
          '/Users/remy/Documents/ESGI/Annee_4/projet_annee_4/angular-copy-file/src/test.ts',
        lastModified: 1648541447045
      }
  }
};
