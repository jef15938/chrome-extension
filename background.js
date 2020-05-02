// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// import { customTaskMain } from './customTassk.js';

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        //pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

var counter = 0;


// chrome.browserAction.onClicked.addListener(function (tab) {
//     counter++;
//     alert(counter);
//     if (counter == 5) {
//         alert("Hey !!! You have clicked five times");
//     }
// });
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    console.log(tab, ' refresh');
    if (tab.url === 'https://www.youtube.com/watch?v=0EeN4P-mTgU') {
      alert('i got u');
      chrome.tabs.update(tab.id, { url: `${tab.url}#t=1m10s` });
    }

    //啟用 copy paste
      chrome.tabs.executeScript(Number(tab.id), { code: `
      (() => {
        console.log('啟用 copy paste');
        document.addEventListener('paste', (event) => {
          event.stopPropagation();
        }, true);
        document.addEventListener('copy', (event) => {
          event.stopPropagation();
        }, true);
    })()`});
    //結束 啟用 copypaste

    //啟用 mark
    const js = 
    `
      let header = document.createElement('div');
      let inputEle = document.createElement('input');
      let submitBtn = document.createElement('button');
      let clearBtn = document.createElement('button');
      let headerHeight = '25';
      let extensionElementList = [header, inputEle, submitBtn];
      let effectElementList = [];
      
      let markStyleName = 'extensionsMarkStyle'
      let style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '.' + markStyleName + '{ box-shadow: inset 0px 0px 0px 3px red !important; }';
      document.getElementsByTagName('head')[0].appendChild(style);
      
      // input Area
      inputEle.style.cssText = '';
      inputEle.style.width = '30%'
      
      // submitBtn Area
      submitBtn.style.cssText = '';
      submitBtn.textContent = 'Search';
      submitBtn.style.height = headerHeight + 'px';
      
      // clearBtn Area
      clearBtn.textContent = 'Clear';
      clearBtn.style.height = headerHeight + 'px';
      
      // header Area
      header.append('querySelectorAll ( ')
      header.append(inputEle);
      header.append(' ) ')
      header.append(submitBtn);
      header.append(clearBtn);
      header.style.position = 'fixed';
      header.style.display = 'flex';
      header.style['justify-content']='space-around';
      header.style.top = '0px';
      header.style.height = headerHeight + 'px';
      header.style.width = '100%';
      header.style.zIndex = '99999999';
      header.style.left = '0px';
      
      header.style.backgroundColor = "#cafacf";
      header.style.color = "black";
      
      document.body.style.marginTop = headerHeight + 'px';
      document.body.append(header);
      
      
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      
      submitBtn.addEventListener('click', () => {
        const inputValue = inputEle.value.trim();
        if(inputValue) {
          try {
            let target = document.body.querySelectorAll(inputValue);
      
            if (target.length > 0) {
              target.forEach((element, index) => {
                effectElementList.push(element);
                if (extensionElementList.indexOf(element) !== -1) {
                  return;
                }
                element.classList.add(markStyleName);
                if (index === 0) {
                  window.scrollTo({
                    top: getCoords(element).top - +headerHeight,
                    behavior: "smooth"
                  });
                }
              });
            }
            else {
              alert('not found');
            }
          }
          catch (error) {
            alert('not found');
          }
      
        }
      
      });
      
      
      clearBtn.addEventListener('click', () => {
        let uniqueList = [...new Set(effectElementList)];
        uniqueList.forEach(element => {
          element.classList.remove(markStyleName);
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      })
      
      
      function getCoords(elem) { // crossbrowser version
        var box = elem.getBoundingClientRect();
      
        var body = document.body;
        var docEl = document.documentElement;
      
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
      
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
      
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
      
        return { top: Math.round(top), left: Math.round(left) };
      }
    `;
      chrome.tabs.executeScript(Number(tab.id), { code: `
      (() => {
        console.log('啟用 MarkElement');
        ${js}
    })()`});
    //結束 mark

  }
});




var opt = {
  type: "basic",
  title: "Primary Title",
  message: "Primary message to display",
  iconUrl: "data:image/jpeg;base64,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"
}

// chrome.notifications.create('id1', opt, function (id) { });