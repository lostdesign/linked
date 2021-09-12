import { app } from 'electron'
import * as path from 'path'

const { Document } = require('flexsearch')
const fs = require('fs')

const searchIndexPath = path.join(app.getPath('userData'), 'search-index.json')


const index = new Document({
  document: {
    id: 'date',
    index: ['content']
  },
  tokenize: 'forward'
})

const searchIndexExists = () => {
  return fs.existsSync(searchIndexPath)
}

/**
 * Cleans the content from any html elements, as well as deleting any
 * base64 images and removing duplicates.
 * @param content
 * @returns { String }
 */
const tokenizer = (content) => {
  const cleanedHtml = content.match(/(?<=>)([\w\s]+)(?=<\/)/gm)
  return cleanedHtml.filter((word, index, self) => self.indexOf(word) === index)
}

/**
 * Hydrating the index from local file
 */
const initIndex = () => {
  const fetchedIndex = fetchIndex()
  importIndex(fetchedIndex)

  index.add({ date: '2021-08-21', content: tokenizer('<p>foobar foobar foobar foobar baz bang</p>') })
  index.add({ date: '2021-08-22', content: tokenizer('<p>foobar 330 lololo</p>') })

  //const result = index.search('foo', { enrich: true })
  //console.log('result --- ', JSON.stringify(result))

  saveSearchIndex(index)
}

/**
 * Adds the given dayObject {date: Date, content: String}
 * to the index and persists it
 * @param dayObject
 */
const addAndSaveIndex = (dayObject) => {
  index.addAsync({
    date: dayObject.date,
    content: tokenizer(dayObject.content)
  }).then(() => {
    saveSearchIndex(index)
  })
}

const search = async (query) => {
  return await index.searchAsync(query)
}

const fetchIndex = () => {
  try {
    if (!searchIndexExists()) {
      return null
    }
    return JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'))
  } catch (err) {
    console.error(err)
    return null
  }
}

const importIndex = (idx) => {
  // fetch file
  // loop over entries in file
  // call index.import(key, data)
}

const saveSearchIndex = async (index) => {
  let exportedIndex = []

  index.export((key, data) => {
    exportedIndex.push({ key: key, data: data })
  })
  
  console.log('EXPORTING THE DAMN INDEX ', exportedIndex)

  //fs.writeFileSync(searchIndexPath, JSON.stringify(exportedIndex))
}


export { addAndSaveIndex, search, initIndex }