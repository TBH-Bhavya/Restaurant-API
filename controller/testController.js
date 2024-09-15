
const testController = (req,res)=>{
    try {
        res.status(200).send("Server is running")
    } catch (error) {
        console.log("Error occured");
    }
  
}

module.exports = {testController};