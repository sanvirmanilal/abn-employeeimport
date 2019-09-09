import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';


interface EmployeeRecordState {
    EmployeeListData: EmployeeListData[];
    loading: boolean;
}

export class EmployeeList extends React.Component<RouteComponentProps<{}>, EmployeeRecordState> {

    constructor() {

        super('');

        this.state = { EmployeeListData: [], loading: true };

        fetch('api/Employee/Index')
            .then(response => response.json() as Promise<EmployeeListData[]>)
            .then(data => {
                this.setState({ EmployeeListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }


    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeeTable(this.state.EmployeeListData);
        return <div>
            <h1>Employee Record</h1>
            <p>
                <Link to="/addEmployee">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    private FuncDelete(id: number) {
        if (!window.confirm("Do you want to delete Employee with this Id: " + id))
            return;
        else {
            fetch('api/Employee/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        EmployeeListData: this.state.EmployeeListData.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    private FuncEdit(id: number) {
        this.props.history.push("/Employee/edit/" + id);
    }

    private renderEmployeeTable(EmployeeListData: EmployeeListData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Age</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody>
                {EmployeeListData.map(item =>
                    <tr key={item.id}>
                        <td >{item.firstName}</td>
                        <td >{item.lastName}</td>
                        <td >{item.age}</td>
                        <td >{item.salary}</td>
                        <td >
                            <a className="action" onClick={(id) => this.FuncEdit(item.id)}>Edit</a>|
                            <a className="action" onClick={(id) => this.FuncDelete(item.id)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

//here we are declaring a class which have the same properties as we have in model class.
export class EmployeeListData {
    id: number = 0;
    firstName: string = "";
    lastName: string = "";
    age: string = "";
    salary: string = "";
}