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

// const insertFlowchartData = async (req, res) => {
//     const flowchartData = {
//       data:0,
//       position: 0,
//     };
  
//     const dataData = {
//       dataid: 0, // We'll update this after the flowchart data insertion
//       label: req.body.label,
//     };
  
//     const positionData = {
//       positionid:0,
//       x: req.body.x,
//       y: req.body.y,
//     };
  
//     try {
//       // Insert into the flowchart table
//       const [flowchartResults] = await dbConn.promise().query('INSERT INTO flowchart SET ?', flowchartData);
  
//       const Id = flowchartResults.insertId;
//       dataData.dataid = Id;
//       positionData.positionid = Id;
  
//       // Insert into the data table
//       await dbConn.promise().query('INSERT INTO data SET ?', dataData);
  
//       // Insert into the position table
//       await dbConn.promise().query('INSERT INTO position SET ?', positionData);
//       console.log("flowchartResults",flowchartData)
//       console.log("Results--->",dataData)
//       console.log("ftResults===>",positionData)
  
//       res.json({ message: 'Data inserted successfully.' });
//     } catch (error) {
//       console.error('Error inserting data: ', error);
//       res.status(500).json({ error: 'An error occurred while inserting data.' });
//     }
//   };
const insertFlowchartData = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const nodeDataList = req.body.data;

    for (const nodeData of nodeDataList) {
      const flowchartData = {
        data: 0,
        position: 0,
      };

      const dataData = {
        dataid: 0, // We'll update this after the flowchart data insertion
        label: nodeData.label,
      };

      const positionData = {
        positionid: 0,
        x: nodeData.x,
        y: nodeData.y,
      };

      // Insert into the flowchart table
      const [flowchartResults] = await dbConn.promise().query('INSERT INTO flowchart SET ?', flowchartData);
      const Id = flowchartResults.insertId;
      dataData.dataid = Id;
      positionData.positionid = Id;

      // Insert into the data table
      await dbConn.promise().query('INSERT INTO data SET ?', dataData);

      // Insert into the position table
      await dbConn.promise().query('INSERT INTO position SET ?', positionData);
    }

    
    res.json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data: ', error);
    res.status(500).json({ error: 'An error occurred while inserting data.' });
  }
};


  
module.exports = 
{
    getAllDATA,
    insertFlowchartData
};