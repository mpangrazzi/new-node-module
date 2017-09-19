#!/usr/bin/env node

const shell = require('shelljs/global')
const flags = require('nanomist')(process.argv.slice(2))

const folder = flags._[0]
const cmds = ['npm', 'git']

if (!folder) {
  echo('Folder name is required')
  exit(1)
}

const cwd = process.cwd()
const targetPath = `${cwd}/${folder}`

cmds.forEach(cmd => {
  if (!which(cmd)) {
    echo(`${cmd} seems to be not available, exiting...`)
    exit(2)
  }
})

mkdir('-p', targetPath)
exec(`cd ${targetPath} && npm init --yes`)
cp(`${__dirname}/files/node.gitignore`, `${targetPath}/.gitignore`)
touch(`${targetPath}/index.js`)

let author = exec('git config user.name', {
  silent: true
}).stdout

let email = exec('git config user.email', {
  silent: true
}).stdout

cat(`${__dirname}/files/README.md`)
  .sed('<MODULE>', folder)
  .sed('<YEAR>', new Date().getFullYear())
  .sed('<COPYRIGHT HOLDER>', `${author.trim()} <${email.trim()}>`)
  .to(`${targetPath}/README.md`)

exec(`cd ${targetPath} && git init`)

exit(0)
