import tvSchema from '../schemas/tvSchema.mjs';
import logSymbols from 'log-symbols';
import mongoose from 'mongoose';
import exitHandler from '../utils/exitHandler.mjs';

const TV = mongoose.model('TV', tvSchema);

export default function deleteDuplicate() {
  TV.aggregate([
    {
      "$group": {
          _id: {id: "$id"},
          id: { $addToSet: "$_id" } ,
          count: { $sum : 1 }
      }
  },
  {
      "$match": {
          count: { "$gt": 1 }
      }
  }
  ], {allowDiskUse: true}).then((item) => {
    item.forEach(async (item) => {
      item.id.shift();
      console.log(`\n${logSymbols.warning} Duplicate data found for ID ${item._id.id}`)
      await TV.deleteMany({_id: {$in: item.id}})
        .then(() => console.log(`${logSymbols.success} Duplicate data for ID ${item._id.id} deleted`))
        .catch((err) => console.log(`${logSymbols.error} Error deleting duplicate ID ${item._id.id}: ${err}`))
        .finally(() => {
          console.log(`\n${logSymbols.success} Job done!`);
          exitHandler();
        });  
    })
  })
}