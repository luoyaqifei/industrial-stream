module.exports = {
    merge:(req,res,next)=>{
        
        let from = req.body.from;
        let to = req.body.to;
        let result = copyMandatoryFields(from, to);
        try{
           result = merge(from,to);
        }catch(e){
           console.error({message:'failed to merge', from:from,to:to,error:e});
        }
        //saveJsonFile('case.json', {from:from,to:to,result:result});
        res.status(200).json(result);
    }
    ,core: {
        merge:merge
    }
};