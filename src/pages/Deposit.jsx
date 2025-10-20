/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import DepositTable from "../components/Deposit/DepositTable"
import { fetchUsers } from "../store/userslice";
import { useDispatch, useSelector } from "react-redux";

function Deposit() {
    const { data } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    return (
        <>
            <DepositTable data={data} />
        </>
    )
}

export default Deposit

