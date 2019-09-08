import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';


interface EmployeeRecordState {
    EmployeeListData: EmployeeListData[];
    loading: boolean;
}

//here declaring the EmployeeList class. And this EmployeeList class inherits the abstract class React.Component
export class EmployeeList extends React.Component<RouteComponentProps<{}>, EmployeeRecordState> {

    //Declaring the constructor 
    constructor() {

        //here we are calling base class constructor using super()
        super('');

        //here we are intializing the interface's fields using default values.
        this.state = { EmployeeListData: [], loading: true };

        //this fetch method is responsible to get all the Employee record using web api.
        fetch('api/Employee/Index')
            .then(response => response.json() as Promise<EmployeeListData[]>)
            .then(data => {
                debugger
                this.setState({ EmployeeListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }


    //this method will render html onto the DOM.
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeeTable(this.state.EmployeeListData);//this renderEmployeeTable method will return the HTML table. This table will display all the record.
        return <div>
            <h1>Employee Record</h1>
            <p>
                <Link to="/addEmployee">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    // this method will be responsible for deleting the Employee record.
    private FuncDelete(id: number) {
        if (!confirm("Do you want to delete Employee with this Id: " + id))
            return;
        else {
            //this fetch method will get the specific Employee record using Employee id.
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

    //this method will responsible for editing the specific Employee record.
    private FuncEdit(id: number) {
        this.props.history.push("/Employee/edit/" + id);
    }

    //this method will return the html table to display all the Employee record with edit and delete methods.
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