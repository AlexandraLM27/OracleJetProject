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
define(['knockout',"ojs/ojhtmlutils", "ojs/ojflattenedtreedataproviderview", "ojs/ojarraytreedataprovider",
     "ojs/ojknockouttemplateutils", "text!../projectData.json", "text!../views/rowTemplate.html", 
     "text!../crud.json","ojs/ojarraydataprovider","ojs/ojbufferingdataprovider", "ojs/ojkeyset", 
     "ojs/ojconverter-number","ojs/ojknockout", "ojs/ojinputtext", "ojs/ojinputnumber", 
     "ojs/ojlabel", "ojs/ojvalidationgroup", "ojs/ojformlayout", "ojs/ojtoolbar", 
     "ojs/ojmessages", "ojs/ojtable", "ojs/ojchart","ojs/ojradioset", "ojs/ojbutton", "ojs/ojlabelvalue", 
     "ojs/ojbinddom", "ojs/ojrowexpander"],
 function(ko, HtmlUtils, FlattenedTreeDataProviderView, ArrayTreeDataProvider, KnockoutTemplateUtils, 
    jsonDataStr, rowTemplateText, deptData, ArrayDataProvider, BufferingDataProvider,  ojkeyset_1, NumberConverter) {
      function CrudViewModel() {
        this.deptArray = JSON.parse(deptData);
              this.deptObservableArray = ko.observableArray(this.deptArray);
              this.dataprovider = new BufferingDataProvider(new ArrayDataProvider(this.deptObservableArray, {
                  keyAttributes: 'NumarMatricol'
              }));
              this.converter = new NumberConverter.IntlNumberConverter({
                  useGrouping: false
              });
              this.isEmptyTable = ko.observable(false);
              this.messageArray = ko.observableArray();
              this.groupValid = ko.observable();
              this.disableSubmit = ko.observable(true);
              // initialize the observable values in the forms
              this.inputMatricol = ko.observable(0); 
              this.inputNume = ko.observable("");  
              this.inputPrenume = ko.observable(""); 
              this.inputAlg = ko.observable(0);  
              this.inputAsc = ko.observable(0); 
              this.inputGeom = ko.observable(0); 


              this.barSeries = [{ name: 'Algoritmi', items: [0] }, 
                { name: 'ASC', items: [0] }, 
                { name: 'Geometrie', items: [0] } 
                ]; 
              this.barGroups = [' ']; 
              this.barSeriesValue = ko.observableArray(this.barSeries); 
              this.barGroupsValue = ko.observableArray(this.barGroups); 

              this.currentSelection = ko.observable("single");
              this.selOptions=[
                  {id:"singleOpt", value:"single", label:"Single"},
                  {id:"multipleOpt", value:"multiple", label:"Multiple"},
              ];


              this.inputNumePrenume = ko.computed(function(){
                return this.inputNume() + " " + this.inputPrenume();
              }.bind(this));

              this.inputMedia = ko.computed(function(){
                var ma = (this.inputAlg() + this.inputAsc() + this.inputGeom())/3;
                return ma.toFixed(2);
              }.bind(this));
              // Return true if the Create button should be disabled
              this.disableCreate = ko.computed(() => {
                  return !this.inputMatricol() || this.groupValid() === 'invalidShown';
              });
              // Return true if the Remove and Update buttons should be disabled
              this.disableRemoveUpdate = ko.computed(() => {
                  const firstSelected = this.inputMatricol();
                  return !firstSelected || !firstSelected.key || this.groupValid() === 'invalidShown';
              });

              this.KnockoutTemplateUtils = KnockoutTemplateUtils;
              this.arrayTreeDataProvider = new ArrayTreeDataProvider(JSON.parse(jsonDataStr), {
                  keyAttributes: 'attr.id'
              });
              this.dataProvider = ko.observable(new FlattenedTreeDataProviderView(this.arrayTreeDataProvider));
              this.getRowConfig = () => {
                  return {
                      view: HtmlUtils.stringToNodeArray(rowTemplateText),
                      data: this
                  };
              };
            // Add a new row 
            this.addRow = () => { 
                if (this.groupValid() !== "invalidShown") { 
                    var dept = { 
                        NumarMatricol: this.inputMatricol(), 
                        Nume: this.inputNume(), 
                        Prenume: this.inputPrenume(), 
                        Algoritmi: this.inputAlg(), 
                        ASC: this.inputAsc(), 
                        Geometrie: this.inputGeom() 
                    }; 
                    this.dataprovider.addItem({ 
                        metadata: { key: dept.NumarMatricol }, 
                        data: dept, 
                    }); 
            } 
            };
        // Update the selected row
            this.updateRow = () => {
                if (this.groupValid() !== 'invalidShown') {
                    const element = document.getElementById('table');
                    const currentRow = element
                        .currentRow;
                    if (currentRow != null) {
                        const key = this.inputMatricol();
                        const newData = {
                        NumarMatricol: this.inputMatricol(), 
                        Nume: this.inputNume(), 
                        Prenume: this.inputPrenume(), 
                        Algoritmi: this.inputAlg(), 
                        ASC: this.inputAsc(), 
                        Geometrie: this.inputGeom() 
                        };
                        this.dataprovider.updateItem({ metadata: { key: key }, data: newData });
                    }
                }
            };
            // common method to handle drop from drag and drop as well as from ctrl+v 
            this._handleDataTransfer = (dataTransfer) => { 
                const jsonStr = dataTransfer.getData("application/ojtablerows+json"); 
                if (jsonStr) { 
                const jsonObj = JSON.parse(jsonStr); 
                const q1Revs = []; 
                const q2Revs = []; 
                const q3Revs = []; 
                this.barGroupsValue.removeAll(); 
                this.barSeriesValue.removeAll(); 
                for (let i = 0; i < jsonObj.length; i++) { 
                const rawData = jsonObj[i].data; 
                8 
                this.barGroupsValue.push(rawData.NumarMatricol); 
                q1Revs.push(rawData.Algoritmi); 
                q2Revs.push(rawData.ASC); 
                q3Revs.push(rawData.Geometrie); 
                } 
                this.barSeriesValue.push({ name: "Algoritmi", items: q1Revs }); 
                this.barSeriesValue.push({ name: "ASC", items: q2Revs }); 
                this.barSeriesValue.push({ name: "Geometrie", items: q3Revs }); 
                } 
                }; 
            // drop event handler on chart 
            this.handleDrop = (event) => { 
                this._handleDataTransfer(event.dataTransfer); 
                event.stopPropagation(); 
                event.preventDefault(); 
            };

            // key event handler on chart
            this.handleKey = (event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
                    this._handleDataTransfer(clipboard);
                }
            };

              // Remove the selected row
            this.removeRow = () => {
                const element = document.getElementById('table');
                const currentRow = element.currentRow;
                if (currentRow != null) {
                    const dataObj = element.getDataForVisibleRow(currentRow.rowIndex);
                    this.dataprovider.removeItem({
                        metadata: { key: dataObj.key },
                        data: dataObj.data
                    });
                    this.dataprovider.getTotalSize().then(function (value) {
                        if (value == 0) {
                            this.isEmptyTable(true);
                        }
                    }.bind(this));
                    // Clear the table selection
                    element.selected = { row: new ojkeyset_1.KeySetImpl(), column: new ojkeyset_1.KeySetImpl() };
                }
            };
            // Remove the selected row
            this.removeRow = () => {
                const element = document.getElementById('table');
                const currentRow = element.currentRow;
                if (currentRow != null) {
                    const dataObj = element.getDataForVisibleRow(currentRow.rowIndex);
                    this.dataprovider.removeItem({
                        metadata: { key: dataObj.key },
                        data: dataObj.data
                    });
                    this.dataprovider.getTotalSize().then(function (value) {
                        if (value == 0) {
                            this.isEmptyTable(true);
                        }
                    }.bind(this));
                    // Clear the table selection
                    element.selected = { row: new ojkeyset_1.KeySetImpl(), column: new ojkeyset_1.KeySetImpl() };
                }
            };
            this.removeAllRow = () => {
                this.dataprovider.fetchByOffset({ size: -1, offset: 0 }).then(function (fetchResults) {
                    let dataArray = fetchResults.results;
                    for (let i = 0; i < dataArray.length; i++) {
                        this.dataprovider.removeItem(dataArray[i]);
                    }
                    this.dataprovider.getTotalSize().then(function (value) {
                        if (value == 0) {
                            this.isEmptyTable(true);
                        }
                    }.bind(this));
                }.bind(this));
            };
            // Reset all rows to discard buffered changes
            this.resetRows = () => {
                this.dataprovider.resetAllUnsubmittedItems();
                this.isEmptyTable(this.dataprovider.isEmpty() === 'yes');
                this.messageArray([
                    {
                        severity: 'confirmation',
                        summary: 'Changes have been reset.',
                        autoTimeout: 4000
                    }
                ]);
            };
            this.findIndex = (key) => {
                const ar = this.deptObservableArray();
                for (let idx = 0; idx < this.deptObservableArray().length; idx++) {
                    if (ar[idx].DepartmentId === key) {
                        return idx;
                    }
                }
                return -1;
            };
            // Commit a row to the data source.  This is dependent on the data source.
            this.commitOneRow = (editItem) => {
                const idx = this.findIndex(editItem.item.metadata.key);
                let error;
                if (idx > -1) {
                    if (editItem.operation === 'update') {
                        this.deptObservableArray.splice(idx, 1, editItem.item.data);
                    }
                    else if (editItem.operation === 'remove') {
                        this.deptObservableArray.splice(idx, 1);
                    }
                    else {
                        error = {
                            severity: 'error',
                            summary: 'add error',
                            detail: 'Row with same key already exists'
                        };
                    }
                }
                else {
                    if (editItem.operation === 'add') {
                        this.deptObservableArray.splice(this.deptObservableArray().length, 0, editItem.item.data);
                    }
                    else {
                        error = {
                            severity: 'error',
                            summary: editItem.operation + ' error',
                            detail: 'Row for key cannot be found'
                        };
                    }
                }
                if (error) {
                    return Promise.reject(error);
                }
                return Promise.resolve();
            };
            // Submit the unsubmitted items
            this.submitRows = () => {
                this.disableSubmit(true);
                // Get all the submittable items
                const editItems = this.dataprovider.getSubmittableItems();
                editItems.forEach((editItem) => {
                    // Set each edit item to "submitting" status before data submission
                    this.dataprovider.setItemStatus(editItem, 'submitting');
                    //DepartmentData
                    // Commit data
                    this.commitOneRow(editItem)
                        .then(() => {
                        // Set the edit item to "submitted" if successful
                        this.dataprovider.setItemStatus(editItem, 'submitted');
                    })
                        .catch((error) => {
                        // Set the edit item back to "unsubmitted" with error if not successful
                        this.dataprovider.setItemStatus(editItem, 'unsubmitted', error);
                        var errorMsg = {
                            severity: error.severity,
                            summary: error.summary,
                            autoTimeout: 4000
                        };
                        this.messageArray.push(errorMsg);
                    });
                });
                this.messageArray([
                    {
                        severity: 'confirmation',
                        summary: 'Changes have been submitted.',
                        autoTimeout: 4000
                    }
                ]);
            };
            // Show all submittable edit items
            this.showSubmittableItems = (submittable) => {
                const textarea = document.getElementById('bufferContent');
                let textValue = '';
                submittable.forEach((editItem) => {
                    textValue += editItem.operation + ' ';
                    textValue += editItem.item.metadata.key + ': ';
                    textValue += JSON.stringify(editItem.item.data);
                    if (editItem.item.metadata.message) {
                        textValue += ' error: ' + JSON.stringify(editItem.item.metadata.message);
                    }
                    textValue += '\n';
                });
                textarea.value = textValue;
            };
            // Listener for updating the form when row selection changes in the table
            this.firstSelectedRowChangedListener = (event) => {
                const itemContext = event.detail.value;
                if (itemContext && itemContext.data) {
                    const dept = itemContext.data;
                    this.inputMatricol(dept.NumarMatricol);
                    this.inputNume(dept.Nume);
                    this.inputPrenume(dept.Prenume);
                    this.inputAlg(dept.Algoritmi);
                    this.inputAsc(dept.ASC);
                    this.inputGeom(dept.Geometrie);
                }
            };
            this.hideTable = (hide) => {
                const table = document.getElementById('table');
                const noDataDiv = document.getElementById('noDataDiv');
                if (hide === true) {
                    table.classList.add('oj-sm-hide');
                    noDataDiv.classList.remove('oj-sm-hide');
                }
                else {
                    table.classList.remove('oj-sm-hide');
                    noDataDiv.classList.add('oj-sm-hide');
                }
            };
            this.dataprovider.addEventListener('submittableChange', (event) => {
                // BufferingDataProvider fires the "submittableChange" event whenever there is a change in the number of submittable items.
                // We can use this to update the UI.
                const submittable = event.detail;
                this.disableSubmit(submittable.length === 0);
                this.showSubmittableItems(submittable);
            });
            this.dataprovider.addEventListener('mutate', (event) => {
                if (this.isEmptyTable() === true && event.detail.add != null) {
                    this.isEmptyTable(false);
                }
            });
            this.isEmptyTable.subscribe((newValue) => {
                this.hideTable(newValue);
            });
            this.isEmptyTable(this.dataprovider.isEmpty() === 'yes');
    }
   
       /*
        * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
        * return a constructor for the ViewModel so that the ViewModel is constructed
        * each time the view is displayed.
        */
       return CrudViewModel;
     }
   );
   