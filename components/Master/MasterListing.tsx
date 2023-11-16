import Link from 'next/link';
import styles from '../../styles/header.module.css';
const MasterListing :any= ({value}:any) => {

  return (
    <div >
      <div className="container-lg ">
      
        <div className={`${styles.button_container}`}>
          <Link href="/master/karigar"
          className="text-decoration-none btn-margin" >
            <button
              className={`${styles.button} ${value==='karigar' ? 'activeColor':''}`}
            >
              Karigar
              <i className='fa-solid fa-arrow-turn-down mx-2 pt-1'></i>
            </button> 
          </Link>
          <Link
            href="/master/kundanKarigar"
          >
            <button
              className={`${styles.button} ${value==='kundanKarigar' ? 'activeColor':''}`}
            >
              Kundan Karigar
              <i className='fa-solid fa-arrow-turn-down mx-2 pt-1'></i>
            </button>
          </Link>
          <Link href="/master/material">
            <button
              className={`${styles.button} ${value === 'material' ? 'activeColor':''}`}
            >
              Material
              <i className='fa-solid fa-arrow-turn-down mx-2 pt-1'></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MasterListing;
