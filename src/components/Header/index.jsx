import React from "react";

export default function Header({ children }) {
    return (
        <>

            <div ng-app="app" className="super-container ng-scope">
                <div id="menu-fixed">
                    <div className="visible-print">
                        <h3 style={{ borderBottom: 'solid 1px #ccc', paddingBottom: '6px', marginBottom: '-20px' }}>Tổng công ty Đường sắt Việt Nam</h3>
                    </div>
                    <div className="et-banner hidden-print">
                        <div className="container et-banner" style={{ maxWidth: '1024px' }}>
                            <div className="pull-left banner-logo">
                                <div className="pull-left banner-logo"><img src="/images/LOGO_n.png" /></div>
                                <div className="pull-left" id="bannerDate">Thứ sáu, 22/04/2022</div>
                            </div>
                            <div className="pull-right banner-language">
                                <div className="text-right" ng-show="!bannerTet">
                                    {/*<a href="javascript:;" translation-lang="en"><img src="/images/en-icon.png" width="20" height="20" /></a>
                     <a href="javascript:;" translation-lang="vi"><img src="/images/vn-icon.gif" width="20" height="16" /></a>*/}
                                </div>
                                <div className="text-right banner-logo-2" style={{ paddingTop: '20px' }}><img src="/images/fpt-logo2.png" width={75} height={48} /></div>
                                <div className="text-right ticket-cart-number" style={{ paddingTop: '6px', display: 'none' }}>
                                    <div et-ticket-cart-number className="ng-isolate-scope">
                                        <div className="visible-xs">
                                            <a analytics-on="click" analytics-event="Checkout" href ng-click="pocketDetail($event)" id="btnCheckOut" target="_blank" className="btn">
                                                <span className="cart-item ng-binding">0</span>
                                                <img src="../../images/Shopping-Cart-03.png" style={{ fontSize: '20px', zIndex: 1, width: '25px' }} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ngInclude: 'app/tet/tet.html' */}
                <div className="container et-main-content ng-scope ng-hide" ng-show="bannerTet" ng-include="'app/tet/tet.html'">
                    <div className="shuffle-animation col-md-12 ng-scope">
                        <h3 className="text-center" style={{ margin: '20px', fontSize: '32px', color: '#d64e00', fontFamily: '"Times New Roman"' }} id="tet-text">
                            Đường sắt Việt Nam sẽ chính thức mở bán vé tàu Tết Đinh Dậu 2017<br />
                            vào lúc 08:00 ngày 1 tháng 10 năm 2017
                        </h3>
                        <h3 className="text-center" style={{ margin: '20px', fontSize: '18px', color: '#0C4DA2' }} id="tet-remain">Hệ thống sẽ mở bán trong:</h3>
                        <div style={{ paddingLeft: '226px' }}>
                            <div id="tet-clockdiv">
                                <div>
                                    <span className="tet-days">00</span>
                                    <div className="tet-smalltext">Ngày</div>
                                </div>
                                <div>
                                    <span className="tet-hours">00</span>
                                    <div className="tet-smalltext">Giờ</div>
                                </div>
                                <div>
                                    <span className="tet-minutes">00</span>
                                    <div className="tet-smalltext">Phút</div>
                                </div>
                                <div>
                                    <span className="tet-seconds">00</span>
                                    <div className="tet-smalltext">Giây</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center" style={{ padding: '8px' }}>
                            {/*<img src="/images/banner-tet-2018.jpg" alt="banner-tet-2017.jpg" width="510" />*/}
                        </div>
                    </div>
                    <div className="et-col-md-12 et-footer hidden-print ng-scope">
                        <div className="row et-footer-logo-group">
                            <div className="et-col-md-12 et-footer-logo">
                                <div className="et-col-md-12 text-center" style={{ fontSize: '10px', color: '#999' }}>
                                    Tổng công ty Đường  sắt Việt Nam. Số 118 Lê Duẩn, Hoàn Kiếm, Hà Nội. Điện thoại: 19006469. Email: dsvn@vr.com.vn
                                    <br />
                                    Giấy chứng nhận ĐKKD số 113642 theo QĐ thành lập số 973/QĐ-TTg ngày 25/06/2010 của Thủ tướng Chính phủ.
                                    <br />
                                    Mã số doanh nghiệp: 0100105052, đăng ký lần đầu ngày 26/07/2010, đăng ký thay đổi lần 4 ngày 27/06/2014 tại Sở KHĐT Thành phố Hà Nội.
                                </div>
                            </div>
                            <div className="et-col-md-12 text-center" style={{ fontSize: '10px', color: '#999' }}>
                                <img src="/images/fptlogo.png" width={28} height={17} />
                                Copyright by FPT Technology Solutions
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-default bg-primary ng-scope" role="navigation" ng-controller="app.controllers.layout.layout" ng-show="!bannerTet" style={{ marginTop: '10PX' }}>
                    <div className="container-fluid">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-ex1-collapse" aria-expanded="false" id="buton-menu">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            {/*<a class="navbar-brand" href="/">
               <span class="glyphicon glyphicon-home"></span>
               </a>*/}
                        </div>
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse navbar-ex1-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav" id="nav">
                                {/*<ul class="nav navbar-nav" ng-if="showMenu()" ng-show="showMenu()">*/}
                                {/* ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-image-menu" href="/">
                                        {/* ngIf: route.config.menuImage != undefined */}<span className="glyphicon glyphicon-home ng-scope" ng-if="route.config.menuImage != undefined" />{/* end ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/timve" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-text-menu" href="/timve">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">TÌM VÉ</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/thongtingiaodich" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-text-menu" href="/thongtingiaodich">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">THÔNG TIN ĐẶT CHỖ</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/trave" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-text-menu" href="/trave">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">TRẢ VÉ</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/kiemtrave" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-text-menu" href="/kiemtrave">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">KIỂM TRA VÉ</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a ng-href="http://k.vnticketonline.vn//thongtinhanhtrinh/gadi" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target="_blank_" className="nav-menu et-text-menu" href="http://k.vnticketonline.vn//thongtinhanhtrinh/gadi">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">GIỜ TÀU - GIÁ VÉ</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/khuyenmai" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-text-menu" href="/khuyenmai">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">KHUYẾN MẠI</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/quydinhmuave" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-text-menu" href="/quydinhmuave">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">CÁC QUY ĐỊNH</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/huongdan" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-text-menu" href="/huongdan">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">HƯỚNG DẪN</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                <li ng-repeat="route in routes | filter:true:route.config.showInMenu" ng-click="changeMenuItem(route.config)" className="ng-scope">
                                    <a to="/lienhe" ng-class="{'et-text-menu': !route.config.menuImage, 'et-image-menu': route.config.menuImage}" target className="nav-menu et-text-menu" href="/lienhe">
                                        {/* ngIf: route.config.menuImage != undefined */}
                                        {/* ngIf: route.config.menuImage == undefined */}<span ng-if="route.config.menuImage == undefined" className="ng-binding ng-scope">LIÊN HỆ</span>{/* end ngIf: route.config.menuImage == undefined */}
                                    </a>
                                </li>
                                {/* end ngRepeat: route in routes | filter:true:route.config.showInMenu */}
                                {/*<li id="language"><a href='javascript:;' translation-lang='en'>ENGLISH &nbsp;<img src='/images/en-icon.png' width='20' height='20' /></a>
                  </li>*/}
                                <li>
                                    <a href="javascript:;" style={{ padding: '4px 9px !important', display: 'none' }} className="nav-menu et-text-menu" translation-lang="vi" ng-style="{'display': language=='vi'?'none':'block'}">TIẾNG VIỆT &nbsp;<img src="/images/vn-icon.gif" width={20} height={16} /></a>
                                    <a href="javascript:;" style={{ padding: '4px 9px !important', display: 'block' }} className="nav-menu et-text-menu" translation-lang="en" ng-style="{'display': language=='en'?'none':'block'}">ENGLISH &nbsp;<img src="/images/en-icon.png" width={20} height={20} /></a>
                                </li>
                            </ul>
                        </div>
                        {/* /.navbar-collapse */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {
                    children
                }
            </div>
        </>
    )
}