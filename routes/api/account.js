var express = require('express');
const dayjs = require('dayjs');
const AccountModel = require('../../models/AccountModel');
const checkTokenMiddle = require('../../middleWare/checkTokenMiddle')

var router = express.Router();


/* 记账列表页. */
router.get('/account', checkTokenMiddle, async function (req, res, next) {
  // let accounts = db.get('accounts').value()
  try {
    const accounts = await AccountModel.find().sort({ time: -1 }).exec()
      // res.render('list', { accounts, dayjs });
      res.json({
          code: '0000',
          msg: '读取成功',
          data: accounts
      })
  } catch (error) {
      next(error)
      res.json({
          code: '1001',
          msg: '读取失败～',
          data: null,
      })
  }
});

// 新增账单
router.post('/account', checkTokenMiddle, async function (req, res, next) {
  // 获取请求体数据
    console.log('req:', req);
    try {
        const result = await AccountModel.create({
            ...req.body,
            time: dayjs(req.body.time)
        })
        res.json({
            code: '0000',
            msg: '添加成功',
            data: result,
        })
    } catch (error) {
        res.json({
            code: '1002',
            msg: '添加失败',
            data: null
        })
    }
});
// 删除账单
router.delete('/account/:id', checkTokenMiddle, async function (req, res, next) {
  // 获取请求体数据
  const id = req.params.id;
    try {
        const result = await AccountModel.deleteOne({ id: id }).exec()
        res.json({
            code: '000',
            msg: '删除成功',
            data: {},
        })
    } catch (error) {
        res.json({
            code: '1001',
            msg: '删除失败',
            data: null
        })
    }
});

// 获取单条账单
router.get('/account/:id', checkTokenMiddle, async function (req, res, next) {
    // 获取请求体数据
    const id = req.params.id;

    try {
        const result = await AccountModel.findById({ _id: id }).exec()
        console.log('result', result);
        if (result) {
            res.json({
                code: '000',
                msg: '获取成功',
                data: result,
            })
        } else {
            res.json({
                code: '1003',
                msg: '不存在',
                data: null,
            })
        }
    } catch (error) {
        console.log(error);

        res.json({
            code: '1001',
            msg: '获取失败',
            data: null
        })
    }
});

// 更新单条账单
router.patch('/account/:id', checkTokenMiddle, async function (req, res, next) {
    // 获取请求体数据
    const id = req.params.id;

    try {
        const result = await AccountModel.findByIdAndUpdate({ _id: id }, req.body).exec()
        console.log('result', result);
        if (result) {
            res.json({
                code: '000',
                msg: '更新成功',
                data: null,
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            code: '1001',
            msg: '更新失败',
            data: null
        })
    }
});
module.exports = router;
