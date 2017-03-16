var sass = require('node-sass')
var postcss = require('postcss')
var fs = require('fs')

const inputFile = './layouts/partials/styles-src/styles.scss'
const outputFile = './layouts/partials/styles/stylesheet.html'

sass.render({
  file: inputFile,
  outputStyle: 'nested' //  nested, expanded, compact, compressed
}, (error, result) => {
  if (error) {
    console.log('status', error.status)
    console.log('column', error.column)
    console.log('message', error.message)
    console.log('line', error.line)
  } else {
    let cssOutput = result.css.toString()
    postcss([ require('autoprefixer'), require('cssnano') ])
            .process(cssOutput)
            .then((result) => {
              fs.writeFile(outputFile, result.css, function (err) {
                if (err) {
                  return console.log(err)
                }
                console.log('\u2611 file ' + outputFile + ' updated with current styling from ' + inputFile)
              })
            })
  }
})
