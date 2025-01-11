/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */

define(['../accUtils', "knockout", "ojs/ojarraydataprovider", 
"ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "text!../basicData.json",  "text!../CatalogData.json", "ojs/ojtable", "ojs/ojselectcombobox","ojs/ojchart", "ojs/ojcheckboxset", "ojs/ojnavigationlist", "ojs/ojknockout",  "ojs/ojcollapsible"],
 function(accUtils, ko, ArrayDataProvider, ResponsiveUtils, ResponsiveKnockoutUtils, dataChart, dataCatalog) {
    function LayoutViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      this.checkValue = ko.observableArray();
      this.dircolumn = ko.pureComputed(() => {
          return !!(typeof this.checkValue()[0] !== 'undefined' &&
              this.checkValue()[0] != null &&
              this.checkValue()[0] === 'dirColumn');
      });
      const data = [ 
        { name: "Grafic Bar", id: "bar", icons: "oj-ux-ico-bar-chart" }, 
        { name: "Grafic Line", id: "line", icons: "oj-ux-ico-share" }, 
        { name: "Grafic Pie", id: "pie", icons: "oj-ux-ico-success-s" }, 
        { name: "Grafic Area", id: "area", icons: "oj-ux-ico-chat-on" } 
        ]; 
        this.dataProvider = new ArrayDataProvider(data, { keyAttributes: "id" }); 
        // observable for medium and up screens 
        this.selectedItem = ko.observable("bar"); 
        let mdQuery = ResponsiveUtils.getFrameworkQuery("md-up"); 
        if (mdQuery) { 
        this.medium = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery); 
        }
       /* toggle button variables */ 
       this.stackValue = ko.observable('off'); 
       this.orientationValue = ko.observable('vertical'); 
       this.dataProviderChart = new ArrayDataProvider(JSON.parse(dataChart), { 
           keyAttributes: 'id' 
       }); 
       this.columns = [{ 
        headerText: "Id", 
        field: "id", 
        headerClassName: "oj-sm-only-hide", 
        className: "oj-sm-only-hide", 
        resizable: "enabled", 
        id: "id" 
      }, 
      { 
        headerText: "Nume Prenume", 
        template: "fullName",       
        headerClassName: "oj-sm-only-hide", 
        className: "oj-sm-only-hide", 
        resizable: "enabled", 
        id: "fullname" 
        }, 
      { 
        headerText: "Algoritmi", 
        field: "alg", 
        headerClassName: "oj-sm-only-hide", 
        className: "oj-sm-only-hide", 
        resizable: "enabled", 
        id: "alg" 
      }, 
      { 
        headerText: "ASC", 
        field: "asc", 
        headerClassName: "oj-sm-only-hide", 
        className: "oj-sm-only-hide", 
        resizable: "enabled", 
        id: "asc" 
      }, 
      { 
        headerText: "Birotica", 
        field: "bir", 
        headerClassName: "oj-sm-only-hide", 
        className: "oj-sm-only-hide", 
        resizable: "enabled", 
        id: "bir" 
      },
      { 
        headerText: "Media", 
        template: "media",       
        headerClassName: "oj-sm-only-hide", 
        className: "oj-sm-only-hide", 
        resizable: "enabled", 
        id: "media" 
        }]; 
      this.CatalogArray = JSON.parse(dataCatalog); 
      this.dataproviderCatalog = new ArrayDataProvider(this.CatalogArray, { 
        keyAttributes: 'id', 
        implicitSort: [{ attribute: 'id', direction: 'ascending' }] 
      }); 
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Layout page loaded.', 'assertive');
        document.title = "Layout";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return LayoutViewModel;
  }
);
