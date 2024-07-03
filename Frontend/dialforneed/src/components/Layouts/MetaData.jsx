import React from 'react'
import { Helmet } from 'react-helmet';

const MetaData = ({ title}) => {
    return (

        <Helmet>
            <title>{`${title} - Dial For Need`}</title>
        </Helmet>
    )
}

export default React.memo(MetaData)