import { useTranslation } from 'next-i18next/pages';

export default function PaymentDesc (props) {
    const { t } = useTranslation('common');
    const { requirements, pros, cons } = props.method;

    return (
      <div>
        <div>
          {requirements ? (
            <div className='mt-2 mb-2'>
              <span className="font-bold text-md mb-10">{t('payment.needed')}: </span>
              <span>{requirements}</span>
            </div>
          ) : (
            ""
          )}
          <div>
            <div>
              <h5 className="font-bold text-xl mb-2">{t('payment.pros')}</h5>
              <div className="block mb-2">
                <ul className="list-disc list-outside">
                  {pros.map((pro, index) => (
                    <li key={`pro${index}`} className="ml-4">
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='mb-3'>
              <h5 className="font-bold text-xl mb-2">{t('payment.cons')}</h5>
              <ul className="list-disc list-outside">
                {cons.map((con, index) => (
                  <li key={`con${index}`} className="ml-4">
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}
