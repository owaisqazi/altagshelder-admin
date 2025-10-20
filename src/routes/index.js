import { lazy } from "react";
import PDF from "../components/PDF/PDF";
import Deposit from "../pages/Deposit";
import AddDeposit from "../pages/AddDeposit";
import AllotherPdfsview from "../pages/AllotherPdfsview";
import AllTypespdfs from "../pages/AlltypesPdfView";

const dashboard = lazy(() => import("../pages/Dashboard/index"));
const Users = lazy(() => import("../pages/User/index"));
const Updateuser = lazy(() => import("../pages/User/updateUser"));
const Products = lazy(() => import("../pages/products"));
const PDFProducts = lazy(() => import("../pages/PDFproducts"));
const AllPdf = lazy(() => import("../pages/Allpdfs"));
const AllInovices = lazy(() => import("../pages/AllInovices"));
const AllotherPdfs = lazy(() => import("../pages/AllotherPdfs"));

const coreRoutes = [
  {
    path: "/",
    title: "Dashboard",
    component: dashboard,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    component: dashboard,
  },
  {
    path: "/users",
    title: "Users",
    component: Users,
  },
  {
    path: "/updateUser/:id",
    title: "Users Profile",
    component: Updateuser,
  },
  {
    path: "/products",
    title: "Products",
    component: Products,
  },
  {
    path: "/deposit",
    title: "Deposit",
    component: Deposit,
  },
  {
    path: "/add_deposit",
    title: "AddDeposit",
    component: AddDeposit,
  },
  {
    path: "/pdf/products/:user_id/:pdf_id",
    title: "Products",
    component: PDFProducts,
  },
  {
    path: "/add/user/pdf/:id",
    title: "PDF",
    component: PDF,
  },
  {
    path: "/view/all/pdf",
    title: "ALLPDF",
    component: AllPdf,
  },
  {
    path: "/view/all/inovices",
    title: "AllInovices",
    component: AllInovices,
  },
  {
    path: "/all/pdf/:pdf_type",
    title: "AllotherPdfs",
    component: AllotherPdfs,
  },
  {
    path: "/allTypespdfs/:id",
    title: "AllotherPdfs",
    component: AllTypespdfs,
  },
  {
    path: "/AllotherPdfsview",
    title: "AllotherPdfsview",
    component: AllotherPdfsview,
  },
];

const routes = [...coreRoutes];
export default routes;
