import { useState } from "react";
//import contactImg from "../../assets/contact/contact-img.svg";
import '../../styles/components/ContactComponente.css';

interface BannerProps {
    title: string;
    children?: React.ReactNode;
}

const Contact = ({ title, children }: BannerProps) => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({
        message: '',
        success: false
    });

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Sending...');

        const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDetails)
        });

        const data = await res.json();
        console.log('Response from API:', data);
        setButtonText('Send');
        setStatus({ success: data.success, message: data.success ? 'Enviado' : 'Error' });

    }

    return (
        <section className="glass container rounded-lg intersect:animate-fadeDown contact" id="connect">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2">
                        {/*<img src={contactImg} alt='Contact Us' />*/}
                        {children}
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2>{title}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type='text' value={formDetails.firstName} placeholder='First Name' onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                                <input type='text' value={formDetails.lastName} placeholder='Last Name' onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                                <input type='email' value={formDetails.email} placeholder='Email' onChange={(e) => onFormUpdate('email', e.target.value)} />
                                <input type='tel' value={formDetails.phone} placeholder='Phones' onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                <textarea rows={6} value={formDetails.message} placeholder='Message' onChange={(e) => onFormUpdate('message', e.target.value)} className="col-span-full" ></textarea>

                            </div>
                            <button type='submit'>
                                <span>{buttonText}</span>
                            </button>
                            {status.message && (
                                <p className={status.success === false ? 'danger' : 'success'}>{status.message}</p>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Contact;