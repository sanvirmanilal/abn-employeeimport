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
var react_router_dom_1 = require("react-router-dom");
var EmployeeList = /** @class */ (function (_super) {
    __extends(EmployeeList, _super);
    function EmployeeList() {
        var _this = _super.call(this, '') || this;
        _this.state = { EmployeeListData: [], loading: true };
        fetch('api/Employee/Index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ EmployeeListData: data, loading: false });
        });
        _this.FuncDelete = _this.FuncDelete.bind(_this);
        _this.FuncEdit = _this.FuncEdit.bind(_this);
        return _this;
    }
    EmployeeList.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderEmployeeTable(this.state.EmployeeListData);
        return React.createElement("div", null,
            React.createElement("h1", null, "Employee Record"),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addEmployee" }, "Create New")),
            contents);
    };
    EmployeeList.prototype.FuncDelete = function (id) {
        var _this = this;
        if (!window.confirm("Do you want to delete Employee with this Id: " + id))
            return;
        else {
            fetch('api/Employee/Delete/' + id, {
                method: 'delete'
            }).then(function (data) {
                _this.setState({
                    EmployeeListData: _this.state.EmployeeListData.filter(function (rec) {
                        return (rec.id != id);
                    })
                });
            });
        }
    };
    EmployeeList.prototype.FuncEdit = function (id) {
        this.props.history.push("/Employee/edit/" + id);
    };
    EmployeeList.prototype.renderEmployeeTable = function (EmployeeListData) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "FirstName"),
                    React.createElement("th", null, "LastName"),
                    React.createElement("th", null, "Age"),
                    React.createElement("th", null, "Salary"))),
            React.createElement("tbody", null, EmployeeListData.map(function (item) {
                return React.createElement("tr", { key: item.id },
                    React.createElement("td", null, item.firstName),
                    React.createElement("td", null, item.lastName),
                    React.createElement("td", null, item.age),
                    React.createElement("td", null, item.salary),
                    React.createElement("td", null,
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.FuncEdit(item.id); } }, "Edit"),
                        "|",
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.FuncDelete(item.id); } }, "Delete")));
            })));
    };
    return EmployeeList;
}(React.Component));
exports.EmployeeList = EmployeeList;
//here we are declaring a class which have the same properties as we have in model class.
var EmployeeListData = /** @class */ (function () {
    function EmployeeListData() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.age = "";
        this.salary = "";
    }
    return EmployeeListData;
}());
exports.EmployeeListData = EmployeeListData;
//# sourceMappingURL=EmployeeList.js.map