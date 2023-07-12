# List Randomizer

A simple package to help automating the randomization of a (or multiple) list(s) of `Strings`.

## Install

```
> npm install --save list-randomizer
```

## Options
The `options` object let you customise how the randomizer will manipulate the information inside the feeded lists (see **advance usage**)

```js
let defaultOptions = {
  isRerollSame: false, /* In case of multiple roll on the same table, allow you to get the same value */
  reRollJoin: ", " /* In case of multiple roll on the same table, how the output will be join */
}
```

## Basic usage
Minimal information needed to use the lib :

```js
import ListRandomizer from 'list-randomiser';

let lstRandomizer = new ListRandomizer(null, ["list elem", "an other one", "etc..."]);
let myRandomSelectionArray = lstRandomizer.rnd(); /* output: ["one element of the list"] */
```

## Advance usage

### Multiple lists
You can feed multiple list on wich one element will output in sequence :

```js
let lstRandomizer = new ListRandomizer(null, ["Alfred", "Marcus", "Damien"], ["Smith", "O'Connel", "Miller"]);
let myRandomSelectionArray = lstRandomizer.rnd(); /* output ex: ["Marcus", "Miller"] */
```

### Fixed value
You can even fixe a string at a specific index of the output :

```js
const fruit = ["blueberry", "cherry", "strawberry"];
const media = ["toast", "pastry", "croissant"];

let lstRandomizer = new ListRandomizer(null, fruit, "jam", media);
let myRandomSelectionArray = lstRandomizer.rnd(); /* output ex: ["cherry", jam, "toast"] */
```

### Multiple roll from the same table
You may want to have a chance of getting more than one element from a specific list. To achive this behavior, simply put a `number` (or multiple) somwhere on the list. A value under `2` will result in no change. If a `number` has been randomize, every other `number` will be removed from the list.

```js
const fruit = ["blueberry", "cherry", "strawberry"];
const media = ["toast", 2, "pastry", "croissant"];

let lstRandomizer = new ListRandomizer(null, fruit, "jam", media);
let myRandomSelectionArray = lstRandomizer.rnd(); /* output ex: ["strawberry, blueberry", jam, "toast"] */
```

### Customizing the output
The `options` object let you manipulate the output of the result list :

```js
const monster = ["orc", "goblin", "dragon"];
const loot = ["50 gold pieces", 3, "15 gems", "a magic sword"];

const options = {
  isRerollSame: true,
  reRollJoin: " and "
}

let lstRandomizer = new ListRandomizer(options, monster, " slain award you : ", loot);
let myRandomSelectionArray = lstRandomizer.rnd(); 
/* output ex: ["dragon", "slain award you", "50 gold pieces and 15 gems and 15 gems"] */
```