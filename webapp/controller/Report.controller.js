sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("zurich.fscm.ui.cpcd.his.controller.Report", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            var oViewModel;

            // keeps the search state
            this._aTableSearchState = [];

            // Model used to manipulate control states
            oViewModel = new JSONModel({
                worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
                shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                tableNoDataText : this.getResourceBundle().getText("tableNoDataText")
            });
            this.setModel(oViewModel, "worklistView");

        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */
        
		onBeforeRebindTable: function (oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams");
			var scenario = this.getView().byId("scenario").getSelectedKey();
            if (scenario.length>0){
                mBindingParams.filters.push(new Filter("Type", FilterOperator.EQ, scenario));  
                if  (scenario === "02"){
                    mBindingParams.filters.push(new Filter("Type", FilterOperator.EQ, "03"));                     
                }                          
            }                            

			var status = this.getView().byId("status"), newFilter ;
			var aCountKeys = status.getSelectedKeys();
			for (var i = 0; i < aCountKeys.length; i++) {  
				//if (aCountKeys.length > 0) {        
                 if (aCountKeys[i]==="01" ) {
                        newFilter = new Filter("Status", FilterOperator.EQ, aCountKeys[i]);
					    mBindingParams.filters.push(newFilter);
                        newFilter = new Filter("Status", FilterOperator.EQ, "05");
					    mBindingParams.filters.push(newFilter);                                                
                    } else if (aCountKeys[i]==="02" )  {
                        newFilter = new Filter("Status", FilterOperator.EQ, aCountKeys[i]);
					    mBindingParams.filters.push(newFilter);
                        newFilter = new Filter("Status", FilterOperator.EQ, "06");
					    mBindingParams.filters.push(newFilter);                     
                    } else if (aCountKeys[i]==="03")   {
                        newFilter = new Filter("Status", FilterOperator.EQ, aCountKeys[i]);
					    mBindingParams.filters.push(newFilter);
                        newFilter = new Filter("Status", FilterOperator.EQ, "04");
					    mBindingParams.filters.push(newFilter);                         
                        newFilter = new Filter("Status", FilterOperator.EQ, "07");
					    mBindingParams.filters.push(newFilter);                     
                    }  else {
                        newFilter = new Filter("Status", FilterOperator.EQ, aCountKeys[i]);
					    mBindingParams.filters.push(newFilter);                        
                    }              
				//}
			}

            
		},
        /**
         * Event handler for refresh event. Keeps filter, sort
         * and group settings and refreshes the list binding.
         * @public
         */
        onRefresh : function () {
            var oTable = this.byId("table");
            oTable.getBinding("items").refresh();
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Shows the selected item on the object page
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
        _showObject : function (oItem) {
            this.getRouter().navTo("object", {
                objectId: oItem.getBindingContext().getPath().substring("/zz9fscm_cpcd_history_od".length)
            });
        },

        /**
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */
        _applySearch: function(aTableSearchState) {
            var oTable = this.byId("table"),
                oViewModel = this.getModel("worklistView");
           // oTable.getBinding("items").filter(aTableSearchState, "Application");
            // changes the noDataText of the list in case there are no filter results
            if (aTableSearchState.length !== 0) {
                oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
            }
        }

    });
});
