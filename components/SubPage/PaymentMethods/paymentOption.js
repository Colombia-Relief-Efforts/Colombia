import { useState } from "react"
import arrow_right from '../../../public/assets/icons/arrow_right.svg'
import arrow_down from '../../../public/assets/icons/arrow_down.svg'
import Image from "next/image";
import PaymentDesc from "./paymentDesc";

export default function PaymentOption(props) {
    const [isActive, setActive] = useState(props.initiallyExpanded);

    return (
        <div>
            <div className="flex flex-row mt-5 cursor-pointer">
                <div className="w-7 shrink-0 mr-2">
                {isActive ?
                    <Image src={arrow_down} alt="expanded" onClick={() => setActive(!isActive)}/> :
                    <Image src={arrow_right} alt="collapsed" onClick={() => setActive(!isActive)}/>
                    }
                </div>
                <div className="w-full">
                    <h4 className="text-2xl font-bold text-brandblue-default mb-2" onClick={() => setActive(!isActive)}>
                    {props.method.name}
                    </h4>
                    {isActive &&
                        <PaymentDesc method={props.method}/>
                    }
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
