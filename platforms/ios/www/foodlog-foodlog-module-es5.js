(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["foodlog-foodlog-module"], {
    /***/
    "9269":
    /*!*******************************************!*\
      !*** ./src/app/foodlog/foodlog.page.scss ***!
      \*******************************************/

    /*! exports provided: default */

    /***/
    function _(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".error-message {\n  color: var(--ion-color-danger);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Zvb2Rsb2cucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksOEJBQUE7QUFDSiIsImZpbGUiOiJmb29kbG9nLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lcnJvci1tZXNzYWdlIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG59Il19 */";
      /***/
    },

    /***/
    "BIT7":
    /*!***************************************************!*\
      !*** ./src/app/foodlog/foodlog-routing.module.ts ***!
      \***************************************************/

    /*! exports provided: FoodlogPageRoutingModule */

    /***/
    function BIT7(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FoodlogPageRoutingModule", function () {
        return FoodlogPageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _foodlog_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./foodlog.page */
      "Twjz");

      var routes = [{
        path: '',
        component: _foodlog_page__WEBPACK_IMPORTED_MODULE_3__["FoodlogPage"]
      }];

      var FoodlogPageRoutingModule = function FoodlogPageRoutingModule() {
        _classCallCheck(this, FoodlogPageRoutingModule);
      };

      FoodlogPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], FoodlogPageRoutingModule);
      /***/
    },

    /***/
    "Twjz":
    /*!*****************************************!*\
      !*** ./src/app/foodlog/foodlog.page.ts ***!
      \*****************************************/

    /*! exports provided: FoodlogPage */

    /***/
    function Twjz(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FoodlogPage", function () {
        return FoodlogPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_foodlog_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./foodlog.page.html */
      "gpI0");
      /* harmony import */


      var _foodlog_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./foodlog.page.scss */
      "9269");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_native_health_kit_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic-native/health-kit/ngx */
      "QvbA");
      /* harmony import */


      var _api_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../api/user.service */
      "jfHL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");

      var FoodlogPage = /*#__PURE__*/function () {
        //ionic generate page x
        function FoodlogPage(healthKit, plt, userService, formBuilder, navCtrl) {
          _classCallCheck(this, FoodlogPage);

          this.healthKit = healthKit;
          this.plt = plt;
          this.userService = userService;
          this.formBuilder = formBuilder;
          this.navCtrl = navCtrl;
          this.errorMessages = {
            name: [{
              type: 'required',
              message: 'Food name is required'
            }, {
              type: 'maxlength',
              message: 'Food name cant be longer than 100 characters'
            }],
            time: [{
              type: 'required',
              message: 'Time is required'
            }, {
              type: 'pattern',
              message: 'Please enter a valid time'
            }],
            calories_i: [{
              type: 'required',
              message: 'Caloric intake is required'
            }, {
              type: 'pattern',
              message: 'Please enter a calorie count'
            }]
          };
          this.dataFromService = "";
          this.foodForm = this.formBuilder.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].maxLength(100)]],
            time: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$')]],
            calories_i: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^[0-9]{1,4}$')]]
          });

          if (this.healthKit.available()) {
            console.log("Healthkit available");
          }
        }

        _createClass(FoodlogPage, [{
          key: "name",
          get: function get() {
            return this.foodForm.get("name");
          }
        }, {
          key: "time",
          get: function get() {
            return this.foodForm.get("time");
          }
        }, {
          key: "calories_i",
          get: function get() {
            return this.foodForm.get('calories_i');
          }
        }, {
          key: "dismissRegistration",
          value: function dismissRegistration() {
            this.navCtrl.navigateBack('/tabs/tab2');
          }
        }, {
          key: "submit",
          value: function submit() {
            console.log(this.foodForm.value);
          }
        }, {
          key: "SaveFood",
          value: function SaveFood() {
            var _this = this;

            var name = this.foodForm.get("name").value;
            var time = this.foodForm.get("time").value;
            var calories_i = this.foodForm.get("calories_i").value;
            var dataToSend = {
              food_name: name,
              time: time,
              calories_i: calories_i
            };
            this.userService.Savefood(dataToSend).subscribe(function (dataReturnFromService) {
              _this.dataFromService = JSON.stringify(dataReturnFromService);
              console.log(dataReturnFromService);

              _this.navCtrl.navigateBack('/tabs/tab2');
            }); //this.navCtrl.navigateForward('/tabs');
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return FoodlogPage;
      }();

      FoodlogPage.ctorParameters = function () {
        return [{
          type: _ionic_native_health_kit_ngx__WEBPACK_IMPORTED_MODULE_4__["HealthKit"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["Platform"]
        }, {
          type: _api_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]
        }, {
          type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"]
        }];
      };

      FoodlogPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-foodlog',
        template: _raw_loader_foodlog_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_foodlog_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], FoodlogPage);
      /***/
    },

    /***/
    "W2M+":
    /*!*******************************************!*\
      !*** ./src/app/foodlog/foodlog.module.ts ***!
      \*******************************************/

    /*! exports provided: FoodlogPageModule */

    /***/
    function W2M(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FoodlogPageModule", function () {
        return FoodlogPageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _foodlog_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./foodlog-routing.module */
      "BIT7");
      /* harmony import */


      var _foodlog_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./foodlog.page */
      "Twjz");

      var FoodlogPageModule = function FoodlogPageModule() {
        _classCallCheck(this, FoodlogPageModule);
      };

      FoodlogPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _foodlog_routing_module__WEBPACK_IMPORTED_MODULE_5__["FoodlogPageRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]],
        declarations: [_foodlog_page__WEBPACK_IMPORTED_MODULE_6__["FoodlogPage"]]
      })], FoodlogPageModule);
      /***/
    },

    /***/
    "gpI0":
    /*!*********************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/foodlog/foodlog.page.html ***!
      \*********************************************************************************/

    /*! exports provided: default */

    /***/
    function gpI0(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-button color=\"light\" (click)=\"dismissRegistration()\">Back</ion-button>\n    <ion-title>\n      Food Log\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <form [formGroup]=\"foodForm\" (ngSubmit)=\"submit()\">\n    <ion-list>\n      <ion-item>\n        <ion-label position=\"floating\">Food Name</ion-label>\n        <ion-input autocapitalize inputmode=\"text\" formControlName=\"name\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.name\">\n        <ng-container *ngIf=\"name.hasError(error.type) && (name.dirty || name.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Time Consumed </ion-label>\n        <ion-input inputmode=\"text\" formControlName=\"time\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.time\">\n        <ng-container *ngIf=\"time.hasError(error.type) && (time.dirty || time.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Calories</ion-label>\n        <ion-input formControlName=\"calories_i\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.calories_i\">\n        <ng-container *ngIf=\"calories_i.hasError(error.type) && (calories_i.dirty || calories_i.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n    </ion-list>\n    <ion-button [disabled]=\"!foodForm.valid\" (click)=\"SaveFood()\" type=\"submit\" expand=\"block\">Submit <ion-icon slot=\"end\"\n        name=\"create\">\n      </ion-icon>\n    </ion-button>\n  </form>\n</ion-content>";
      /***/
    }
  }]);
})();
//# sourceMappingURL=foodlog-foodlog-module-es5.js.map