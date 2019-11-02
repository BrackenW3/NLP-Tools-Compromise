const methods = {
  misc: require('./methods'),
  selections: require('./selections'),
}
const tagger = require('../02-tagger')
const tokenize = require('../01-tokenizer')
const extend = require('../Subset')

/** a parsed text object */
class Doc {
  constructor(list, from, world) {
    this.list = list
    //quiet these properties in console.logs
    Object.defineProperty(this, 'from', {
      enumerable: false,
      value: from,
      writable: true,
    })
    //borrow some missing data from parent
    if (world === undefined && from !== undefined) {
      world = from.world
    }
    //'world' getter
    Object.defineProperty(this, 'world', {
      enumerable: false,
      value: world,
      // writable: true, //todo: add me?
    })
    //fast-scans for our data

    //'found' getter
    Object.defineProperty(this, 'found', {
      get: () => this.list.length > 0,
    })
    //'length' getter
    Object.defineProperty(this, 'length', {
      get: () => this.list.length,
    })
    // this is way easier than .constructor.name...
    Object.defineProperty(this, 'isA', {
      get: () => 'Doc',
    })
  }

  /** run part-of-speech tagger on all results*/
  tagger() {
    return tagger(this)
  }

  /** pool is stored on phrase objects */
  pool() {
    if (this.list.length > 0) {
      return this.list[0].pool
    }
    return this.all().list[0].pool
  }
}

/** create a new Document object */
Doc.prototype.buildFrom = function(list) {
  list = list.map(p => p.clone(true))
  let doc = new Doc(list, this, this.world)
  return doc
}

/** create a new Document from plaintext. */
Doc.prototype.fromText = function(str) {
  let list = tokenize.fromText(str, this.world, this.pool())
  return this.buildFrom(list)
}
/** add new subclass methods */
Doc.prototype.extend = function(fn) {
  fn(this)
  return this
}

Object.assign(Doc.prototype, methods.misc)
Object.assign(Doc.prototype, methods.selections)

//add sub-classes
extend(Doc)

//aliases
const aliases = {
  untag: 'unTag',
  and: 'match',
  notIf: 'ifNo',
  only: 'if',
  onlyIf: 'if',
}
Object.keys(aliases).forEach(k => (Doc.prototype[k] = Doc.prototype[aliases[k]]))
module.exports = Doc
