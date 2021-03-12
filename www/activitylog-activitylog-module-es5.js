(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["activitylog-activitylog-module"], {
    /***/
    "2V/u":
    /*!***************************************************!*\
      !*** ./src/app/activitylog/activitylog.page.scss ***!
      \***************************************************/

    /*! exports provided: default */

    /***/
    function VU(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".error-message {\n  color: var(--ion-color-danger);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FjdGl2aXR5bG9nLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDhCQUFBO0FBQ0oiLCJmaWxlIjoiYWN0aXZpdHlsb2cucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVycm9yLW1lc3NhZ2Uge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn0iXX0= */";
      /***/
    },

    /***/
    "8Oq8":
    /*!***********************************************************!*\
      !*** ./src/app/activitylog/activitylog-routing.module.ts ***!
      \***********************************************************/

    /*! exports provided: ActivitylogPageRoutingModule */

    /***/
    function Oq8(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ActivitylogPageRoutingModule", function () {
        return ActivitylogPageRoutingModule;
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


      var _activitylog_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./activitylog.page */
      "KPfg");

      var routes = [{
        path: '',
        component: _activitylog_page__WEBPACK_IMPORTED_MODULE_3__["ActivitylogPage"]
      }];

      var ActivitylogPageRoutingModule = function ActivitylogPageRoutingModule() {
        _classCallCheck(this, ActivitylogPageRoutingModule);
      };

      ActivitylogPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ActivitylogPageRoutingModule);
      /***/
    },

    /***/
    "KPfg":
    /*!*************************************************!*\
      !*** ./src/app/activitylog/activitylog.page.ts ***!
      \*************************************************/

    /*! exports provided: ActivitylogPage */

    /***/
    function KPfg(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ActivitylogPage", function () {
        return ActivitylogPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_activitylog_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./activitylog.page.html */
      "tSdu");
      /* harmony import */


      var _activitylog_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./activitylog.page.scss */
      "2V/u");
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

      var ActivitylogPage = /*#__PURE__*/function () {
        function ActivitylogPage(healthKit, plt, userService, formBuilder, navCtrl) {
          _classCallCheck(this, ActivitylogPage);

          this.healthKit = healthKit;
          this.plt = plt;
          this.userService = userService;
          this.formBuilder = formBuilder;
          this.navCtrl = navCtrl;
          this.errorMessages = {
            name: [{
              type: 'required',
              message: 'Activity name is required'
            }, {
              type: 'maxlength',
              message: 'Activity name cant be longer than 100 characters'
            }],
            start_time: [{
              type: 'required',
              message: 'Start time is required'
            }, {
              type: 'pattern',
              message: 'Please enter a valid Start time'
            }],
            end_time: [{
              type: 'required',
              message: 'End time is required'
            }, {
              type: 'pattern',
              message: 'Please enter a valid End time'
            }],
            intensity: [{
              type: 'required',
              message: 'Intensity is required'
            }, {
              type: 'pattern',
              message: 'Please enter a valid intensity'
            }],
            calories_b: [{
              type: 'required',
              message: 'Calories burned is required'
            }, {
              type: 'pattern',
              message: 'Please enter a calorie count'
            }]
          };
          this.dataFromService = "";
          this.activityForm = this.formBuilder.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].maxLength(100)]],
            start_time: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$')]],
            end_time: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$')]],
            intensity: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^[1-5]$')]],
            calories_b: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^[0-9]{1,4}$')]]
          });

          if (this.healthKit.available()) {
            console.log("Healthkit available");
          }
        }

        _createClass(ActivitylogPage, [{
          key: "name",
          get: function get() {
            return this.activityForm.get("name");
          }
        }, {
          key: "start_time",
          get: function get() {
            return this.activityForm.get("start_time");
          }
        }, {
          key: "end_time",
          get: function get() {
            return this.activityForm.get("end_time");
          }
        }, {
          key: "intensity",
          get: function get() {
            return this.activityForm.get('intensity');
          }
        }, {
          key: "calories_b",
          get: function get() {
            return this.activityForm.get('calories_b');
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "dismissRegistration",
          value: function dismissRegistration() {
            this.navCtrl.navigateBack('/tabs/tab2');
          }
        }, {
          key: "submit",
          value: function submit() {
            console.log(this.activityForm.value);
          }
        }, {
          key: "SaveActivity",
          value: function SaveActivity() {
            var _this = this;

            var name = this.activityForm.get("name").value;
            var start_time = this.activityForm.get("start_time").value;
            var end_time = this.activityForm.get("end_time").value;
            var intensity = this.activityForm.get("intensity").value;
            var calories_b = this.activityForm.get("calories_b").value;
            var dataToSend = {
              activity_name: name,
              start_time: start_time,
              end_time: end_time,
              intensity: intensity,
              calories_b: calories_b
            };
            this.userService.Saveactivity(dataToSend).subscribe(function (dataReturnFromService) {
              _this.dataFromService = JSON.stringify(dataReturnFromService);
              console.log(dataReturnFromService);

              _this.navCtrl.navigateForward('/tabs/tab2');
            });
          }
        }]);

        return ActivitylogPage;
      }();

      ActivitylogPage.ctorParameters = function () {
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

      ActivitylogPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-activitylog',
        template: _raw_loader_activitylog_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_activitylog_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ActivitylogPage);
      /***/
    },

    /***/
    "ZsSn":
    /*!***************************************************!*\
      !*** ./src/app/activitylog/activitylog.module.ts ***!
      \***************************************************/

    /*! exports provided: ActivitylogPageModule */

    /***/
    function ZsSn(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ActivitylogPageModule", function () {
        return ActivitylogPageModule;
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


      var _activitylog_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./activitylog-routing.module */
      "8Oq8");
      /* harmony import */


      var _activitylog_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./activitylog.page */
      "KPfg");

      var ActivitylogPageModule = function ActivitylogPageModule() {
        _classCallCheck(this, ActivitylogPageModule);
      };

      ActivitylogPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _activitylog_routing_module__WEBPACK_IMPORTED_MODULE_5__["ActivitylogPageRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]],
        declarations: [_activitylog_page__WEBPACK_IMPORTED_MODULE_6__["ActivitylogPage"]]
      })], ActivitylogPageModule);
      /***/
    },

    /***/
    "tSdu":
    /*!*****************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/activitylog/activitylog.page.html ***!
      \*****************************************************************************************/

    /*! exports provided: default */

    /***/
    function tSdu(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-button color=\"light\" (click)=\"dismissRegistration()\">Back</ion-button>\n    <ion-title>\n      Activity Log\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <form [formGroup]=\"activityForm\" (ngSubmit)=\"submit()\">\n    <ion-list>\n      <ion-item>\n        <ion-label position=\"floating\">Activity Name</ion-label>\n        <ion-input autocapitalize inputmode=\"text\" formControlName=\"name\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.name\">\n        <ng-container *ngIf=\"name.hasError(error.type) && (name.dirty || name.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Start Time</ion-label>\n        <ion-input inputmode=\"text\" formControlName=\"start_time\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.start_time\">\n        <ng-container *ngIf=\"start_time.hasError(error.type) && (start_time.dirty || start_time.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">End Time</ion-label>\n        <ion-input inputmode=\"text\" formControlName=\"end_time\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.end_time\">\n        <ng-container *ngIf=\"end_time.hasError(error.type) && (end_time.dirty || end_time.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Intensity(1-5)</ion-label>\n        <ion-input autocapitalize inputmode=\"text\" formControlName=\"intensity\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.intensity\">\n        <ng-container *ngIf=\"intensity.hasError(error.type) && (intensity.dirty || intensity.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Calories burned</ion-label>\n        <ion-input formControlName=\"calories_b\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.calories_b\">\n        <ng-container *ngIf=\"calories_b.hasError(error.type) && (calories_b.dirty || calories_b.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n    </ion-list>\n    <ion-button [disabled]=\"!activityForm.valid\" (click)=\"SaveActivity()\" type=\"submit\" expand=\"block\">Submit <ion-icon slot=\"end\"\n        name=\"create\">\n      </ion-icon>\n    </ion-button>\n  </form>\n</ion-content>";
      /***/
    }
  }]);
})();
//# sourceMappingURL=activitylog-activitylog-module-es5.js.map