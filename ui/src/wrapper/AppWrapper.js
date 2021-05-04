import { useState, useEffect } from 'react'
import { CasesVPositive } from '../charts/CasesVPositive'
import { DeathChart } from '../charts/Death'
import { getRequest } from '../utils/http'

export const AppWraapper = () => {

    const [data, setData] = useState([])
    const SERVER_ENDPOINT = `http://localhost:3001`
    let dataUrl;
    if(process.env.NODE_ENV === 'development') {
        dataUrl = `${SERVER_ENDPOINT}/data?from=04/01/2021&to=04/30/2021`
    } else {
        dataUrl = './data.json'
    }
    

    useEffect(() => {
        getRequest(dataUrl).then(res => setData(res)).catch(err => console.log(err))
    }, [dataUrl])

    return (
        <div className="pdtb-20">
            <div>
                <DeathChart deathData={data} />
            </div>
            <div className="pd-40">
                <CasesVPositive caseData={data} />
            </div>
        </div>
    )
}