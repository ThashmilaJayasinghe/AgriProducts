import React, {useState} from 'react';
import {Button, Form, Tab, Tabs} from "react-bootstrap";
import {creditCardPayment, mobilePayment} from "./PaymentAPI";

const PaymentDataForm = ({email, amount, username}) => {

    const [cardNumber, setCardNumber] = useState();
    const [CVC_number, setCVC_number] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [pinNumber, setPinNumber] = useState();

    const onCreditEnter = () => {

        localStorage.setItem("paymentMethod", "credit");
        console.log(email)
        console.log(cardNumber)
        console.log(amount)
        console.log(CVC_number)
        console.log(username)

        //payment service
        creditCardPayment({email,cardNumber,amount,CVC_number, holderName: username}).then((res)=> console.log("Payment success"))

    }

    const onMobileEnter = () => {

        localStorage.setItem("paymentMethod", "mobile");

        console.log(email)
        console.log(mobileNumber)
        console.log(amount)
        console.log(pinNumber)

        //  mobile  payment service
        mobilePayment({email, mobileNumber, pinNumber,amount }).then(() => console.log("Mobile payment success"))
    }

    return (

            <span className="block-example border border-info p-2 m-2 " style={{borderRadius:"10px"}}>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3"
                >

                    <Tab eventKey="home" title="Mobile Payment">
                        <div style={{padding:"6px"}}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Mobile number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter mobile number..."
                                                  onChange={(e) => setMobileNumber(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Pin Number</Form.Label>
                                    <Form.Control type="text" placeholder="Pin..."
                                                  onChange={(e) => setPinNumber(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Provided by the mobile service provider
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="success" type="button"
                                        onClick={onMobileEnter}
                                >
                                    Enter Details
                                </Button>
                            </Form>
                        </div>
                    </Tab>

                    <Tab eventKey="profile" title="Credit Card">
                        <div style={{padding:"6px"}}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Credit card number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Credit cart number..."
                                                  onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>CVC Number</Form.Label>
                                    <Form.Control type="text" placeholder="CVC..."
                                                  onChange={(e) => setCVC_number(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Downside of the card
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="success" type="button"
                                        onClick={onCreditEnter}
                                >
                                    Enter Details
                                </Button>
                            </Form>
                        </div>
                    </Tab>

                </Tabs>


            </span>

    )
}
export default PaymentDataForm;