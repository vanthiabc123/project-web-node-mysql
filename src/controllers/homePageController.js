const getSignUp=(req,res)=>{
    return res.render("index.ejs",{
        data:{page:"signup",title:"Sign up"}
    })
}
const getSignIn=(req,res)=>{
    return res.render("index.ejs",{
        data:{page:"signin",title:"sign in"}
        });
};
const getHomePage=(req,res)=>{
    return res.render("index.ejs",{
        data:{page:"home",title:"trang chu"}
        });
};
module.exports={
    getSignUp,
    getSignIn,
    getHomePage
}