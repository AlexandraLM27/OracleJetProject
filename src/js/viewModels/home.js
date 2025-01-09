/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['../accUtils', "knockout", 'text!../basicData.json', 'ojs/ojarraydataprovider', "ojs/ojknockout", "ojs/ojselectcombobox", 'ojs/ojchart'],
 function(accUtils, ko, data, ArrayDataProvider) {
    function HomeViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      var self = this;
      self.value1 = ko.observable('bar');
      self.stackValue = ko.observable('off');
      self.orientationValue = ko.observable('vertical');
      self.dataProvider = new ArrayDataProvider(JSON.parse(data), {
        keyAttributes: 'id'});
      }
    return HomeViewModel;
  }
);
