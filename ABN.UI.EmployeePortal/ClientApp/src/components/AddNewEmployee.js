"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var EmployeeList_1 = require("./EmployeeList");
var AddEmployee = /** @class */ (function (_super) {
    __extends(AddEmployee, _super);
    function AddEmployee(props) {
        var _this = _super.call(this, props) || this;
        //here we are intializing the interface's fields with default values.
        _this.state = { title: "", loading: true, employeeList: new EmployeeList_1.EmployeeListData };
        //the employeeid variable will get the employee id from URL.
        var employeeid = _this.props.match.params["id"];
        //if employeeid is greater than 0 then fetch method will get the specific employee record and display it as in edit mode.
        if (employeeid > 0) {
            fetch('api/Employee/Details/' + employeeid)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "Edit", loading: false, employeeList: data });
            });
        }
        else {
            _this.state = { title: "Create", loading: false, employeeList: new EmployeeList_1.EmployeeListData };
        }
        _this.FuncSave = _this.FuncSave.bind(_this);
        _this.FuncCancel = _this.FuncCancel.bind(_this);
        return _this;
    }
    //this method will render html onto the DOM.
    AddEmployee.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm();
        return React.createElement("div", null,
            React.createElement("h1", null, this.state.title),
            React.createElement("h3", null, "Employee"),
            React.createElement("hr", null),
            contents);
    };
    //this method will save the record into database. If the URL has an EmployeeId, 
    //then it will update the record and if the URL has not employee id parameter than it will save the record.
    AddEmployee.prototype.FuncSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.employeeList.id) {
            fetch('api/Employee/Edit', {
                method: 'PUT',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/employeeList");
            });
        }
        else {
            fetch('api/Employee/Create', {
                method: 'POST',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/employeeList");
            });
        }
    };
    AddEmployee.prototype.FuncCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/employeeList");
    };
    //this method will return the html table to display all the employee record with edit and delete methods.
    AddEmployee.prototype.renderCreateForm = function () {
        return (React.createElement("form", { onSubmit: this.FuncSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "id", value: this.state.employeeList.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "FirstName" }, "First Name"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "FirstName", defaultValue: this.state.employeeList.firstName, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "LastName" }, "LastName"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "LastName", defaultValue: this.state.employeeList.lastName, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Age" }, "Age"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Age", defaultValue: this.state.employeeList.age, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Salary" }, "Salary"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Salary", defaultValue: this.state.employeeList.salary, required: true }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Save"),
                React.createElement("button", { className: "btn", onClick: this.FuncCancel }, "Cancel"))));
    };
    return AddEmployee;
}(React.Component));
exports.AddEmployee = AddEmployee;
//# sourceMappingURL=AddNewEmployee.js.map