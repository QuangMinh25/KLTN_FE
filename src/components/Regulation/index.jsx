import React from "react";

export default function Regulation() {
    return (
        <>
            
            <div className="et-col-md-12 hidden-print" style={{ marginTop: '15px', display: 'block' }}>
                    <div className="panel panel-warning" style={{ marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px' }}>
                        <div className="panel-heading">
                            <h3 className="panel-title">Quy định đổi, trả vé từ ngày 01/3 đến ngày 27/4 và từ ngày 4/5 đến 31/5/2022</h3>
                        </div>
                        <div className="panel-body">
                            <p>1. Thời gian, mức phí đổi trả vé:</p>
                            <p>- Đổi vé: Vé cá nhân đổi trước giờ tàu chạy 24 giờ trở lên, lệ phí là 20.000 đồng/vé; không áp dụng đổi vé đối với vé tập thể.</p>
                            <p>- Trả vé:</p>
                            <p>&nbsp; &nbsp; + Vé cá nhân: Trả vé trước giờ tàu chạy từ 4 giờ đến dưới 24 giờ, lệ phí là 20% giá vé; từ 24 giờ trở lên lệ phí là 10% giá vé.</p>
                            <p>&nbsp; &nbsp; + Vé tập thể: Trả vé trước giờ tàu chạy từ 24 giờ đến dưới 72 giờ, lệ phí là 20% giá vé; từ 72 giờ trở lên lệ phí là 10% giá vé.</p>
                            <p>2. Hình thức trả vé.</p>
                            <p>
                                - Khi hành khách mua vé và thanh toán online qua website bán vé của Ngành Đường sắt, app bán vé hoặc các ứng dụng mua vé tàu hỏa của các đối tác thứ ba thì có thể trả vé online qua các website bán vé của Ngành Đường
                                sắt hoặc đến trực tiếp nhà ga.
                            </p>
                            <p>
                                - Khi hành khách mua vé bằng các hình thức khác, muốn đổi vé, trả vé hành khách đến trực tiếp nhà ga kèm theo giấy tờ tùy thân bản chính của người đi tàu (hoặc người mua vé) cho nhân viên đường sắt. Đồng thời, thông
                                tin trên thẻ đi tàu phải trùng khớp với giấy tờ tùy thân của hành khách.
                            </p>
                            <i>Trân trọng cảm ơn!.</i>
                        </div>
                    </div>
                </div>
                <div className="text-center clear" style={{ paddingTop: '30px' }}>
                    <p>Tải ứng dụng</p>
                    <a href="https://itunes.apple.com/app/id1515139705" target="_blank"><img src="/images/appstore.png" width={134} alt="" /></a>
                    <a href="https://play.google.com/store/apps/details?id=com.tls.dsvn.muave2" target="_blank"><img src="/images/playstore.png" width={134} alt="" /></a>
                    <p />
                    {/* <a href="https://data.vnticketonline.vn/B608791DF2FD4267AD2322EFD20A026A/com.tls.dsvn.muave.apk" target="_blank"><img src="/images/androidapk.png" width="134" alt=""></a></p> */}
                </div>
                <div className="et-col-md-12 et-footer hidden-print ng-scope" ng-controller="app.controllers.layout.footer">
                    <div className="et-footer-menu text-center" style={{ height: '50px' }}>
                        <div>
                            <a href="/#/" ng-bind-html="'Menu_search'|translate" className="ng-binding">Tìm vé</a>&nbsp;|&nbsp;
                            {/*<a href="/#/trave" ng-bind-html="'Menu_returnTicket'|translate">Trả vé</a>&nbsp;|&nbsp;*/}
                            <a href="/#/thongtingiaodich" ng-bind-html="'Menu_searchBookingInfo'|translate" className="ng-binding">Thông tin đặt chỗ</a>&nbsp;|&nbsp;
                            <a href="http://k.vnticketonline.vn/#/thongtinhanhtrinh/gadi" target="_blank" ng-bind-html="'Menu_trainTimeTable'|translate" className="ng-binding">Giờ tàu - Giá vé</a>&nbsp;|&nbsp;
                            <a href="/#/huongdan" ng-bind-html="'Menu_guide'|translate" className="ng-binding">Hướng dẫn</a>&nbsp;|&nbsp;
                            <a href="/#/lienhe" ng-bind-html="'Menu_contact'|translate" className="ng-binding">Liên hệ</a>
                        </div>
                        <div>
                            <a href="/#/pages/dieukienvadieukhoan" ng-bind-html="'Menu2_dieuKienDieuKhoan'|translate" className="ng-binding">Chính sách mua hàng</a>&nbsp;|&nbsp;
                            <a href="/#/pages/phuongthucthanhtoan" ng-bind-html="'Menu2_phuongThucThanhToan'|translate" className="ng-binding">Chính sách thanh toán</a>&nbsp;|&nbsp;
                            <a href="/#/pages/chinhsachhoantra" ng-bind-html="'Menu2_chinhSachHoanTraVe'|translate" className="ng-binding">Chính sách hoàn trả</a>&nbsp;|&nbsp;
                            <a href="/#/pages/chinhsachbaomat" ng-bind-html="'Menu2_chinhSachBaoMat'|translate" className="ng-binding">Chính sách bảo mật thông tin</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="et-col-md-12 et-footer-logo">
                            <div className="et-col-md-12 text-center" style={{ fontSize: '16px', color: '#636363', fontFamily: '"Verdana, Geneva, Tahoma, sans-serif"' }}>
                                <div ng-bind-html="'Footer_line1'|translate" className="ng-binding">Tổng công ty Đường sắt Việt Nam. Số 118 đường Lê Duẩn, Phường Cửa Nam, Quận Hoàn Kiếm, Thành phố Hà Nội, Việt Nam.</div>
                                <div ng-bind-html="'Footer_line2'|translate" className="ng-binding">Điện thoại: (84-24) 39425972. Fax: (84-24) 39422866. Email: dsvn@vr.com.vn.</div>
                                <div ng-bind-html="'Footer_line3'|translate" style={{ color: '#af3f3f' }} className="ng-binding">Giấy chứng nhận ĐKKD số 113642 theo QĐ thành lập số 973/QĐ-TTg ngày 25/06/2010 của Thủ tướng Chính phủ.</div>
                                <div ng-bind-html="'Footer_line4'|translate" style={{ color: '#af3f3f' }} className="ng-binding">
                                    Mã số doanh nghiệp: 0100105052, đăng ký lần đầu ngày 26/07/2010, đăng ký thay đổi lần 4 ngày 27/06/2014 tại Sở KHĐT Thành phố Hà Nội.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center" style={{ fontSize: '10px', color: '#999' }}>
                            <img src="/images/fptlogo.png" width={28} height={17} />
                            Copyright by FPT Technology Solutions
                        </div>
                        <div className="col-md-12 text-center" style={{ fontSize: '10px', color: '#999' }}>
                            <a href="http://online.gov.vn/Home/WebDetails/69864">
                                {/*<img alt="" title="" src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png" width="150" height="55">*/}
                                <img alt="" title src="/images/logoSaleNoti.png" width={150} height={55} />
                            </a>
                        </div>
                    </div>
                </div>
        </>
    )
}