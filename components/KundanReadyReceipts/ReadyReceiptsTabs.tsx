import Link from 'next/link';
import styles from '../../styles/header.module.css';
import SalesHeader from '../Header/SalesHeader';
import { useState } from 'react';
import { useRouter } from 'next/router';

const ReadyReceiptsTabs: any = ({
  showMaster,
  showSales,
  showReceipt,
}: any) => {
  const router = useRouter();

  const pathcontent = router?.asPath?.split('/');

  // const value = pathcontent[pathcontent?.length - 1];

  const KundanValue =
    pathcontent?.length > 0 &&
    pathcontent !== null &&
    pathcontent?.includes('kundan');
  const mangalsutraValue =
    pathcontent?.length > 0 &&
    pathcontent !== null &&
    (pathcontent?.includes('mangalsutra') ||
      pathcontent?.includes('Mangalsutra'));
  console.log('tabs value', KundanValue, mangalsutraValue);
  const [active, setActive] = useState(0);
  return (
    <div className=" justify-content-center">
      <div className="navbar d-flex justify-content-center p-0">
        <div>
          {showReceipt ? (
            <div className="d-flex justify-content-center">
              <Link
                href="/readyReceipt/kundan"
                className="text-decoration-none btn-margin"
                onClick={() => setActive(0)}
              >
                <button
                  className={`${styles.button} ${
                    KundanValue ? 'activeColor' : ''
                  }`}
                >
                  Ready Receipts (Kundan Karigar)
                  <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
                </button>
              </Link>
              <Link
                href="/readyReceipt/mangalsutra"
                className="text-decoration-none btn-margin"
                onClick={() => setActive(1)}
              >
                <button
                  className={`${styles.button} ${
                    mangalsutraValue ? 'activeColor' : ''
                  } `}
                >
                  Ready Receipts (Mangalsutra Karigar)
                  <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
                </button>
              </Link>
            </div>
          ) : (
            ''
          )}
          {showSales ? <SalesHeader /> : ''}
          {showMaster ? '' : ''}
        </div>
      </div>
    </div>
  );
};

export default ReadyReceiptsTabs;
