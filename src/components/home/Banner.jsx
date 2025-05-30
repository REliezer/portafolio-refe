import { useState, useEffect } from 'react';
import { ArrowRightCircle } from "react-bootstrap-icons";
import 'animate.css';
import '../../styles/BannerComponente.scss';

const BannerComponent = ({title, content, button, children}) => {
    const [loopNum, setLoopNum] = useState(0); //bucle numero, indice de palabra a mostrar
    const [isDeleting, setIsDeleting] = useState(false); //determina que palabra se escribe o se elimina
    const [text, setText] = useState(''); //con que parte de la palabra comenzara
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer", "Frontend Developer"]; //lista de palabras para mostrar
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    return (
        <section className='banner' id='home'>
            <div className="container">
                <div className="align-items-center row justify-center">
                    <div className="text-center lg:col-8">
                        <span className='tagline'>{title}</span>
                        <h1>{'Hi I\'m Rodrigo Fúnes '}<span className='wrap'>{text}</span></h1>
                        <p className='text-justify'>{content}</p>
                        <button onClick={() => console.log('connect')}><a href={button.link}>{button.label}</a><ArrowRightCircle size={25} /></button>
                    </div>
                    <div className="text-center lg:col-4 align-items-center">
                        {children}                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerComponent;
