var dbConn = require('../../config/db.config');

const getAllDATA = async (req,res)=>{
    const query = `select f.Id, f.data,f.position,d.dataid,d.label,p.positionid,p.x,p.y
    from flowchart as f
    left join position as p
    on f.Id= p.positionid
    left join data as d
    on f.Id = d.dataid;`
    const values = [];
    try {
        const [results] = await dbConn.promise().query(query, values);
        res.json(results);
    }catch(err){
        res.status(500).json({error:'An error occured file fetching data'});
    }
};

module.exports = 
{
    getAllDATA
};