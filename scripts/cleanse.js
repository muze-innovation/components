/* eslint-disable no-console */
/* eslint-disable-next-line */
'use strict'

const fs = require('fs')
const join = require('path').join
const resolve = require('path').resolve
const cp = require('child_process')
const BbPromise = require('bluebird')

const registryPath = resolve(__dirname, join('..', 'registry'))
const componentDirs = fs.readdirSync(registryPath)

BbPromise.map(componentDirs, (componentDir) => {
  // eslint-disable-line consistent-return
  const componentDirPath = join(registryPath, componentDir)

  if (!fs.lstatSync(componentDirPath).isDirectory()) return BbPromise.resolve()

  if (fs.existsSync(join(componentDirPath, 'node_modules'))) {
    const removeNodeModules = cp.spawn('rm', ['-rf', join(componentDirPath, 'node_modules')], {
      env: process.env
    })
    removeNodeModules.stdout.on('data', (data) => {
      console.log(data.toString())
    })
    const removeDist = cp.spawn('rm', ['-rf', join(componentDirPath, 'dist')], {
      env: process.env
    })
    removeDist.stdout.on('data', (data) => {
      console.log(data.toString())
    })
    const removeLock = cp.spawn('rm', [resolve(componentDirPath, 'package-lock.json')], {
      env: process.env
    })
    removeLock.stdout.on('data', (data) => {
      console.log(data.toString())
    })
  }
})

const removeNodeModules = cp.spawn('rm', ['-rf', resolve(__dirname, '..', 'node_modules')], {
  env: process.env
})
removeNodeModules.stdout.on('data', (data) => {
  console.log(data.toString())
})
const removeDist = cp.spawn('rm', ['-rf', resolve(__dirname, '..', 'dist')], {
  env: process.env
})
removeDist.stdout.on('data', (data) => {
  console.log(data.toString())
})
const removeLock = cp.spawn('rm', [resolve(__dirname, '..', 'package-lock.json')], {
  env: process.env
})
removeLock.stdout.on('data', (data) => {
  console.log(data.toString())
})
