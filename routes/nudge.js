import { Router } from "express";
import { getDb } from "../controllers/connectDb.js";
import { ObjectId } from "mongodb";

const router = Router();

router.get('/nudge', async (req, res) => {
    try {
        const allNudges = await getDb().collection('nudges').find().toArray();
        return res.status(200).json(allNudges);
    } catch (error) {
        return res.status(500).send('Error in fetching nudges: ' + error.message);
    }
});

router.post('/nudge', async (req, res) => {
    const nudge = req.body;
    try {
        if (!nudge) {
            return res.status(400).send('Nudge data is required to create a nudge');
        }
        const nudges = getDb().collection('nudges');
        const result = await nudges.insertOne({ ...nudge });
        if (!result.acknowledged) {
            throw new Error('Error in inserting nudge to the database');
        }
        return res.status(201).send("Nudge created Successfully! \nNudge ID: " + result.insertedId);
    } catch (error) {
        return res.status(500).send('Error in creating a nudge : ' + error.message);

    }
});

router.get('/nudge/:id', async (req, res) => {
    try {
        const nudgeId = req.params.id;
        if (!nudgeId) {
            return res.status(400).send('Nudge ID is required in path parameters');
        }
        const nudges = getDb().collection('nudges');
        const nudge = await nudges.findOne({ _id: new ObjectId(nudgeId) });
        if (!nudge) {
            return res.status(404).send('Nudge does not exists for ID: ' + nudgeId);
        }
        return res.status(201).json(nudge);
    } catch (error) {
        res.status(500).send('Error : ' + error.message);
    }
});

router.put('/nudge/:id', async (req, res) => {
    try {
        const nudgeId = req.params.id;
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send('At least one field is required to update a nudge');
        }
        let { title, timestamp, description, icon, invitation, eventTag } = req.body;
        const nudges = getDb().collection('nudges');
        const nudge = await nudges.findOne({ _id: new ObjectId(nudgeId) });
        if (!nudge) {
            return res.status(404).send('Nudge does not exists for ID: ' + nudgeId);
        }
        const updatedNudge = await nudges.updateOne(
            { _id: new ObjectId(nudgeId) },
            {
                $set: { title, timestamp, description, icon, invitation, eventTag }
            }
        );
        if (updatedNudge.modifiedCount === 0) {
            return res.status(500).send('Nudge not found or data is same as previous');
        }
        console.log('Updating Nudge ID:', nudgeId);
        console.log('Updated Data:', { title, timestamp, description, icon, invitation, eventTag });
        return res.status(200).send('Nudge updated successfully');
    } catch (error) {
        return res.status(500).send('Error in updating nudge: ' + error.message);
    }
});

router.delete('/nudge/:id', async (req, res) => {
     try {
        const nudgeId = req.params.id;
        if (!nudgeId) {
            return res.status(400).send('Nudge ID is required in path parameters to delete an event');
        }
        console.log('Deleting Nudge ID:', nudgeId);
        const nudges = getDb().collection('nudges');
        const result = await nudges.deleteOne({ _id: new ObjectId(nudgeId) });
        console.log(result);
        if (result.deletedCount === 0) {
            return res.status(404).send('Nudge not found for ID: ' + nudgeId);
        }
        res.status(200).send(`Nudge with ID: ${nudgeId} deleted successfully.`);

    } catch (error) {
        return res.status(500).send('Error in deleting a nudge : ' + error.message);
    }
});

export default router;
