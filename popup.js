// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let myBody = document.getElementById('myBody');

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  // for (let item of kButtonColors) {
  //   let button = document.createElement('button');
  //   button.style.backgroundColor = item;
  //   button.addEventListener('click', function () {

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        console.log('currentWindow: ', tabs);
        // chrome.tabs.executeScript(
        //   tabs[0].id,
        //   { code: 'document.body.style.backgroundColor = "' + item + '";' });
        // chrome.tabs.executeScript(
        //   tabs[0].id,
        //   {
        //     code: `window.addEventListener('click', function () {
        //     console.log('location changed!');
        //   })'`});


      });


  //   });
  //   myBody.appendChild(button);
  // }
  
}
constructOptions(kButtonColors);
