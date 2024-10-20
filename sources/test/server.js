const { __DOMHandler } = require('@xmldom/xmldom/lib/dom-parser')
const express = require('express')

const app = express()

app.use(express.static(__dirname))
app.use('/', express.static(__dirname+'../../'))

app.listen(3000)

console.log('listen 3000')