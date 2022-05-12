import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHookTrainStation } from "../../state/trainStation";
import Regulation from "../../components/Regulation";
import Step1 from './step-1'
import Step2 from './step-2'
import Step3 from './step-3'
import Step4 from './step-4'

export default function ThanhToan() {

    const history = useHistory()
    const [step, setStep] = useState(1)
    const [state, actions] = useHookTrainStation()

    useState(() => {
        // console.log('=================<>ThanhToanok', state?.ticketSelected);
    }, [state])

    useState(() => {
        if (state?.ticketSelected === undefined || state?.ticketSelected.length === 0) {
            history.push('/')
        }
    }, [state, state?.ticketSelected])

    useEffect(() => {
        actions.setTrainStation(null)
    }, [])


    const compStep = {
        1: <Step1 setStep={setStep} />,
        2: <Step2 setStep={setStep} />,
        3: <Step3 setStep={setStep} />,
        4: <Step4 setStep={setStep} />
    }

    return (
        <>
            <div className="adv-left">
                <a target="_blank" href="http://www.vr.com.vn/cam-nang-di-tau/khuyen-cao-khach-hang-chu-y-khi-mua-ve-truc-tuyen.html">
                    <img src="images/dsvn1.jpg" />
                </a>
            </div>
            <div className="container et-main-content" ng-show="!bannerTet">
                <div className="marquee">
                    <div style={{ width: '100000px', marginLeft: '993.008px', animation: '15s linear 1s infinite normal none running marqueeAnimation-4778361' }} className="js-marquee-wrapper">
                        <div className="js-marquee" style={{ marginRight: '0px', float: 'left' }} />
                    </div>
                </div>
                {/* ngView:  */}
                <div data-ng-view className="shuffle-animation ng-scope" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                    <style className="ng-scope" dangerouslySetInnerHTML={{ __html: "@media (max-width: 767px) {\n            #sbzon_frame, #sbzoff_frame, #sbzstorage_frame, .sbzoff, .sbzon {\n            display: none !important;\n            }\n            }\n         " }} />
                    <div ng-controller="sts.controllers.payment.ticketcart" id="ticketCartScreen" className="ng-scope">
                        <div className="row et-step-bar list-ticket-deskhop" id="divNhapThongTin">
                            <div className="row">
                                <div className="et-col-md-3 text-center">
                                    {
                                        step === 1
                                            ? <img ng-show="!isViewConfirm" src="/images/activeStep.png" />
                                            : <img ng-show="isViewConfirm" src="/images/inActiveStep.png" />
                                    }
                                </div>
                                <div className="et-col-md-3 text-center">
                                    {
                                        step === 2
                                            ? <img ng-show="isViewConfirm" src="/images/activeStep.png" />
                                            : <img ng-show="!isViewConfirm" src="/images/inActiveStep.png" />
                                    }
                                </div>
                                <div className="et-col-md-3 text-center">
                                    {
                                        step === 3
                                            ? <img ng-show="isViewConfirm" src="/images/activeStep.png" />
                                            : <img ng-show="!isViewConfirm" src="/images/inActiveStep.png" />
                                    }
                                </div>
                                <div className="et-col-md-3 text-center">
                                    {
                                        step === 4
                                            ? <img ng-show="isViewConfirm" src="/images/activeStep.png" />
                                            : <img ng-show="!isViewConfirm" src="/images/inActiveStep.png" />
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="et-col-md-3 text-center">
                                    <span className={`ng-binding ${step === 1 ? 'text-info' : ''}`}>Nhập thông tin hành khách</span>
                                </div>
                                <div className="et-col-md-3 text-center">
                                    <span className={`ng-binding ${step === 2 ? 'text-info' : ''}`}>Xác nhận thông tin</span>
                                </div>
                                <div className="et-col-md-3 text-center">
                                    <span className={`ng-binding`}>Thanh toán</span>
                                </div>
                                <div className="et-col-md-3 text-center">
                                    <span className={`ng-binding`}>Hoàn tất</span>
                                </div>
                            </div>
                        </div>
                        {
                            compStep[step]
                        }
                    </div>
                </div>

                <Regulation />
            </div>
            <div className="adv-right">
                <a target="_blank" href="http://www.vr.com.vn/">
                    <img src="images/dsvn2.jpg" />
                </a>
            </div>
        </>
    )
}