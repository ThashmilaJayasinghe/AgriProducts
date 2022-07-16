import axios from 'axios'

export const confirmEmail = async (data) => {

    console.log(data)

    const response = await  axios.post('http://localhost:11000/api/emailService/confirmEmail', data)
        .then((res) => console.log(res))
}

export const confirmSms = async (data) => {
    const response = await  axios.post('http://localhost:12000/api/SmsService/confirmOTP', data)
        .then((res) => console.log(res))
}

//payment success
// export const paymentSuccess = async (data) => {
//     const response = await  axios.post('http://localhost:9000/api/creditCard/makePayment', data)
//         .then((res) => console.log(res))
// }

//payment added using credit card
export const creditCardPayment = async (data) => {
    const response = await  axios.post('http://localhost:9000/api/creditCard/makePayment', data)
        .then((res) => console.log(res))
}

//payment added using mobile phone
export const mobilePayment = async (data) => {
    const response = await  axios.post('http://localhost:10000/api/mobile/makeMobilePayment/', data)
        .then((res) => console.log(res))
}