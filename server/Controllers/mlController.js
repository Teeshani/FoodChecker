const  axios  = require("axios");

 const predict = async (req,res)=>{
    try {
        const data = req.body;
        const response = await axios.post("http://127.0.0.1:5000/predict",data);
        res.status(200)
        .json({
            success: true,
            data: response.data
        })
    } catch (error) {
        console.log(error);
        
        res.status(500)
        .json({
            message: error.response.data,
            success: false
        })
    }
}

module.exports = {
    predict,
}