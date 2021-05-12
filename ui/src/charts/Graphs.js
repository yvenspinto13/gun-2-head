import { useState, useEffect } from 'react'
import { CasesVPositive } from '../charts/CasesVPositive'
import { DeathChart } from '../charts/Death'
import { PRVRR } from '../charts/PRVRR'
import { R24VP24 } from '../charts/R24VP24'
import { getRequest } from '../utils/http'

export const Graphs = () => {

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
            <div className="pd-40">
                <PRVRR caseData={data} />
            </div>
            <div className="pd-40">
                <R24VP24 caseData={data} />
            </div>
        </div>
    )
}