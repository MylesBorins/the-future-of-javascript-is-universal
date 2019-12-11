/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var bespoke = require('bespoke');
var nebula = require('bespoke-theme-nebula');
var keys = require('bespoke-keys');
var touch = require('bespoke-touch');
var bullets = require('bespoke-bullets');
var backdrop = require('bespoke-backdrop');
var scale = require('bespoke-scale');
var hash = require('bespoke-hash');
// var progress = require('bespoke-progress');
var forms = require('bespoke-forms');

// Bespoke.js
bespoke.from('article', [
  nebula(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  backdrop(),
  scale(),
  hash(),
  // progress(),
  forms()
]);

require('prismjs');
