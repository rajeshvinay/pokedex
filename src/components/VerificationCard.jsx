import { useState } from "react"
import QRCode from "react-qr-code"

export default function VerificationCard({data}){
    // data may have dynamic values, fallback to sample data
    const trustScore = data?.trustScore ?? 92
    const monthly = data?.monthly ?? '4,500'
    const total = data?.total ?? '32,560'
    const lastVerified = data?.lastVerified ?? 'October 2025'
    const [showQR,setShowQR] = useState(false)
    let [timer,setTimer] = useState(30)

    const displayQRDetails = () =>{
        setShowQR(true);
        let timeDown = setInterval(()=>{
            setTimer((timer)=>{
                if(timer <= 0) clearTimer()
                return timer = timer-1        
            });
        },1000)

        const clearTimer = () => {
            clearInterval(timeDown)
            setShowQR(false)
            setTimer(30)
        }
    }
    return (
        <div className="verification-card">
            <div className="verification-left">
                <div className="verification-header">
                    <div className="badge">✔</div>
                    <h4>This website has been independently verified for trust and legitimacy by InVerify</h4>
                </div>

                <div className="verification-section">
                    <h6>Trust Score</h6>
                    <div className="score-row">
                        <div className="score-bars">
                             <span>[</span>
                            {Array.from({length:10}).map((_,i)=>{
                                const active = i < Math.round(trustScore/10)
                                return (
                                    <div key={i} className={`score-bar ${active? 'active':''}`}></div>
                                )
                            })}
                             <span>]</span>
                        </div>
                        <div className="score-text">{trustScore} / 100</div>
                    </div>
                </div>

                <ul className="verification-checklist">
                    <li>Registered Indian entity</li>
                    <li>Valid .in domain</li>
                    <li>Payment Gateways Verified</li>
                    <li>No scam reports</li>
                </ul>

                <div className="verification-stats">
                    <div>Monthly Visitors: <strong>{monthly}</strong></div>
                    <div>Total Visitors Since Launch: <strong>{total}</strong></div>
                </div>

                {/* <div className="verification-socials">
                    <div className="social-icon">in</div>
                    <div className="social-icon">f</div>
                    <div className="social-icon muted">ig</div>
                    <div className="social-icon">yt</div>
                </div> */}

                <div className="verification-verified">Last verified on {lastVerified}</div>

                <div className="verification-cta">
                    <button className="button-primary" onClick={displayQRDetails} disabled={showQR}>View Full Verification Report</button>
                </div>
            </div>

            <div className="verification-right" title="Use this space to inform customers about new updates, share hiring info, or highlight critical notices.">
                {!showQR ? 
                    <>
                    <div className="verification-right-inner">
                    <img className="default-img" src={'/pokemon/001.png'}></img>
                    <p><a>Click here</a> to purchase the above Pokemon</p>
                </div>
                <div>
                    <p style={{fontSize:'12px',display:'none'}}>Use this space to inform customers about new updates, share hiring info, or highlight critical notices.</p>
                </div>
                </>
                 :
                 <div>
                 <p style={{marginBottom:'25px',textAlign:'center',width:'100%'}}>The below section gets auto closed in {timer}.</p>
                 <p style={{textAlign:'center',width:'100%',marginBottom:'25px'}}>
                <p style={{marginBottom:'10px'}}>Scan the below QR Code to see the report in <a>InVerify</a> page. </p>
                <QRCode
                size={150}
                style={{ height: "auto", maxWidth: "100%"}}
                value='{value}'
                viewBox={`0 0 256 256`}
                />
                </p>
                <p style={{width:'100%',textAlign:'center'}}>or <a>Click here</a> to see the report in <a>InVerify</a> page.</p>
                </div>
                }
            </div>
        </div>
    )
}