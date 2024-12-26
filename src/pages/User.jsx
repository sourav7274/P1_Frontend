import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { addAddress } from "../features/address/addresSlice";


const User = () => {
    const dispatch = useDispatch()
    const {address} = useSelector((state) => state.address)
    const [dis,setDis] = useState(false)
    const [newAddress, setAddress] = useState({
        name: "",
        phnNumber:"",
        address:{
            houseNo:"",
            srtNum:"",
            city:"",
            state:"",
            pincode:"",
            landmarks:""
        }
    })

    const handleChange = (val) =>{
        const {name,value} = val.target
        if(name in newAddress.address)
        {
            setAddress((prev) => ({...prev,address:{
                ...prev.address,
                [name]: value
            }}))
        }
        else
        {
            setAddress((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(addAddress(newAddress))
    }

    console.log(address)
    return (
        <>
            <Header />
            <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1 mt-5">
                    <h1 className="text-center">Manage Address</h1>
                    {address.length>0 ? <>
                    <div className="container mt-5">
                    <h3 className="mx-5 my-5">Saved Address</h3>
                        <div className="card">
                            <div className="card-body">
                                <p><b>Name : </b>{address[0].name}</p>
                                <p><b>Phone Number : </b>{address[0].phnNumber}</p>
                                <p><b>Address</b></p>
                                <p><b>House Number : </b>{address[0].address.houseNo}</p>
                                <p><b>Street Number : </b>{address[0].address.srtNum}</p>
                                <p><b>City : </b>{address[0].address.city}</p>
                                <p><b>State : </b>{address[0].address.state}</p>
                                <p><b>Pincode : </b>{address[0].address.pincode}</p>
                                <p>
                                    <b>Landmarks/Special Directions: </b> 
                                    {address[0].address.landmarks.toLowerCase() === "" || address[0].address.landmarks.toLowerCase() === "na"
                                    ? "No Landmarks or special directions given"
                                    : address[0].address.landmarks}
                                </p>

                            </div>
                        </div>
                    </div>
                  
                    </>  :  
                    <>
                        <div className="container text-center mt-5">
                            <p>No Address Saved</p>
                            <button onClick={() => setDis(true) } className="btn btn-primary">Add Now</button>
                            {dis === true && <>
                                <form onSubmit={handleSubmit} className="mt-5 mb-3">
                                    <label className="form-label">Name: </label>

                                    <input name="name" onChange={(e) => handleChange(e)} value={newAddress.name} className="form-control" type="text"/>
            
                                    <label className="form-label mt-3">Address: </label>

                                    <input name="houseNo" onChange={(e) => handleChange(e)} value={newAddress.address.houseNo} className="form-control" type="text" placeholder="House No."/>

                                    <input name="srtNum" onChange={(e) => handleChange(e)} value={newAddress.address.srtNum} className="form-control my-2" type="text" placeholder="Street Number"/>

                                    <input name="city" onChange={(e) => handleChange(e)} value={newAddress.address.city} className="form-control " type="text" placeholder="City"/>

                                    <input name="state" onChange={(e) => handleChange(e)} value={newAddress.address.state} className="form-control my-2" type="text" placeholder="State"/>

                                    <input name="pincode" onChange={(e) => handleChange(e)} value={newAddress.address.pincode} className="form-control" type="number" placeholder="Pincode"/>

                                    <label className="form-label mt-3">Phone Number: </label>
                                    <input name="phnNumber" value={newAddress.phnNumber} onChange={(e) => handleChange(e)} className="form-control" type="number"/>

                                    <label className="form-label mt-3">Landmarks/ Special Instructions: </label>
                                    <textarea name="landmarks" onChange={(e) => handleChange(e)} value={newAddress.address.landmarks} cols={50} rows={5} className="form-control" type="text"/>
                                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                                </form>
                            </>}
                        </div>
                    </>}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default User;
