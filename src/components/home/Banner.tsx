import { useState, useEffect } from 'react';
import { ArrowRightCircle } from "react-bootstrap-icons";
import 'animate.css';
import '../../styles/components/BannerComponente.css';

interface BannerProps {
  title: string;
  subtitle: string;
  content: string;
  button?: { label: string; link: string };
  children?: React.ReactNode;
}

const BannerComponent = ({title, subtitle, content, button, children}: BannerProps) => {
    const [loopNum, setLoopNum] = useState(0); //bucle numero, indice de palabra a mostrar
    const [isDeleting, setIsDeleting] = useState(false); //determina que palabra se escribe o se elimina
    const [text, setText] = useState(''); //con que parte de la palabra comenzara
    const [delta, setDelta] = useState(300 - Math.random() * 100);
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
                <div className="flex items-center justify-center">
                    <div className="text-center lg:w-2/3">
                        <span className='tagline'>{title}</span>
                        <h1>{subtitle} </h1>
                        <h1 className='text-h1-sm md:text-lh1 wrap'>{text}</h1>
                        <p className='text-justify font-mono'>{content}</p>
                        <button>
                            <a href={button?.link}>{button?.label}</a>
                            <ArrowRightCircle size={25} /></button>
                    </div>
                    <div className="text-center lg:w-1/3 flex items-center justify-center">
                        {children}                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerComponent;
