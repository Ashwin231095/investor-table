import React, { useEffect } from "react";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import data from "./data";
import { useDispatch, useSelector } from "react-redux";
import investorAction from "../../Actions/investorAction";
import axios from "axios";
import { RootState } from "../../Store";

function TableData() {
    let axiosData;
    const [state, setState] = React.useState([]);
    useEffect(() => {

        axios.get('http://localhost:4000/home/get-investor').then((res: any) => setState(res.data))
    }, []);
    console.log('the axios data is ', state);
    let investors: any = state;
    const dispatch = useDispatch();
    const [editId, setEditId] = React.useState('');
    const [clickAdd, setClickAdd] = React.useState(false);

    dispatch(investorAction.getInvestors(investors));

    const investorsList = useSelector((state: RootState) => state.investors.investorsList);
    console.log('the investors list is ', investorsList)

    const investmentsString = investorsList.filter((investors: any) => investors.allocation !== ' ');
    const investments = investmentsString.map((investors: any) => {
        const alloc = investors.allocation.split('$');
        return Number(alloc[1]);
    })
    const totalInvestments = investments.reduce((a: number, b: number) => a + b, 0);

    console.log('the investments are ', totalInvestments)

    const updateRow = (event: any) => {
        console.log(event.target.getAttribute('aria-label'));
        setEditId(event.target.getAttribute('aria-label'));
    }
    let updatedEmail = ' ';
    let updatedInvestor = ' ';
    let updatedAllocation = ' ';
    let updatedEquity = ' ';
    const updateEmail = (event: any) => {
        console.log(event.target.value);
        updatedEmail = event.target.value
    }
    const updateInvestor = (event: any) => {
        console.log(event.target.value);
        updatedInvestor = event.target.value
    }
    const updateAlloc = (event: any) => {
        console.log(event.target.value);
        updatedAllocation = event.target.value;
    }
    const updateEquity = (event: any) => {
        console.log(event.target.value);
        updatedEquity = event.target.value
    }
    const saveRow = async (event: any) => {
        console.log(event.target.getAttribute('aria-label'));
        await axios.put('http://localhost:4000/home/update-investor', {
            "id": editId,
            "email": updatedEmail,
            "investor_name": updatedInvestor,
            "allocation": updatedAllocation,
            "equity": updatedEquity
        });
        axios.get('http://localhost:4000/home/get-investor').then((res: any) => setState(res.data));
        setEditId('');
    }
    const addRow = () => {
        setClickAdd(true)
    }
    let addedEmail = ' ';
    let addedInvestor = ' ';
    let addedAllocation = ' ';
    let addedEquity = ' ';
    const addEmail = (event: any) => {
        console.log(event.target.value);
        addedEmail = event.target.value
    }
    const addInvestor = (event: any) => {
        console.log(event.target.value);
        addedInvestor = event.target.value
    }
    const addAlloc = (event: any) => {
        console.log(event.target.value);
        addedAllocation = event.target.value;
    }
    const addEquity = (event: any) => {
        console.log(event.target.value);
        addedEquity = event.target.value
    }
    const saveAddedRow = async () => {
        const ids = investorsList.map((investor: any) => {
            return Number(investor.user_id)
        })
        console.log('the highest numb is ', Math.max(...ids))
        const addedObj = {
            user_id: Math.max(...ids) + 1,
            email: addedEmail,
            investor_name: addedInvestor,
            allocation: addedAllocation,
            equity: addedEquity
        }
        await axios.post('http://localhost:4000/home/add-investor', {
            "id": Math.max(...ids) + 1,
            "email": addedEmail,
            "investor_name": addedInvestor,
            "allocation": addedAllocation,
            "equity": addedEquity
        });
        axios.get('http://localhost:4000/home/get-investor').then((res: any) => setState(res.data));
        setClickAdd(false)
    }
    const getData = (user_id: string) => {
        const data = investors.find((investor: any) => investor.user_id === user_id);
        return data;
    }

    return (
        <div>
            <div>
                <h2>Investors </h2>
                <div>
                    <h5>CONFIRMED</h5>
                    <h3>{`$` + totalInvestments}</h3>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Investor Name</TableCell>
                            <TableCell>Allocation</TableCell>
                            <TableCell>Equity</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {investorsList.map((investor: any) => (
                            <TableRow>
                                <TableCell>
                                    {
                                        editId !== investor.user_id && investor.email
                                    }
                                    {
                                        editId === investor.user_id && <input placeholder={(getData(investor.user_id) as any).email} onChange={updateEmail} />
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        editId !== investor.user_id && investor.investor_name
                                    }
                                    {
                                        editId === investor.user_id && <input placeholder={(getData(investor.user_id) as any).investor_name} onChange={updateInvestor} />
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        editId !== investor.user_id && investor.allocation
                                    }
                                    {
                                        editId === investor.user_id && <input placeholder={(getData(investor.user_id) as any).allocation} onChange={updateAlloc} />
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        editId !== investor.user_id && investor.equity
                                    }
                                    {
                                        editId === investor.user_id && <input placeholder={(getData(investor.user_id) as any).equity} onChange={updateEquity} />
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        editId !== investor.user_id && <button aria-label={investor.user_id} onClick={updateRow}>Update</button>
                                    }
                                    {
                                        editId === investor.user_id && <button aria-label={investor.user_id} onClick={saveRow}>Save</button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>{!clickAdd && ''} {clickAdd && <input placeholder='Add Email' onChange={addEmail} />}</TableCell>
                            <TableCell>{!clickAdd && ''} {clickAdd && <input placeholder='Add Investor' onChange={addInvestor} />}</TableCell>
                            <TableCell>{!clickAdd && ''} {clickAdd && <input placeholder='Add Allocation' onChange={addAlloc} />}</TableCell>
                            <TableCell>{!clickAdd && ''} {clickAdd && <input placeholder='Add Equity' onChange={addEquity} />}</TableCell>
                            <TableCell>
                                {!clickAdd && <button onClick={addRow}>Add</button>}
                                {clickAdd && <button onClick={saveAddedRow}>Save</button>}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableData;
