const {validationResult} = require('express-validator');
const conn = require('../../dbConnection').promise();
exports.products = async (req,res,next) => {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
}
try{
const [rows] = await conn.execute('INSERT INTO `product`(productName,type,price,image) values(?,?,?,?)',[
   req.body.productName,
    req.body.type,
    req.body.price,
    req.file.path
   ]);
if (rows.affectedRows === 1) {
    return res.status(201).json({
        message: "The product has been successfully added.",
    });   
}
} catch(err){
    next(err);
}

}