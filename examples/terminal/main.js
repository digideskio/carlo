#!/usr/bin/env node

/**
 * Copyright 2018 Google Inc., PhantomJS Authors All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const child_process = require('child_process');
const carlo = require('carlo');
const { rpc, rpc_process } = require('carlo/rpc');

class TerminalApp {
  constructor() {
    this.launch_();
  }

  async launch_() {
    this.app_ = await carlo.launch({ bgcolor: '#2b2e3b', width: 800, height: 800 });
    this.app_.on('exit', () => process.exit());
    this.initUI_(this.app_.mainWindow());
  }

  async newWindow() {
    this.initUI_(await this.app_.createWindow());
  }

  initUI_(win) {
    win.serveFolder(__dirname + '/www');
    win.serveFolder(__dirname + '/node_modules', 'node_modules');
    return win.load('index.html', rpc.handle(this));
  }

  createTerminal() {
    return rpc_process.spawn('worker.js');
  }

  exit() {
    process.exit();
  }
}

new TerminalApp();
