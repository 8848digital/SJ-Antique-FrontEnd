import Link from 'next/link';
import React from 'react';
import styles from '../../styles/readyReceiptTableListing.module.css';
import { useRouter } from 'next/router';
import DeletePurchaseReceiptApi from '@/services/api/PurchaseReceipt/delete-purchase-receipt';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import getPurchasreceiptListApi from '@/services/api/get-purchase-recipts-list-api';

const KundanListing = ({ kundanListing, HandleDeleteReceipt }: any) => {
  const router = useRouter();
  console.log('routerr', router);
  let url: any = router?.query?.receipt;
  const loginAcessToken = useSelector(get_access_token);

  const HandleCancelReceipt: any = async (name: any) => {
    console.log('name', name);
    let cancelReceipt: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      '2',
      name
    );
    console.log('cancel receipt', cancelReceipt);
  };

  console.log('kundalisting', kundanListing);
  return (
    <div className=" table py-2">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th className="thead" scope="col">
              Receipt No.
            </th>
            <th className="thead" scope="col">
              Transaction Date
            </th>
            <th className="thead" scope="col">
              Karigar
            </th>
            <th className="thead" scope="col">
              Status
            </th>
            <th className="thead" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {kundanListing?.length > 0 &&
            kundanListing !== null &&
            kundanListing.map((item: any, i: any) => (
              <tr key={i} className={`${styles.receipt_listing_table_row} `}>
                <td
                  className={`table_row ${styles.receipt_listing_table_data}`}
                >
                  {item.name}
                </td>
                <td
                  className={`table_row ${styles.receipt_listing_table_data}`}
                >
                  {item.posting_date}
                </td>
                <td
                  className={`table_row ${styles.receipt_listing_table_data}`}
                >
                  {item.custom_karigar}
                </td>
                <td
                  className={`table_row ${styles.receipt_listing_table_data}`}
                >
                  {item.docstatus === 0 ? (
                    <span>Draft</span>
                  ) : item.docstatus === 1 ? (
                    <span>Submitted</span>
                  ) : item.docstatus === 2 ? (
                    <span>Cancelled</span>
                  ) : (
                    ''
                  )}
                </td>
                {item.docstatus === 0 && (
                  <>
                    <td
                      className={` button-section-td border-0  ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center gx-0">
                        <div className="col-lg-3">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info "
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="col-lg-3">
                          <a
                            onClick={() => HandleDeleteReceipt(item.name)}
                            className={`button-section-text text-danger ${styles.cursor_pointer}`}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </>
                )}
                {item.docstatus === 1 && (
                  <>
                    <td
                      className={` button-section-td border-0  ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center gx-0">
                        <div className="col-lg-3">
                          <a
                            // href="#"
                            className="button-section-text text-info "
                          >
                            print
                          </a>
                        </div>
                        <div className="col-lg-3">
                          <a
                            // href="#"
                            onClick={() => HandleCancelReceipt(item.name)}
                            className={`button-section-text text-danger ${styles.cursor_pointer}`}
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    </td>
                  </>
                )}
                {item.docstatus === 2 && (
                  <>
                    <td
                      className={` button-section-td border-0  ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center gx-0">
                        <div className="col-lg-3">
                          <Link
                            href=""
                            className="button-section-text text-info "
                          >
                            Amend
                          </Link>
                        </div>
                        <div className="col-lg-3">
                          <Link
                            href=""
                            // onClick={() => HandleDeleteChitti(data.name)}
                            className={`button-section-text text-danger ${styles.cursor_pointer}`}
                          >
                            Delete
                          </Link>
                        </div>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default KundanListing;
