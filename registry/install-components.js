/* eslint-disable no-console */
/* eslint-disable-next-line */
'use strict'

const fs = require('fs')
const path = require('path')
const join = require('path').join
const cp = require('child_process')
const os = require('os')
const BbPromise = require('bluebird')

const registryPath = path.resolve(__dirname)
const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'
const componentDirs = fs.readdirSync(registryPath)
const concurrency = process.env.NODE_VERSION && process.env.NODE_VERSION.startsWith('4') ? 6 : 0

BbPromise.map(
  componentDirs,
  (componentDir) => {
    // eslint-disable-line consistent-return
    const componentDirPath = join(registryPath, componentDir)

    return new BbPromise((resolve, reject) => {
      if (!fs.existsSync(join(componentDirPath, 'package.json'))) return resolve()

      const command = cp.spawn(npmCmd, ['install'], { env: process.env, cwd: componentDirPath })
      command.stdout.on('data', (data) => {
        console.log(data.toString())
      })
      command.stdout.on('close', () => resolve())
      command.stdout.on('error', (error) => reject(error))
    })
  },
  { concurrency }
)
