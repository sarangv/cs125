(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab1-tab1-module"],{

/***/ "8MT7":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab1/tab1.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-button color=\"light\" (click)=\"logout()\">Logout</ion-button>\n    <ion-title>\n      Home\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <div class=\"card-body\">\n    <div class=\"user-meta ion-text-center\">\n      <h3 class=\"playername\">{{ name }}</h3>\n      <h5 class=\"country\">{{ username }}</h5>\n      <h5 class=\"country\">{{ email }}</h5>\n      <h6 class=\"calories_b\">Calories Burned: <ion-chip>\n        <ion-label>{{ calories_b }}</ion-label>\n        </ion-chip>\n      </h6>\n      <h6 class=\"calories_i\">Calories Eaten: <ion-chip>\n        <ion-label>{{ calories_i }}</ion-label>\n        </ion-chip>\n      </h6>\n      <h6 class=\"steps\">Steps Taken: <ion-chip>\n        <ion-input type=\"text\" [(ngModel)]=\"stepCount\" readonly></ion-input>\n        </ion-chip>\n      </h6>\n    </div>\n  </div>\n  <div class=\"card-body2\">\n    <div class=\"user-meta ion-text-center\">\n      <h6 *ngIf=\"activity_name\">Wow an intensity of {{ activity_intensity }} for {{ activity_name }}?? Keep up the good work</h6>\n      <h6 *ngIf=\"food_name\">Hope you liked your {{ food_name }}!</h6>\n    </div>\n  </div>\n  <!--\n  <p>User: {{ username }}</p>\n  <p>Name: {{ name }}</p>\n  <p>Email: {{ email }}</p>\n  <p>Age: {{ age }}</p>\n  <p>Height: {{ height }}</p>\n  <p>Weight: {{ weight }}</p>\n  <p>Calories burned: {{ calories_b }}</p>\n  <p>Calories eaten: {{ calories_i }}</p>\n  -->\n  \n</ion-content>");

/***/ }),

/***/ "Mzl2":
/*!***********************************!*\
  !*** ./src/app/tab1/tab1.page.ts ***!
  \***********************************/
/*! exports provided: Tab1Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1Page", function() { return Tab1Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tab1_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tab1.page.html */ "8MT7");
/* harmony import */ var _tab1_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab1.page.scss */ "rWyk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_health_kit_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/health-kit/ngx */ "QvbA");
/* harmony import */ var _api_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/user.service */ "jfHL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");







let Tab1Page = class Tab1Page {
    constructor(healthKit, plt, userService, navCtrl) {
        this.healthKit = healthKit;
        this.plt = plt;
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.stepCount = 'No Data';
        console.log("Excuting POST");
        var dataToSend = {
            load: "Required"
        };
        this.userService.LoadPage(dataToSend).subscribe((response) => {
            this.name = response['name'];
            this.username = response['username'];
            this.email = response['email'];
            this.username = response['username'];
            this.age = response['age'];
            this.height = response['height'];
            this.weight = response['weight'];
            this.calories_b = response['calories_b'];
            this.calories_i = response['calories_i'];
            if (response.hasOwnProperty('activity_name')) {
                this.activity_name = response['activity_name'];
                this.activity_intensity = response['activity_intensity'];
            }
            if (response.hasOwnProperty('food_name')) {
                this.food_name = response['food_name'];
            }
            console.log(response);
        });
        this.plt.ready().then(() => {
            this.healthKit.available().then(available => {
                if (available) {
                    var options = {
                        readTypes: ['HKQuantityTypeIdentifierHeight', 'HKQuantityTypeIdentifierStepCount'],
                        writeTypes: ['HKQuantityTypeIdentifierHeight', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned']
                    };
                    this.healthKit.requestAuthorization(options).then(_ => {
                        this.getSteps();
                    });
                }
            });
        });
    }
    logout() {
        this.navCtrl.navigateBack('/login');
    }
    getSteps() {
        var stepOptions = {
            startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            endDate: new Date(),
            sampleType: 'HKQuantityTypeIdentifierStepCount',
            unit: 'count'
        };
        this.healthKit.querySampleType(stepOptions).then(data => {
            let stepSum = data.reduce((a, b) => a + b.quantity, 0);
            this.stepCount = stepSum;
        }, err => {
            console.log('No steps: ', err);
        });
    }
};
Tab1Page.ctorParameters = () => [
    { type: _ionic_native_health_kit_ngx__WEBPACK_IMPORTED_MODULE_4__["HealthKit"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"] },
    { type: _api_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"] }
];
Tab1Page = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tab1',
        template: _raw_loader_tab1_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tab1_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], Tab1Page);



/***/ }),

/***/ "XOzS":
/*!*********************************************!*\
  !*** ./src/app/tab1/tab1-routing.module.ts ***!
  \*********************************************/
/*! exports provided: Tab1PageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1PageRoutingModule", function() { return Tab1PageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tab1.page */ "Mzl2");




const routes = [
    {
        path: '',
        component: _tab1_page__WEBPACK_IMPORTED_MODULE_3__["Tab1Page"],
    }
];
let Tab1PageRoutingModule = class Tab1PageRoutingModule {
};
Tab1PageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], Tab1PageRoutingModule);



/***/ }),

/***/ "rWyk":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".card-body {\n  overflow: hidden;\n}\n.card-body .user-meta {\n  padding-top: 40px;\n}\n.card-body .user-meta .playername {\n  font-size: 24px;\n  font-weight: 600;\n  color: #050607;\n}\n.card-body .user-meta .country {\n  font-size: 90%;\n  color: #9ea2a5;\n  text-transform: uppercase;\n  margin: 0 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RhYjEucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBSUksZ0JBQUE7QUFGSjtBQUlJO0VBQ0ksaUJBQUE7QUFGUjtBQUlRO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUZaO0FBS1E7RUFDSSxjQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtBQUhaIiwiZmlsZSI6InRhYjEucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQtYm9keSB7XG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgIC8vcGFkZGluZzogMzBweDtcbiAgICAvL2hlaWdodDogY2FsYygxMDB2aCDigJMgKDIwMHB4ICsgNTZweCkpO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICAudXNlci1tZXRhIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDQwcHg7XG5cbiAgICAgICAgLnBsYXllcm5hbWUge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgIGNvbG9yOiAjMDUwNjA3O1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvdW50cnkge1xuICAgICAgICAgICAgZm9udC1zaXplOiA5MCU7XG4gICAgICAgICAgICBjb2xvcjogIzllYTJhNTtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgfVxuICAgIH1cbn0iXX0= */");

/***/ }),

/***/ "tmrb":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.module.ts ***!
  \*************************************/
/*! exports provided: Tab1PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1PageModule", function() { return Tab1PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tab1.page */ "Mzl2");
/* harmony import */ var _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../explore-container/explore-container.module */ "qtYk");
/* harmony import */ var _tab1_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tab1-routing.module */ "XOzS");








let Tab1PageModule = class Tab1PageModule {
};
Tab1PageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__["ExploreContainerComponentModule"],
            _tab1_routing_module__WEBPACK_IMPORTED_MODULE_7__["Tab1PageRoutingModule"]
        ],
        declarations: [_tab1_page__WEBPACK_IMPORTED_MODULE_5__["Tab1Page"]]
    })
], Tab1PageModule);



/***/ })

}]);
//# sourceMappingURL=tab1-tab1-module-es2015.js.map