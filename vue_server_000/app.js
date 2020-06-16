const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const session=require("express-session");
// 创建连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    connectionLimit:20,
    database:"gr_pdd"
});
// 创建web服务器
var server=express();
// 监听端口号
server.listen(8080);
// 解决跨域的问题
server.use(cors({
    origin:["http://127.0.0.1:5050","http://localhost:5050"],
    credentials:true
}))
server.use(session({
    secret:"128位字符串",
    resave:true,
    saveUninitialized:true
}))
server.use(express.static("public"))
// http://127.0.0.1:8080/login?uname=ljw&upwd=123456
// http://127.0.0.1:8080/login?phone=18813634915
// 1.登录接口
server.get("/login",(req,res)=>{
    var p=req.query.phone;
    var uid=req.session.uid;
    var phone=req.session.phone;
    var sql="SELECT id,phone FROM pdd_login WHERE phone=?";
    pool.query(sql,[p,uid,phone],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
            res.send(
                {code:-1,msg:"手机号不存在"});
        }else{
            // 将用户的id保存session对象
            req.session.uid=result[0].id;
            req.session.phone=result[0].phone;
            // req.session.uname=result[0].uname;
             res.send({code:1,msg:"登录成功"});
        }
    })
   
});
server.get("/me",(req,res)=>{
    var uid = req.session.uid;
    var phone = req.session.phone;
    if(!uid){
        res.send({code:-1,msg:"请先登录"});
        return;
    }
    if(phone){
        res.send({code:1,msg:phone})
    }
});
server.get("/goods",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请先登录"});
        return;
    }
    var goods_id=req.query.goods_id;
    var sql="SELECT * FROM pdd_recommend WHERE goods_id=?";
    pool.query(sql,[goods_id],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
            res.send({code:-2,msg:"查询失败"})
            return;
        }else{
            res.send({code:1,msg:"查询成功",data:result})
        }
    })
})

server.get("/tuichu",(req,res)=>{
    delete req.session.uid;
    res.send({code:200,msg:"退出成功"})
})

// 2.商品列表信息
// http://127.0.0.1:8080/coods?goods_id=1008021196
server.get("/product",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请先登录"});
        return;
    }
    var pno=req.query.pno;  //页码数
    var pcount=req.query.pcount; //页大小
    if(!pno){
        pno=1;
    }
    if(!pcount){
        pcount=8;
    }
    var sql="SELECT goods_id,short_name,price,thumb_url,sales_tip FROM pdd_recommend LIMIT ?,?";
    var pindex=(pno-1)*pcount;
    pcount=parseInt(pcount);
    pool.query(sql,[pindex,pcount],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:"查询成功",data:result});
    })
});
server.get("/grcart",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请先登录"});
        return;
    }
    // goods_id,price,goods_name
    var goods_id=req.query.goods_id;
    var goods_name=req.query.goods_name;
    var thumb_url=req.query.thumb_url;
    var price=req.query.price;
    var count=req.query.count;
    var cart_tip=req.query.cart_tip;
    var cb=req.query.cb;
    // 21：42
    // 查询当前用户的购物车里是否有当前商品
    var sql="SELECT id FROM gr_pdd_cart WHERE uid=? AND goods_id=?";
    pool.query(sql,[uid,goods_id],(err,result)=>{
        if(err)throw err;
        // 1.如没有，添加一条数据
        // 2.如有当前商品，更新count+1
        // http://127.0.0.1:8080/grcart?goods_id=1&goods_name=1&thumb_url=1&price=1&count=1&cart_tip=1
        if(result.length===0){
            var sql=`INSERT INTO gr_pdd_cart VALUES (null,${goods_id},'${goods_name}','${thumb_url}',${price},${count},'${cart_tip}',${cb},${uid})`;
        }else{
            var sql=`UPDATE gr_pdd_cart SET count=1 WHERE uid=${uid} AND goods_id=${goods_id}`;
        }
        pool.query(sql,(err,result)=>{
            if(err)throw err;
            if(result.affectedRows>0){
                res.send({code:1,msg:"添加成功"});
            }else{
                res.send({code:-2,msg:"添加失败"});
            }
        })
    })
});

// 4.查询指定用户的收藏商品
server.get("/collection",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请先登录"});
        return;
    }
    var sql="SELECT id,goods_id,goods_name,thumb_url,price,count,cart_tip FROM gr_pdd_cart WHERE uid=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:"查询成功",data:result});
    })
});

server.get("/delcollection",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    var goods_id=req.query.goods_id;
    var sql="DELETE from gr_pdd_cart WHERE goods_id=?";
    pool.query(sql,[goods_id],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"});
        }else{
            res.send({code:-2,msg:"删除失败"});
        }
    })
});

// 6.删除多个商品  id
//http://127.0.0.1:8080/delItems?id=14,15
server.get("/delcollections",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    var id=req.query.id;
    var sql=`DELETE FROM gr_pdd_cart WHERE id IN (${id})`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"});
        }else{
            res.send({code:-1,msg:"删除失败"});
        }
    })
});



// // 7.修改商品的数量  count id
// server.get("/updatecount",(req,res)=>{
//     var uid=req.session.uid;
//     if(!uid){
//         res.send({code:-1,msg:"请登录"});
//         return;
//     }
//     var count=req.query.count;
//     var id=req.query.id;
//     var sql='UPDATE xz_cart set count=? WHERE id=?';
//     pool.query(sql,[count,id],(err,result)=>{
//         if(err) throw err;
//         if(result.affectedRows>0){
//             res.send({code:1,msg:"修改数量成功"});
//         }else{
//             res.send({code:-2,msg:"修改数量失败"});
//         }
//     })
// })
