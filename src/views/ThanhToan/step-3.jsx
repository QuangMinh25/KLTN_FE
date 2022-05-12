import React, { useEffect, useState } from "react";
import { useHookTrainStation } from "../../state/trainStation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useTicket from "../../hooks/useTicket";

import { initialOptions } from "../../contants";

export default function Step3({ setStep }) {

    const [state, actions] = useHookTrainStation()
    const { postTicket } = useTicket()
    const [value, setValue] = useState(0)

    const ConvertCurrency = async () => {
        let newVal = 0
        state?.ticketSelected?.map((item) => {
            item.map(i => {
                newVal = (Number(newVal) + Number(i.total))
            })
        })
        setValue(newVal)
    }

    useEffect(() => {
        ConvertCurrency()
    }, [state])

    return (
        <>
            <div className="col-md-12" style={{ padding: 0 }}>
                <h2 style={{ marginTop: '0px', color: '#555555' }} className="ng-binding">Thanh toán</h2>
                <p ng-bind-html="'PBuyTicket_dienGiaiXacNhanDatVe'|translate" className="ng-binding">
                </p><p>Quý khách vui lòng kiểm tra kỹ và xác nhận các thông tin đã nhập trước khi thực hiện giao dịch mua vé.</p>
                <p />
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: (Number(value) / 23000).toFixed(2),
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(async (details) => {
                                await state?.ticketSelected.map(item => {
                                    item.map(i => {
                                        i.payments = 1
                                        postTicket(i)
                                    })
                                })
                                setStep(4)
                            });
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </>
    )
}