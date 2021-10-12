new-node-module(1)
===

A CLI tool which generates a minimal boilerplate for creating new [Node.js](https://nodejs.org/en/) modules.

It's implemented with [shelljs](https://github.com/shelljs/shelljs) instead of bash. Why? Just for fun.

## Install

With [npm](https://www.npmjs.com):

```bash
$ npm install -g new-node-module
```

## Usage

```bash
# Simple module
$ new-node-module --name 'test'

# Scoped module
$ new-node-module --scope '@yourscope' --name 'test'
```

## Debug

To see what's going on under the hood, run:

```bash
$ DEBUG=new-node-module new-node-module --scope '@yourscope' --name 'test'
```

## LICENSE

Copyright 2017-2021 Michele Pangrazzi <xmikex83@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
