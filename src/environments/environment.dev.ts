const packageJson = require('../../package.json');

export const environment = {
  appName: 'Cloud Coding',
  envName: 'DEV',
  production: false,
  test: false,
  apiUrl: 'https://api.dev.cloudcoding.fr',
  socketUrl: 'https://api.dev.cloudcoding.fr',
  exposedAppBasePath: 'dev.cloudcoding.fr',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress'],
    eslint: packageJson.devDependencies['eslint']
  }
};
