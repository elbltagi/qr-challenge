import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import back from "./assets/bg-illustration.svg"
import QRCode from 'react-qr-code';
import logo from "./assets/logo-qr-generator.svg"
import html2canvas from 'html2canvas';

export default function Qr() {
    const params = useParams()
    const exportElement = useRef();
    const [notifications, setNotifications] = useState([])
    const exportAsImage = async (el, imageFileName) => {
        const canvas = await html2canvas(el, {
            allowTaint: false,
            useCORS: true,
        })
        const image = canvas.toDataURL("image/png", 1.0);
        downloadImage(image, imageFileName);
    };
    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        fakeLink.href = blob;
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        fakeLink.remove();
        pushNotification("The QR code has been downloaded", "#3662E3", "#F2F5F9")
    };
    const pushNotification = (text, color, textColor) => {
        const item = { text, color, textColor, id: Math.random().toString() };
        setNotifications(items => [...items, item]);
        setTimeout(() => {
            const test = [...notifications];
            test.splice(test.indexOf(item));
            setNotifications(test)
        }, 2000)

    }
    return (
        <div >
            <img src={logo} className='logo' alt="" />
            <div className='main'>
                <div className='circle-bg' >
                    <div ref={exportElement} className='hello'>
                        <QRCode
                            value={params.url}
                            size={170}
                        />
                    </div>
                </div>
                <div className='buttons'>
                    <button onClick={() => exportAsImage(exportElement.current, "test2")}>Download</button>
                    <button onClick={() => {
                        navigator.clipboard.writeText(location.href);
                        pushNotification("The link has been copied", "#F2F5F9", "#3662E3")
                    }}>share</button>
                </div>
            </div>
            <div className='notifications'>
                {notifications.map((item) => {
                    return (
                        <div className='notification' style={{ backgroundColor: item.color, color: item.textColor }}>
                            <p>{item.text}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
