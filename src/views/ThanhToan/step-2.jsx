import { useHookTrainStation } from "../../state/trainStation";
import useTicket from "../../hooks/useTicket";
import { useEffect } from "react";

export default function ThanhToan_step2({ setStep }) {
    const [state, actions] = useHookTrainStation()
    const { postTicket } = useTicket()

    useEffect(() => {
        // console.log('=================<ok>', state.ticketSelected);
        // console.log('=================<ok>', state.payment);
    }, [state])

    const postData = async () => {
        if (state?.payment === 1) {
            setStep(3)
        } else {
            if (state && state.ticketSelected) {
                await state?.ticketSelected.map(item => {
                    item.map(i => {
                        postTicket(i)
                    })
                })
                setStep(4)
            }
        }
    }

    return (
        <>

            <div className="col-md-12" style={{ padding: 0 }}>
                <h2 style={{ marginTop: '0px', color: '#555555' }} className="ng-binding">Xác nhận thông tin đặt mua vé tàu</h2>
                <h4 style={{ color: '#dd5600', marginTop: '20px', fontWeight: 600 }} className="ng-binding">Thông tin người mua vé</h4>
                {
                    state?.ticketSelected?.map((item, idx) => (
                        <>
                            <div className="row" style={{ borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div><span className="ng-binding">&nbsp;&nbsp;-  Họ và tên:</span> <span className="text-info-ticket ng-binding">{item[0].info_customer}</span></div>
                                    <div><span className="ng-binding">&nbsp;&nbsp;-  Số CMND/Hộ chiếu:</span><span className="text-info-ticket ng-binding">{item[0].id_card}</span></div>
                                    <div><span className="ng-binding">&nbsp;&nbsp;-  Số di động:</span> <span className="text-info-ticket ng-binding" >{item[0].phone}</span></div>
                                    <div><span className="ng-binding">&nbsp;&nbsp;-  Email:</span> <span className="text-info-ticket ng-binding" >{item[0].email}</span></div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div><span className="ng-binding">&nbsp;&nbsp;-  Mã hội viên:</span> <span className="text-info-ticket ng-binding" /></div>
                                    <div><span className="ng-binding">&nbsp;&nbsp;-  Đơn vị xuất hóa đơn:</span><span className="text-info-ticket ng-binding" /></div>
                                    <div><span className="ng-binding">&nbsp;&nbsp;-  Mã số thuế:</span> <span className="text-info-ticket ng-binding" /></div>
                                    <div><span className="ng-binding">&nbsp;&nbsp;-  Địa chỉ:</span><span className="text-info-ticket ng-binding" /></div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <span className="ng-binding">&nbsp;&nbsp;-  Phương thức thanh toán:</span> {/* ngRepeat: item in listCongTT */}<span className="text-info-ticket ng-binding ng-scope ng-hide">Thanh toán trực tuyến (NganLuong)</span>{/* end ngRepeat: item in listCongTT */}<span className="text-info-ticket ng-binding ng-scope ng-hide" ng-show="congThanhToan==item.MaCongTT" ng-repeat="item in listCongTT">Thanh toán trực tuyến (Napas)</span>{/* end ngRepeat: item in listCongTT */}<span className="text-info-ticket ng-binding ng-scope ng-hide" ng-show="congThanhToan==item.MaCongTT" ng-repeat="item in listCongTT">Thanh toán trực tuyến (VNPAY)</span>{/* end ngRepeat: item in listCongTT */}<span className="text-info-ticket ng-binding ng-scope ng-hide" ng-show="congThanhToan==item.MaCongTT" ng-repeat="item in listCongTT">Thanh toán trực tuyến (PAYOO)</span>{/* end ngRepeat: item in listCongTT */}<span className="text-info-ticket ng-binding ng-scope" ng-show="congThanhToan==item.MaCongTT" ng-repeat="item in listCongTT">{state?.payment === 1 ? 'Paypal' : 'Trả sau'}</span>{/* end ngRepeat: item in listCongTT */}
                                </div>
                            </div>
                            <h4 style={{ color: '#dd5600', marginTop: '20px', fontWeight: 600 }} className="ng-binding">Thông tin vé mua</h4>
                            {/* ngInclude: 'app/payment/ticketCart.confirm.desktop.html' */}
                            <div ng-include="'app/payment/ticketCart.confirm.desktop.html'" className="ng-scope">
                                <div className="table table-responsive list-ticket-deskhop ng-scope">
                                    <table className="table table-bordered tbl-border-black" ng-show="!isHasDichVu">
                                        <tbody>
                                            <tr>
                                                <th className="ng-binding">
                                                    STT{/*STT*/}
                                                </th>
                                                <th className="ng-binding">
                                                    Thông tin vé mua{/*Thông tin vé mua*/}
                                                </th>
                                                <th className="ng-binding">
                                                    Giá (VNĐ){/*Giá (VNĐ)*/}
                                                </th>
                                                <th className="ng-binding">
                                                    Thành tiền (VNĐ){/*Thành tiền (VNĐ)*/}
                                                </th>
                                            </tr>
                                        </tbody>
                                        <tbody ng-show="ves.khuHoi.length > 0" className="ng-hide">
                                            <tr className ng-show="ves.chieuDi.length > 0 || ves.chieuVe.length > 0">
                                                <td colSpan={5}>
                                                    <label className="ng-binding">
                                                        Khứ hồi{/*Khứ hồi*/}
                                                    </label>
                                                </td>
                                            </tr>
                                            {/* ngRepeat: ve in ves.khuHoi */}
                                        </tbody>
                                        <tbody ng-show="ves.chieuDi.length > 0" className>
                                            <tr className="ng-hide" ng-show="ves.khuHoi.length > 0 || ves.chieuVe.length > 0">
                                                <td colSpan={5}>
                                                    <label className="ng-binding">
                                                        Chiều đi{/*Chiều đi*/}
                                                    </label>
                                                </td>
                                            </tr>
                                            {/* ngRepeat: ve in ves.chieuDi */}
                                            <tr ng-repeat="ve in ves.chieuDi" className="ng-scope">
                                                <td className="et-table-cell text-center">
                                                    <div className="ng-binding">1</div>
                                                </td>
                                                <td className="et-table-cell">
                                                    <div className="row">
                                                        <div className="col-md-4 ng-binding" style={{ width: '40%', paddingRight: 0 }}>
                                                            <span className="ng-binding">
                                                                Họ tên{/*Họ tên*/}: { item[0].info_customer }
                                                            </span>
                                                        </div>
                                                        <div className="col-md-4 ng-binding" style={{ width: '28%', paddingRight: 0 }}>
                                                            <span className="ng-binding">
                                                                Đối tượng{/*Đối tượng*/}: 
                                                            </span>
                                                            &nbsp;
                                                            { item[0].subject_title }
                                                        </div>
                                                        <div className="col-md-4" style={{ width: '32%', paddingRight: 0 }}>
                                                            <div ng-hide="ve.hanhKhach.loaiKhach && (ve.hanhKhach.loaiKhach.MaPT == 2 || ve.hanhKhach.loaiKhach.MaPT == 99)" className="ng-binding">
                                                                <span className="ng-binding">
                                                                    Số giấy tờ:{/*Số giấy tờ:*/}
                                                                </span>
                                                                &nbsp;
                                                                { item[0].id_card }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ng-binding">
                                                        <span className="ng-binding">
                                                            Hành trình:{/*Hành trình:*/}&nbsp;
                                                        </span>
                                                        { item[0].train_code } {item[0].train_station_title}-{item[item.length - 1].train_station_to_title}
                                                        &nbsp;{`${new Date(item[0].departure_date).getDate() < 10 ? ('0' + new Date(item[0].departure_date).getDate()) : new Date(item[0].departure_date).getDate()}/${(new Date(item[0].departure_date).getMonth() + 1) < 10 ? ('0' + (new Date(item[0].departure_date).getMonth() + 1)) : new Date(item[0].departure_date).getMonth() + 1} ${new Date(item[0].departure_date).getHours() < 10 ? ('0' + new Date(item[0].departure_date).getHours()) : new Date(item[0].departure_date).getHours()}:${new Date(item[0].departure_date).getMinutes() < 10 ? ('0' + new Date(item[0].departure_date).getMinutes()) : new Date(item[0].departure_date).getMinutes()}`}
                                                        <br />
                                                        {/*Toa {{ve.carNo}} chỗ {{ve.seat.ChoSo}} {{ve.seat.detail.name}}*/}
                                                        Toa 1 chỗ 26 Ngồi mềm điều hòa
                                                    </div>
                                                </td>
                                                <td className="et-table-cell text-right ng-binding">
                                                    {
                                                        (Number(581000)).toLocaleString()
                                                    }
                                                </td>
                                                <td className="et-table-cell text-right ng-binding">
                                                    {
                                                        (Number(581000) * item.length).toLocaleString()
                                                    }
                                                </td>
                                            </tr>
                                            {/* end ngRepeat: ve in ves.chieuDi */}
                                        </tbody>
                                        <tbody ng-show="ves.chieuVe.length > 0" className="ng-hide">
                                            <tr className ng-show="ves.khuHoi.length > 0 || ves.chieuDi.length > 0">
                                                <td colSpan={5}>
                                                    <label className="ng-binding">
                                                        Chiều về{/*Chiều về*/}
                                                    </label>
                                                    &nbsp;
                                                </td>
                                            </tr>
                                            {/* ngRepeat: ve in ves.chieuVe */}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={3}>
                                                    <span className="pull-right">
                                                        <strong className="ng-binding">
                                                            Tổng tiền{/*Tổng tiền*/}
                                                        </strong>
                                                    </span>
                                                </td>
                                                <td colSpan={2} className="text-right">
                                                    <strong className="ng-binding">582,000</strong>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </>
                    ))
                }
                <p ng-bind-html="'PBuyTicket_dienGiaiXacNhanDatVe'|translate" className="ng-binding">
                </p><p>Quý khách vui lòng kiểm tra kỹ và xác nhận các thông tin đã nhập trước khi thực hiện giao dịch mua vé.
                    Sau khi thực hiện giao dịch thanh toán ở trang tiếp theo quý khách sẽ không thể thay đổi được thông tin mua vé trên.</p>
                <p />
                <div className="col-md-12">
                    <a onClick={() => postData()} id="btnSaveBookInfo" className="pull-right et-btn-rec ng-binding" >{state.payment === 1 ? 'Thanh toán' : 'Đặt vé'}&gt;&gt;</a>
                    <a className="pull-left et-btn-rec ng-binding" onClick={() => setStep(1)}>&lt;&lt; Nhập lại</a>
                </div>
            </div>
        </>
    )
}