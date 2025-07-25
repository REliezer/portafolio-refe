import { Toaster, toast } from 'sonner'
import { useState } from "react";
import { useFormValidation } from '@/hooks/useFormValidation';
import '@/styles/components/ContactComponente.css';

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

    const validationRules = {
        firstName: { required: true, minLength: 2, maxLength: 50 },
        lastName: { required: true, minLength: 2, maxLength: 50 },
        email: { required: true, email: true },
        phone: {
            required: true,
            pattern: /^[\+]?[0-9\-\s\(\)]+$/,
            minLength: 7
        },
        message: { required: true, minLength: 10, maxLength: 500 }
    };

    const { values, errors, touched, handleChange, handleBlur, validateAll, reset } = useFormValidation(
        formInitialDetails,
        validationRules
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateAll()) {
            toast.warning('Error de validación, Por favor, corrige los errores en el formulario');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            const data = await res.json();

            if (data.success) {
                toast.success('¡Mensaje enviado!. Tu mensaje ha sido enviado correctamente. Te responderé pronto.');
                reset();
            } else {
                toast.error('Error al enviar. Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Error de conexión. No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Toaster position="bottom-center" richColors />
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
                                    {/* First Name */}
                                    <div className="form-field">
                                        <input
                                            type='text'
                                            name='firstName'
                                            value={values.firstName}
                                            placeholder='Nombre'
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            onBlur={() => handleBlur('firstName')}
                                            className={touched.firstName && errors.firstName ? 'error' : ''}
                                        />
                                        {touched.firstName && errors.firstName && (
                                            <span className="error-message">{errors.firstName}</span>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div className="form-field">
                                        <input
                                            type='text'
                                            name='lastName'
                                            value={values.lastName}
                                            placeholder='Apellidos'
                                            onChange={(e) => handleChange('lastName', e.target.value)}
                                            onBlur={() => handleBlur('lastName')}
                                            className={touched.lastName && errors.lastName ? 'error' : ''}
                                        />
                                        {touched.lastName && errors.lastName && (
                                            <span className="error-message">{errors.lastName}</span>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="form-field">
                                        <input
                                            type='email'
                                            name='email'
                                            value={values.email}
                                            placeholder='Correo Electrónico'
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            onBlur={() => handleBlur('email')}
                                            className={touched.email && errors.email ? 'error' : ''}
                                        />
                                        {touched.email && errors.email && (
                                            <span className="error-message">{errors.email}</span>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="form-field">
                                        <input
                                            type='tel'
                                            name='phone'
                                            value={values.phone}
                                            placeholder='Teléfono'
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            onBlur={() => handleBlur('phone')}
                                            className={touched.phone && errors.phone ? 'error' : ''}
                                        />
                                        {touched.phone && errors.phone && (
                                            <span className="error-message">{errors.phone}</span>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="form-field col-span-full">
                                        <textarea
                                            rows={6}
                                            name='message'
                                            value={values.message}
                                            placeholder='Mensaje'
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            onBlur={() => handleBlur('message')}
                                            className={`col-span-full ${touched.message && errors.message ? 'error' : ''}`}
                                        ></textarea>
                                        {touched.message && errors.message && (
                                            <span className="error-message">{errors.message}</span>
                                        )}
                                    </div>
                                </div>

                                <button type='submit' disabled={isSubmitting} className={isSubmitting ? 'loading' : ''}>
                                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Contact;