(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"], {
    /***/
    "EGAO":
    /*!*************************************!*\
      !*** ./src/app/tab2/tab2.page.scss ***!
      \*************************************/

    /*! exports provided: default */

    /***/
    function EGAO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".error-message {\n  color: var(--ion-color-danger);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RhYjIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksOEJBQUE7QUFDSiIsImZpbGUiOiJ0YWIyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lcnJvci1tZXNzYWdlIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG59Il19 */";
      /***/
    },

    /***/
    "JZ9U":
    /*!***********************************!*\
      !*** ./src/app/tab2/tab2.page.ts ***!
      \***********************************/

    /*! exports provided: Tab2Page */

    /***/
    function JZ9U(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab2Page", function () {
        return Tab2Page;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_tab2_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./tab2.page.html */
      "e9nj");
      /* harmony import */


      var _tab2_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./tab2.page.scss */
      "EGAO");
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

      var Tab2Page = /*#__PURE__*/function () {
        function Tab2Page(healthKit, plt, userService, formBuilder, navCtrl) {
          _classCallCheck(this, Tab2Page);

          this.healthKit = healthKit;
          this.plt = plt;
          this.userService = userService;
          this.formBuilder = formBuilder;
          this.navCtrl = navCtrl;

          if (this.healthKit.available()) {
            console.log("Healthkit available");
          }

          this.loadActivity();
          this.loadFood();
        }

        _createClass(Tab2Page, [{
          key: "dismissRegistration",
          value: function dismissRegistration() {
            this.navCtrl.navigateBack('/login');
          }
        }, {
          key: "sendtoActivity",
          value: function sendtoActivity() {
            this.navCtrl.navigateBack('/activitylog');
          }
        }, {
          key: "sendtoFood",
          value: function sendtoFood() {
            this.navCtrl.navigateBack('/foodlog');
          }
        }, {
          key: "loadActivity",
          value: function loadActivity() {
            var _this = this;

            var dataToSend = {
              data: "Sending"
            };
            this.userService.LoadActivity(dataToSend).subscribe(function (response) {
              console.log(response);

              if (response['valid'] == 'true') {
                console.log("Activity data present");
                _this.activity_name = response['activity_name'];
                _this.calories_b = response['calories_b'];
              }

              ;
            });
          }
        }, {
          key: "loadFood",
          value: function loadFood() {
            var _this2 = this;

            var dataToSend = {
              data: "Sending"
            };
            this.userService.LoadFood(dataToSend).subscribe(function (response) {
              console.log(response);

              if (response['valid'] == 'true') {
                console.log("Food data present");
                _this2.food_name = response['food_name'];
                _this2.calories_i = response['calories_i'];
              }

              ;
            });
          }
        }, {
          key: "saveLog",
          value: function saveLog() {
            console.log("Saving Data");
            var dataToSend = {
              data: "Sending"
            };
            this.userService.Savelog(dataToSend).subscribe(function (response) {
              console.log(response);
            });
            this.navCtrl.navigateBack('/redirect');
          }
        }]);

        return Tab2Page;
      }();

      Tab2Page.ctorParameters = function () {
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

      Tab2Page = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tab2',
        template: _raw_loader_tab2_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tab2_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], Tab2Page);
      /***/
    },

    /***/
    "TUkU":
    /*!*************************************!*\
      !*** ./src/app/tab2/tab2.module.ts ***!
      \*************************************/

    /*! exports provided: Tab2PageModule */

    /***/
    function TUkU(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function () {
        return Tab2PageModule;
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


      var _tab2_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./tab2.page */
      "JZ9U");
      /* harmony import */


      var _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../explore-container/explore-container.module */
      "qtYk");
      /* harmony import */


      var _tab2_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./tab2-routing.module */
      "UDmF");

      var Tab2PageModule = function Tab2PageModule() {
        _classCallCheck(this, Tab2PageModule);
      };

      Tab2PageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__["ExploreContainerComponentModule"], _tab2_routing_module__WEBPACK_IMPORTED_MODULE_7__["Tab2PageRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_5__["Tab2Page"]]
      })], Tab2PageModule);
      /***/
    },

    /***/
    "UDmF":
    /*!*********************************************!*\
      !*** ./src/app/tab2/tab2-routing.module.ts ***!
      \*********************************************/

    /*! exports provided: Tab2PageRoutingModule */

    /***/
    function UDmF(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab2PageRoutingModule", function () {
        return Tab2PageRoutingModule;
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


      var _tab2_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./tab2.page */
      "JZ9U");

      var routes = [{
        path: '',
        component: _tab2_page__WEBPACK_IMPORTED_MODULE_3__["Tab2Page"]
      }];

      var Tab2PageRoutingModule = function Tab2PageRoutingModule() {
        _classCallCheck(this, Tab2PageRoutingModule);
      };

      Tab2PageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], Tab2PageRoutingModule);
      /***/
    },

    /***/
    "e9nj":
    /*!***************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab2/tab2.page.html ***!
      \***************************************************************************/

    /*! exports provided: default */

    /***/
    function e9nj(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-button color=\"light\" (click)=\"dismissRegistration()\">Back</ion-button>\n    <ion-title>\n      Log Data\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n    <ion-button (click)=\"sendtoActivity()\" type=\"button\" size=\"large\" color=\"secondary\" expand = \"full\">Log Activity</ion-button>\n    <ion-button (click)=\"sendtoFood()\" type=\"button\" size=\"large\" color= \"dark\" display= \"block\" expand= \"full\">Log Food</ion-button>\n    <h5 *ngIf=\"activity_name\">Activity Added:</h5>\n    <h3 *ngIf=\"activity_name\" style=\"text-align:center\">{{ activity_name }}</h3>\n      <h6 *ngIf=\"activity_name\" class=\"calories_b\">Calories Burned: <ion-chip>\n        <ion-label>{{ calories_b }}</ion-label>\n        </ion-chip>\n      </h6>\n    <h5 *ngIf=\"food_name\">Food Added: </h5>\n    <h3 *ngIf=\"food_name\" style=\"text-align:center\">{{ food_name }}</h3>\n    <h6 *ngIf=\"food_name\" class=\"calories_i\">Calories Eaten: <ion-chip>\n      <ion-label>{{ calories_i }}</ion-label>\n      </ion-chip>\n    </h6>\n</ion-content>\n<ion-footer class=\"ion-no-padding ion-no-margin\">\n  <ion-button (click)=\"saveLog()\" type=\"submit\" expand=\"block\">Submit<ion-icon slot=\"end\"name=\"create\"></ion-icon></ion-button>\n</ion-footer>";
      /***/
    }
  }]);
})();
//# sourceMappingURL=tab2-tab2-module-es5.js.map