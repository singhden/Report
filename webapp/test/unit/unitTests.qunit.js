/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zurich/fscm/ui/cpcd/his/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});