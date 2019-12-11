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

const bespoke = require('bespoke');
const nebula = require('bespoke-theme-nebula');
const keys = require('bespoke-keys');
const touch = require('bespoke-touch');
const bullets = require('bespoke-bullets');
const backdrop = require('bespoke-backdrop');
const scale = require('bespoke-scale');
const hash = require('bespoke-hash');
// const progress = require('bespoke-progress');
const forms = require('bespoke-forms');

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
