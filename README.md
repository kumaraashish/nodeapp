
# Setup

Make sure to have the Angular CLI and Typescript installed globally as so:

```
#!bash

sudo npm install -g @angular/cli typescript
```

You will need tsc (the TypeScript compiler) which comes with the typescript npm package and ng (the Angular CLI). You will also need to install yarn, which is just a better npm. Follow the [instructions here](https://yarnpkg.com/lang/en/docs/install/#linux-tab) if you want to install it in the WSL, or you can follow the Windows directions at the same link if you want to install it natively in Windows.

```
npm run tsc -w index.ts -- --lib es2015
```