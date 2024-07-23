import { Request, Response } from 'express';
import { obj_models } from '../../models/objects_models';
import { timeline_models } from '../../models/timeline_models';

// all display route
async function update_function(req: Request, res: Response) {
  // console.log("update_function")
  try {
    const { userId, obj_id, bid_amount } = req.body;

    const times: any = await timeline_models.find({ obj_id: obj_id });
    const objects: any = await obj_models.find({ _id: obj_id });

    // if (objects.owner === userId){
    //     res.status(404).json("owner cannot be a bidder for same object");
    // }

    if (times[0].bid_amount === 0) {
        // console.log(objects[0].initial_bid)
        times[0].bid_amount = Number((objects[0].initial_bid) + parseInt(bid_amount));
    } else {
        // console.log(objects[0].initial_bid)
        times[0].bid_amount = Number((times[0].bid_amount) + parseInt(bid_amount));
    }

    times[0].bidder = userId;
    // console.log(userId);

    const updation = await timeline_models.updateOne({ obj_id: obj_id }, { $set: times[0] });
    // console.log(updation);

    // updation done
    if (updation.modifiedCount > 0) {
        res.status(200).json("updation done");
    } else {
        res.status(404).json("updation not done");
    }
  } catch (error) {
    console.error('Error retrieving all objects', error);
    res.status(500).json({ message: error });
  }
}

export { update_function };