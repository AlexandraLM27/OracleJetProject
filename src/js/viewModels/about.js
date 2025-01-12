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
define(['../accUtils', "text!../book.json", "knockout", "ojs/ojmodulerouter-adapter", "ojs/ojarraydataprovider", "ojs/ojknockout", "ojs/ojlistview", "ojs/ojmodule-element"],
  function(accUtils, records, ko, ModuleRouterAdapter, ArrayDataProvider) {
     function AboutViewModel(args) {
       // Below are a set of the ViewModel methods invoked by the oj-module component.
       // Please reference the oj-module jsDoc for additional information.
       this.incidentData = JSON.parse(records).about;
       // Setup the data provider with our static data
       this.dataProvider = new ArrayDataProvider(this.incidentData);
       // Create an observable for the current record
       this.record = ko.observable();
       // A computed observable to keep the list selection in sync with the router
       // state.
       this.selection = ko.pureComputed({
           // The observable derives its value from the active record (this.record),
           // which is updated by the router.currentState observable below.
           read: () => {
               const selected = [];
               const record = this.record();
               if (record) {
                   const index = this.incidentData.indexOf(record);
                   selected.push(index);
               }
               return selected;
           },
           // When a list selection changes (by user action), the router is instructed
           // to navigate to the new state identified by the selection.
           write: (selected) => {
               this.router.go({ path: 'book', params: { index: selected[0] } });
           }
       });
       this.args = args;
       // Create a child router with one default path
       this.router = this.args.parentRouter.createChildRouter([
           { path: 'book/{index}' },
           { path: '', redirect: 'book' }
       ]);
       // When router state changes, update the viewmodel's record based on the
       // index from parameters
       this.router.currentState.subscribe((args) => {
           const state = args.state;
           if (state) {
               this.record(this.incidentData[state.params.index]);
           }
       });
       // ModuleRouterAdapter automatically loads the assocaited module for the
       // router state
       this.module = new ModuleRouterAdapter(this.router, {
           viewPath: 'views/',
           viewModelPath: 'viewModels/'
       });
     }
     return AboutViewModel;
   }
 );
 