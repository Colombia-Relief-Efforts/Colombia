import PaymentOption from './paymentOption';


export default function PaymentMethods(props) {
    const paymentMethods = props.methods.filter((method) =>
        props.colombia ? method.availableInColombia : method.availableInternationally
    );

    return (
        <div>
            {paymentMethods.map((method) => (
                <PaymentOption
                    method={method}
                    key={method.slug}
                    initiallyExpanded={props.colombia}
                />
            ))}
        </div>
    )
}
