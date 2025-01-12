/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['../accUtils', "knockout", 'text!../basicData.json', 'ojs/ojarraydataprovider', "ojs/ojknockout", 
  "ojs/ojbutton", "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojinputnumber", "ojs/ojradioset", "ojs/ojlabel", "ojs/ojlabelvalue", 'ojs/ojchart', "ojs/ojcheckboxset", "ojs/ojlabel", "ojs/ojlabelvalue" ],
    function(accUtils, ko, data, ArrayDataProvider) {
       function FormsViewModel() {
        this.value_disabled = ko.observable(false);
        this.value_readonly = ko.observable(false);
        this.activatedButton = ko.observable("(None activated yet)");
        
        this.buttonAction = (event) => { 
          this.activatedButton(event.currentTarget.id); 
          if (String(event.currentTarget.id) === "disabled") { 
          this.value_disabled(true); 
          this.value_readonly(false); 
          } else 
          if (String(event.currentTarget.id) === "readonly") { 
          this.value_disabled(false); 
          this.value_readonly(true); 
          } else { 
          this.value_disabled(false); 
          this.value_readonly(false); 
          } 
          return true; 
          };
        this.nume = ko.observable("Andreea");
        this.prenume = ko.observable("Popescu");
        this.nume_prenume = ko.computed(function() { 
          return this.nume() + " " + this.prenume(); 
        }.bind(this)); 
        this.varsta = ko.observable(20)
        this.setModelCurrentChartToInit = () => { 
          this.currentChart("bar"); 
          return true;      
  }; 
         
        this.currentChart = ko.observable("bar"); 
        this.chartOptions = [ { id: "area", value: "Area" }, 
          { id: "bar", value: "Bar" }, 
          { id: "line", value: "Line" }, 
          { id: "pie", value: "Pie" }, 
          { id: "funnel", value: "Funnel" } ]; 
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');
        self.dataProvider = new ArrayDataProvider(JSON.parse(data), {
          keyAttributes: 'id'});
        this.orientationValue = ko.observable("vertical"); 
        this.directionOptions = [ 
            { id: "vertical", value: "Vertical" }, 
            { id: "horizontal", value: "Horizontal" } 
          ]; 
          this.currentJudet = ko.observableArray(['sibiu']);
          this.agreement = ko.observableArray();
          this.judetOptions = [
            { id: 'sb', value: 'sibiu', judet: 'Sibiu' },
            { id: 'cj', value: 'cluj', judet: 'Cluj' },
            { id: 'vl', value: 'valcea', judet: 'Valcea' },
            { id: 'bv', value: 'brasov', judet: 'Brasov' },
            { id: 'ab', value: 'alba', judet: 'Alba' }
          ];
          this.setJudeteSibiuValcea = () => { 
            this.currentJudet(['sibiu', 'valcea']); 
            return true;      
    }; 
    
          this.setJudetToSibiu = () => { 
            this.currentJudet(['sibiu']); 
            return true;      
      }; 
  }
       /*
        * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
        * return a constructor for the ViewModel so that the ViewModel is constructed
        * each time the view is displayed.
        */
       return FormsViewModel;
     }
   );
   