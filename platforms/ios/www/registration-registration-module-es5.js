(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["registration-registration-module"], {
    /***/
    "DNuw":
    /*!*****************************************************!*\
      !*** ./src/app/registration/registration.module.ts ***!
      \*****************************************************/

    /*! exports provided: RegistrationPageModule */

    /***/
    function DNuw(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RegistrationPageModule", function () {
        return RegistrationPageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _registration_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./registration-routing.module */
      "zF/k");
      /* harmony import */


      var _registration_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./registration.page */
      "hHzj");

      var RegistrationPageModule = function RegistrationPageModule() {
        _classCallCheck(this, RegistrationPageModule);
      };

      RegistrationPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"], _registration_routing_module__WEBPACK_IMPORTED_MODULE_5__["RegistrationPageRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]],
        declarations: [_registration_page__WEBPACK_IMPORTED_MODULE_6__["RegistrationPage"]]
      })], RegistrationPageModule);
      /***/
    },

    /***/
    "XDXw":
    /*!*****************************************************!*\
      !*** ./src/app/registration/registration.page.scss ***!
      \*****************************************************/

    /*! exports provided: default */

    /***/
    function XDXw(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".error-message {\n  color: var(--ion-color-danger);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3JlZ2lzdHJhdGlvbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSw4QkFBQTtBQUNKIiwiZmlsZSI6InJlZ2lzdHJhdGlvbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXJyb3ItbWVzc2FnZSB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xufSJdfQ== */";
      /***/
    },

    /***/
    "hHzj":
    /*!***************************************************!*\
      !*** ./src/app/registration/registration.page.ts ***!
      \***************************************************/

    /*! exports provided: RegistrationPage */

    /***/
    function hHzj(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RegistrationPage", function () {
        return RegistrationPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_registration_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./registration.page.html */
      "mE0+");
      /* harmony import */


      var _registration_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./registration.page.scss */
      "XDXw");
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

      var RegistrationPage = /*#__PURE__*/function () {
        //height: number;
        //currentHeight = 'No Data';
        //stepcount = 'No Data';
        //workouts = [];
        function RegistrationPage(healthKit, plt, userService, formBuilder, navCtrl) {
          _classCallCheck(this, RegistrationPage);

          this.healthKit = healthKit;
          this.plt = plt;
          this.userService = userService;
          this.formBuilder = formBuilder;
          this.navCtrl = navCtrl;
          this.errorMessages = {
            username: [{
              type: 'required',
              message: 'Username is required'
            }, {
              type: 'maxlength',
              message: 'Username cant be longer than 100 characters'
            }],
            email: [{
              type: 'required',
              message: 'Email is required'
            }, {
              type: 'pattern',
              message: 'Please enter a valid email address'
            }],
            first_name: [{
              type: 'required',
              message: 'First Name is required'
            }, {
              type: 'maxlength',
              message: 'First Name cant be longer than 100 characters'
            }],
            last_name: [{
              type: 'required',
              message: 'Last Name is required'
            }, {
              type: 'maxlength',
              message: 'Last Name cant be longer than 100 characters'
            }],
            age: [{
              type: 'required',
              message: 'Age is required'
            }, {
              type: 'pattern',
              message: 'Please enter a valid age'
            }],
            height: [{
              type: 'required',
              message: 'Height is required'
            }, {
              type: 'pattern',
              message: 'Please enter a valid height'
            }],
            weight: [{
              type: 'required',
              message: 'Weight is required'
            }, {
              type: 'pattern',
              message: 'Please enter a valid weight'
            }]
          };
          this.dataFromService = "";
          this.registrationForm = this.formBuilder.group({
            username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].maxLength(100)]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
            first_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].maxLength(100)]],
            last_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].maxLength(100)]],
            age: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^[0-9]{1,2}$')]],
            height: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^[0-9]{1,3}$')]],
            weight: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^[0-9]{1,3}$')]]
          });

          if (this.healthKit.available()) {
            console.log("Healthkit available");
          }
        }

        _createClass(RegistrationPage, [{
          key: "username",
          get: function get() {
            return this.registrationForm.get("username");
          }
        }, {
          key: "email",
          get: function get() {
            return this.registrationForm.get("email");
          }
        }, {
          key: "first_name",
          get: function get() {
            return this.registrationForm.get('first_name');
          }
        }, {
          key: "last_name",
          get: function get() {
            return this.registrationForm.get('last_name');
          }
        }, {
          key: "age",
          get: function get() {
            return this.registrationForm.get('age');
          }
        }, {
          key: "weight",
          get: function get() {
            return this.registrationForm.get('weight');
          }
        }, {
          key: "height",
          get: function get() {
            return this.registrationForm.get('height');
          }
        }, {
          key: "dismissRegistration",
          value: function dismissRegistration() {
            this.navCtrl.navigateBack('/login');
          }
        }, {
          key: "submit",
          value: function submit() {
            console.log(this.registrationForm.value);
          }
        }, {
          key: "SaveData",
          value: function SaveData() {
            var _this = this;

            var username = this.registrationForm.get("username").value;
            var email = this.registrationForm.get("email").value;
            var first_name = this.registrationForm.get("first_name").value;
            var last_name = this.registrationForm.get("last_name").value;
            var age = this.registrationForm.get("age").value;
            var weight = this.registrationForm.get("weight").value;
            var height = this.registrationForm.get("height").value;
            var dataToSend = {
              username: username,
              email: email,
              first_name: first_name,
              last_name: last_name,
              height: height,
              weight: weight,
              age: age
            };
            this.userService.Savedata(dataToSend).subscribe(function (response) {
              console.log(response);

              _this.navCtrl.navigateForward('/tabs');
            });
          }
        }]);

        return RegistrationPage;
      }();

      RegistrationPage.ctorParameters = function () {
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

      RegistrationPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-registration',
        template: _raw_loader_registration_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_registration_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], RegistrationPage);
      /***/
    },

    /***/
    "mE0+":
    /*!*******************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/registration/registration.page.html ***!
      \*******************************************************************************************/

    /*! exports provided: default */

    /***/
    function mE0(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-button color=\"light\" (click)=\"dismissRegistration()\">Back</ion-button>\n    <ion-title>\n      Register\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <form [formGroup]=\"registrationForm\" (ngSubmit)=\"submit()\">\n    <ion-list>\n      <ion-item>\n        <ion-label position=\"floating\">Username</ion-label>\n        <ion-input autocapitalize inputmode=\"text\" formControlName=\"username\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.username\">\n        <ng-container *ngIf=\"username.hasError(error.type) && (username.dirty || username.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Email</ion-label>\n        <ion-input inputmode=\"email\" formControlName=\"email\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.email\">\n        <ng-container *ngIf=\"email.hasError(error.type) && (email.dirty || email.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">First Name</ion-label>\n        <ion-input autocapitalize inputmode=\"text\" formControlName=\"first_name\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.first_name\">\n        <ng-container *ngIf=\"first_name.hasError(error.type) && (first_name.dirty || first_name.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Last Name</ion-label>\n        <ion-input autocapitalize inputmode=\"text\" formControlName=\"last_name\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.last_name\">\n        <ng-container *ngIf=\"last_name.hasError(error.type) && (last_name.dirty || last_name.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Age</ion-label>\n        <ion-input formControlName=\"age\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.age\">\n        <ng-container *ngIf=\"age.hasError(error.type) && (age.dirty || age.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Height(in)</ion-label>\n        <ion-input formControlName=\"height\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.height\">\n        <ng-container *ngIf=\"height.hasError(error.type) && (height.dirty || height.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label position=\"floating\">Weight(lb)</ion-label>\n        <ion-input formControlName=\"weight\"></ion-input>\n      </ion-item>\n      <div *ngFor=\"let error of errorMessages.weight\">\n        <ng-container *ngIf=\"weight.hasError(error.type) && (weight.dirty || weight.touched)\">\n          <small class=\"error-message\">{{error.message}}</small>\n        </ng-container>\n      </div>\n    </ion-list>\n    <ion-button [disabled]=\"!registrationForm.valid\" (click)=\"SaveData()\" type=\"submit\" expand=\"block\">Submit <ion-icon slot=\"end\"\n        name=\"create\">\n      </ion-icon>\n    </ion-button>\n  </form>\n  <!-- \n  <ion-item>\n    <ion-label stacked>Set Height</ion-label>\n    <ion-input type=\"text\" [(ngModel)]=\"height\" placeholder=\"My Height today (in cm)\"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label stacked>Current Height</ion-label>\n    <ion-input type=\"text\" [(ngModel)]=\"currentHeight\" readonly></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label stacked>Steps last 24h</ion-label>\n    <ion-input type=\"text\" [(ngModel)]=\"stepcount\" readonly></ion-input>\n  </ion-item>\n \n  <button ion-button full (click)=\"saveHeight()\">Set Height</button>\n  <button ion-button full (click)=\"saveWorkout()\">Set a Workout</button>\n \n  <ion-list>\n    <ion-card *ngFor=\"let workout of workouts\">\n      <ion-card-header>{{ workout.calories }}</ion-card-header>\n      <ion-card-content>\n        <p>Activity: {{ workout.activityType }}</p>\n        <p>Duration: {{ workout.duration / 100 }} min</p>\n        <p>Date: {{ workout.startDate | date:'short' }}</p>\n        <p>Distance: {{ workout.miles }} miles</p>\n      </ion-card-content>\n    </ion-card>\n  </ion-list> -->\n</ion-content>";
      /***/
    },

    /***/
    "zF/k":
    /*!*************************************************************!*\
      !*** ./src/app/registration/registration-routing.module.ts ***!
      \*************************************************************/

    /*! exports provided: RegistrationPageRoutingModule */

    /***/
    function zFK(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RegistrationPageRoutingModule", function () {
        return RegistrationPageRoutingModule;
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


      var _registration_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./registration.page */
      "hHzj");

      var routes = [{
        path: '',
        component: _registration_page__WEBPACK_IMPORTED_MODULE_3__["RegistrationPage"]
      }];

      var RegistrationPageRoutingModule = function RegistrationPageRoutingModule() {
        _classCallCheck(this, RegistrationPageRoutingModule);
      };

      RegistrationPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], RegistrationPageRoutingModule);
      /***/
    }
  }]);
})();
//# sourceMappingURL=registration-registration-module-es5.js.map