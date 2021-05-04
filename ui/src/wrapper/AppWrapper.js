import { useState, useEffect } from 'react'
import { CasesVPositive } from '../charts/CasesVPositive'
import { DeathChart } from '../charts/Death'
import { getRequest } from '../utils/http'

export const AppWraapper = () => {

    const [data, setData] = useState([])
    const dataUrl = process.env.REACT_APP_API;

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