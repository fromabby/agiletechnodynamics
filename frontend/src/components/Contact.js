import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { inquire, clearErrors } from './../actions/userActions'

import '../contact.css'

const Contact = ( { history } ) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [position, setPosition] = useState('');
    const [concernType, setConcernType] = useState('');
    const [customerMessage, setCustomerMessage] = useState('');
    const [success, setSuccess] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error } = useSelector(state => state.auth);

    useEffect(() => {
        console.log(success)
        if(success) {
            history.push('/confirmation')
        }
        
        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('firstName', firstName);
        formData.set('lastName', lastName);
        formData.set('customerEmail', customerEmail);
        formData.set('companyName', companyName);
        formData.set('position', position);
        formData.set('contactNumber', contactNumber);
        formData.set('concernType', concernType);
        formData.set('customerMessage', customerMessage);
        formData.set('success', success);
        dispatch(inquire(formData));
    }

    return (
        <Fragment>
            <MetaData title={'Contact Us'}/>
            <Fragment>
                <form method='post' onSubmit={submitHandler} encType='application/json'>
                    <div className="contact-container">
                        <div className="contact-header">
                            <h1 style={{textAlign: 'center'}}>Contact Us</h1>
                        </div>
                        <div className="labelname">
                            <label>Your Name</label>
                        </div>
                        <div className="firstname">
                            <input 
                                name="firstname" 
                                type="text" 
                                className="feedback-input" 
                                placeholder="First Name" 
                                defaultValue={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="lastname">
                            <input 
                                name="lastname" 
                                type="text" 
                                className="feedback-input" 
                                placeholder="Last Name" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="labelcompany">
                            <label>Your Company Name</label>
                        </div>
                        <div className="companyname">
                            <input 
                                name="companyname" 
                                type="text" 
                                className="feedback-input" 
                                placeholder="Company Name" 
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div className="labelposition">
                            <label>Your Position in Company</label>
                        </div>
                        <div className="position">
                            <input 
                                name="position" 
                                type="text" 
                                className="feedback-input" 
                                placeholder="Position" 
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <div className="labelemail">
                            <label>Your Email</label>
                        </div>
                        <div className="email">
                            <input 
                                name="email" 
                                type="email" 
                                className="feedback-input" 
                                placeholder="Email" 
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                            />
                        </div>
                        <div className="labelcontact">
                            <label>Your Contact Number</label>
                        </div>
                        <div className="contact">
                            <input 
                                name="contactnumber" 
                                type="text" 
                                className="feedback-input" 
                                placeholder="Contact Number" 
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                            />
                        </div>
                        <div className="labelconcern">
                            <label>Your Concern Type</label>
                        </div>
                        <div className="concern">
                            <select 
                                name="concern" 
                                className="concern-dropdown" 
                                value={concernType}
                                onChange={(e) => setConcernType(e.target.value)}>
                                <option>         -        </option>
                                <option value="Inquiry">Inquiry</option>
                                <option value="Appointment">Appointment</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="labelmessage">
                            <label>Your Message</label>
                        </div>
                        <div className="message">
                            <textarea 
                                name="message" 
                                className="feedback-input" 
                                placeholder="Message" 
                                value={customerMessage}
                                onChange={(e) => setCustomerMessage(e.target.value)}
                            />
                        </div>
                        <div className="submit">
                            <input type="submit" value="SUBMIT" onClick={(e) => setSuccess(true)}/>
                        </div>
                    </div>
                </form>
            </Fragment>
        </Fragment>
    )
}

export default Contact