import React, {useEffect, useState} from 'react';
import {confirmEmail, paymentSuccess} from "./PaymentAPI";
import EmailPayment from "./EmailPayment";
import PaymentDataForm from "./PaymentDataForm";


const Payment = () => {

    const [email, setEmail] = useState("subodalahiru68@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("94767846632");
    const [username, setUsername] = useState("Suboda");
    const [totalAmount, setTotalAmount] = useState(1235.14);
    const [isPayClick, setIsPayClick] = useState(false);
    const [emailCode, setEmailCode] = useState();
    const [mobileCode, setMobileCode] = useState();
    const [randomNumber, setRandomNumber] = useState(0);
    const [checkConfirmation, setCheckConfirmation] = useState(0);

    const [modalShow, setModalShow] = useState(false);


    const onPayClick = () => {
        setIsPayClick(true)

        //generate random number
        const random = Math.floor(1000+Math.random()*(9999-1000))
        setRandomNumber(random)

        confirmEmail({customerEmailAddress:email, amount:totalAmount,confirmationCode:random}).then(()=>console.log("called"))

        //calling to sms service
    }

    console.log(randomNumber)
    const onEmailCodeClick = () => {
        if(randomNumber == emailCode){
            console.log("Code matches")
            setCheckConfirmation(checkConfirmation+1);
        }
    }

    const onMobileCodeClick = () => {
        if(randomNumber == mobileCode){
            console.log("code matches")
            setCheckConfirmation(checkConfirmation+1)
        }
    }

    useEffect(() => {

        if(checkConfirmation == 2){
            console.log("payment confirmed: ", checkConfirmation);
            setCheckConfirmation(0)
            setModalShow(true)

        //    payment confirmation API called

        }
    }, [checkConfirmation])

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

                            <button className="btn btn-primary" style={{marginTop: "10px"}}
                                    onClick={() => onPayClick()}
                            >Pay now</button>
                        </div>
                    </div>
                        </>
                ):(
                    <>
                        <div className="d-flex justify-content-center" style={{margin: "40px"}}>
                            <div className="card " style={{width: "18rem"}}>
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

                                <button className="btn btn-primary" style={{marginTop: "10px"}}
                                        onClick={() => onEmailCodeClick()}
                                >Confirm</button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center" style={{margin: "40px"}}>
                            <div className="card " style={{width: "18rem"}}>
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

                                <button className="btn btn-primary" style={{marginTop: "10px"}}
                                        onClick={() => onMobileCodeClick()}
                                >Confirm</button>
                            </div>
                        </div>

                    </>
                )
            }

            <EmailPayment modalShow = {modalShow} setModalShow={setModalShow}/>

        </div>

    )
}
export default Payment;