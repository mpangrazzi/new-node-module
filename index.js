#!/usr/bin/env node

const { scope, name } = require('yargs').argv
const debug = require('debug')('new-node-module')
const path = require('path')
const { sed, echo, exit, which, mkdir, exec, cp, touch, cat } = require('shelljs')

debug(`Will use "${name}" as module name`)
debug(`Will scope module name using "${scope}" as scope`)

const moduleName = scope ? `${scope}/${name}` : name

const cmds = ['npm', 'git']

if (!name) {
  echo('Module name is required')
  exit(1)
}

const cwd = process.cwd()
const targetPath = `${cwd}/${name}`

cmds.forEach(cmd => {
  if (!which(cmd)) {
    echo(`"${cmd}" seems to be not available, exiting...`)
    exit(2)
  }
})

mkdir('-p', targetPath)
debug(`Created target folder ${targetPath}`)

exec(`cd ${targetPath} && npm init --yes >> /dev/null`)
debug('Launched npm init')

cp(`${path.join(__dirname)}/files/node.gitignore`, `${targetPath}/.gitignore`)
debug('Added .gitignore')

touch(`${targetPath}/index.js`)
debug('Created empty index.js')

const author = exec('git config user.name', {
  silent: true
}).stdout.trim()

const email = exec('git config user.email', {
  silent: true
}).stdout.trim()

debug(`Got author name from git config "${author}"`)
debug(`Got author email from git config "${email}"`)

sed('-i', /"name":\s+"(.+)"/, `"name": "${moduleName}"`, path.join(targetPath, 'package.json'))
debug('Update "name" field in package.json')

sed('-i', /"author":\s+"(.+)"/, `"author": "${author}"`, path.join(targetPath, 'package.json'))
debug('Update "author" field in package.json')

cat(`${path.join(__dirname)}/files/README.md`)
  .sed('<MODULE>', moduleName)
  .sed('<YEAR>', new Date().getFullYear())
  .sed('<COPYRIGHT HOLDER>', `${author.trim()} <${email.trim()}>`)
  .to(`${targetPath}/README.md`)

exec(`cd ${targetPath} && git init >> /dev/null`)
debug('Init git repo')

exit(0)
