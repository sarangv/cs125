(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["redirect-redirect-module"],{

/***/ "61ol":
/*!*****************************************************!*\
  !*** ./src/app/redirect/redirect-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: RedirectPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedirectPageRoutingModule", function() { return RedirectPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _redirect_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./redirect.page */ "dty3");




const routes = [
    {
        path: '',
        component: _redirect_page__WEBPACK_IMPORTED_MODULE_3__["RedirectPage"]
    }
];
let RedirectPageRoutingModule = class RedirectPageRoutingModule {
};
RedirectPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], RedirectPageRoutingModule);



/***/ }),

/***/ "C2D+":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/redirect/redirect.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Log Confirmation</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <ion-label>Your log has been submitted</ion-label>\n  <ng-container>\n    <ion-list style=\"text-align:center\">\n            <ion-button (click)=\"Redirect()\" color=\"success\" type=\"submit\" expand=\"block\">Go Back <ion-icon slot=\"end\"name=\"accessibility-outline\"></ion-icon></ion-button> \n    </ion-list>\n    </ng-container>\n</ion-content>\n");

/***/ }),

/***/ "Xmai":
/*!*********************************************!*\
  !*** ./src/app/redirect/redirect.module.ts ***!
  \*********************************************/
/*! exports provided: RedirectPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedirectPageModule", function() { return RedirectPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _redirect_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./redirect-routing.module */ "61ol");
/* harmony import */ var _redirect_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./redirect.page */ "dty3");







let RedirectPageModule = class RedirectPageModule {
};
RedirectPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _redirect_routing_module__WEBPACK_IMPORTED_MODULE_5__["RedirectPageRoutingModule"]
        ],
        declarations: [_redirect_page__WEBPACK_IMPORTED_MODULE_6__["RedirectPage"]]
    })
], RedirectPageModule);



/***/ }),

/***/ "dty3":
/*!*******************************************!*\
  !*** ./src/app/redirect/redirect.page.ts ***!
  \*******************************************/
/*! exports provided: RedirectPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedirectPage", function() { return RedirectPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_redirect_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./redirect.page.html */ "C2D+");
/* harmony import */ var _redirect_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./redirect.page.scss */ "mJ16");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let RedirectPage = class RedirectPage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ngOnInit() {
    }
    Redirect() {
        this.navCtrl.navigateBack('/tabs');
    }
};
RedirectPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] }
];
RedirectPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-redirect',
        template: _raw_loader_redirect_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_redirect_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], RedirectPage);



/***/ }),

/***/ "mJ16":
/*!*********************************************!*\
  !*** ./src/app/redirect/redirect.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWRpcmVjdC5wYWdlLnNjc3MifQ== */");

/***/ })

}]);
//# sourceMappingURL=redirect-redirect-module-es2015.js.map