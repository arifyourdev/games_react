import React from 'react';
import styles from "./loader.module.css"

const Loader = () => {
    return (
        <div>
            <div className={styles.loadercontainer}>
                {/* Add your loader elements here */}
                <div className={styles.loader}></div>
            </div>
        </div>
    )
}

export default Loader