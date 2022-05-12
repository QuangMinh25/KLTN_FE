import React, { lazy, memo } from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom";

const Home = lazy(() => import('../views/Home'));
const ThongTinGiaoDich = lazy(() => import('../views/ThongTinGiaoDich'));
const Trave = lazy(() => import('../views/Trave'));
const Header = lazy(() => import('../components/Header'));
const KiemTraVe = lazy(() => import('../views/KiemTraVe'))
const KhuyenMai = lazy(() => import('../views/KhuyenMai'))
const QuyDinhMuaVe = lazy(() => import('../views/QuyDinhMuaVe'))
const HuongDan = lazy(() => import('../views/HuongDan'))
const LienHe = lazy(() => import('../views/LienHe'))
const Search = lazy(() => import('../views/Search'))
const ThanhToan = lazy(() => import('../views/ThanhToan'))


const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <Header>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/timve" component={Home} />
                        <Route exact path='/timkiem' component={Search} />
                        <Route exact path="/thongtingiaodich" component={ThongTinGiaoDich} />
                        <Route exact path="/trave" component={Trave} />
                        <Route exact path="/kiemtrave" component={KiemTraVe} />
                        <Route exact path="/khuyenmai" component={KhuyenMai} />
                        <Route exact path="/quydinhmuave" component={QuyDinhMuaVe} />
                        <Route exact path="/huongdan" component={HuongDan} />
                        <Route exact path="/lienhe" component={LienHe} />
                        <Route exact path='/thanhtoan' component={ThanhToan} />
                    </Switch>
                </Header>
            </BrowserRouter>
        </>
    )
}

export default memo(Routers)