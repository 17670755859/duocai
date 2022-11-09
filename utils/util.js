const getFormData = function(val){
  let date =new Date(Number(val*1000))
  let month = date.getMonth()+1<10?"0"+(date.getMonth()+1): date.getMonth()+1;
  let day = date.getDate()<10?"0"+ date.getDate(): date.getDate();
  let hour = date.getHours()<10?"0"+ date.getHours(): date.getHours()
  let muinte = date.getMinutes()<10?"0"+ date.getMinutes(): date.getMinutes()
  let second = date.getSeconds()<10?"0"+ date.getSeconds(): date.getSeconds()
  return date.getFullYear()+"."+ month +"."+ day +' '+ hour +":"+ muinte +":"+ second
}
// 1.待支付 2.已支付 3.已完成 4.取消处理中 5.取消已处理 6.售后处理中 7.售后已处理 8.售后已核销
const orderStatusStr = function (status) {
  switch (status) {
    case 0:
      return '待支付';
    case 1:
      return '已支付';
    case 2:
      return '待发货';
    case 3:
      return '已发货';
    case 4:
      return '已收货';
    case 5:
      return '待审核';
    case 6:
      return '审核通过';
    case 7:
      return '已驳回'
    case 8:
      return '已撤销'
    case 9:
      return '审核中'
    case 77:
      return '待下单'
  }
}

const orderStatusColor = function(stadus) {
  switch(stadus) {
    case 0:
      return 'red';
    case 1:
      return 'green';
    case 2:
      return 'red';
    case 3:
      return 'blue';
    case 4:
      return 'blue';
    case 5:
      return 'red';
    case 6:
      return 'blue';
    case 7:
      return 'red'
    case 8:
      return 'gray'
    case 9:
      return 'orgin'
    case 77:
      return 'red' 
  }
}

module.exports = {
  getFormData,
  orderStatusStr,
  orderStatusColor
}