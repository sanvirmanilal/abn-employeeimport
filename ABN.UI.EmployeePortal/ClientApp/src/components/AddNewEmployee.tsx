import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EmployeeListData } from './EmployeeList';

interface AddEmployeeRecordState {
    title: string;
    loading: boolean;
    employeeList: EmployeeListData;
}


export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddEmployeeRecordState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, employeeList: new EmployeeListData };

        var employeeid = this.props.match.params["id"];

        if (employeeid > 0) {
            fetch('api/Employee/Details/' + employeeid)
                .then(response => response.json() as Promise<EmployeeListData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, employeeList: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, employeeList: new EmployeeListData };
        }

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Employee</h3>
            <hr />
            {contents}
        </div>;
    }



    private FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        if (this.state.employeeList.id) {
            fetch('api/Employee/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
            {
                this.props.history.push("/employeeList");
            }   
        }
        else {
            fetch('api/Employee/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
            {
                this.props.history.push("/employeeList");
            }
        }
    }


    private FuncCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/employeeList");
    }

    private renderCreateForm() {
        return (
            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.employeeList.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="FirstName">First Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="FirstName" defaultValue={this.state.employeeList.firstName} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="LastName" >LastName</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="LastName" defaultValue={this.state.employeeList.lastName} required />
                    </div>
                </div>


                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Age" >Age</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Age" defaultValue={this.state.employeeList.age} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Salary" >Salary</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Salary" defaultValue={this.state.employeeList.salary} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.FuncCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}