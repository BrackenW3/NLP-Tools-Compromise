const nlp = require('./src/index')
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/scan/src'))

// nlp(`okay, do not use reverse psychology`).debug()
// nlp(`April, June, and September`).debug()

// nlp(`i won't go`).debug()
let doc = nlp(`i'm going`).debug()
// console.log(doc.termList())

// console.time('all')
// nlp(txt) //.debug()
// console.timeEnd('all')

// (the|those|these) #Adjective? [#PastTense]
// (#WeekDay|#Month) #Value
