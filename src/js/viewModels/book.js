/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['../accUtils', "knockout", "text!../book.json", "ojs/ojformlayout", "ojs/ojinputtext", "ojs/ojtoolbar", "ojs/ojbutton"],
  function(accUtils, ko, records) {
     function BookViewModel(args) {
       // Below are a set of the ViewModel methods invoked by the oj-module component.
       // Please reference the oj-module jsDoc for additional information.
       this.incidentData = JSON.parse(records).about;
       // define view model callback, that will be called by the ModuleRouterAdapter to re-apply parameters
       this.parametersChanged = (params) => {
           this.record(this.incidentData[params.index]);
       };
       this.args = args;
       this.record = ko.observable(this.incidentData[this.args.params.index]);
       
       this.findIndexByOffset = (direction) => { 
        const currRecord = this.record(); 
        const currIndex = this.incidentData.indexOf(currRecord); 
        let newIndex = currIndex + direction; 
        if (newIndex >= this.incidentData.length) { 
        newIndex = 0; 
        } 
        else if (newIndex < 0) { 
        newIndex = this.incidentData.length - 1; 
        } 
        return newIndex; 
        };
        // Called when Previous button clicked 
      this.onPrevious = () => { 
        const newIndex = this.findIndexByOffset(-1); 
        args.router.go({ path: 'book', params: { index: newIndex } }); 
        }; 
        // Called when Next button clicked 
        this.onNext = () => { 
        const newIndex = this.findIndexByOffset(1); 
        args.router.go({ path: 'book', params: { index: newIndex } }); 
        };
     }
     return BookViewModel;
   }
 );
 