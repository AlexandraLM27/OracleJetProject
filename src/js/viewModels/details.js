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
define(['../accUtils', "knockout", "text!../details.json", "ojs/ojformlayout", "ojs/ojinputtext"],
    function(accUtils, ko, records) {
       function DetailsViewModel(args) {
         // Below are a set of the ViewModel methods invoked by the oj-module component.
         // Please reference the oj-module jsDoc for additional information.
         this.incidentData = JSON.parse(records).customers;
         // define view model callback, that will be called by the ModuleRouterAdapter to re-apply parameters
         this.parametersChanged = (params) => {
             this.record(this.incidentData[params.index]);
         };
         this.args = args;
         this.record = ko.observable(this.incidentData[this.args.params.index]);
       }
       return DetailsViewModel;
     }
   );
   