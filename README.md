Babel 6 plugin that removes class declaration decorators, useful when running unit tests

Removes decorators from top level classes, for example:

Before:
```js
@MyDecorator
class Content {}
```
After:
```js
class Content {}
```

I'll happily accept PRs for any further improvements to the project!


## Usage
```bash
$ npm install --save-dev remove-class-declaration-decorator
```
```bash
$ yarn add --dev remove-class-declaration-decorator
```

Add to your babelrc:
```json
{
  "env": {
    "test": {
      "plugins": ["remove-class-declaration-decorator"]
    }
  }
}
```
