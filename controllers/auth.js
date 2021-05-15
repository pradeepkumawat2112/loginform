const mysql=require('mysql')
 
const jwt=require('jsonwebtoken');
  const bcrypt=require('bcryptjs')

  const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
})


// exports.login= async(req,res)=> {
//   try{
// const {email,password}=req.body; 
// if(!email || password ){
// return res.status(400).render('login',{
//   message:'please provide an email and password'
// })
// }
//  db.query( 'SELECT email FROM users WHERE email ?',[email] ,async(error,results)=>{
//    console.log(results);
//    if(! results ||(await bcrypt.compare(password,result[0].password)  )) {
//      res.status(400).render('login',{
//        message:'email or password is incorrect'
//      })
//    }
//  })
//   }catch(error){
//    console.log(error); 
//   }
// }


 
// REGISTRATION FORM=====>


exports.register=(req,res)=>{
   console.log(req.body);

  const {name,email,password,passwordConfirm}=req.body;
db.query('SELECT email FROM users WHERE email=?',[email] ,async(error,results)=>{
  if(error){
   console.log(error); 
  } 
  if(results.length > 0){
    return res.render('register',{
message:'this email is already taken'
    })
  }else if(password !==passwordConfirm){
   return res.render('register',{
     message:"passwords do not match"
   })   
   }
  const hashedPassword = await bcrypt.hash(password,8);
    console.log(hashedPassword)  


db.query('INSERT INTO users SET ?',{name:name,email:email,password:hashedPassword},async(error,results)=>{
if(error){
  console.log(error);
}else{
  console.log(results);
  return res.render('register',{
    message:"Registration Successful"
  })
}
})

 })
 }
