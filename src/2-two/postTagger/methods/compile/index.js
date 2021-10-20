import parse from './01-parse.js'
import expand from './02-expand.js'
import cache from './03-cache.js'
import group from './04-group.js'

// do some indexing on the list of matches
const compile = function (matches, methods) {
  // turn match-syntax into json
  matches = parse(matches, methods)
  // convert (a|b) to ['a', 'b']
  matches = expand(matches)
  matches = expand(matches) // run this twice
  // retrieve the needs of each match statement
  matches = cache(matches, methods)
  // organize them according to need...
  let byGroup = group(matches, methods)

  // every sentence has a noun
  delete byGroup['#Noun']

  // let words = Object.keys(byGroup)
  // words = words.sort((a, b) => {
  //   if (byGroup[a].length > byGroup[b].length) {
  //     return -1
  //   }
  //   return 0
  // })
  // words.slice(0, 10).forEach(k => {
  //   console.log(k, byGroup[k].length)
  // })
  return byGroup
}

export default compile
