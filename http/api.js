import request from "./request";

// 登录
let Login = function(data) {
  return request({
    url: "api/login/login",
    method: "post",
    type: "no",
    data,
  });
};

/**
 * 企业认证
 * @param {*} data 
 */
let CompanyRegister = function(data) {
  return request({
    url: "api/company/register",
    method: "post",
    type: "no",
    data,
  });
}

/**
 * 获取省市区
 * 传父级id获取子项
 */
let AddressLists = function(data) {
  return request({
    url: "api/address/lists",
    method: "post",
    type: "no",
    data,
  });
}

/**
 * 发送短信
 */
let GetCode = function(data) {
  return request({
    url: "api/login/mobileCode",
    method: "post",
    type: "no",
    data,
  });
}

/**
 * 商品分类
 */
let categoryGetTree = function(data) {
  return request({
    url: "api/category/getTree",
    method: "post",
    type: "no",
    data,
  });
}

/**
 * 获取用户信息
 */
let MemberInfo = function(data) {
  return request({
    url: "api/member/info",
    method: "post",
    data,
  });
}

/**
 * 查询订单
 */
let OrderLists = function(data) {
  return request({
    url: "api/order/lists",
    method: "post",
    data,
  });
}

/**
 * 根据分类 和 商品类型 筛选商品
 */
let GoodsskuPage = function(data) {
  return request({
    url: "api/goodssku/page",
    method: "post",
    data,
  });
}

/**
 * 根据分类 和 商品类型 筛选商品
 */
let GoodsskuDetail = function(data) {
  return request({
    url: "api/goodssku/detail",
    method: "post",
    data,
  });
}

/**
 * 加入购物车
 */
let CartAdd = function(data) {
  return request({
    url: "api/cart/add",
    method: "post",
    data,
    hideLoading: true
  });
}

/**
 * 修改购物车数量
 */
let CartEdit = function(data) {
  return request({
    url: "api/cart/edit",
    method: "post",
    data,
    hideLoading: true
  });
}

/**
 * 得到购物车数量
 */
let CartCount = function(data) {
  return request({
    url: "api/cart/count",
    method: "post",
    data,
    hideLoading: true
  });
}

/**
 * 获取购物车列表
 */
let CartGoodslists = function(data) {
  return request({
    url: "api/cart/goodslists",
    method: "post",
    data,
    hideLoading: true
  });
}

/**
 * 删除购物车
 */
let CartDelete = function(data) {
  return request({
    url: "api/cart/delete",
    method: "post",
    data,
  });
}

/**
 * 订单待支付 初始化 提交订单前 调用这接口
 */
let OrdercreatePayment = function(data) {
  return request({
    url: "api/ordercreate/payment",
    method: "post",
    data,
  });
}

/**
 * 提交订单
 */
let OrdercreateCreate = function(data) {
  return request({
    url: "api/ordercreate/create",
    method: "post",
    data,
  });
}

/**
 * 提交订单
 */
let StatistaticsIndex = function(data) {
  return request({
    url: "api/Statistatics/index",
    method: "post",
    data,
  });
}

/**
 * 得到月度采购信息
 */
let StatistaticsMonthMessage = function(data) {
  return request({
    url: "api/Statistatics/monthMessage",
    method: "post",
    data,
  });
}
/**
 * 我的小队
 */
let CompanyGetPeople = function(data) {
  return request({
    url: "api/company/getPeople",
    method: "post",
    data,
  });
}

/**
 * 首页banner
 */
let SiteGetBanners = function(data) {
  return request({
    url: "api/site/getBanners",
    method: "post",
    data,
  });
}

/**
 * 修改用户头像
 */
let MemberModifyheadimg = function(data) {
  return request({
    url: "api/member/modifyheadimg",
    method: "post",
    data,
  });
}
/**
 * 得到全部职务
 */
let JobGetJobLists = function(data) {
  return request({
    url: "api/job/getJobLists",
    method: "post",
    data,
  });
}

/**
 * 获取订单数量
 */
let OrderNum = function(data) {
  return request({
    url: "api/order/num",
    method: "post",
    data,
  });
}

/**
 * 得到订单详情
 */
let OrderDetail = function(data) {
  return request({
    url: "api/order/detail",
    method: "post",
    data,
  });
}

/**
 * 驳回申请
 */
let OrderSetAuditError = function(data) {
  return request({
    url: "api/order/setAuditError",
    method: "post",
    data,
  });
}

/**
 * 通过申请
 */
let OrderSetAuditSuccess = function(data) {
  return request({
    url: "api/order/setAuditSuccess",
    method: "post",
    data,
  });
}
/**
 * 修改订单商品数量
 */
let OrdercreateEditNum = function(data) {
  return request({
    url: "api/ordercreate/editNum",
    method: "post",
    data,
  });
}

/**
 * 收藏商品
 */
let GoodscollectAdd = function(data) {
  return request({
    url: "api/goodscollect/add",
    method: "post",
    data,
  });
}
/**
 * 取消收藏
 */
let GoodscollectDelete = function(data) {
  return request({
    url: "api/goodscollect/delete",
    method: "post",
    data,
  });
}
/**
 * 得到全部部门
 */
let DepartmentGetDepartmentTree = function(data) {
  return request({
    url: "api/department/getDepartmentTree",
    method: "post",
    data,
  });
}

/**
 * 新增部门
 */
let CompanyAddDepartment = function(data) {
  return request({
    url: "api/company/addDepartment",
    method: "post",
    data,
  });
}

/**
 * 得到搜索关键词
 */
let GoodsHotSearchWords = function(data) {
  return request({
    url: "api/goods/hotSearchWords",
    method: "post",
    data,
  });
}
/**
 * 得到默认搜索关键词
 */
let GoodsDefaultSearchWords = function(data) {
  return request({
    url: "api/goods/defaultSearchWords",
    method: "post",
    data,
  });
}
/**
 * 得到默认搜索关键词
 */
let GoodsGetGoodsAttr = function(data) {
  return request({
    url: "api/goods/getGoodsAttr",
    method: "post",
    data,
  });
}

/**
 * 撤销订单
 */
let OrderSetAuditBack = function(data) {
  return request({
    url: "api/order/setAuditBack",
    method: "post",
    data,
  });
}

/**
 * 修改公司（设置公司--开票信息可以用这个接口 ）
 */
let CompanyEdit = function(data) {
  return request({
    url: "api/company/edit",
    method: "post",
    data,
  });
}

/**
 * 下单接口
 */
let OrdercreatePlance = function(data) {
  return request({
    url: "api/ordercreate/plance",
    method: "post",
    data,
  });
}

/**
 * 下单接口
 */
let CompanyGetinfo = function(data) {
  return request({
    url: "api/company/getinfo",
    method: "post",
    data,
  });
}

/**
 * 申请体验账号
 */
let CompanyRegisterMember = function(data) {
  return request({
    url: "api/company/registerMember",
    method: "post",
    data,
  });
}

/**
 * 代踩反馈
 */
let GoodsFankui = function(data) {
  return request({
    url: "api/goods/fankui",
    method: "post",
    data,
  });
}

/**
 * 收藏列表
 */
let GoodscollectPage = function(data) {
  return request({
    url: "api/goodscollect/page",
    method: "post",
    data,
  });
}

/**
 * 生成预支付订单
 */
let OrderPreview = function(data) {
  return request({
    url: "api/order/preview",
    method: "post",
    data,
  });
}

/**
 * 订单支付详情 （预支付订单）
 */
let OrderOrderPayDetail = function(data) {
  return request({
    url: "api/order/orderPayDetail",
    method: "post",
    data,
  });
}

/**
 * 订单支付
 */
let OrderOrderPay = function(data) {
  return request({
    url: "api/order/orderPay",
    method: "post",
    data,
  });
}

/**
 * 确定收货
 */
let OrderTakeDelivery = function(data) {
  return request({
    url: "api/order/takeDelivery",
    method: "post",
    data,
  });
}

/**
 * 批量修改购物车
 */
let CartEditNumbs = function(data) {
  return request({
    url: "api/cart/editNumbs",
    method: "post",
    data,
  });
}

/**
 * 新增职务
 */
let CompanyAddJob = function(data) {
  return request({
    url: "api/company/addJob",
    method: "post",
    data,
  });
}

/**
 * 批量修改订单数量
 */
let OrdercreateEditnums = function(data) {
  return request({
    url: "api/ordercreate/editnums",
    method: "post",
    data,
  });
}

/**
 * 获取所有退换货
 */
let OrderrefundLists = function(data) {
  return request({
    url: "api/orderrefund/lists",
    method: "post",
    data,
  });
}

/**
 * 获取所有退换货
 */
let OrderrefundRefund = function(data) {
  return request({
    url: "api/orderrefund/refund",
    method: "post",
    data,
  });
}

/**
 * 对账单
 */
let getReconciliation = function(data) {
  return request({
    url: "api/Statistatics/reconciliation",
    method: "post",
    data,
  });
}

/**
 * 采购统计
 */
let getOneStatics = function(data) {
  return request({
    url: "api/Statistatics/oneStatics",
    method: "post",
    data,
  });
}

/**
 * 修改密码
 */
let MemberModifypassword = function(data) {
  return request({
    url: "api/member/modifypassword",
    method: "post",
    data,
  });
}

/**
 * 修改密码
 */
let CompanyDelteDepartment = function(data) {
  return request({
    url: "api/company/delteDepartment",
    method: "post",
    data,
  });
}

/**
 * 获取子部门
 */
let DepartmentGetSonDepart = function(data) {
  return request({
    url: "api/department/getSonDepart",
    method: "post",
    data,
  });
}

/**
 * 是否有子部门
 */
let DepartmentWithSon = function(data) {
  return request({
    url: "api/department/withSon",
    method: "post",
    data,
  });
}

/**
 * 部门详情
 */
let DepartmentGetDetail = function(data) {
  return request({
    url: "api/department/getDetail",
    method: "post",
    data,
  });
}

/**
 * 启用 用户
 */
let MemberQiyong = function(data) {
  return request({
    url: "api/member/qiyong",
    method: "post",
    data,
  });
}

/**
 * 禁用 用户
 */
let MemberJinyong = function(data) {
  return request({
    url: "api/member/jinyong",
    method: "post",
    data,
  });
}

/**
 * 添加人员
 */
let RegisterUsername = function(data) {
  return request({
    url: "api/register/username",
    method: "post",
    data,
  });
}

/**
 * 删除职务
 */
let CompanyDeleteJob = function(data) {
  return request({
    url: "api/company/deleteJob",
    method: "post",
    data,
  });
}

/**
 * 得到指定用户详情
 */
let MemberGetInfo = function(data) {
  return request({
    url: "api/member/getInfo",
    method: "post",
    data,
  });
}

/**
 * 修改成员信息
 */
let MemberSetMember = function(data) {
  return request({
    url: "api/member/setMember",
    method: "post",
    data,
  });
}

/**
 * 撤销退款
 */
let OrderrefundDelivery = function(data) {
  return request({
    url: "api/orderrefund/delivery",
    method: "post",
    data,
  });
}

module.exports = {
  Login,
  CompanyRegister,
  AddressLists,
  GetCode,
  categoryGetTree,
  MemberInfo,
  OrderLists,
  GoodsskuPage,
  GoodsskuDetail,
  CartAdd,
  CartEdit,
  CartCount,
  CartGoodslists,
  CartDelete,
  OrdercreatePayment,
  OrdercreateCreate,
  StatistaticsIndex,
  StatistaticsMonthMessage,
  CompanyGetPeople,
  SiteGetBanners,
  MemberModifyheadimg,
  JobGetJobLists,
  OrderNum,
  OrderDetail,
  OrderSetAuditError,
  OrderSetAuditSuccess,
  OrdercreateEditNum,
  GoodscollectAdd,
  GoodscollectDelete,
  DepartmentGetDepartmentTree,
  GoodsHotSearchWords,
  GoodsDefaultSearchWords,
  GoodsGetGoodsAttr,
  OrderSetAuditBack,
  CompanyEdit,
  OrdercreatePlance,
  CompanyGetinfo,
  CompanyRegisterMember,
  GoodsFankui,
  GoodscollectPage,
  OrderPreview,
  OrderOrderPayDetail,
  OrderOrderPay,
  OrderTakeDelivery,
  CartEditNumbs,
  CompanyAddJob,
  OrdercreateEditnums,
  OrderrefundLists,
  OrderrefundRefund,
  getReconciliation,
  getOneStatics,
  MemberModifypassword,
  CompanyAddDepartment,
  CompanyDelteDepartment,
  DepartmentGetSonDepart,
  DepartmentWithSon,
  DepartmentGetDetail,
  MemberQiyong,
  MemberJinyong,
  RegisterUsername,
  CompanyDeleteJob,
  MemberGetInfo,
  MemberSetMember,
  OrderrefundDelivery
};
