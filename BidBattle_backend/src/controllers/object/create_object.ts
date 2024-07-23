import { Request, Response } from 'express';
import { obj_models } from '../../models/objects_models';
import { timeline_models } from '../../models/timeline_models';
import { ObjectId } from 'mongodb';

// Signup route

async function objects_create(req: Request, res: Response) {
  try {
    const obj_pic = req.file?.filename;
    const obj_name = req.body.obj_name;
    const end_time = req.body.end_time;
    const owner = req.body.owner;
    const description = req.body.description;
    const initial_bid = req.body.initial_bid;

    // const { username, email, password } = req.body;
    // console.log(username);

    const new_obj = new obj_models({
      obj_name,
      obj_pic,
      end_time,
      owner,
      description,
      initial_bid
    });

    // console.log(new_obj);
    await new_obj.save();

    const objId = new_obj._id;
    // console.log(objId);

    const new_timeline = new timeline_models({
      obj_id: new ObjectId(objId),
    })
    await new_timeline.save();

    return res.status(201).json({ message: 'Object and timeline created successfully' });
  } catch (error) {
    console.error('Error during creation:', error);
    res.status(500).json({ message: error });
  }
}

export { objects_create };