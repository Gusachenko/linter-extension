// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
document.addEventListener('DOMContentLoaded', function() {

  let checkCustomLint = $('.check-custom-lint');
  let checkAdvancedLint = $('.check-advanced-lint');
  let btnApplySettings = $('.btn-apply-settings'); 

  $(btnApplySettings).click(e => {
    

    // let config = {isCheckCustomLintChecked: checkCustomLint.prop('checked')};


      let config = {
        isCheckCustomLintChecked: checkCustomLint.prop('checked'),
        isCheckAdvancedLintChecked: checkAdvancedLint.prop('checked')
      };

      if(config.isCheckCustomLintChecked){
        chrome.tabs.insertCSS(null, {file: "content/linter-styles/custom-lint.css"});
      }
      if(config.isCheckAdvancedLintChecked){
        chrome.tabs.insertCSS(null, {file: "content/linter-styles/advanced-lint.css"});
      }


      // chrome.tabs.executeScript(null, {
      //     code: 'var config = ' + JSON.stringify(config)
      // }, function() {
      //     chrome.tabs.executeScript(null, {file: 'content/document-app.js'});
      // });

  });


  console.count('Extension Loaded, Started!');
  // chrome.tabs.executeScript(null, {file: "content/jquery-3.1.1.min.js"});
  // chrome.tabs.executeScript(null, {file: "content/app.js"});
  chrome.tabs.executeScript({
    code: `
      //document.body.style.backgroundColor="red";
      window.testVar = 3;
      console.log(testVar);
      `
  });


  //$('body').html("SS in POPUP");






});