var express = require('express');
const dayjs = require('dayjs');
const AccountModel = require('../../models/AccountModel');
const UserModel = require('../../models/UserModel')

const checkLoginMiddle = require('../../middleWare/checkLoginMiddle')

var router = express.Router();

// 首页
router.get('/', async function (req, res, next) {
  // let accounts = db.get('accounts').value()
  res.redirect('/account')
});

/* 记账列表页. */
router.get('/account', checkLoginMiddle, async function (req, res, next) {
  // let accounts = db.get('accounts').value()
  try {
    const accounts = await AccountModel.find().sort({ time: -1 }).exec()
    res.render('list', { accounts, dayjs });
  } catch (error) {
    next(error)
  }
});

// 账单添加页
router.get('/account/create', checkLoginMiddle, function (req, res, next) {
  res.render('create', { title: 'Express' });
});

// 新增账单
router.post('/account', checkLoginMiddle, function (req, res, next) {
  // 获取请求体数据
  console.log('req:', req);
  AccountModel.create({
    ...req.body,
    time: dayjs(req.body.time)
  }, (err, data) => {
    if (err) {
      return err
    }
    // db.get('accounts').unshift({ id, ...req.body }).write();
    res.render('success', { msg: '添加成功了哦~', url: '/account' })
  })

});
// 删除账单
router.get('/account/:id', checkLoginMiddle, function (req, res, next) {
  // 获取请求体数据
  const id = req.params.id;
  // console.log('req:',req);
  AccountModel.deleteOne({id: id}).exec()
  // db.get('accounts').remove({ id }).write();
  res.render('success', { msg: '删除成功了哦~', url: '/account' })
});
module.exports = router;
