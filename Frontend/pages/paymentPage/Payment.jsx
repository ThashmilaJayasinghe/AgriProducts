import React, {useEffect, useState} from 'react';
import {confirmEmail, confirmSms, paymentSuccess} from "./PaymentAPI";
import EmailPayment from "./EmailPayment";
import PaymentDataForm from "./PaymentDataForm";


const Payment = (props) => {

    const [email, setEmail] = useState("subodalahiru68@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("94767846632");
    const [username, setUsername] = useState(localStorage.getItem("userName"));
    const [totalAmount, setTotalAmount] = useState(localStorage.getItem("totAmount"));
    const [isPayClick, setIsPayClick] = useState(false);
    const [emailCode, setEmailCode] = useState();
    const [mobileCode, setMobileCode] = useState();
    const [randomNumber, setRandomNumber] = useState(0);
    const [checkConfirmation, setCheckConfirmation] = useState(0);
    const [checkPaymentMethod, setCheckPaymentMethod] = useState(localStorage.getItem("paymentMethod"));

    const [modalShow, setModalShow] = useState(false);


    const onPayClick = () => {
        setIsPayClick(true)
        // setModalShow(true)
        //generate random number
        const random = Math.floor(1000+Math.random()*(9999-1000))
        setRandomNumber(random)

        confirmEmail({customerEmailAddress:email, amount:totalAmount,confirmationCode:random}).then(()=>console.log("called"))

        //calling to sms service
        confirmSms({customerEmailAddress:email, amount:totalAmount,OTPCode:random, customerMobileNumber: phoneNumber}).then(() => console.log("mobile payment added"))
    }

    console.log(randomNumber)
    const onEmailCodeClick = () => {
        if(randomNumber == emailCode){
            console.log("Code matches")
            setModalShow(true)
            setCheckConfirmation(checkConfirmation+1);
        }
    }

    const onMobileCodeClick = () => {
        if(randomNumber == mobileCode){
            console.log("code matches")
            setModalShow(true)
            setCheckConfirmation(checkConfirmation+1)
        }
    }

    // useEffect(() => {
    //
    //     if(checkConfirmation == 2){
    //         console.log("payment confirmed: ", checkConfirmation);
    //         setCheckConfirmation(0)
    //         // setModalShow(true)
    //
    //     //    payment confirmation API called
    //
    //     }
    // }, [checkConfirmation])

    console.log(username)

    return (
        <div>
            {
                !isPayClick ? (
                    <>
                    <div className="d-flex justify-content-center" style={{margin: "40px"}}>
                        <div className="card " style={{width: "24rem"}}>
                            <div className="card-header">
                                Total payable amount :   <h4 style={{float:"right"}}>{totalAmount} LKR </h4>
                            </div>
                            {/*<ul className="list-group list-group-flush">*/}
                            {/*    <li className="list-group-item d-flex justify-content-center d-flex align-items-center" style={{height:"100px"}} >Rs. <b>{totalAmount} </b></li>*/}
                            {/*</ul>*/}

                            <PaymentDataForm email = {email} amount = {totalAmount} username = {username}/>

                            <button className="btn btn-success" style={{marginTop: "10px"}}
                                    onClick={() => onPayClick()}
                            >Pay now</button>
                        </div>
                    </div>
                        </>
                ):(
                    <>
                        {
                            localStorage.getItem("paymentMethod") == "credit" &&

                                <div className="d-flex justify-content-center" style={{margin: "40px"}}>
                                    <div className="card " style={{width: "24rem"}}>
                                        <div className="card-header">
                                            Email Confirmation
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-center d-flex align-items-center" style={{height:"100px"}} > We have sent an Confirmation code to {email} </li>
                                            <li className="list-group-item">Enter your code :
                                                {/*<input type="number" placeholder="Code..."/>*/}
                                                <div className="input-group input-group-sm mb-3 pt-2">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Code : </span>
                                                    </div>
                                                    <input type="text" className="form-control" aria-label="Small"
                                                           aria-describedby="inputGroup-sizing-sm"
                                                           onChange={(e) => setEmailCode(e.target.value)}
                                                    />
                                                </div>
                                            </li>
                                        </ul>

                                        <button className="btn btn-success" style={{marginTop: "10px"}}
                                                onClick={() => onEmailCodeClick()}
                                        >Confirm</button>
                                    </div>
                                </div>
                        }

                        {
                            localStorage.getItem("paymentMethod") == "mobile" &&

                                <div className="d-flex justify-content-center" style={{margin: "40px"}}>
                                    <div className="card " style={{width: "24rem"}}>
                                        <div className="card-header">
                                            Mobile Confirmation
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-center d-flex align-items-center" style={{height:"100px"}} > We have sent an OTP code to +{phoneNumber} </li>
                                            <li className="list-group-item">Enter your code :
                                                {/*<input type="number" placeholder="Code..."/>*/}
                                                <div className="input-group input-group-sm mb-3 pt-2">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">OTP : </span>
                                                    </div>
                                                    <input type="text" className="form-control" aria-label="Small"
                                                           aria-describedby="inputGroup-sizing-sm"
                                                           onChange={(e) => setMobileCode(e.target.value)}
                                                    />
                                                </div>
                                            </li>
                                        </ul>

                                        <button className="btn btn-success" style={{marginTop: "10px"}}
                                                onClick={() => onMobileCodeClick()}
                                        >Confirm</button>
                                    </div>
                                </div>
                        }


                    </>
                )
            }

            <EmailPayment modalShow = {modalShow} setModalShow={setModalShow}/>

        </div>

    )
}
export default Payment;